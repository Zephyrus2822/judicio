import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('/api/documents'); // Add API route to fetch saved documents
      setDocuments(response.data);
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Your Documents</h2>
      <ul>
        {/* {documents.map((doc, index) => (
          <li key={index}>
            {doc.documentType} - <a href={doc.documentURL}>View</a> - Issued By: {doc.issuedBy}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default DocumentList;
