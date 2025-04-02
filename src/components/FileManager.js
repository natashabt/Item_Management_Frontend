// src/FileManager.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileManager = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [filename, setFileName] = useState('');
    const navigate = useNavigate();



    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
                auth: {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password'),
                },
            });
            var txt = response.data
            setFileName(txt.split(': ')[1]);
            setMessage(response.data);
            setFile(null); // Clear the file input after successful upload
        } catch (error) {
            setMessage('File upload failed. Please try again.');
        }
    };

    const handleFileDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/files/download/${filename}`, {
                responseType: 'blob',
                auth: {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password'),
                },
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setMessage(`Downloaded: ${filename}`);
        } catch (error) {
            setMessage('File download failed. Please try again.');
        }
    };

    return (
        <div className='container mt-5'>
            <button className="btn btn-secondary" onClick={() => {navigate('/items')}}>Back</button>
            <h3>Upload File</h3>
            <input type="file" className="mb-3" onChange={handleFileChange} />
            <button onClick={handleFileUpload} className='btn btn-info mb-3'>Upload</button>
            <p>{message}</p>
            <button onClick={handleFileDownload} className="btn btn-info mb-3">Download {filename}</button>
        </div>
    );
};

export default FileManager;
