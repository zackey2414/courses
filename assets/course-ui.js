/**
 * course-ui.js — 全コースページ共通UIコンポーネント
 * React 18 UMD をロードした後にこのファイルをロードしてください。
 *
 * 低レベルコンポーネント: DataTable / Code / Exercise / Section
 * ページレイアウト:       CourseApp（全ページ共通）
 *
 * 使い方:
 *   const root = ReactDOM.createRoot(document.getElementById('root'));
 *   root.render(React.createElement(CourseApp, {
 *     title: "Java 入門コース", icon: "☕", level: "入門",
 *     description: "...", footerText: "...",
 *     chapters: chapters, EX: EX
 *   }));
 */

var e = React.createElement;

/* ────────────────────────────────────────────
   DataTable — データテーブル
──────────────────────────────────────────── */
function DataTable(_p) {
  var data = _p.data;
  return e("div", {
    style:{overflowX:"auto",margin:"12px 0",borderRadius:10,border:"1px solid #d1d5db",background:"#fff"}
  }, e("table", {style:{width:"100%",borderCollapse:"collapse",fontSize:13}},
    data.cap && e("caption", {
      style:{padding:"6px 12px",background:"#f3f4f6",fontWeight:700,fontSize:12,color:"#374151",
        textAlign:"left",borderBottom:"1px solid #e5e7eb"}
    }, data.cap),
    e("thead", null,
      e("tr", null,
        data.h.map(function(h,i) { return e("th", {
          key:i,
          style:{padding:"8px 12px",background:"#f9fafb",borderBottom:"2px solid #e5e7eb",
            fontWeight:700,textAlign:"left",color:"#374151",whiteSpace:"nowrap"}
        }, h); })
      )
    ),
    e("tbody", null,
      data.r.map(function(row,ri) { return e("tr", {
        key:ri, style:{background: ri%2===0 ? "#fff" : "#f9fafb"}
      },
        row.map(function(cell,ci) { return e("td", {
          key:ci,
          style:{padding:"8px 12px",borderBottom:"1px solid #f3f4f6",color:"#374151",verticalAlign:"top"}
        }, cell); })
      ); })
    )
  ));
}

/* ────────────────────────────────────────────
   Code — コードブロック（コピーボタン付き）
──────────────────────────────────────────── */
function Code(_p) {
  var code = _p.code;
  var _s = React.useState(false), copied = _s[0], setCopied = _s[1];
  return e("div", {style:{position:"relative",margin:"10px 0"}},
    e("pre", {
      style:{background:"#1e1b4b",color:"#e2e8f0",padding:"14px 16px",borderRadius:10,
        overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:"'JetBrains Mono',monospace"}
    }, e("code", null, code)),
    e("button", {
      onClick: function() {
        if (navigator.clipboard) navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(function() { setCopied(false); }, 2000);
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
function Exercise(_p) {
  var ex = _p.ex, idx = _p.idx;
  var _s = React.useState(false), show = _s[0], setShow = _s[1];
  var stars = "";
  for (var i = 0; i < (ex.diff||1); i++) stars += "⭐";
  return e("div", {
    style:{border:"1px solid #fde68a",borderRadius:12,overflow:"hidden",marginBottom:8,background:"#fff"}
  },
    e("div", {style:{padding:"12px 16px",background:"#fffbeb"}},
      e("div", {style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},
        e("span", {style:{fontSize:12,fontWeight:700,color:"#92400e"}}, "演習 " + (idx+1)),
        e("span", {style:{fontSize:12}}, stars)
      ),
      e("p", {style:{fontSize:13.5,color:"#1c1917",lineHeight:1.75,margin:0}}, ex.q)
    ),
    ex.code && e(Code, {code: ex.code}),
    e("div", {style:{padding:"8px 16px",borderTop:"1px solid #fde68a",background:"#fffbeb"}},
      e("button", {
        onClick: function() { setShow(!show); },
        style:{background:"none",border:"1px solid #f59e0b",borderRadius:8,padding:"6px 14px",
          fontSize:12,fontWeight:700,color:"#92400e",cursor:"pointer"}
      }, show ? "▲ 解答を隠す" : "▼ 解答を見る"),
      show && e(Code, {code: ex.answer})
    )
  );
}

/* ────────────────────────────────────────────
   Section — アコーディオンセクション
──────────────────────────────────────────── */
function Section(_p) {
  var section = _p.section, idx = _p.idx, defaultOpen = _p.defaultOpen;
  var _s = React.useState(!!defaultOpen), open = _s[0], setOpen = _s[1];
  return e("div", {
    style:{borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",background:"#fff"}
  },
    e("button", {
      onClick: function() { setOpen(!open); },
      style:{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 16px",
        border:"none",background:"#fafafa",cursor:"pointer",textAlign:"left",
        fontSize:14,fontWeight:700,color:"#1e1b4b"}
    },
      e("span", {
        style:{flexShrink:0,width:24,height:24,borderRadius:6,background:"#6366f1",
          color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:11,fontWeight:800}
      }, idx + 1),
      e("span", {style:{flex:1}}, section.title),
      e("span", {
        style:{fontSize:18,color:"#9ca3af",transition:"transform 0.2s",
          transform: open ? "rotate(90deg)" : "rotate(0)"}
      }, "›")
    ),
    open && e("div", {style:{padding:"12px 16px 16px"}},
      section.body && e("p", {
        style:{margin:"0 0 8px",fontSize:13.5,lineHeight:1.85,color:"#374151",whiteSpace:"pre-line"}
      }, section.body),
      section.table && e(DataTable, {data: section.table}),
      section.afterTable && e("p", {
        style:{margin:"8px 0",fontSize:13.5,lineHeight:1.85,color:"#374151",whiteSpace:"pre-line"}
      }, section.afterTable),
      section.code && e(Code, {code: section.code}),
      section.afterCode && e("p", {
        style:{margin:"10px 0 0",fontSize:13,lineHeight:1.8,color:"#555",whiteSpace:"pre-line",
          background:"#f9fafb",padding:"10px 14px",borderRadius:8,border:"1px solid #e5e7eb"}
      }, section.afterCode)
    )
  );
}

/* ────────────────────────────────────────────
   CourseApp — 全コースページ共通レイアウト
   props: { title, icon, level, description, footerText, chapters, EX }
──────────────────────────────────────────── */
function CourseApp(_p) {
  var title = _p.title, icon = _p.icon, level = _p.level,
      description = _p.description, footerText = _p.footerText,
      chapters = _p.chapters, EX = _p.EX;

  var _ch = React.useState(0), ch = _ch[0], setCh = _ch[1];
  var _mn = React.useState(false), menuOpen = _mn[0], setMenuOpen = _mn[1];

  var chapter = chapters[ch];
  var exercises = EX[chapter.id] || [];
  var totalEx = 0;
  for (var k in EX) totalEx += EX[k].length;

  function go(i) { setCh(i); setMenuOpen(false); window.scrollTo(0,0); }

  /* ── Hero ── */
  var hero = e("div", {
    style:{background:"linear-gradient(135deg,#0c0a20,#1e1b4b 40%,#4c1d95)",
      borderRadius:16,padding:"24px 20px",marginBottom:16,position:"relative",overflow:"hidden"}
  },
    e("div", {style:{position:"absolute",top:-30,right:-10,fontSize:140,opacity:0.05}}, icon),
    e("div", {style:{fontSize:11,fontWeight:700,color:"#a5b4fc",textTransform:"uppercase",
      letterSpacing:2,marginBottom:4}}, "Python開発者のための"),
    e("h1", {style:{margin:0,fontSize:22,fontWeight:900,color:"#fff"}}, title),
    e("p", {style:{margin:"6px 0 0",fontSize:12.5,color:"#c4b5fd"}},
      "全", chapters.length, "章 ・ 演習", totalEx, "問 ・ ", level),
    e("p", {style:{margin:"10px 0 0",fontSize:12,color:"#ddd6fe",lineHeight:1.8}}, description),
    e("div", {style:{marginTop:14,display:"flex",gap:3}},
      chapters.map(function(_,i) {
        return e("div", {key:i, onClick:function(){go(i);},
          style:{flex:1,height:5,borderRadius:3,cursor:"pointer",
            background: i<=ch ? "#818cf8" : "rgba(255,255,255,0.15)"}
        });
      })
    )
  );

  /* ── Chapter Menu ── */
  var menu = e("div", {style:{marginBottom:14}},
    e("button", {
      onClick:function(){setMenuOpen(!menuOpen);},
      style:{width:"100%",padding:"10px 16px",border:"1px solid #d1d5db",borderRadius:10,
        background:"#fff",fontSize:14,fontWeight:700,color:"#1e1b4b",cursor:"pointer",
        display:"flex",justifyContent:"space-between"}
    },
      e("span", null, "Ch.", chapter.num, ": ", chapter.title),
      e("span", {style:{fontSize:12,color:"#9ca3af"}}, menuOpen ? "▲" : "▼")
    ),
    menuOpen && e("div", {
      style:{marginTop:4,border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden",
        background:"#fff",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}
    }, chapters.map(function(c,i) {
      return e("button", {
        key:c.id, onClick:function(){go(i);},
        style:{width:"100%",padding:"10px 16px",border:"none",
          borderBottom: i<chapters.length-1 ? "1px solid #f3f4f6" : "none",
          background: i===ch ? "#eef2ff" : "#fff",
          fontSize:13,fontWeight: i===ch ? 700 : 500,
          color: i===ch ? "#4338ca" : "#374151",
          cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:10}
      },
        e("span", {style:{width:22,height:22,borderRadius:"50%",
          background: i===ch ? "#6366f1" : "#e5e7eb",
          color: i===ch ? "#fff" : "#6b7280",
          fontWeight:800,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}
        }, c.num),
        e("span", {style:{flex:1}}, c.title),
        EX[c.id] && e("span", {style:{fontSize:11,color:"#f59e0b",fontWeight:700}}, EX[c.id].length, "問")
      );
    }))
  );

  /* ── Chapter Header ── */
  var chHeader = e("div", {style:{display:"flex",alignItems:"center",gap:10,marginBottom:12}},
    e("span", {style:{width:36,height:36,borderRadius:"50%",
      background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",
      fontWeight:900,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}
    }, chapter.num),
    e("div", null,
      e("div", {style:{fontWeight:800,fontSize:18,color:"#1e1b4b"}}, chapter.title),
      e("div", {style:{fontSize:12,color:"#6b7280"}},
        "目安: ", chapter.est,
        exercises.length > 0 ? " ・ 演習" + exercises.length + "問" : "")
    )
  );

  /* ── Goal ── */
  var goal = chapter.goal && e("div", {
    style:{background:"linear-gradient(135deg,#eef2ff,#f5f3ff)",
      border:"1px solid #c7d2fe",borderLeft:"4px solid #6366f1",
      borderRadius:10,padding:"12px 16px",marginBottom:14}
  },
    e("div", {style:{fontSize:11,fontWeight:800,color:"#4338ca",letterSpacing:1,marginBottom:6}},
      "🎯 この章のゴール"),
    e("div", {style:{fontSize:13.5,color:"#1e1b4b",lineHeight:1.8,whiteSpace:"pre-line"}}, chapter.goal)
  );

  /* ── Sections ── */
  var sections = e("div", {style:{display:"flex",flexDirection:"column",gap:8}},
    chapter.sections.map(function(sec,i) {
      return e(Section, {key:chapter.id+"-"+i, section:sec, idx:i, defaultOpen:false});
    })
  );

  /* ── Exercises ── */
  var exArea = exercises.length > 0 && e("div", {style:{marginTop:20}},
    e("div", {style:{display:"flex",alignItems:"center",gap:8,marginBottom:12}},
      e("span", {style:{background:"#f59e0b",color:"#fff",fontWeight:800,fontSize:13,
        padding:"4px 14px",borderRadius:8}}, "🏋️ 演習問題"),
      e("span", {style:{fontSize:13,color:"#92400e"}}, "易しい順に", exercises.length, "問")
    ),
    exercises.map(function(ex,i) {
      return e(Exercise, {key:chapter.id+"-ex"+i, ex:ex, idx:i});
    })
  );

  /* ── Pagination ── */
  var prevBtn = ch > 0
    ? e("button", {onClick:function(){go(ch-1);},
        style:{flex:1,padding:"12px 16px",border:"1px solid #d1d5db",borderRadius:10,
          background:"#fff",cursor:"pointer",fontWeight:600,fontSize:13,color:"#6b7280"}
      }, "← Ch.", chapters[ch-1].num)
    : e("div", {style:{flex:1}});

  var nextBtn = ch < chapters.length - 1
    ? e("button", {onClick:function(){go(ch+1);},
        style:{flex:1,padding:"12px 16px",border:"none",borderRadius:10,
          background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
          cursor:"pointer",fontWeight:700,fontSize:13,color:"#fff"}
      }, "Ch.", chapters[ch+1].num, " →")
    : e("a", {href:"../index.html",
        style:{flex:1,padding:"12px 16px",borderRadius:10,
          background:"linear-gradient(135deg,#22c55e,#16a34a)",color:"#fff",
          fontWeight:700,fontSize:13,textAlign:"center",textDecoration:"none"}
      }, "🎉 コース完了！");

  var pagination = e("div", {
    style:{display:"flex",justifyContent:"space-between",marginTop:20,gap:10}
  }, prevBtn, nextBtn);

  /* ── Footer ── */
  var footer = e("p", {
    style:{textAlign:"center",fontSize:11,color:"#9ca3af",marginTop:20}
  }, footerText);

  /* ── Layout ── */
  return e("div", {style:{minHeight:"100vh",background:"#f8f7f4"}},
    e("div", {style:{maxWidth:1100,margin:"0 auto",padding:"20px 14px"}},
      hero, menu, chHeader, goal, sections, exArea, pagination, footer
    )
  );
}
