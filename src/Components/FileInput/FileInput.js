import React from 'react';
import './FileInput.css'
const FileInput = () => {
    return (
        <div className="file-input">
            <input type="file" id="file" className="file" />
            <label htmlFor="file">UPLOAD IMAGE</label>
        </div>
    );
};

export default FileInput;