/**
 * course-ui.js — 全コースページ共通UIコンポーネント
 * React 18 UMD をロードした後にこのファイルをロードしてください。
 * 各コースページの <script> タグ内では DataTable / Code / Exercise / Section を直接使用できます。
 * App コンポーネント内で useState を使うには `const { useState } = React;` を各ページで宣言してください。
 */

/* ────────────────────────────────────────────
   DataTable — データテーブル
──────────────────────────────────────────── */
function DataTable({data}) {
  return React.createElement("div", {
    style:{overflowX:"auto",margin:"12px 0",borderRadius:10,border:"1px solid #d1d5db",background:"#fff"}
  }, React.createElement("table", {style:{width:"100%",borderCollapse:"collapse",fontSize:13}},
    data.cap && React.createElement("caption", {
      style:{padding:"6px 12px",background:"#f3f4f6",fontWeight:700,fontSize:12,color:"#374151",
        textAlign:"left",borderBottom:"1px solid #e5e7eb"}
    }, data.cap),
    React.createElement("thead", null,
      React.createElement("tr", null,
        data.h.map((h,i) => React.createElement("th", {
          key:i,
          style:{padding:"8px 12px",background:"#f9fafb",borderBottom:"2px solid #e5e7eb",
            fontWeight:700,textAlign:"left",color:"#374151",whiteSpace:"nowrap"}
        }, h))
      )
    ),
    React.createElement("tbody", null,
      data.r.map((row,i) => React.createElement("tr", {
        key:i, style:{background: i%2===0 ? "#fff" : "#f9fafb"}
      },
        row.map((cell,j) => React.createElement("td", {
          key:j,
          style:{padding:"8px 12px",borderBottom:"1px solid #f3f4f6",color:"#374151",verticalAlign:"top"}
        }, cell))
      ))
    )
  ));
}

/* ────────────────────────────────────────────
   Code — コードブロック（コピーボタン付き）
──────────────────────────────────────────── */
function Code({code}) {
  const [copied, setCopied] = React.useState(false);
  return React.createElement("div", {style:{position:"relative",margin:"10px 0"}},
    React.createElement("pre", {
      style:{background:"#1e1b4b",color:"#e2e8f0",padding:"14px 16px",borderRadius:10,
        overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:"'JetBrains Mono',monospace"}
    },
      React.createElement("code", null, code)
    ),
    React.createElement("button", {
      onClick: () => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      style:{position:"absolute",top:8,right:8,
        background: copied ? "#22c55e" : "rgba(255,255,255,0.15)",
        color:"#fff",border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,cursor:"pointer"}
    }, copied ? "✓ Copied" : "Copy")
  );
}

/* ────────────────────────────────────────────
   Exercise — 演習問題（解答開閉付き）
──────────────────────────────────────────── */
function Exercise({ex, idx}) {
  const [show, setShow] = React.useState(false);
  const stars = "⭐".repeat(ex.diff);
  return React.createElement("div", {
    style:{border:"1px solid #fde68a",borderRadius:12,overflow:"hidden",marginBottom:8,background:"#fff"}
  },
    React.createElement("div", {style:{padding:"12px 16px",background:"#fffbeb"}},
      React.createElement("div", {style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},
        React.createElement("span", {style:{fontSize:12,fontWeight:700,color:"#92400e"}}, "演習 " + (idx+1)),
        React.createElement("span", {style:{fontSize:12}}, stars)
      ),
      React.createElement("p", {style:{fontSize:13.5,color:"#1c1917",lineHeight:1.75,margin:0}}, ex.q)
    ),
    ex.code && React.createElement(Code, {code: ex.code}),
    React.createElement("div", {style:{padding:"8px 16px",borderTop:"1px solid #fde68a",background:"#fffbeb"}},
      React.createElement("button", {
        onClick: () => setShow(!show),
        style:{background:"none",border:"1px solid #f59e0b",borderRadius:8,padding:"6px 14px",
          fontSize:12,fontWeight:700,color:"#92400e",cursor:"pointer"}
      }, show ? "▲ 解答を隠す" : "▼ 解答を見る"),
      show && React.createElement(Code, {code: ex.answer})
    )
  );
}

/* ────────────────────────────────────────────
   Section — アコーディオンセクション
──────────────────────────────────────────── */
function Section({section, idx, defaultOpen}) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return React.createElement("div", {
    style:{borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",background:"#fff"}
  },
    React.createElement("button", {
      onClick: () => setOpen(!open),
      style:{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 16px",
        border:"none",background:"#fafafa",cursor:"pointer",textAlign:"left",
        fontSize:14,fontWeight:700,color:"#1e1b4b"}
    },
      React.createElement("span", {
        style:{flexShrink:0,width:24,height:24,borderRadius:6,background:"#6366f1",
          color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:11,fontWeight:800}
      }, idx + 1),
      React.createElement("span", {style:{flex:1}}, section.title),
      React.createElement("span", {
        style:{fontSize:18,color:"#9ca3af",transition:"transform 0.2s",
          transform: open ? "rotate(90deg)" : "rotate(0)"}
      }, "›")
    ),
    open && React.createElement("div", {style:{padding:"12px 16px 16px"}},
      section.body && React.createElement("p", {
        style:{margin:"0 0 8px",fontSize:13.5,lineHeight:1.85,color:"#374151",whiteSpace:"pre-line"}
      }, section.body),
      section.table && React.createElement(DataTable, {data: section.table}),
      section.afterTable && React.createElement("p", {
        style:{margin:"8px 0",fontSize:13.5,lineHeight:1.85,color:"#374151",whiteSpace:"pre-line"}
      }, section.afterTable),
      section.code && React.createElement(Code, {code: section.code}),
      section.afterCode && React.createElement("p", {
        style:{margin:"10px 0 0",fontSize:13,lineHeight:1.8,color:"#555",whiteSpace:"pre-line",
          background:"#f9fafb",padding:"10px 14px",borderRadius:8,border:"1px solid #e5e7eb"}
      }, section.afterCode)
    )
  );
}
