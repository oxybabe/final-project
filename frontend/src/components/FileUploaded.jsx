import React, { useRef } from "react";

const FileUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);
  const handleFileInput = (event) => {
    onFileSelect(event.target.files[0]);
    
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
 
    </div>
  );
};
//To create a custom file uploader, hide the default input and trigger the change event using a ref.
export default FileUploader;
