"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ════════════════════════════════════════════════
   SVG Icon helpers (inline to keep it single-file)
   ════════════════════════════════════════════════ */
const Icons = {
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  title: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  frame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" />
      <path d="M9 15a3 3 0 1 0 0-1" /><line x1="15" y1="13" x2="20" y2="13" /><line x1="15" y1="17" x2="20" y2="17" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L13.09 8.26L18 5L14.74 10.91L21 12L14.74 13.09L18 19L13.09 15.74L12 22L10.91 15.74L6 19L9.26 13.09L3 12L9.26 10.91L6 5L10.91 8.26L12 2Z" /></svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
  ),
  palm: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22V10M7 3c1.5 1.5 2 4 2 7M17 3c-1.5 1.5-2 4-2 7M3 7c2 0 5 .5 7 3M21 7c-2 0-5 .5-7 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
  ),
  qr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /><rect x="14" y="18" width="3" height="3" /><rect x="18" y="14" width="3" height="3" /></svg>
  ),
};

/* ════════════════════════════════════════════════
   Builder titles pool
   ════════════════════════════════════════════════ */
const BUILDER_TITLES = [
  "Code. Ship. Repeat.",
  "Signal Booster",
  "Ship Captain",
  "Prompt Wrangler",
  "Stack Slinger",
  "Night Builder",
  "Chaos Debugger",
  "Full Send Dev",
  "Pixel Alchemist",
  "Deploy Ninja",
];

/* ════════════════════════════════════════════════
   Main Page Component
   ════════════════════════════════════════════════ */
export default function Home() {
  // State
  const [mode, setMode] = useState("frame"); // 'frame' | 'card'
  const [img, setImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [name, setName] = useState("");
  const [stack, setStack] = useState("");
  const [builderTitle, setBuilderTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [frameOverlayImg, setFrameOverlayImg] = useState(null);
  const [frameThickness, setFrameThickness] = useState(145);
  const [customShareText, setCustomShareText] = useState(null);
  const [frameBgColor, setFrameBgColor] = useState("transparent");
  const [shareableUrl, setShareableUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isXSharing, setIsXSharing] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Preload frame overlay
  useEffect(() => {
    const frameImg = new Image();
    frameImg.src = "/frame-overlay.png";
    frameImg.onload = () => {
      setFrameOverlayImg(frameImg);
    };
  }, []);

  // ─── File handling ───
  const handleFile = useCallback((file) => {
    if (!file) return;
    setFileName(file.name);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    setFileSize(`${sizeMB} MB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        imgRef.current = image;
        setImg(true);
        setImgSrc(e.target.result);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, []);

  const removeFile = useCallback(() => {
    imgRef.current = null;
    setImg(null);
    setImgSrc(null);
    setFileName("");
    setFileSize("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ─── Canvas rendering ───
  const drawCoverImage = useCallback((ctx, image, x, y, w, h) => {
    if (!image) {
      ctx.fillStyle = "#134A38";
      ctx.fillRect(x, y, w, h);
      return;
    }
    const ir = image.width / image.height;
    const tr = w / h;
    let sx, sy, sw, sh;
    if (ir > tr) {
      sh = image.height;
      sw = sh * tr;
      sx = (image.width - sw) / 2;
      sy = 0;
    } else {
      sw = image.width;
      sh = sw / tr;
      sx = 0;
      sy = (image.height - sh) / 2;
    }
    ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
  }, []);

  const roundRect = useCallback((ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }, []);

  const drawPalm = useCallback((ctx, cx, cy, size, color, flip = false) => {
    ctx.save();
    ctx.translate(cx, cy);
    const scale = size / 512;
    if (flip) {
      ctx.scale(-scale, scale);
    } else {
      ctx.scale(scale, scale);
    }
    ctx.translate(-256, -256);
    const path = new Path2D("M179.125 20.625c-28.052.12-54.046 5.813-66.72 9.78 0 0 114.968 19.51 124.532 98.876C149.573 3.32 54.28 155.657 54.28 155.657c19.868-5.212 76.76-20.682 114.75-14.156 25.992 4.465 51.33 28.03 50.236 27.733-61.943 15.24-160.35 290.92-143.64 313.308 14.9 17.12 29.816 11.28 44.718 2.595 7.376-58.425 64.938-314.765 135.375-294.072.01.003.02-.003.03 0 5.93 2.03 11.54 5.59 11.844 11.03.58 10.363-6.11 27.3-4.53 39.063 3.662 27.296 9.007 36.79 16.78 46.313 18.564-10.435 36.326-48.057 40-67.564 16.634 7.284 43.373 24.155 65.187 86.813 11.404-58.716-5.042-105.03-59.03-125.595 23.38-10.105 125.142 41.03 137.563 69.53C475.648 199.264 390.167 136.378 319 139.72c13.644-3.56 28.638.6 42.906-9.907 19.146-14.098 41.474-26.24 62.28-39.282-69.972-30.435-134.545-15.407-139.092 16.095-3.573-69.916-57.83-86.204-105.97-86z");
    ctx.fillStyle = color;
    ctx.fill(path);
    ctx.restore();
  }, []);

  const drawUserIcon = useCallback((ctx, x, y, size) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(12, 7, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(4, 21);
    ctx.lineTo(4, 19);
    ctx.arcTo(4, 15, 8, 15, 4);
    ctx.lineTo(16, 15);
    ctx.arcTo(20, 15, 20, 19, 4);
    ctx.lineTo(20, 21);
    ctx.stroke();
    ctx.restore();
  }, []);

  const drawBriefcaseIcon = useCallback((ctx, x, y, size) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.roundRect(3, 8, 18, 12, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(16, 8);
    ctx.lineTo(16, 5);
    ctx.arcTo(16, 3, 14, 3, 2);
    ctx.lineTo(10, 3);
    ctx.arcTo(8, 3, 8, 5, 2);
    ctx.lineTo(8, 8);
    ctx.stroke();
    ctx.restore();
  }, []);

  const drawTagIcon = useCallback((ctx, x, y, size) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(2, 12);
    ctx.lineTo(2, 3);
    ctx.lineTo(11, 3);
    ctx.lineTo(21, 13);
    ctx.lineTo(12, 22);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6.5, 7.5, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }, []);

  const renderFrame = useCallback(
    (ctx) => {
      const S = 1080;
      ctx.clearRect(0, 0, S, S);

      if (frameBgColor !== "transparent") {
        ctx.fillStyle = frameBgColor;
        ctx.fillRect(0, 0, S, S);
      }

      // Layout constants
      const cx     = S / 2;          // 540 — horizontal center
      const cy     = S / 2 - 15;     // 525 — slightly up to give room for text below
      const innerR = 290;            // inner edge (transparent photo area)
      const outerR = innerR + Number(frameThickness); // outer edge of green ring
      const midR   = (outerR + innerR) / 2;  // ≈ 362 — midpoint of ring

      // ── User photo clipped to center circle ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, innerR - 3, 0, Math.PI * 2);
      ctx.clip();
      if (imgRef.current) {
        drawCoverImage(ctx, imgRef.current, cx - innerR, cy - innerR, innerR * 2, innerR * 2);
      } else {
        ctx.fillStyle = "#093B22";
        ctx.fillRect(cx - innerR, cy - innerR, innerR * 2, innerR * 2);
        ctx.font = `400 48px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = "rgba(245,216,10,0.35)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Upload Photo", cx, cy);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }
      ctx.restore();

      // ── Green donut ring (evenodd fill creates the hole) ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2, false);  // outer — clockwise
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);   // inner — counter-clockwise → hole
      ctx.fillStyle = "#0C5C38";
      ctx.fill();
      ctx.restore();

      // ── Outer solid yellow border ──
      ctx.strokeStyle = "#F5D80A";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR + 5, 0, Math.PI * 2);
      ctx.stroke();

      // ── Inner solid yellow border ──
      ctx.strokeStyle = "#F5D80A";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, innerR - 5, 0, Math.PI * 2);
      ctx.stroke();

      // ── Dashed stitching lines (two — near outer & near inner edges) ──
      ctx.save();
      ctx.setLineDash([22, 15]);
      ctx.strokeStyle = "rgba(245, 216, 10, 0.50)";
      ctx.lineWidth = 3;
      // Near outer edge
      ctx.beginPath();
      ctx.arc(cx, cy, outerR - 22, 0, Math.PI * 2);
      ctx.stroke();
      // Near inner edge
      ctx.beginPath();
      ctx.arc(cx, cy, innerR + 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ── "HACKER HOUSE" curved text — top arc ──
      ctx.save();
      ctx.font = `700 42px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "#F5D80A";
      ctx.textBaseline = "middle";
      const topText  = "HACKER  HOUSE  GOA";
      const arcR     = midR + 4;       // slightly toward outer half
      const arcStart = -Math.PI * 0.90;  // starts at ~9 o'clock on top
      const arcEnd   = -Math.PI * 0.10;  // ends at ~3 o'clock on top
      const arcSpan  = arcEnd - arcStart;
      topText.split("").forEach((ch, i) => {
        const t     = (i + 0.5) / topText.length;
        const angle = arcStart + t * arcSpan;
        const apx   = cx + arcR * Math.cos(angle);
        const apy   = cy + arcR * Math.sin(angle);
        ctx.save();
        ctx.translate(apx, apy);
        ctx.rotate(angle + Math.PI / 2);  // rotate letter to follow arc
        ctx.fillText(ch, -ctx.measureText(ch).width / 2, 0);
        ctx.restore();
      });
      ctx.restore();

      // ── Palm leaf decorations ──
      // Placed symmetrically on the lower-left and lower-right sides
      const palmAngles = [
        Math.PI * 0.10, // right side, upper
        Math.PI * 0.25, // right side, middle
        Math.PI * 0.40, // right side, lower
        Math.PI * 0.60, // left side, lower
        Math.PI * 0.75, // left side, middle
        Math.PI * 0.90  // left side, upper
      ];
      
      palmAngles.forEach(angle => {
        const palmX = cx + midR * Math.cos(angle);
        const palmY = cy + midR * Math.sin(angle);
        const isRightSide = angle < Math.PI * 0.5; // less than 90 degrees (6 o'clock) means right side
        drawPalm(ctx, palmX, palmY + 10, 42, "#F5D80A", isRightSide);
      });

      // ── "2026" pill badge — bottom of ring (6 o'clock) ──
      const badgeW  = 160, badgeH = 64;
      const badgeCX = cx;
      const badgeCY = cy + midR + 10;  // center of badge sits at the bottom-middle of ring

      ctx.fillStyle = "#F01899";
      ctx.beginPath();
      ctx.roundRect(badgeCX - badgeW / 2, badgeCY - badgeH / 2, badgeW, badgeH, 34);
      ctx.fill();

      ctx.strokeStyle = "#F5D80A";
      ctx.lineWidth = 3.5;
      ctx.stroke();

      ctx.font = `italic 700 40px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "#F5D80A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("2026", badgeCX, badgeCY);

      // ── "#FrameInGoa" hashtag — below the outer circle ──
      ctx.font = `700 30px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "#F5D80A";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("#FrameInGoa", cx, cy + outerR + 28);

      // Reset
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    },
    [drawCoverImage, drawPalm, frameThickness, frameBgColor]
  );

  const renderCard = useCallback(
    (ctx) => {
      const W = 1200, H = 800;
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = "alphabetic";

      // BACKGROUND
      ctx.fillStyle = "#0C5C38";
      ctx.fillRect(0, 0, W, H);

      // Tribal Geometric watermark at bottom
      ctx.save();
      const pCanvas = document.createElement("canvas");
      const pSize = 140;
      pCanvas.width = pSize;
      pCanvas.height = pSize;
      const pCtx = pCanvas.getContext("2d");
      
      pCtx.fillStyle = "#000";
      pCtx.strokeStyle = "#000";
      pCtx.lineWidth = 8;
      pCtx.lineJoin = "miter";
      
      const drawDiamond = (cx, cy, r, fill) => {
        pCtx.beginPath();
        pCtx.moveTo(cx, cy - r);
        pCtx.lineTo(cx + r, cy);
        pCtx.lineTo(cx, cy + r);
        pCtx.lineTo(cx - r, cy);
        pCtx.closePath();
        if (fill) pCtx.fill();
        else pCtx.stroke();
      };

      const drawMotif = (cx, cy) => {
        drawDiamond(cx, cy, 16, true);
        drawDiamond(cx, cy, 40, false);
        drawDiamond(cx, cy, 64, false);
      };

      drawMotif(pSize/2, pSize/2);
      drawMotif(0, 0);
      drawMotif(pSize, 0);
      drawMotif(0, pSize);
      drawMotif(pSize, pSize);
      
      const pattern = ctx.createPattern(pCanvas, "repeat");
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, H - 240, W, 240);
      ctx.restore();

      // Vignette
      const vGrad = ctx.createLinearGradient(0, H * 0.72, 0, H);
      vGrad.addColorStop(0, "transparent");
      vGrad.addColorStop(1, "rgba(0,0,0,0.28)");
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, H * 0.72, W, H * 0.28);

      // TOP NOTCH
      ctx.fillStyle = "#051A0A";
      ctx.beginPath();
      ctx.ellipse(W / 2, 18, 44, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(245,216,10,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // TOP-LEFT: HACKER GOA HOUSE
      const tlx = 50, tly = 44;
      ctx.save();
      ctx.textBaseline = "top";
      // Scale to make the serif font look tall and condensed
      ctx.scale(0.65, 1.4);
      const stlx = tlx / 0.65;
      const stly = tly / 1.4;
      
      ctx.font = "400 76px 'Times New Roman', serif";
      ctx.fillStyle = "#F5D80A";
      ctx.fillText("HACKER", stlx, stly);
      const hackerW = ctx.measureText("HACKER").width;
      
      const gap = 30; // small gap between words
      ctx.fillText("HOUSE", stlx + hackerW + gap, stly);
      ctx.restore();
      
      // "गोवा" overlapping
      ctx.save();
      const goaX = tlx + (hackerW + gap / 2) * 0.65;
      const goaY = tly + (76 * 1.4) / 2 + 5;
      
      ctx.translate(goaX, goaY);
      ctx.rotate(-0.08); // slight upward tilt
      
      ctx.font = "800 44px 'Noto Sans Devanagari', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#F5D80A"; // Yellow outline
      ctx.strokeText("गोवा", 0, 0);
      
      ctx.fillStyle = "#F01899"; // Pink fill
      ctx.fillText("गोवा", 0, 0);
      ctx.restore();

      // TOP-RIGHT SCENERY (Skyline, Birds, Palms, Typography)
      ctx.save();
      const sceneryScale = 0.55;
      // The original SVG has viewBox="0 0 800 250"
      const sceneryW = 800 * sceneryScale;
      // Position it at the top right, with some margin
      ctx.translate(W - sceneryW - 50, 20);
      ctx.scale(sceneryScale, sceneryScale);

      // 1. Background Skyline Architecture (Low opacity)
      ctx.strokeStyle = "#1b4d3e";
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.6;

      const p1 = new Path2D("M 0 220 L 50 220 L 55 210 L 75 210 L 80 220 L 120 220");
      const p2 = new Path2D("M 120 220 C 120 180 160 180 160 220");
      const p3 = new Path2D("M 140 180 L 140 170 M 135 170 L 145 170");
      const p4 = new Path2D("M 180 220 L 220 220 L 220 160 L 180 160 Z");
      const p5 = new Path2D("M 185 160 C 185 130 215 130 215 160 Z");
      const p6 = new Path2D("M 200 130 L 200 115");
      const p7 = new Path2D("M 240 220 L 260 220 L 260 150 L 280 150 L 280 220");
      const p8 = new Path2D("M 260 150 L 270 110 L 280 150");
      const p9 = new Path2D("M 380 220 L 400 220 L 401 130 L 379 130 Z");
      const p10 = new Path2D("M 379 130 L 384 80 L 396 80 L 401 130");
      const p11 = new Path2D("M 384 80 L 390 10 L 396 80");
      const p12 = new Path2D("M 387 140 L 393 140 M 387 160 L 393 160 M 387 180 L 393 180");
      const p13 = new Path2D("M 388 95 L 392 95 M 389 110 L 391 110");
      const p14 = new Path2D("M 440 220 L 510 220 L 510 150 L 440 150 Z");
      const p15 = new Path2D("M 450 150 L 450 120 L 500 120 L 500 150");
      const p16 = new Path2D("M 460 120 C 460 100 490 100 490 120");
      const p17 = new Path2D("M 620 220 L 740 220 L 730 130 L 630 130 Z");
      const p18 = new Path2D("M 645 130 L 645 70 L 715 70 L 715 130");
      const p19 = new Path2D("M 655 70 C 655 20 705 20 705 70");
      const p20 = new Path2D("M 680 20 L 680 5 M 675 5 L 685 5");
      const p21 = new Path2D("M 655 130 L 655 220 M 670 130 L 670 220 M 690 130 L 690 220 M 705 130 L 705 220 M 720 130 L 720 220");
      
      [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21].forEach(p => ctx.stroke(p));

      // 2. Ground Line
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#2d6a4f";
      ctx.lineWidth = 4;
      ctx.stroke(new Path2D("M 0 220 Q 200 218 400 220 T 800 220"));

      // 3. Palm Trees
      const palm1Stroke = new Path2D("M 0 0 Q -5 -40 -2 -80");
      const palm1Fills = [
        "M -2 -80 Q -25 -85 -35 -70 Q -20 -95 -2 -80",
        "M -2 -80 Q -20 -105 -5 -110 Q -10 -95 -2 -80",
        "M -2 -80 Q 0 -115 15 -105 Q 5 -95 -2 -80",
        "M -2 -80 Q 25 -100 30 -80 Q 15 -85 -2 -80",
        "M -2 -80 Q 20 -70 25 -55 Q 10 -70 -2 -80",
        "M -2 -80 Q -15 -65 -25 -50 Q -10 -65 -2 -80"
      ].map(d => new Path2D(d));
      
      const palm2Stroke = new Path2D("M 0 0 Q 3 -30 5 -60");
      const palm2Fills = [
        "M 5 -60 Q -15 -65 -22 -52 Q -10 -72 5 -60",
        "M 5 -60 Q -10 -80 2 -82 Q -3 -70 5 -60",
        "M 5 -60 Q 12 -82 22 -72 Q 12 -70 5 -60",
        "M 5 -60 Q 25 -68 25 -52 Q 15 -60 5 -60"
      ].map(d => new Path2D(d));

      const drawSmallPalm = (type, x, y) => {
        ctx.save();
        ctx.translate(x, y);
        if (type === 1) {
          ctx.strokeStyle = "#2d6a4f"; ctx.lineWidth = 3; ctx.stroke(palm1Stroke);
          ctx.fillStyle = "#2d6a4f"; palm1Fills.forEach(p => ctx.fill(p));
        } else {
          ctx.strokeStyle = "#2d6a4f"; ctx.lineWidth = 2; ctx.stroke(palm2Stroke);
          ctx.fillStyle = "#2d6a4f"; palm2Fills.forEach(p => ctx.fill(p));
        }
        ctx.restore();
      };
      
      drawSmallPalm(2, 90, 220);
      drawSmallPalm(1, 160, 225);
      drawSmallPalm(1, 330, 220);
      drawSmallPalm(2, 430, 225);
      drawSmallPalm(1, 580, 220);
      drawSmallPalm(2, 770, 225);

      // 4. Birds
      const birdPath = new Path2D("M 0 0 Q 6 -6 12 0 Q 18 -6 24 0 Q 15 -3 12 -1 Q 9 -3 0 0");
      const drawBird = (x, y, s, a) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);
        ctx.rotate(a * Math.PI / 180);
        ctx.fillStyle = "#2d6a4f";
        ctx.fill(birdPath);
        ctx.restore();
      };
      drawBird(250, 30, 0.6, 0);
      drawBird(420, 50, 0.5, -10);
      drawBird(570, 40, 0.7, 5);
      drawBird(720, 25, 0.5, 0);

      // 5. Central Typography
      ctx.font = `700 32px 'Space Grotesk', sans-serif`; // scaled up slightly to match SVG's larger text presence
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      if ("letterSpacing" in ctx) {
        ctx.letterSpacing = "4px";
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillText("BUILD", 240, 160);
      
      ctx.fillStyle = "#d9383a";
      ctx.beginPath(); ctx.arc(315, 151, 6, 0, Math.PI * 2); ctx.fill();
      
      ctx.fillStyle = "#ffffff";
      ctx.fillText("COLLABORATE", 460, 160);
      
      ctx.fillStyle = "#d9383a";
      ctx.beginPath(); ctx.arc(605, 151, 6, 0, Math.PI * 2); ctx.fill();
      
      ctx.fillStyle = "#ffffff";
      ctx.fillText("IMPACT", 690, 160);
      
      if ("letterSpacing" in ctx) {
        ctx.letterSpacing = "0px";
      }
      ctx.restore();

      // Thin horizontal rule
      ctx.strokeStyle = "rgba(245,216,10,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, 155);
      ctx.lineTo(W - 50, 155);
      ctx.stroke();

      // CIRCULAR PHOTO
      const cx = 248, cy = 418, cr = 190;

      // Outer dashed ring
      ctx.save();
      ctx.setLineDash([10, 7]);
      ctx.strokeStyle = "#F5D80A";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, cr + 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Tricolor strip background
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, cr + 7, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#F5D80A";
      ctx.fillRect(cx - cr - 8, cy - cr - 8, (cr + 8) * 0.68, (cr + 8) * 2 + 16);
      ctx.fillStyle = "#F01899";
      ctx.fillRect(cx - cr - 8 + (cr + 8) * 0.68, cy - cr - 8, (cr + 8) * 0.62, (cr + 8) * 2 + 16);
      ctx.fillStyle = "#061A0D";
      ctx.fillRect(cx - cr - 8 + (cr + 8) * 1.3, cy - cr - 8, (cr + 8) * 0.72, (cr + 8) * 2 + 16);
      ctx.restore();

      // Solid ring border
      ctx.strokeStyle = "#F5D80A";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, cy, cr + 7, 0, Math.PI * 2);
      ctx.stroke();

      // Photo clipped to circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.clip();
      if (imgRef.current) {
        drawCoverImage(ctx, imgRef.current, cx - cr, cy - cr, cr * 2, cr * 2);
        
        // Verification Watermark Stamp
        ctx.save();
        ctx.translate(cx, cy + cr * 0.45);
        ctx.rotate(-15 * Math.PI / 180);
        
        ctx.font = `700 22px 'Space Grotesk', sans-serif`;
        const stampText = "HH Goa '26 Verified";
        const textM = ctx.measureText(stampText);
        const w = textM.width + 48;
        const h = 46;

        ctx.strokeStyle = "rgba(240, 24, 153, 0.6)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-w/2, -h/2, w, h, h/2);
        ctx.stroke();

        ctx.fillStyle = "rgba(240, 24, 153, 0.6)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stampText, 0, 2);
        ctx.restore();
      } else {
        ctx.fillStyle = "#093B22";
        ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);
        ctx.font = `400 22px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = "rgba(245,216,10,0.35)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Upload Photo", cx, cy + 30);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }
      ctx.restore();

      // "HACKER HOUSE GOA" curved arc text
      ctx.save();
      ctx.font = `700 16px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "#F5D80A";
      ctx.textBaseline = "middle";
      const arcR = cr + 38;
      const arcStr = "HACKER  HOUSE  GOA";
      const arcStart = -Math.PI * 0.94;
      const arcEnd   = -Math.PI * 0.06;
      const arcSpan  = arcEnd - arcStart;
      arcStr.split("").forEach((ch, i) => {
        const t = (i + 0.5) / arcStr.length;
        const angle = arcStart + t * arcSpan;
        const apx = cx + arcR * Math.cos(angle);
        const apy = cy + arcR * Math.sin(angle);
        ctx.save();
        ctx.translate(apx, apy);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(ch, -ctx.measureText(ch).width / 2, 0);
        ctx.restore();
      });
      ctx.restore();

      // Diamond decorators on ring (left/right)
      [Math.PI * 0.5, Math.PI * 1.5].forEach((angle) => {
        const dxd = cx + (cr + 12) * Math.cos(angle);
        const dyd = cy + (cr + 12) * Math.sin(angle);
        ctx.save();
        ctx.translate(dxd, dyd);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = "#F5D80A";
        ctx.fillRect(-7, -7, 14, 14);
        ctx.restore();
      });



      // Pill label
      const plW = 276, plH = 40;
      const plX = cx - plW / 2, plY = cy + cr + 6;
      ctx.fillStyle = "#051209";
      ctx.beginPath();
      ctx.roundRect(plX, plY, plW, plH, 22);
      ctx.fill();
      ctx.strokeStyle = "#F5D80A";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = `700 17px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Hacker House Goa 2026", cx, plY + plH / 2);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      // BOTTOM-LEFT STAMP


      // RIGHT PANEL
      const rx = 530;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // Name
      const hasPhoto = !!imgRef.current;
      const rawName = name ? name.trim().toUpperCase() : "";
      const displayName = rawName || "YOUR NAME";
      
      let nfs = 82;
      ctx.font = `400 ${nfs}px 'Anton', Impact, sans-serif`;
      while (ctx.measureText(displayName).width > W - rx - 50 && nfs > 40) {
        nfs -= 3;
        ctx.font = `400 ${nfs}px 'Anton', Impact, sans-serif`;
      }
      ctx.fillStyle = rawName ? "#F5D80A" : "rgba(245, 216, 10, 0.35)";
      ctx.fillText(displayName, rx, 240);

      // Date
      // We will assume the date is always shown, or perhaps we need to push it down? 
      // The original layout depended on nfs for dateY. Let's keep dateY consistent even if name is missing.
      const dateY = 240 + nfs + 10;
      ctx.font = `600 24px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "rgba(245,216,10,0.82)";
      ctx.fillText("GOA  \u2022  OCT 28 \u2013 31, 2026", rx, dateY);

      // Divider
      const dvY = dateY + 48;
      ctx.strokeStyle = "rgba(245,216,10,0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, dvY);
      ctx.lineTo(W - 48, dvY);
      ctx.stroke();

      // Role/Title
      const rawTitle = builderTitle ? builderTitle.trim().toUpperCase() : "";
      const displayTitle = rawTitle || "YOUR ROLE";
      ctx.font = `400 58px 'Anton', Impact, sans-serif`;
      ctx.fillStyle = rawTitle ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)";
      ctx.fillText(displayTitle, rx, dvY + 20);

      // Stack (pink)
      const rawStackStr = stack ? stack.trim().toUpperCase() : "";
      const displayStack = rawStackStr || "YOUR STACK";
      ctx.font = `700 36px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = rawStackStr ? "#F01899" : "rgba(240, 24, 153, 0.35)";
      ctx.fillText(displayStack, rx, dvY + 100);

      // Tagline
      ctx.font = `500 20px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "rgba(245,216,10,0.60)";
      ctx.fillText("CODE.  CREATE.  COLLABORATE.", rx, dvY + 150);

      // Website
      ctx.font = `400 18px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillText("hhgoa.com", rx, dvY + 185);

      // Decorative Palm Tree (Moved above the bottom texture and reduced in size, flipped)
      const palmSize = 250;
      drawPalm(ctx, W - 160, H - 240 - (palmSize / 2) + 40, palmSize, "rgba(245, 216, 10, 0.25)", true);

      // BOTTOM BAR
      const bbY = H - 48;
      ctx.strokeStyle = "rgba(245,216,10,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, bbY - 14);
      ctx.lineTo(W - 50, bbY - 14);
      ctx.stroke();

      ctx.textBaseline = "top";
      ctx.font = `700 22px 'Space Grotesk', sans-serif`;
      const bw1 = ctx.measureText("BUILT ").width;
      const bw2 = ctx.measureText("TO ").width;
      const bw3 = ctx.measureText("BUILD").width;
      const bsx = W / 2 - (bw1 + bw2 + bw3) / 2;
      ctx.fillStyle = "#FFFFFF"; ctx.fillText("BUILT ", bsx, bbY);
      ctx.fillStyle = "#F5D80A"; ctx.fillText("TO ", bsx + bw1, bbY);
      ctx.fillStyle = "#FFFFFF"; ctx.fillText("BUILD", bsx + bw1 + bw2, bbY);

      ctx.fillStyle = "#F01899";
      ctx.textAlign = "right";
      ctx.fillText("#FrameInGoa", W - 50, bbY);

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    },
    [name, stack, builderTitle, drawCoverImage, drawPalm]
  );



  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (mode === "frame") {
      canvas.width = 1080;
      canvas.height = 1080;
      renderFrame(ctx);
    } else {
      canvas.width = 1200;
      canvas.height = 800;
      renderCard(ctx);
    }
  }, [mode, renderFrame, renderCard]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      render();
    });
  }, [render, img, name, stack, builderTitle, mode, frameThickness, frameBgColor]);

  useEffect(() => {
    setCustomShareText(null);
  }, [mode]);

  // ─── Actions ───
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download =
      mode === "frame" ? "hhgoa-2026-frame.png" : "hhgoa-2026-builder-id.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const getShareCaption = () => {
    if (customShareText !== null) return customShareText;
    if (mode === "frame") {
      return `Officially locked in for #HHGoa2026! 🌴\nReady to ship, connect, and catch those Goa sunsets. Here's my frame - see you there!\n#FrameInGoa @HBuilderClub`;
    }
    return `Just minted my Builder ID for HH Goa 2026 - ${builderTitle} era activated 🌴\nReady to build and vibe with the community.\n#FrameInGoa @HBuilderClub`;
  };

  const handleShareX = async () => {
    setIsXSharing(true);
    let imageUrl = shareableUrl;

    // Upload canvas to get a hosted URL if we don't have one yet
    if (!imageUrl) {
      try {
        const canvas = canvasRef.current;
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        const filename = `hhgoa-${mode}-${Date.now()}.png`;
        const res = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
          method: "POST",
          body: blob,
          headers: { "content-type": "image/png" },
        });
        const data = await res.json();
        if (res.ok) {
          imageUrl = data.url;
          setShareableUrl(data.url); // cache for later
        }
      } catch (_) {
        // If upload fails, still open tweet without image URL
      }
    }

    const caption = getShareCaption();
    const tweetText = imageUrl ? `${caption}\n\n${imageUrl}` : caption;
    const twitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(twitterUrl, "_blank");
    setIsXSharing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareCaption()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleGenerateLink = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsUploading(true);
    setUploadError(null);
    setShareableUrl(null);
    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      const filename = `hhgoa-${mode}-${Date.now()}.png`;
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: "POST",
        body: blob,
        headers: { "content-type": "image/png" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setShareableUrl(data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = () => {
    if (!shareableUrl) return;
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    });
  };

  // ─── Drag & drop handlers ───
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="container">
      {/* ═══ NAVBAR ═══ */}
      <nav className="navbar fade-in">
        <div className="nav-brand">
          {/* ─── Logo-style Hero Header ─── */}
          <div className="nav-hero-header" aria-label="Hacker House Goa 2026">
            <span className="nav-hero-text">
              <span>HACKER</span>
              <span>HOUSE</span>
            </span>
            <span className="nav-hero-subtext" aria-label="Goa">गोवा</span>
          </div>
        </div>
        <div className="nav-right">
          <a href="#" className="nav-hashtag">
            #FrameInGoa
          </a>
        </div>
      </nav>

      {/* ═══ BUILDER GRID ═══ */}
      {/*
        Mobile order (flex-direction: column):
          1. panel-left  (Upload)
          2. panel-center (Preview)  ← moved up from right-side
          3. panel-left continues (Details)  ← handled by splitting into two separate .panel-left blocks
          4. panel-right (Format + Share)
        
        Desktop grid uses grid-template-areas to reposition.
      */}
      <div className="builder-grid">

        {/* ─── UPLOAD COL (Step 1) ─── */}
        <div className="upload-col fade-in fade-in-delay-1">

          {/* Step 1: Upload */}
          <div className="glass-card panel-section" id="section-upload">
            <div className="step-badge">
              <span className="step-title">Upload Photo</span>
            </div>
            <p className="step-hint">JPG, PNG or HEIC. Max 10MB.</p>

            {!img ? (
              <div
                className={`upload-zone ${isDragging ? "drag-over" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="Upload photo — drag and drop or click to browse"
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/heic"
                  onChange={(e) => handleFile(e.target.files[0])}
                  aria-hidden="true"
                />
                <div className="upload-icon-wrap">{Icons.upload}</div>
                <p className="upload-text-main">
                  Drag &amp; drop your photo
                </p>
                <p className="upload-text-hint">or click to browse</p>
              </div>
            ) : (
              <div className="file-info">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt="Uploaded"
                    className="file-thumb"
                  />
                )}
                <div className="file-meta">
                  <div className="file-name">
                    {fileName.length > 20
                      ? fileName.slice(0, 18) + "…"
                      : fileName}
                  </div>
                  <div className="file-size">{fileSize}</div>
                </div>
                <button
                  className="file-remove-btn"
                  onClick={removeFile}
                  title="Remove photo"
                  aria-label="Remove photo"
                >
                  {Icons.trash}
                </button>
              </div>
            )}
          </div>
          
        </div>

        {/* ─── CENTER PANEL (Preview) — appears 2nd on mobile ─── */}
        <div className="glass-card panel-center fade-in fade-in-delay-2" id="section-preview">
          <div className="preview-header">
            <span className="preview-title">Live Preview</span>
            <div className="view-toggle">
              <span className="view-toggle-label">Switch View</span>
              <div className="view-toggle-btns" role="group" aria-label="Switch preview mode">
                <button
                  className={`view-toggle-btn ${mode === "frame" ? "active" : ""}`}
                  onClick={() => setMode("frame")}
                  aria-label="PFP Frame mode"
                  aria-pressed={mode === "frame"}
                >
                  {Icons.list}
                </button>
                <button
                  className={`view-toggle-btn ${mode === "card" ? "active" : ""}`}
                  onClick={() => setMode("card")}
                  aria-label="Builder ID Card mode"
                  aria-pressed={mode === "card"}
                >
                  {Icons.grid}
                </button>
              </div>
            </div>
          </div>

          <div className="canvas-area">
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                id="outputCanvas"
                width="1080"
                height="1080"
                aria-label="Preview canvas"
              />
            </div>
          </div>

          <p className="preview-hint">
            {mode === "frame"
              ? "PFP Frame Overlay — 1080×1080 px"
              : "Builder ID Card — 1200×800 px"}
          </p>


        </div>

        {/* ─── DETAILS COL (Step 3) ─── */}
        <div className="details-col fade-in fade-in-delay-2">
          <div className="glass-card panel-section" id="section-details" style={{ 
            opacity: 1, 
            pointerEvents: img ? 'auto' : 'none',
            backgroundImage: "linear-gradient(rgba(12, 92, 56, 0.5), rgba(12, 92, 56, 0.8)), url('/bg-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}>
            <div className="step-badge">
              <span className="step-title">Your Details (ID Card)</span>
            </div>
            <p className="step-hint">
              {img ? "Quick fields to personalize your card." : "Upload a photo first to unlock details."}
            </p>

            <div className="field-group">
              <label className="field-label" htmlFor="field-name">
                {Icons.user} Your Name
              </label>
              <input
                id="field-name"
                type="text"
                className="field-input"
                placeholder="e.g. Diptesh Roy"
                maxLength={28}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!img}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="field-stack">
                {Icons.stack} Your Stack / Role
              </label>
              <input
                id="field-stack"
                type="text"
                className="field-input"
                placeholder="e.g. Full Stack Dev"
                maxLength={22}
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                disabled={!img}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="field-title">
                {Icons.title} Builder Title
              </label>
              <input
                id="field-title"
                type="text"
                className="field-input"
                placeholder="e.g. Ship Captain"
                maxLength={22}
                value={builderTitle}
                onChange={(e) => setBuilderTitle(e.target.value)}
                disabled={!img}
              />
            </div>
            
            {/* ─── Miniature Logo ─── */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20px', marginTop: '12px', marginBottom: '4px' }}>
              <div style={{ transform: 'scale(0.2)', transformOrigin: 'center center' }}>
                <div className="nav-hero-header" aria-label="Hacker House Goa 2026">
                  <span className="nav-hero-text">
                    <span>HACKER</span>
                    <span>HOUSE</span>
                  </span>
                  <span className="nav-hero-subtext" aria-label="Goa">गोवा</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ─── RIGHT PANEL (Format + Share) ─── */}
        <div className="panel-right fade-in fade-in-delay-3">

          {/* Step 4: Format Picker */}

          <div className="glass-card panel-section" id="section-format">
            <div className="step-badge">
              <span className="step-title">Pick Format</span>
            </div>
            <p className="step-hint">Choose your output style.</p>

            {/* Horizontal scroll chip row on mobile; 2-up grid on tablet+ */}
            <div className="format-picker" role="group" aria-label="Pick output format">
              <button
                id="format-frame"
                className={`format-option ${mode === "frame" ? "active" : ""}`}
                onClick={() => setMode("frame")}
                aria-pressed={mode === "frame"}
              >
                {Icons.frame}
                <span className="format-option-label">
                  PFP FRAME/OVERLAY
                </span>
              </button>
              <button
                id="format-card"
                className={`format-option ${mode === "card" ? "active" : ""}`}
                onClick={() => setMode("card")}
                aria-pressed={mode === "card"}
              >
                {Icons.card}
                <span className="format-option-label">Builder ID Card</span>
              </button>
            </div>
            
            {mode === "frame" && (
              <>
                <div style={{ marginTop: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--yellow)', marginBottom: '12px' }}>
                    Adjust Frame Thickness
                  </label>
                  <input 
                    type="range" 
                    min="80" 
                    max="210" 
                    value={frameThickness} 
                    onChange={(e) => setFrameThickness(e.target.value)} 
                    style={{ width: '100%', accentColor: 'var(--yellow)' }} 
                    aria-label="Adjust frame thickness"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--yellow)', marginBottom: '12px' }}>
                    Background Color
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                      { label: "Transparent", value: "transparent", color: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23ccc\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23fff\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23fff\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23ccc\"/></svg>')" },
                      { label: "Green", value: "#0C5C38", color: "#0C5C38" },
                      { label: "Black", value: "#000000", color: "#000000" },
                      { label: "White", value: "#ffffff", color: "#ffffff" },
                      { label: "Light Pink", value: "#FFC0CB", color: "#FFC0CB" }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setFrameBgColor(opt.value)}
                        title={opt.label}
                        aria-label={`Set background to ${opt.label}`}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: opt.color,
                          border: frameBgColor === opt.value ? '3px solid var(--yellow)' : '2px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Step 5: Share */}
          <div className="glass-card panel-section" id="section-share">
            <div className="share-title">Your Share to X (Pre-Filled)</div>
            <div className="tweet-box" role="region" aria-label="Pre-filled post text">
              <textarea
                className="tweet-text"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "100px",
                  fontFamily: "inherit",
                  whiteSpace: "pre-wrap",
                  paddingRight: "64px"
                }}
                value={getShareCaption()}
                onChange={(e) => setCustomShareText(e.target.value)}
              />
              <button
                className="copy-btn"
                onClick={handleCopy}
                aria-label={copied ? "Copied!" : "Copy post text"}
                title="Copy post text"
              >
                {copied ? Icons.check : Icons.copy}
              </button>
            </div>

            <div className="share-directly-label">Share Directly</div>
            <div className="share-btns">
              <button
                id="btn-share-x"
                className="share-btn share-btn-x"
                onClick={handleShareX}
                aria-label="Share to X (Twitter)"
                disabled={!img || isXSharing}
              >
                {isXSharing ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                    Uploading…
                  </span>
                ) : (
                  <>{Icons.x} Share to X</>
                )}
              </button>
              <button
                id="btn-download"
                className="share-btn share-btn-download"
                onClick={handleDownload}
                aria-label="Download image"
                disabled={!img}
              >
                {Icons.download} Download
              </button>
            </div>

            {/* ── Generate Shareable Link ── */}
            <div style={{ marginTop: "20px" }}>
              <div className="share-directly-label">🔗 Get Shareable Link</div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "4px 0 12px" }}>
                Upload your card to the cloud and get a unique link anyone can open.
              </p>
              <button
                id="btn-generate-link"
                className="share-btn share-btn-download"
                style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #0C5C38, #1a8a56)", border: "1px solid rgba(245,216,10,0.4)" }}
                onClick={handleGenerateLink}
                disabled={!img || isUploading}
                aria-label="Generate shareable link"
              >
                {isUploading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "14px", height: "14px", border: "2px solid rgba(245,216,10,0.4)", borderTopColor: "#F5D80A", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                    Uploading…
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>{Icons.copy} Generate Link</span>
                )}
              </button>

              {uploadError && (
                <p style={{ color: "#f87171", fontSize: "12px", marginTop: "8px" }}>⚠ {uploadError}</p>
              )}

              {shareableUrl && (
                <div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <input
                    id="shareable-url-input"
                    type="text"
                    readOnly
                    value={shareableUrl}
                    style={{
                      flex: 1,
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(245,216,10,0.35)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      color: "#F5D80A",
                      fontSize: "12px",
                      outline: "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    onClick={(e) => e.target.select()}
                    aria-label="Shareable image URL"
                  />
                  <button
                    id="btn-copy-url"
                    onClick={handleCopyUrl}
                    title={urlCopied ? "Copied!" : "Copy link"}
                    aria-label={urlCopied ? "Copied!" : "Copy link"}
                    style={{
                      background: urlCopied ? "#0C5C38" : "rgba(245,216,10,0.15)",
                      border: "1px solid rgba(245,216,10,0.4)",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                      color: "#F5D80A",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {urlCopied ? Icons.check : Icons.copy}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* ─── STICKY BOTTOM BAR (mobile only — hidden at 768px+) ─── */}
      <div className="sticky-bar" aria-label="Quick action bar">
        <button
          className="share-btn share-btn-x"
          onClick={handleShareX}
          aria-label="Share to X"
          disabled={!img || isXSharing}
        >
          {isXSharing ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
              Uploading…
            </span>
          ) : (
            <>{Icons.x} Share to X</>
          )}
        </button>
        <button
          className="share-btn share-btn-download"
          onClick={handleDownload}
          aria-label="Download image"
          disabled={!img}
        >
          {Icons.download} Download
        </button>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer">
        <div className="footer-motif" aria-hidden="true">
          {Icons.palm}{Icons.palm}{Icons.palm}{Icons.palm}{Icons.palm}
        </div>
        <p className="footer-text">
          <span className="footer-tag">#FrameInGoa</span>
        </p>
      </footer>
    </div>
  );
}
