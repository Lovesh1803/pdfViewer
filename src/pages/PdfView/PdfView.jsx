import React from "react";
import "./PdfView.css";
import Bookmark from "../../components/Bookmark/Bookmark";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import { useLocation } from "react-router-dom";

function PdfView() {
  const { state } = useLocation();

  return (
    <div className="pdfView">
      <Bookmark />
      <PdfViewer pdfFile={state?.pdfFile || null} />
    </div>
  );
}

export default PdfView;
