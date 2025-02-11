import { useState, useEffect } from "react";
import { assignDocument, fetchDocuments } from "../../api/DocumentApi";

const AssignDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      const response = await fetchDocuments();
      setDocuments(response.data);
    };
    loadDocuments();
  }, []);

  const handleAssign = async () => {
    if (!selectedDoc || !assignee) return alert("Complete all fields");

    try {
      await assignDocument({ documentId: selectedDoc, assignee });
      alert("Document assigned successfully!");
    } catch (error) {
      console.error("Assignment error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Assign Document</h2>
      <select value={selectedDoc} onChange={(e) => setSelectedDoc(e.target.value)}>
        <option value="">Select Document</option>
        {documents.map((doc) => (
          <option key={doc.document_id} value={doc.document_id}>
            {doc.document_name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Assignee Name"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        className="ml-2 p-1 border"
      />
      <button onClick={handleAssign} className="bg-green-500 text-white p-2 ml-2">
        Assign
      </button>
    </div>
  );
};

export default AssignDocument;