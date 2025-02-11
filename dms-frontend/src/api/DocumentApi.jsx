import apiClient from "../services/apiClient";

export const fetchDocuments = () => apiClient.get("/documents");

// Mock API to simulate document upload
export const uploadDocument = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Document uploaded:", data);
      resolve({ status: "success", message: "Document uploaded successfully" });
    }, 1000);
  });
};

export const assignDocument = (assignmentData) =>
  apiClient.post("/documents/assign", assignmentData);

export const fetchAssignedDocuments = () =>
  apiClient.get("/documents/assigned");
