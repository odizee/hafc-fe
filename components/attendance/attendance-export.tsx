"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface AttendanceExportProps {
  tableRef: React.RefObject<HTMLDivElement>;
  date: Date;
}

export function AttendanceExport({ tableRef, date }: AttendanceExportProps) {
  const exportToPDF = async () => {
    if (!tableRef.current) return;

    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`attendance-${date.toISOString().split("T")[0]}.pdf`);
  };

  return (
    <Button variant="outline" onClick={exportToPDF}>
      <Download className="w-4 h-4 mr-2" />
      Export PDF
    </Button>
  );
}