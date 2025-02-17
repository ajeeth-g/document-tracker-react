import { useState, useRef } from "react";
import { FilePlus2 } from "lucide-react";
import Table from "../components/Table";
import Button from "../components/Button";
import Search from "../components/InputSearch";

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [tableData, setTableData] = useState([]);
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    refNo: "",
    documentName: "",
    uploadDate: "",
    category: "",
    branch: "",
    uploaderName: "",
    uploaderDesignation: "",
    currentStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "uploadDate" && value) {
      const dateObj = new Date(value);
      const day = dateObj.getDate().toString().padStart(2, "0"); // Ensure two-digit day
      const month = dateObj.toLocaleString("en-US", { month: "short" }); // Get short month name (e.g., Feb)
      const year = dateObj.getFullYear(); // Get full year

      formattedValue = `${day}-${month}-${year}`; // Convert to 'DD-MMM-YYYY' format
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const convertToInputDate = (formattedDate) => {
    if (!formattedDate) return ""; // Avoid errors if empty

    const [day, month, year] = formattedDate.split("-");
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1; // Convert month name to number
    const monthStr = monthIndex.toString().padStart(2, "0"); // Ensure two-digit month

    return `${year}-${monthStr}-${day}`; // Convert back to 'YYYY-MM-DD' format
  };

  const generateNextRefNo = () => {
    if (documents.length === 0) {
      return "1001"; // Start with 1001 if no documents exist
    }
    // Get last refNo and increment
    const lastRefNo = parseInt(documents[documents.length - 1].refNo, 10);
    return (lastRefNo + 1).toString();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.documentName.trim()) {
      alert("Please enter a document name!");
      return;
    }

    const newRefNo = generateNextRefNo();

    const newDocument = { ...formData, refNo: newRefNo };

    setDocuments([...documents, newDocument]);

    setTableData((prev) => [...prev, newDocument]);

    setFormData({
      refNo: "",
      documentName: "",
      uploadDate: "",
      category: "",
      branch: "",
      uploaderName: "",
      uploaderDesignation: "",
      currentStatus: "",
    });

    // alert(`Document saved successfully with Ref No: ${newRefNo}`);

    modalRef.current.close();
  };

  return (
    <>
      <div className="flex items-end justify-between mb-8">
        <Search />
        <Button
          className="btn btn-success"
          icon={<FilePlus2 className="h-4 w-4" />}
          onClick={() => modalRef.current.showModal()}
          label="Add Document"
        />
      </div>

      <dialog ref={modalRef} id="add-document-details" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => modalRef.current.close()}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Document Details</h3>
          <div className="divider"></div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="grid grid-cols-4 gap-4">
                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Document Name</span>
                  <input
                    type="text"
                    name="documentName"
                    value={formData.documentName}
                    onChange={handleChange}
                    placeholder="Enter document name"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Upload Date</span>
                  <input
                    type="date"
                    name="uploadDate"
                    value={
                      formData.uploadDate
                        ? convertToInputDate(formData.uploadDate)
                        : ""
                    }
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Category</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Passport">Passport</option>
                    <option value="Aadhar">Aadhar</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Branch/Division</span>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="" disabled>
                      Select Branch/Division
                    </option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pollachi">Pollachi</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Uploader Name</span>
                  <input
                    type="text"
                    name="uploaderName"
                    value={formData.uploaderName}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Uploader Designation</span>
                  <select
                    name="uploaderDesignation"
                    value={formData.uploaderDesignation}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="" disabled>
                      Select Designation
                    </option>
                    <option value="designation 1">Designation 1</option>
                    <option value="designation 2">Designation 2</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Current Status</span>
                  <select
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => modalRef.current.close()}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <Table data={tableData} />
    </>
  );
};

export default DocumentUpload;
