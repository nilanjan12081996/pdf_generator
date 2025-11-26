import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePDF, checkPdfStatus, resetPdfState } from "../../reducers/GenaretePdfSlice";

const GenerateReport = () => {
  const dispatch = useDispatch();

  const { documentId, downloadUrl, loading, status, error } = useSelector(
    (state) => state.generatePdf
  );

  const templateId = "DBFC0971-D020-4765-9768-D445FAE7FA2D";

  // PDF Generate
  const handleGenerateReport = () => {
    dispatch(resetPdfState());
    dispatch(generatePDF(templateId));
  };

  // Auto-check PDF Status every 2 seconds
 useEffect(() => {
  if (documentId) {
    const interval = setInterval(() => {
      dispatch(checkPdfStatus(documentId));
    }, 2000);

    // Stop polling when success
    if (status === "success") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }
}, [documentId, status]);


  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate PDF Report</h2>

      <button
        onClick={handleGenerateReport}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "#4f46e5",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
          fontSize: "16px",
          marginTop: "10px",
        }}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {/* {status && <p><b>Status:</b> {status}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>} */}
      </div>

      {downloadUrl && (
        <a href={downloadUrl} download="AI_Report.pdf">
          <button
            style={{
              padding: "10px 20px",
              background: "#059669",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Download PDF
          </button>
        </a>
      )}
    </div>
  );
};

export default GenerateReport;
