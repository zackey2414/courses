#!/usr/bin/env python3
"""
fix_syntax.py — HTMLコースファイル内のJS構文エラーを自動検出・修正する。

検出・修正する問題:
  1. データフィールド (body, code, afterCode, afterTable, goal, answer) が
     バッククォート (` または \`) で囲まれている → ダブルクォート (") に統一
  2. ダブルクォート文字列内のエスケープ漏れ (未エスケープの " など)
  3. テンプレートリテラルのバランス崩れ

使い方:
  python3 assets/fix_syntax.py           # 全ファイルを検査・修正
  python3 assets/fix_syntax.py --check   # 検査のみ（修正しない）
"""
import glob
import os
import re
import sys

DATA_FIELDS = {'body', 'code', 'afterCode', 'afterTable', 'goal', 'answer'}


def fix_file(content):
    """Fix all JS syntax issues in the file content. Returns (new_content, list_of_fixes)."""
    fixes = []

    # ── Pass 1: field:\` ... ` → field:"..." ──
    # Pattern: a data field name followed by :\` (escaped backtick opener)
    content, n = _fix_escaped_backtick_fields(content)
    if n:
        fixes.append(f"escaped-backtick openers: {n}")

    # ── Pass 2: field:` ... ` → field:"..." (any remaining backtick templates) ──
    content, n = _fix_backtick_fields(content)
    if n:
        fixes.append(f"backtick templates: {n}")

    return content, fixes


def _fix_escaped_backtick_fields(content):
    """Fix field:\`...\` patterns (escaped backtick used as template opener)."""
    pattern = re.compile(
        r'(' + '|'.join(DATA_FIELDS) + r'):\\`'
    )
    changes = 0
    while True:
        m = pattern.search(content)
        if not m:
            break
        field_name = m.group(1)
        start = m.start()
        opener_end = m.end()  # position right after :\`

        # Find the closing backtick: the first unescaped ` that is NOT preceded by \
        # Walk through the content character by character
        i = opener_end
        n = len(content)
        closer_pos = None
        while i < n:
            if content[i] == '\\' and i + 1 < n:
                i += 2  # skip escaped char
                continue
            if content[i] == '`':
                closer_pos = i
                break
            i += 1

        if closer_pos is None:
            break  # no closer found, can't fix

        # Extract the inner content (between \` and `)
        inner = content[opener_end:closer_pos]

        # Convert to double-quoted string
        converted = _template_content_to_dquote(inner)

        # Replace: field:\`inner` → field:"converted"
        replacement = f'{field_name}:"{converted}"'
        content = content[:start] + replacement + content[closer_pos + 1:]
        changes += 1

    return content, changes


def _fix_backtick_fields(content):
    """Fix field:`...` patterns (plain backtick template as data field)."""
    pattern = re.compile(
        r'(' + '|'.join(DATA_FIELDS) + r'):`'
    )
    changes = 0
    while True:
        m = pattern.search(content)
        if not m:
            break
        field_name = m.group(1)
        start = m.start()
        opener_end = m.end()  # position right after :`

        # Find the closing backtick using template-literal rules
        i = opener_end
        n = len(content)
        closer_pos = None
        expr_depth = 0
        while i < n:
            c = content[i]
            if c == '\\' and i + 1 < n:
                i += 2
                continue
            if c == '$' and i + 1 < n and content[i + 1] == '{':
                expr_depth += 1
                i += 2
                continue
            if expr_depth > 0:
                if c == '{':
                    expr_depth += 1
                elif c == '}':
                    expr_depth -= 1
                i += 1
                continue
            if c == '`':
                closer_pos = i
                break
            i += 1

        if closer_pos is None:
            break

        inner = content[opener_end:closer_pos]

        # Skip if it contains ${} (UI template, not data)
        if '${' in inner:
            # Mark this region so we don't find it again
            content = content[:start] + '\x00SKIP\x00' + content[start + len(field_name):]
            continue

        converted = _template_content_to_dquote(inner)
        replacement = f'{field_name}:"{converted}"'
        content = content[:start] + replacement + content[closer_pos + 1:]
        changes += 1

    # Remove skip markers
    content = content.replace('\x00SKIP\x00', '')
    return content, changes


def _template_content_to_dquote(inner):
    """Convert template literal content to double-quoted string content.

    - \\` → ` (un-escape backticks — not special in double-quoted strings)
    - " → \\" (escape double quotes)
    - actual newlines → \\n
    - preserve other escapes (\\n, \\t, \\\\, etc.)
    """
    result = []
    i = 0
    n = len(inner)
    while i < n:
        c = inner[i]
        if c == '\\' and i + 1 < n:
            next_c = inner[i + 1]
            if next_c == '`':
                # \` → just ` (un-escape)
                result.append('`')
                i += 2
            else:
                # Keep other escapes as-is
                result.append(c)
                result.append(next_c)
                i += 2
        elif c == '"':
            result.append('\\"')
            i += 1
        elif c == '\n':
            result.append('\\n')
            i += 1
        else:
            result.append(c)
            i += 1
    return ''.join(result)


def validate_file(content):
    """Validate JS template/string balance. Returns list of error strings."""
    scripts = re.findall(r'<script>([\s\S]*?)</script>', content)
    if not scripts:
        return []

    script = scripts[-1]
    errors = []

    # Check for remaining data fields with backtick delimiters
    for m in re.finditer(r'(body|code|afterCode|afterTable|goal|answer):[\\]?`', script):
        line = script[:m.start()].count('\n') + 1
        errors.append(f"line ~{line}: {m.group()} — data field uses backtick delimiter")

    # Check template literal balance
    ctx = ['code']
    bd = []
    i = 0
    n = len(script)
    while i < n:
        c = script[i]
        cx = ctx[-1]
        if cx == 'template':
            if c == '\\' and i + 1 < n:
                i += 2; continue
            elif c == '$' and i + 1 < n and script[i + 1] == '{':
                ctx.append('code_expr'); bd.append(1); i += 2; continue
            elif c == '`':
                ctx.pop(); i += 1; continue
        elif cx in ('code', 'code_expr'):
            if c == '/' and i + 1 < n and script[i + 1] == '/':
                while i < n and script[i] != '\n':
                    i += 1
                continue
            elif c == '/' and i + 1 < n and script[i + 1] == '*':
                i += 2
                while i < n:
                    if script[i] == '*' and i + 1 < n and script[i + 1] == '/':
                        i += 2; break
                    i += 1
                continue
            elif c == "'":
                ctx.append('squote'); i += 1; continue
            elif c == '"':
                ctx.append('dquote'); i += 1; continue
            elif c == '`':
                ctx.append('template'); i += 1; continue
            elif cx == 'code_expr' and c == '{':
                bd[-1] += 1; i += 1; continue
            elif cx == 'code_expr' and c == '}':
                bd[-1] -= 1; i += 1
                if bd[-1] == 0:
                    bd.pop(); ctx.pop()
                continue
        elif cx == 'squote':
            if c == '\\' and i + 1 < n:
                i += 2; continue
            elif c == "'":
                ctx.pop()
        elif cx == 'dquote':
            if c == '\\' and i + 1 < n:
                i += 2; continue
            elif c == '"':
                ctx.pop()
        i += 1

    if ctx != ['code']:
        errors.append(f"unbalanced contexts at end of script: {ctx}")

    return errors


def main():
    check_only = '--check' in sys.argv
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    html_files = sorted(glob.glob(os.path.join(base, '**/*.html'), recursive=True))

    total_fixes = 0
    total_errors = 0

    for filepath in html_files:
        relpath = os.path.relpath(filepath, base)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix
        new_content, fixes = fix_file(content)
        if fixes:
            total_fixes += len(fixes)
            if check_only:
                print(f"  NEEDS FIX: {relpath}: {', '.join(fixes)}")
            else:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"  FIXED: {relpath}: {', '.join(fixes)}")

        # Validate (on the fixed content)
        errors = validate_file(new_content)
        if errors:
            total_errors += len(errors)
            for err in errors:
                print(f"  ERROR: {relpath}: {err}")

    print(f"\n{'Would fix' if check_only else 'Fixed'}: {total_fixes} issue(s)")
    print(f"Remaining errors: {total_errors}")

    if total_errors > 0:
        sys.exit(1)


if __name__ == '__main__':
    main()
