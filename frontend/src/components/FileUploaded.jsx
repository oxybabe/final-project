import React, { useRef } from "react";

const FileUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);
  const handleFileInput = (event) => {
    onFileSelect(event.target.files[0]);
    
    //   if (file.size > 1024)
    //     onFileSelectError({ error: "File size cannot exceed 1MB" });
    //   else onFileSelectSuccess(file);
    //   onFileSelect(event.target.files[0]);
    // };
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
      {/* <button
        onClick={(event) => fileInput.current && fileInput.current.click()}
        className="btn btn-primary"
      /> */}
    </div>
  );
};
//To create a custom file uploader, hide the default input and trigger the change event using a ref.
export default FileUploader;
