import { useState } from "react";
import Breadcrumb from '../../component/breadcrumb/Breadcrumb';

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    documentName: "",
    documentType: "",
    file: null,
    filePreviewUrl: null,
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, file, filePreviewUrl: fileUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.documentName || !formData.documentType || !formData.file) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    alert("Document uploaded successfully!");
    setFormData({
      documentName: "",
      documentType: "",
      file: null,
      filePreviewUrl: null,
    });
  };

  const breadcrumbLinks = [
    { label: "Home", to: "/" },
    { label: "Settings" },
  ];

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <Breadcrumb links={breadcrumbLinks} />
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Document Name */}
        <div>
          <label className="block mb-1 font-medium">Document Name *</label>
          <input
            type="text"
            name="documentName"
            value={formData.documentName}
            onChange={handleInputChange}
            placeholder="Enter document name"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Document Type */}
        <div>
          <label className="block mb-1 font-medium">Document Type *</label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="Report">Report</option>
            <option value="Invoice">Invoice</option>
            <option value="Policy">Policy</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium">Document File *</label>
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg, .txt"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* File Preview */}
        {formData.filePreviewUrl && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Document Preview:</h3>
            {formData.file.type.startsWith("image/") ? (
              <img
                src={formData.filePreviewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded"
              />
            ) : formData.file.type === "application/pdf" ? (
              <iframe
                src={formData.filePreviewUrl}
                title="PDF Preview"
                className="w-full h-64 border rounded"
              ></iframe>
            ) : formData.file.type === "text/plain" ? (
              <iframe
                src={formData.filePreviewUrl}
                title="Text Preview"
                className="w-full h-32 border rounded"
              ></iframe>
            ) : (
              <p>Preview not available for this file type.</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Document
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;