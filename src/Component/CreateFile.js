import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';  

const CreateFile = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(''); 
    const [formErrors, setFormErrors] = useState({}); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(''); 
        setFormErrors({}); 
    };

    const fetchPost = async () => {
        if (!file) {
            setFormErrors({ File: ['Yükləmək üçün bir fayl seçin.'] }); 
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('taskId', id);  
        
        try {
            await axios.post(`http://test.loc/api/File/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Fayl müvəffəqiyyətlə yükləndi");
            onClose(); 
            window.location.reload();
        } catch (error) {
            console.error("Fayl yüklənərkən xəta", error);
            if (error.response && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                setFormErrors(validationErrors);
            } else {
                setError('Fayl yüklənərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.'); 
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Item Yarat</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    {error && <div className="error-message">{error}</div>} 
                    <div className="pop-order-main-one">
                        <p>Fayl</p>
                        <input type="file" onChange={handleFileChange} />
                        {formErrors.File && <span className="error">{formErrors.File[0]}</span>}
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={fetchPost}>Tamam</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateFile;
