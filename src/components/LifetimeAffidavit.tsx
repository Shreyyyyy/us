"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { ShieldCheck, FileCheck, CheckCircle2, RotateCcw, Download, Printer, Sparkles, Heart, Lock, Loader2 } from "lucide-react";

export default function LifetimeAffidavit() {
  const [shreySigned, setShreySigned] = useState(false);
  const [divijaSigned, setDivijaSigned] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);
  const [executionDate, setExecutionDate] = useState("");
  const [activeTab, setActiveTab] = useState<"draw" | "type">("draw");
  const [shreyTypedName, setShreyTypedName] = useState("Shrey (Laddu)");
  const [divijaTypedName, setDivijaTypedName] = useState("Divija (Jalebi)");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const documentRef = useRef<HTMLDivElement | null>(null);
  const shreyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const divijaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawingShrey, setIsDrawingShrey] = useState(false);
  const [isDrawingDivija, setIsDrawingDivija] = useState(false);

  const paintDefaultSignature = (who: "shrey" | "divija") => {
    const canvas = who === "shrey" ? shreyCanvasRef.current : divijaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "italic 26px 'Brush Script MT', 'Great Vibes', cursive, serif";
    ctx.fillStyle = "#1e1b4b";
    ctx.fillText(who === "shrey" ? "Shrey (Laddu) ~" : "Divija (Jalebi) ♡", 25, 45);
  };

  useEffect(() => {
    // Check if contract was already executed in this session
    try {
      const savedExecution = localStorage.getItem("lifetime_contract_executed");
      if (savedExecution) {
        const data = JSON.parse(savedExecution);
        setIsExecuted(true);
        setExecutionDate(data.date || new Date().toLocaleDateString("en-IN", { dateStyle: "long" }));
        setShreySigned(true);
        setDivijaSigned(true);
      } else {
        setExecutionDate(new Date().toLocaleDateString("en-IN", { dateStyle: "long" }));
      }
    } catch {
      setExecutionDate(new Date().toLocaleDateString("en-IN", { dateStyle: "long" }));
    }

    const timer = setTimeout(() => {
      try {
        if (localStorage.getItem("lifetime_contract_executed")) {
          paintDefaultSignature("shrey");
          paintDefaultSignature("divija");
        }
      } catch {
        // ignore
      }
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Canvas drawing helpers
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    who: "shrey" | "divija"
  ) => {
    const canvas = who === "shrey" ? shreyCanvasRef.current : divijaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#1e1b4b"; // deep navy legal ink
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (who === "shrey") setIsDrawingShrey(true);
    else setIsDrawingDivija(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    who: "shrey" | "divija"
  ) => {
    const isDrawing = who === "shrey" ? isDrawingShrey : isDrawingDivija;
    if (!isDrawing) return;
    const canvas = who === "shrey" ? shreyCanvasRef.current : divijaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    if (who === "shrey") setShreySigned(true);
    else setDivijaSigned(true);
  };

  const stopDrawing = (who: "shrey" | "divija") => {
    if (who === "shrey") setIsDrawingShrey(false);
    else setIsDrawingDivija(false);
  };

  const clearCanvas = (who: "shrey" | "divija") => {
    const canvas = who === "shrey" ? shreyCanvasRef.current : divijaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (who === "shrey") setShreySigned(false);
    else setDivijaSigned(false);
  };

  const quickSign = (who: "shrey" | "divija") => {
    sound.playClick();
    const canvas = who === "shrey" ? shreyCanvasRef.current : divijaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "italic 26px 'Brush Script MT', 'Great Vibes', cursive, serif";
    ctx.fillStyle = "#1e1b4b";
    ctx.fillText(who === "shrey" ? "Shrey (Laddu) ~" : "Divija (Jalebi) ♡", 25, 45);

    if (who === "shrey") setShreySigned(true);
    else setDivijaSigned(true);
  };

  const handleExecuteContract = () => {
    if (!shreySigned || !divijaSigned) {
      sound.playTerminalBlip();
      alert("Both Laddu and Jalebi must sign the affidavit to make the lifetime booking legally binding!");
      return;
    }

    sound.playSuccess();
    sound.playWandSpell();
    setIsExecuted(true);

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#f59e0b", "#ec4899", "#3b82f6", "#10b981", "#ffffff"],
    });

    try {
      localStorage.setItem(
        "lifetime_contract_executed",
        JSON.stringify({
          date: executionDate,
          id: "BOOKING-LADDU-JALEBI-INFINITY-2026",
          status: "LIFETIME_CONFIRMED",
        })
      );
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownloadPdf = async () => {
    sound.playClick();
    if (!documentRef.current) return;
    setIsGeneratingPdf(true);

    let clone: HTMLElement | null = null;

    try {
      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const element = documentRef.current;

      // Ensure default signatures are placed if blank
      if (!shreySigned) paintDefaultSignature("shrey");
      if (!divijaSigned) paintDefaultSignature("divija");

      // Clone element so we render a perfect 1-sheet legal layout at standard width (780px)
      // regardless of whether user is on a phone, tablet, or desktop screen!
      clone = element.cloneNode(true) as HTMLElement;

      // Duplicate canvas signature buffers from original to clone
      const origCanvases = element.querySelectorAll("canvas");
      const cloneCanvases = clone.querySelectorAll("canvas");
      origCanvases.forEach((orig, idx) => {
        const target = cloneCanvases[idx];
        if (target) {
          target.width = orig.width;
          target.height = orig.height;
          const ctx = target.getContext("2d");
          if (ctx) {
            ctx.drawImage(orig, 0, 0);
          }
        }
      });

      // Style clone to fixed legal document dimensions (780px width)
      clone.style.width = "780px";
      clone.style.maxWidth = "780px";
      clone.style.position = "fixed";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.margin = "0";
      clone.style.zIndex = "-9999";
      clone.style.background = "#fdfbf7";
      clone.style.padding = "24px 28px";
      clone.style.boxSizing = "border-box";

      // Ensure multi-column elements are side-by-side in clone
      const sigGrids = clone.querySelectorAll(".sig-grid");
      sigGrids.forEach((el) => {
        const h = el as HTMLElement;
        h.style.display = "grid";
        h.style.gridTemplateColumns = "1fr 1fr";
        h.style.gap = "1.25rem";
      });

      const stampRows = clone.querySelectorAll(".stamp-row");
      stampRows.forEach((el) => {
        const h = el as HTMLElement;
        h.style.display = "flex";
        h.style.flexDirection = "row";
        h.style.justifyContent = "space-between";
        h.style.alignItems = "center";
      });

      const stampGrids = clone.querySelectorAll(".stamp-grid-info");
      stampGrids.forEach((el) => {
        const h = el as HTMLElement;
        h.style.display = "grid";
        h.style.gridTemplateColumns = "repeat(4, 1fr)";
        h.style.gap = "0.5rem";
      });

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fdfbf7",
        logging: false,
        width: 780,
        windowWidth: 1024,
        ignoreElements: (el) => {
          return el.getAttribute("data-pdf-ignore") === "true";
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Create strictly a 1-page A4 PDF document (1 single sheet!)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const margin = 8;
      const maxW = pageWidth - margin * 2; // 194mm
      const maxH = pageHeight - margin * 2; // 281mm

      const imgRatio = canvas.width / canvas.height;

      let renderW = maxW;
      let renderH = maxW / imgRatio;

      // Guarantee strict fit onto this single sheet without extra pages
      if (renderH > maxH) {
        renderH = maxH;
        renderW = maxH * imgRatio;
      }

      // Center horizontally and vertically on the single sheet
      const xPos = margin + (maxW - renderW) / 2;
      const yPos = margin + (maxH - renderH) / 2;

      // Exactly ONE image add call, zero addPage calls (strictly 1 sheet)
      pdf.addImage(imgData, "JPEG", xPos, yPos, renderW, renderH, undefined, "FAST");

      pdf.save("Lifetime-Affidavit-Laddu-Jalebi-2026.pdf");

      sound.playSuccess();
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#ec4899", "#3b82f6", "#10b981", "#ffffff"],
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      if (clone && clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section id="contract" className="w-full py-12 px-3 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
          <FileCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>OFFICIAL SACRED AFFIDAVIT // SECTION 143(3)</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight">
          Lifetime Booking &amp; Affidavit 📜💍
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
          A legitimate, non-revocable legal covenant between Laddu &amp; Jalebi. Once executed, booking is permanent for eternity with zero cancellation policy.
        </p>

        {/* Action Bar: Download PDF & Print */}
        <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-xs sm:text-sm font-sans flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-950" />
                <span>Generating Legal PDF…</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-950" />
                <span>Download Legal PDF 📜</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-sans font-medium flex items-center gap-2 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print Affidavit</span>
          </button>
        </div>
      </div>

      {/* Main Legal Document Card */}
      <div ref={documentRef} className="relative rounded-3xl p-3.5 sm:p-10 border-2 sm:border-4 border-amber-600/40 bg-[#fdfbf7] text-zinc-900 shadow-2xl shadow-amber-950/40 overflow-hidden font-serif">
        {/* Subtle Guilloche & Legal Watermark */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none text-5xl sm:text-9xl font-bold font-mono">
          🦚 SHREY × DIVIJA 🦚
        </div>

        {/* Indian Non-Judicial E-Stamp Header */}
        <div className="border-2 sm:border-4 border-emerald-900/60 rounded-2xl p-3 sm:p-6 mb-6 sm:mb-8 bg-[#f5fbf7] relative">
          <div className="stamp-row flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-emerald-900/30 pb-3 sm:pb-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-emerald-900 flex items-center justify-center text-2xl sm:text-3xl font-serif bg-emerald-100 shadow-inner shrink-0">
                🦚
              </div>
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider font-bold uppercase text-emerald-950 block">
                  GOVERNMENT OF SACRED DESTINY &amp; ETERNAL LOVE
                </span>
                <span className="text-base sm:text-xl font-bold font-serif text-emerald-950 block leading-tight">
                  ₹100 NON-JUDICIAL E-STAMP CERTIFICATE
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-emerald-800 block">
                  REG: DEL-LADDU-JALEBI-2026-∞
                </span>
              </div>
            </div>

            <div className="text-center sm:text-right font-mono text-[10px] sm:text-[11px] text-emerald-900">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-900/10 rounded border border-emerald-900/20 font-bold block mb-1">
                VALUE: ONE HUNDRED MILLION SMILES
              </span>
              <span>Issued on: {executionDate || "30 September 2026"}</span>
            </div>
          </div>

          <div className="stamp-grid-info grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 font-mono text-[10px] text-emerald-900 text-left">
            <div>
              <span className="text-emerald-700 block text-[9px]">First Party:</span>
              <strong className="text-xs">Shrey (Laddu)</strong>
            </div>
            <div>
              <span className="text-emerald-700 block text-[9px]">Second Party:</span>
              <strong className="text-xs">Divija (Jalebi)</strong>
            </div>
            <div>
              <span className="text-emerald-700 block text-[9px]">Stamp Duty:</span>
              <strong>Infinite Devotion</strong>
            </div>
            <div>
              <span className="text-emerald-700 block text-[9px]">Validity:</span>
              <strong className="text-emerald-900">7 Lifetimes</strong>
            </div>
          </div>
        </div>

        {/* Title of Affidavit */}
        <div className="text-center space-y-1 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-black tracking-wide text-zinc-950 uppercase border-b-2 border-zinc-900 pb-2 inline-block leading-tight">
            AFFIDAVIT OF ETERNAL TOGETHERNESS &amp; LIFETIME BOOKING
          </h3>
          <p className="text-[10px] sm:text-xs font-mono text-zinc-600 italic">
            Executed under Section 143(3) of the Cosmic Devotion Code, 2026
          </p>
        </div>

        {/* Legal Recitals */}
        <div className="space-y-5 text-xs sm:text-sm text-zinc-800 leading-relaxed text-justify">
          <p>
            We, the undersigned deponents, <strong>SHREY (alias &quot;Laddu&quot;)</strong>, AI Research Wizard and resident of black-frame spectacles and paneer fuel, and <strong>DIVIJA (alias &quot;Jalebi&quot;)</strong>, MSc Psychology Scholar, Queen of soft smiles and overthinking superpowers, do hereby solemnly affirm, declare, and covenant as under:
          </p>

          <ol className="list-decimal pl-5 space-y-3 font-sans text-zinc-800 text-xs sm:text-sm">
            <li>
              <strong>CLAUSE 1 (CONFIRMED &amp; NON-REVOCABLE BOOKING):</strong> Both deponents hereby confirm that a permanent booking has been entered into. The booking status is marked as <em>&quot;100% CONFIRMED &amp; FROZEN&quot;</em>. There exists no cancellation button, no refund provision, and no transfer protocol anywhere in this universe or in any parallel simulation.
            </li>
            <li>
              <strong>CLAUSE 2 (MANDATORY BOYFRIEND ATTENTION PROTOCOL):</strong> Deponent 1 (Laddu) shall provide Deponent 2 (Jalebi) with an unyielding daily quota of: (a) minimum 15-minute bear hugs, (b) active, empathetic listening with ZERO unwarranted machine learning engineering solutions, and (c) emergency delivery of chai, paneer, or chocolates upon request.
            </li>
            <li>
              <strong>CLAUSE 3 (MANDATORY GIRLFRIEND CARE &amp; SMILE PROTOCOL):</strong> Deponent 2 (Jalebi) shall grant Deponent 1 (Laddu) permission to recharge his neural tensors, shall not overthink past 1:30 AM without supervision, and covenants to reward Laddu with her trademark cute smile whenever he travels long metro distances across NCR.
            </li>
            <li>
              <strong>CLAUSE 4 (DISPUTE RESOLUTION &amp; KALESH ARBITRATION):</strong> All minor disagreements, silent treatments, or poutings shall be referred exclusively to the <em>&quot;Tribunal of Tight Cuddles, Soft Forehead Kisses, and 2 AM Ranveer Singh Dancing&quot;</em>. Holding grudges past midnight is officially declared ultra vires and unconstitutional.
            </li>
            <li>
              <strong>CLAUSE 5 (THE LANDMARK DOOR-HIDING PRECEDENT):</strong> The memorable event wherein Laddu hid behind the door from the brother is hereby registered in the official registry as conclusive proof of extraordinary bravery and unshakeable commitment.
            </li>
            <li>
              <strong>CLAUSE 6 (DIVINE WITNESS &amp; SEAL):</strong> This covenant is witnessed, blessed, and eternally sealed under the benign lotus feet and flute melody of <strong>Lord Krishna (Kanha Ji) 🦚</strong>, with zero possibility of expiry.
            </li>
          </ol>
        </div>

        {/* Verification Statement */}
        <div className="mt-8 pt-4 border-t border-zinc-300 text-[11px] sm:text-xs text-zinc-600 font-mono italic">
          <strong>VERIFICATION:</strong> Verified at Delhi-NCR on this day of {executionDate || "30 September 2026"}, that the contents of above affidavit are true to the best of our hearts, and nothing has been concealed or exaggerated.
        </div>

        {/* Dual Signature Section */}
        <div className="sig-grid mt-8 pt-6 border-t-2 border-dashed border-zinc-400 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Shrey Signature Box */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-300 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-700">
              <span className="font-bold flex items-center gap-1">
                <span>⚡</span> Signature of Laddu (Shrey)
              </span>
              <div data-pdf-ignore="true" className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => quickSign("shrey")}
                  className="text-[10px] text-sky-700 hover:underline"
                >
                  [Quick Sign]
                </button>
                <button
                  type="button"
                  onClick={() => clearCanvas("shrey")}
                  className="text-[10px] text-zinc-500 hover:text-red-500"
                  title="Clear signature"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="h-20 w-full bg-white rounded-xl border border-zinc-300 shadow-inner relative overflow-hidden">
              <canvas
                ref={shreyCanvasRef}
                width={320}
                height={80}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={(e) => startDrawing(e, "shrey")}
                onMouseMove={(e) => draw(e, "shrey")}
                onMouseUp={() => stopDrawing("shrey")}
                onMouseLeave={() => stopDrawing("shrey")}
                onTouchStart={(e) => startDrawing(e, "shrey")}
                onTouchMove={(e) => draw(e, "shrey")}
                onTouchEnd={() => stopDrawing("shrey")}
              />
              {!shreySigned && (
                <div data-pdf-ignore="true" className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-400 text-[11px] font-sans">
                  Draw signature here or click [Quick Sign]
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>Deponent 1 (Shrey)</span>
              <span>{shreySigned ? "✓ Signed & Verified" : "Pending Signature"}</span>
            </div>
          </div>

          {/* Divija Signature Box */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-300 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-700">
              <span className="font-bold flex items-center gap-1">
                <span>🌸</span> Signature of Jalebi (Divija)
              </span>
              <div data-pdf-ignore="true" className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => quickSign("divija")}
                  className="text-[10px] text-pink-700 hover:underline"
                >
                  [Quick Sign]
                </button>
                <button
                  type="button"
                  onClick={() => clearCanvas("divija")}
                  className="text-[10px] text-zinc-500 hover:text-red-500"
                  title="Clear signature"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="h-20 w-full bg-white rounded-xl border border-zinc-300 shadow-inner relative overflow-hidden">
              <canvas
                ref={divijaCanvasRef}
                width={320}
                height={80}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={(e) => startDrawing(e, "divija")}
                onMouseMove={(e) => draw(e, "divija")}
                onMouseUp={() => stopDrawing("divija")}
                onMouseLeave={() => stopDrawing("divija")}
                onTouchStart={(e) => startDrawing(e, "divija")}
                onTouchMove={(e) => draw(e, "divija")}
                onTouchEnd={() => stopDrawing("divija")}
              />
              {!divijaSigned && (
                <div data-pdf-ignore="true" className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-400 text-[11px] font-sans">
                  Draw signature here or click [Quick Sign]
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>Deponent 2 (Divija)</span>
              <span>{divijaSigned ? "✓ Signed & Verified" : "Pending Signature"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Big Wax Seal of Lifetime Booking (Interactive Web Card - Outside Document Sheet) */}
      {isExecuted && (
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-600/60 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 text-white flex items-center justify-center shadow-lg shadow-amber-600/40 text-center font-bold text-[9px] uppercase tracking-tighter border-2 border-white ring-4 ring-amber-300 animate-bounce-short">
              <div>
                <div className="text-base">💍</div>
                SEALED
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                REGISTRATION CODE: #LADDU-JALEBI-LIFETIME-CONFIRMED
              </span>
              <h4 className="text-base sm:text-lg font-serif font-black text-amber-950">
                LIFETIME BOOKING CONFIRMED &amp; SEALED FOREVER ✓
              </h4>
              <p className="text-xs text-amber-900 font-sans">
                Stored in the Akashic records under Kanha ji&apos;s blessings. Neither party can ever back out.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isGeneratingPdf ? "Generating…" : "Download Contract PDF 📜"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-900 text-amber-50 hover:bg-amber-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>
      )}

      {/* Execution CTA Button (Outside Document Sheet) */}
      {!isExecuted && (
        <div className="text-center pt-2">
          <button
            onClick={handleExecuteContract}
            disabled={!shreySigned || !divijaSigned}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold font-sans transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 mx-auto ${
              shreySigned && divijaSigned
                ? "bg-gradient-to-r from-amber-500 via-pink-500 to-sky-500 hover:from-amber-600 hover:to-sky-600 text-white shadow-amber-500/30 scale-105 animate-pulse"
                : "bg-zinc-200 text-zinc-400 border border-zinc-300 cursor-not-allowed"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>EXECUTE &amp; LOCK LIFETIME BOOKING (BOTH MUST SIGN) 💍</span>
          </button>
          <p className="text-[11px] font-mono text-zinc-400 mt-2">
            {!shreySigned || !divijaSigned
              ? "Both Laddu and Jalebi must sign above to activate the seal"
              : "Ready! Click to register your lifetime booking with cosmic authority"}
          </p>
        </div>
      )}
    </section>
  );
}
