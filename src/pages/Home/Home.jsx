import { useRef } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const pdfFileInput = useRef(null);
  const navigate = useNavigate();

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description to handle pdf file input click
   */
  const handleClick = () => {
    pdfFileInput.current.click();
  };

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description on choose pdf file
   */
  const onChooseFile = (event) => {
    const fileUploaded = event.target.files[0];
    navigate("/pdfView", {
      state: {
        pdfFile: fileUploaded,
      },
    });
  };

  return (
    <div className="home">
      <div className="home__container">
        <h2>Choose your PDF : </h2>
        <br />
        <button className="button-upload" onClick={handleClick}>
          Upload a file
        </button>

        <input
          type="file"
          onChange={onChooseFile}
          ref={pdfFileInput}
          accept="application/pdf"
          style={{ display: "none" }}
        />
        <br />
        <hr className="home__separator" />
        <br />
        <Link className="home__btn" to={"/pdfView"}>
          Go with sample PDF
        </Link>
      </div>
    </div>
  );
}

export default Home;
