"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UIMessage } from "ai";
import jsPDF from "jspdf";

interface ExportButtonProps {
  messages: UIMessage[];
}

export default function ExportButton({ messages }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  if (!messages || messages.length === 0) {
    return null;
  }

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Create a new jsPDF instance (Wait slightly so loading state renders)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      let y = 20;

      // Add Header
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("CareerCompass - Career Guidance Report", margin, y);
      y += 8;

      // Add Date
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
      y += 15;

      // Add Messages
      for (const m of messages) {
        const role = m.role === "user" ? "You" : "CareerCompass";
        
        // Extract text content from parts (new AI SDK v2 format)
        let textContent = "";
        if (m.parts && Array.isArray(m.parts)) {
          textContent = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("");
        } else if (typeof (m as any).content === "string") {
          // Fallback for older formats or unexpected structures
          textContent = (m as any).content;
        }

        if (!textContent) continue;

        // Role header
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        
        // Check if we need a new page for the role header
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.text(`${role}:`, margin, y);
        y += 6;

        // Message content
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        
        // Split text to fit within page width
        const lines = doc.splitTextToSize(textContent, maxWidth);
        
        for (const line of lines) {
          // Check if we need a new page for this line
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, margin, y);
          y += 6;
        }
        
        y += 5; // Extra spacing between messages
      }

      // Save the PDF
      doc.save(`career-guidance-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isExporting}
      className="gap-2"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting ? "Exporting..." : "Export PDF"}
    </Button>
  );
}
