import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';  

const CreateComment = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const { id } = useParams();  
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    
    const userId = localStorage.getItem('UserId'); 
    
    console.log("userId:", userId); 

    const fetchPost = async () => {
        const commentData = {
            message: message,   
            taskId: id,     
            userId: userId  
        };
        console.log("Göndəriləcək məlumat:", commentData);  

        try {
            const response = await axios.post(`http://test.loc/api/Comment`, commentData);
            console.log("Şərh uğurla yaradıldı", response.data);
            onClose(); 
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setError('Gözlənilməz bir xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.');
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Şərh Yaradın</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Mesaj</p>
                        <input 
                            type="text" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            placeholder="Şərhinizi daxil edin" 
                        />
                        {errors.Message && <span className="error">{errors.Message[0]}</span>} 
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={fetchPost}>Tamamla</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateComment;
