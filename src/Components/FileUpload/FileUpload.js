import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./FileUpload.module.css";

export default function FileUpload({ files, setFiles, removeFile }) {
  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);
    // console.log(file);

    // upload file
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        file.isUploading = false;
        file.createdAt = new Date(file.lastModified).toLocaleString();
        setFiles([...files, file]);
      })
      .catch((err) => {
        // console.log("inform user");
        console.log(err);
        removeFile(file.name);
      });
  };
  return (
    <div className={classes.fileCards} s>
      <div className={classes.fileInputs}>
        <input
          className={classes.input}
          type="file"
          onChange={fileUploadHandler}
        />
        <button className={classes.button}>
          <i>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          Upload
        </button>
      </div>
      <p className={classes.main}>Supported files</p>
      <p className={classes.info}>PDF, JPG, PNG</p>
    </div>
  );
}
