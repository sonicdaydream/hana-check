"use client";

import { useState, useRef, useCallback } from "react";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap');
`;

const urgencyConfig = [
  null,
  { label: "様子見でOK",   color: "#10B981", light: "#ECFDF5", border: "#A7F3D0" },
  { label: "軽度・注意",   color: "#84CC16", light: "#F7FEE7", border: "#BEF264" },
  { label: "やや気になる", color: "#F59E0B", light: "#FFFBEB", border: "#FDE68A" },
  { label: "受診を推奨",   color: "#F97316", light: "#FFF7ED", border: "#FED7AA" },
  { label: "早急に受診",   color: "#EF4444", light: "#FEF2F2", border: "#FECACA" },
] as const;

const colorTypes = [
  { id:"clear",  emoji:"💧", label:"透明・白っぽい", desc:"サラサラ・水っぽい",  bg:"#EFF6FF", border:"#BFDBFE" },
  { id:"yellow", emoji:"🌿", label:"黄色・黄緑",     desc:"ネバネバしている",    bg:"#FEFCE8", border:"#FEF08A" },
  { id:"green",  emoji:"🍵", label:"緑・茶色",       desc:"濃くドロっとしている", bg:"#F0FDF4", border:"#BBF7D0" },
  { id:"blood",  emoji:"🩸", label:"赤・血が混じる", desc:"出血している",        bg:"#FFF1F2", border:"#FECDD3" },
];

const guideMap: Record<string, {
  title: string;
  steps: { icon: string; text: string }[];
  note: string;
  noteColor: string;
  noteBg: string;
}> = {
  clear: {
    title: "透明な鼻水の撮り方",
    steps: [
      { icon:"👃", text:"鼻の下に垂れた状態で撮影する" },
      { icon:"🌤", text:"明るい窓際など自然光の下で" },
      { icon:"📵", text:"フラッシュはOFFにする" },
      { icon:"🔍", text:"できるだけ近づいて撮る" },
    ],
    note: "ティッシュだと透明な鼻水は見えにくいため、垂れた状態がベストです",
    noteColor: "#0891B2",
    noteBg: "#ECFEFF",
  },
  yellow: {
    title: "黄色・黄緑の鼻水の撮り方",
    steps: [
      { icon:"🤍", text:"白いティッシュに取って広げる" },
      { icon:"🌤", text:"明るい場所で撮影する" },
      { icon:"📵", text:"フラッシュはOFF（白飛び防止）" },
      { icon:"🔍", text:"ティッシュを平らにして近づく" },
    ],
    note: "白背景で色がはっきり確認できます",
    noteColor: "#B45309",
    noteBg: "#FFFBEB",
  },
  green: {
    title: "緑・茶色の鼻水の撮り方",
    steps: [
      { icon:"🤍", text:"白いティッシュに取って広げる" },
      { icon:"🌤", text:"明るい場所で撮影する" },
      { icon:"📵", text:"フラッシュはOFFにする" },
      { icon:"🔍", text:"粘度・量がわかるよう近づく" },
    ],
    note: "色が濃い場合はティッシュでもしっかり確認できます",
    noteColor: "#166534",
    noteBg: "#F0FDF4",
  },
  blood: {
    title: "血が混じる場合の撮り方",
    steps: [
      { icon:"🤍", text:"白いティッシュに取って広げる" },
      { icon:"🌤", text:"明るい場所で撮影する" },
      { icon:"📵", text:"フラッシュはOFFにする" },
      { icon:"⚠️", text:"量・頻度もメモしておく" },
    ],
    note: "血が大量・継続する場合は撮影より受診を優先してください",
    noteColor: "#B91C1C",
    noteBg: "#FFF1F2",
  },
};

const STEPS = ["color","guide","upload","result"];

type AnalysisResult = {
  urgency: number;
  color_analysis: string;
  possible_conditions: string[];
  home_care: string;
  advice: string;
  confidence: "low" | "medium" | "high";
};

export default function HanaCheck() {
  const [step, setStep]               = useState("color");
  const [colorType, setColorType]     = useState<string | null>(null);
  const [image, setImage]             = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime]     = useState("image/jpeg");
  const [result, setResult]           = useState<AnalysisResult | null>(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [dragging, setDragging]       = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File | null | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageMime(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImage(dataUrl);
      setImageBase64(dataUrl.split(",")[1]);
      setResult(null); setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAnalyze = async () => {
    if (!imageBase64 || !colorType) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const colorLabel = colorTypes.find(c => c.id === colorType)?.label ?? colorType;
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, imageMime, colorType: colorLabel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "エラーが発生しました");
      setResult(data);
      setStep("result");
    } catch {
      setError("分析に失敗しました。別の画像でお試しください。");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("color"); setColorType(null); setImage(null);
    setImageBase64(null); setResult(null); setError(null);
  };

  const stepIndex = STEPS.indexOf(step);
  const urg = result ? urgencyConfig[Math.min(5, Math.max(1, result.urgency)) as 1|2|3|4|5] : null;
  const guide = colorType ? guideMap[colorType] : null;

  return (
    <div style={css.root}>
      <style>{FONTS + globalCss}</style>

      <div style={css.page}>
        {/* ヘッダー */}
        <header style={css.header}>
          <div style={css.logoWrap}>
            <span style={css.logoEmoji}>👃</span>
          </div>
          <h1 style={css.title}>ハナ・チェック</h1>
          <p style={css.subtitle}>鼻水の写真から、気になる状態をAIがお伝えします</p>
          <div style={css.chip}>⚠️ 医療診断ではありません。参考情報の提供のみを目的としています</div>
        </header>

        {/* ステップバー */}
        <div style={css.stepBar}>
          {STEPS.map((st, i) => (
            <div key={st} style={css.stepBarItem}>
              <div style={{
                ...css.stepCircle,
                background: i <= stepIndex ? "#0891B2" : "#E5E7EB",
                color: i <= stepIndex ? "#fff" : "#9CA3AF",
                boxShadow: i === stepIndex ? "0 0 0 3px #CFFAFE" : "none",
              }}>{i < stepIndex ? "✓" : i+1}</div>
              {i < 3 && <div style={{...css.stepLine, background: i < stepIndex ? "#0891B2" : "#E5E7EB"}} />}
            </div>
          ))}
        </div>

        <div style={css.card}>

          {/* STEP 1: 色を選ぶ */}
          {step === "color" && (
            <div className="fade-in">
              <SectionLabel>STEP 1</SectionLabel>
              <h2 style={css.cardTitle}>鼻水の色に近いものを選んでください</h2>
              <div style={css.colorGrid}>
                {colorTypes.map(ct => (
                  <button key={ct.id}
                    style={{...css.colorCard, background:ct.bg, borderColor:ct.border}}
                    onClick={() => { setColorType(ct.id); setStep("guide"); }}
                    className="color-btn">
                    <span style={css.colorEmoji}>{ct.emoji}</span>
                    <span style={css.colorLabel}>{ct.label}</span>
                    <span style={css.colorDesc}>{ct.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: 撮影ガイド */}
          {step === "guide" && guide && (
            <div className="fade-in">
              <SectionLabel>STEP 2</SectionLabel>
              <h2 style={css.cardTitle}>{guide.title}</h2>
              <div style={css.guideList}>
                {guide.steps.map((gs, i) => (
                  <div key={i} style={css.guideRow}>
                    <span style={css.guideIcon}>{gs.icon}</span>
                    <span style={css.guideText}>{gs.text}</span>
                  </div>
                ))}
              </div>
              <div style={{...css.guideNote, background:guide.noteBg, borderLeftColor:guide.noteColor, color:guide.noteColor}}>
                💡 {guide.note}
              </div>
              <PrimaryBtn onClick={() => setStep("upload")}>撮影ガイドを確認した →</PrimaryBtn>
              <GhostBtn onClick={() => setStep("color")}>← 色を選び直す</GhostBtn>
            </div>
          )}

          {/* STEP 3: アップロード */}
          {step === "upload" && (
            <div className="fade-in">
              <SectionLabel>STEP 3</SectionLabel>
              <h2 style={css.cardTitle}>写真をアップロード</h2>
              <div
                style={{...css.dropzone, ...(dragging ? css.dropzoneActive : {})}}
                onClick={() => fileRef.current?.click()}
                onDragOver={e=>{e.preventDefault();setDragging(true)}}
                onDragLeave={()=>setDragging(false)}
                onDrop={e=>{e.preventDefault();setDragging(false);processFile(e.dataTransfer.files[0])}}
              >
                <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
                  onChange={e=>processFile(e.target.files?.[0])} />
                {image ? (
                  <div style={css.previewWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="preview" style={css.preview} />
                    <span style={css.previewHint}>タップで画像を変更</span>
                  </div>
                ) : (
                  <div style={css.uploadHint}>
                    <span style={{fontSize:36}}>📷</span>
                    <span style={css.uploadText}>写真をアップロード</span>
                    <span style={css.uploadSub}>タップまたはドラッグ＆ドロップ</span>
                  </div>
                )}
              </div>
              {error && <div style={css.errorBox}>{error}</div>}
              {image && (
                <PrimaryBtn onClick={handleAnalyze} disabled={loading}>
                  {loading ? "分析中…" : "🔍 AIで状態をチェックする"}
                </PrimaryBtn>
              )}
              <GhostBtn onClick={() => setStep("guide")}>← 撮影ガイドに戻る</GhostBtn>
            </div>
          )}

          {/* STEP 4: 結果 */}
          {step === "result" && result && urg && (
            <div className="fade-in">
              <SectionLabel>STEP 4</SectionLabel>
              <h2 style={css.cardTitle}>チェック結果</h2>

              <div style={{...css.urgencyHero, background:urg.light, borderColor:urg.border}}>
                <div style={css.urgencyMeta}>
                  <span style={css.urgencyMetaLabel}>緊急度</span>
                  <div style={css.urgencyDots}>
                    {[1,2,3,4,5].map(n=>(
                      <div key={n} style={{...css.urgDot, background: n<=result.urgency?urg.color:"#E5E7EB"}} />
                    ))}
                  </div>
                </div>
                <div style={{...css.urgencyLabel, color:urg.color}}>{urg.label}</div>
              </div>

              <Divider />

              <InfoRow label="確認できた状態" value={result.color_analysis} />

              <div style={{marginBottom:16}}>
                <div style={css.rowLabel}>一般的に関連しやすい状態</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>
                  {result.possible_conditions?.map((c,i)=>(
                    <span key={i} style={css.tag}>{c}</span>
                  ))}
                </div>
              </div>

              <InfoRow label="🏠 自宅でのケア目安" value={result.home_care} />

              <div style={css.adviceBox}>
                <span style={{fontSize:20,flexShrink:0}}>💬</span>
                <p style={css.adviceText}>{result.advice}</p>
              </div>

              <div style={css.confidenceRow}>
                AI参考度：{result.confidence==="high"?"高め":result.confidence==="medium"?"中程度":"低め（画像不鮮明の可能性）"}
              </div>

              <div style={css.legalNote}>
                ※ これは参考情報であり、医療診断ではありません。気になる症状は必ず耳鼻咽喉科を受診してください。
              </div>

              <PrimaryBtn onClick={reset}>🔄 もう一度チェックする</PrimaryBtn>
            </div>
          )}

        </div>

        <div style={css.blogLink}>
          <a href="/blog" style={css.blogAnchor}>
            鼻水の症状を調べる → 記事一覧
          </a>
        </div>

        <footer style={css.footer}>
          このプロトタイプは耳鼻科医との連携を目指して開発中です
        </footer>
      </div>
    </div>
  );
}

/* ── 小コンポーネント ── */
function SectionLabel({children}: {children: React.ReactNode}) {
  return <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.1em",color:"#0891B2",textTransform:"uppercase",marginBottom:6}}>{children}</div>;
}
function PrimaryBtn({children,onClick,disabled}: {children: React.ReactNode; onClick: () => void; disabled?: boolean}) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{width:"100%",padding:"13px 0",borderRadius:10,border:"none",
        background: disabled?"#A5F3FC":"linear-gradient(135deg,#0891B2,#0EA5E9)",
        color:"#fff",fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",
        marginBottom:10,letterSpacing:"0.02em",transition:"opacity 0.2s",opacity:disabled?0.7:1}}
      className="primary-btn">
      {children}
    </button>
  );
}
function GhostBtn({children,onClick}: {children: React.ReactNode; onClick: () => void}) {
  return (
    <button onClick={onClick}
      style={{width:"100%",padding:"11px 0",borderRadius:10,border:"1px solid #E5E7EB",
        background:"transparent",color:"#6B7280",fontSize:13,cursor:"pointer"}}
      className="ghost-btn">
      {children}
    </button>
  );
}
function Divider() {
  return <div style={{height:1,background:"#F3F4F6",margin:"16px 0"}} />;
}
function InfoRow({label,value}: {label: string; value: string}) {
  return (
    <div style={{marginBottom:16}}>
      <div style={css.rowLabel}>{label}</div>
      <div style={css.rowValue}>{value}</div>
    </div>
  );
}

/* ── スタイル定義 ── */
const css: Record<string, React.CSSProperties> = {
  root: {
    minHeight:"100vh",
    background:"#F7F8FA",
    fontFamily:'"DM Sans","Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif',
    color:"#111827",
    wordBreak:"normal",
    overflowWrap:"anywhere",
  },
  page: { maxWidth:480, margin:"0 auto", padding:"20px 16px 48px" },
  header: { textAlign:"center", marginBottom:20 },
  logoWrap: {
    width:64, height:64, borderRadius:"50%", background:"#ECFEFF",
    border:"2px solid #A5F3FC", display:"flex", alignItems:"center",
    justifyContent:"center", margin:"0 auto 12px",
  },
  logoEmoji: { fontSize:30 },
  title: {
    fontSize:26, fontWeight:800, margin:"0 0 6px",
    color:"#0E7490", letterSpacing:"-0.01em",
  },
  subtitle: { fontSize:14, color:"#6B7280", lineHeight:1.7, margin:"0 0 10px" },
  chip: {
    display:"inline-block", fontSize:11, color:"#92400E",
    background:"#FFFBEB", border:"1px solid #FDE68A",
    borderRadius:6, padding:"5px 10px", lineHeight:1.5,
  },
  stepBar: {
    display:"flex", alignItems:"center", justifyContent:"center",
    marginBottom:20,
  },
  stepBarItem: { display:"flex", alignItems:"center" },
  stepCircle: {
    width:28, height:28, borderRadius:"50%",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:12, fontWeight:700, transition:"all 0.3s",
  },
  stepLine: { width:36, height:2, transition:"background 0.3s" },
  card: {
    background:"#FFFFFF", borderRadius:16,
    boxShadow:"0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
    padding:24, marginBottom:16,
  },
  cardTitle: { fontSize:17, fontWeight:700, color:"#111827", margin:"0 0 16px", lineHeight:1.4 },
  colorGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 },
  colorCard: {
    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
    padding:"16px 10px", borderRadius:12, border:"1.5px solid",
    cursor:"pointer", textAlign:"center", transition:"all 0.15s",
    background:"transparent",
  },
  colorEmoji: { fontSize:26 },
  colorLabel: { fontSize:13, fontWeight:700, color:"#1F2937" },
  colorDesc: { fontSize:11, color:"#6B7280" },
  guideList: { display:"flex", flexDirection:"column", gap:12, marginBottom:16 },
  guideRow: { display:"flex", alignItems:"center", gap:12 },
  guideIcon: { fontSize:20, width:28, textAlign:"center", flexShrink:0 },
  guideText: { fontSize:14, color:"#374151", lineHeight:1.6 },
  guideNote: {
    fontSize:13, borderLeft:"3px solid", borderRadius:"0 8px 8px 0",
    padding:"10px 14px", marginBottom:20, lineHeight:1.6,
  },
  dropzone: {
    border:"2px dashed #D1D5DB", borderRadius:12, padding:24,
    textAlign:"center", cursor:"pointer", background:"#FAFAFA",
    transition:"all 0.2s", marginBottom:14,
    minHeight:148, display:"flex", alignItems:"center", justifyContent:"center",
  },
  dropzoneActive: { border:"2px dashed #0891B2", background:"#ECFEFF" },
  uploadHint: { display:"flex", flexDirection:"column", alignItems:"center", gap:6 },
  uploadText: { fontSize:15, color:"#374151", fontWeight:600 },
  uploadSub: { fontSize:12, color:"#9CA3AF" },
  previewWrap: { display:"flex", flexDirection:"column", alignItems:"center", gap:6, width:"100%" },
  preview: { maxWidth:"100%", maxHeight:200, borderRadius:10, objectFit:"contain" },
  previewHint: { fontSize:11, color:"#9CA3AF" },
  errorBox: {
    color:"#B91C1C", background:"#FEF2F2", border:"1px solid #FECACA",
    borderRadius:8, padding:"10px 14px", fontSize:13, marginBottom:12,
  },
  urgencyHero: {
    border:"1.5px solid", borderRadius:12, padding:"16px 18px", marginBottom:16,
  },
  urgencyMeta: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 },
  urgencyMetaLabel: { fontSize:11, color:"#6B7280", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" },
  urgencyDots: { display:"flex", gap:5 },
  urgDot: { width:10, height:10, borderRadius:"50%", transition:"background 0.3s" },
  urgencyLabel: { fontSize:22, fontWeight:800, letterSpacing:"-0.01em" },
  rowLabel: { fontSize:11, fontWeight:600, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 },
  rowValue: { fontSize:14, color:"#1F2937", lineHeight:1.7 },
  tag: {
    fontSize:12, fontWeight:500, color:"#0E7490",
    background:"#ECFEFF", border:"1px solid #A5F3FC",
    borderRadius:6, padding:"4px 10px",
  },
  adviceBox: {
    display:"flex", gap:10, background:"#F8FAFC",
    border:"1px solid #E2E8F0", borderRadius:10,
    padding:"12px 14px", marginBottom:12, alignItems:"flex-start",
  },
  adviceText: { fontSize:13, color:"#4B5563", lineHeight:1.7, margin:0 },
  confidenceRow: { fontSize:11, color:"#9CA3AF", textAlign:"right", marginBottom:12 },
  legalNote: {
    fontSize:11, color:"#9CA3AF", borderTop:"1px solid #F3F4F6",
    paddingTop:12, marginBottom:20, lineHeight:1.6,
  },
  blogLink: { textAlign:"center", marginBottom:12 },
  blogAnchor: { fontSize:13, color:"#0891B2", textDecoration:"none", fontWeight:500 },
  footer: { textAlign:"center", fontSize:12, color:"#9CA3AF", lineHeight:1.8 },
};

const globalCss = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .pulse { animation: pulse 2s infinite; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeUp 0.3s ease; }
  .color-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .primary-btn:hover:not(:disabled) { opacity: 0.88; }
  .ghost-btn:hover { background: #F9FAFB; }
  @media (prefers-reduced-motion: reduce) { .fade-in, .color-btn { animation: none; transition: none; } }
`;
