import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import PdfView from "../pages/PdfView/PdfView";

const AppContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pdfView" element={<PdfView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppContainer;
