import {
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./FileItem.module.css";

export default function FileItem({ file, deleteFile }) {
  return (
    <li className={classes["list-items"]}>
      <FontAwesomeIcon icon={faFileAlt} />
      <p>{file.name}</p>
      <p>{file.createdAt}</p>
      <div className={classes.actions}>
        {file.isUploading && (
          <FontAwesomeIcon
            className={`${classes.fileItem} fa-spin`}
            icon={faSpinner}
          />
        )}
        {!file.isUploading && (
          <FontAwesomeIcon
            className={classes.trash}
            icon={faTrash}
            onClick={() => deleteFile(file.name)}
          />
        )}
      </div>
    </li>
  );
}
