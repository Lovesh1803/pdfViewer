import { useEffect, useRef } from "react";
import "./PdfViewer.css";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePdf from "../../Assets/docs/samplePdf.pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { getFileNameFromUrl } from "../../helper/Utility";
import {
  FaBookmark,
  FaRegBookmark,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../redux/actions";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfViewer({ pdfFile }) {
  const pdfRef = useRef(null);
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.pdfViewerReducer);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isCurrentPageBookmarked, setIsCurrentPageBookmarked] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(samplePdf);
  const observer = useRef(null);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pdfFile) {
      setPdfUrl(pdfFile);
    }
  }, [pdfFile]);

  useEffect(() => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.pageNo === currentPage
    );
    setIsCurrentPageBookmarked(isBookmarked);
  }, [bookmarks, currentPage]);

  useEffect(() => {
    console.log("Current page: ", currentPage);
  }, [currentPage]);

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description to set page no. intersection observer.
   */
  const setPageNoObserver = () => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNumber = parseInt(entry.target.dataset.pageNumber, 10);
          setCurrentPage(pageNumber);
        }
      });
    };

    observer.current = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    document.querySelectorAll(".pdf-page").forEach((page) => {
      observer.current.observe(page);
    });
  };

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description on document load success
   */
  const onDocumentLoadSuccess = ({ numPages }) => {
    setCurrentPage(1);
    setNumPages(numPages);
  };

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description on page load success.
   */
  const onPageLoadSuccess = () => {
    setPageNoObserver();
  };

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description to add or remove bookmark.
   */
  const onPressBookmark = () => {
    const bookmarkData = {
      pageNo: currentPage,
      createdAt: new Date(),
    };
    isCurrentPageBookmarked
      ? dispatch(removeBookmark(bookmarkData))
      : dispatch(addBookmark(bookmarkData));
  };

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description to zoom in page.
   */
  const onPressZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 5));
  };

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description to zoom out page
   */
  const onPressZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 1));
  };

  return (
    <div
      className="pdfContainer"
      style={{ width: bookmarks.length ? "80%" : "100%" }}
    >
      <div className="pdfViewer__header">
        <h3 className="pdfViewer__title">
          {pdfFile ? pdfFile?.name : getFileNameFromUrl(samplePdf)}
        </h3>
      </div>
      <div className="pdfViewer" ref={pdfRef}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={index} className="pdf-page" data-page-number={index + 1}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                onLoadSuccess={onPageLoadSuccess}
              />
              <br />
            </div>
          ))}
        </Document>
      </div>
      <div className="pdfViewer__options">
        <div className="pdfViewer__pages">
          <p className="pdfViewer__current-page">{currentPage}</p>
          <p className="pdfViewer__total-pages">/ {numPages}</p>
        </div>
        <div className="pdfViewer__zoom">
          <i onClick={onPressZoomOut} className="pdfViewer__zoomout-icon">
            <FaMinusCircle />
          </i>
          <p className="pdfViewer__scale-value">{scale.toFixed(2)}</p>
          <i onClick={onPressZoomIn} className="pdfViewer__zoomin-icon">
            <FaPlusCircle />
          </i>
        </div>
        <div className="pdfViewer__save-icon-wrapper">
          <i onClick={onPressBookmark} className="pdfViewer__save-icon">
            {isCurrentPageBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </i>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
