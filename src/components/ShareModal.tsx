"use client";

import { useState, type RefObject } from "react";
import { Download, Share2, X, Check, Copy } from "lucide-react";
import { encodeItinerary, buildShareUrl } from "@/lib/share";

interface ShareModalProps {
  itinerary: unknown;
  printRef: RefObject<HTMLDivElement | null>;
  pdfFilename?: string;
  className?: string;
}

export function ShareModal({ itinerary, printRef, pdfFilename = "EasyChina_Itinerary.pdf", className = "" }: ShareModalProps) {
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const generatePDF = async () => {
    if (!printRef.current) return;
    setPdfGenerating(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(pdfFilename);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleShare = async () => {
    const encoded = encodeItinerary(itinerary);
    const url = buildShareUrl(encoded);
    setShareUrl(url);

    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: { dark: "#5C7A6E", light: "#ffffff" },
      });
      setQrDataUrl(dataUrl);
    } catch {
      // QR generation failed — share URL still available
    }

    setShowQR(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <>
      <div className={`flex gap-3 ${className}`}>
        <button
          onClick={generatePDF}
          disabled={pdfGenerating}
          className={`btn-primary flex-1 justify-center text-sm py-3 ${pdfGenerating ? "pointer-events-none opacity-60" : ""}`}
        >
          <Download size={16} />
          {pdfGenerating ? "Generating..." : "Download PDF"}
        </button>
        <button onClick={handleShare} className="btn-secondary flex-1 justify-center text-sm py-3">
          <Share2 size={16} />
          Share
        </button>
      </div>

      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowQR(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Share Your Itinerary</h3>
              <button onClick={() => setShowQR(false)} className="rounded-lg p-1 text-stone/40 hover:bg-black/5">
                <X size={18} />
              </button>
            </div>

            {qrDataUrl ? (
              <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center rounded-xl bg-celadon/5">
                <img src={qrDataUrl} alt="QR Code" className="h-52 w-52" />
              </div>
            ) : (
              <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center rounded-xl bg-black/5">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-celadon border-t-transparent" />
              </div>
            )}

            <p className="mb-3 text-center text-xs text-stone/60">
              Scan QR code or copy the link to share
            </p>

            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-xs text-stone outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-celadon px-4 py-2 text-xs font-medium text-white transition-all hover:bg-celadon/90"
              >
                {showCopied ? <Check size={14} /> : <Copy size={14} />}
                {showCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
