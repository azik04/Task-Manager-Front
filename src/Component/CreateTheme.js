import React, { useState, useEffect } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';

const CreateTheme = ({ onClose }) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState([]); 

    useEffect(() => {
        const storedUserId = localStorage.getItem("UserId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('Local saxlamada UserId tapılmadı');
        }
    }, []);
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
    const fetchNew = async () => {
        setErrors([]); 
        if (!name.trim()) {
            setErrors(['Mövzu adı tələb olunur.']);
            return;
        }
        console.log("UserId",userId)
        try {
            const res = await axios.post(`https://localhost:7146/api/Theme`, {
                name: name,
                userId: userId
            });

            console.log("Mövzu müvəffəqiyyətlə yaradıldı", res.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Mövzu yaradılarkən xəta:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors.Name || ['Mövzu yaradılarkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.']);
            } else {
                setErrors(['Mövzu yaradılarkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.']); 
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Mövzu Yarat</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Ad</p>
                        <input 
                            type="text" 
                            placeholder="Ad" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        {errors.length > 0 && (
                            <div className="error">
                                {errors.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}
                            </div>
                        )} 
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={fetchNew}>Tamamla</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateTheme;
