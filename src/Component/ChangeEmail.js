import React, { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const ChangeEmail = ({ onClose, userId }) => {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errors, setErrors] = useState({}); 

    const chgEmail = async () => {
        setErrors({}); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const res = await axios.put(`http://test.loc/api/User/ChangeEmail?id=${userId}`, {
                oldEmail,
                newEmail
            });
            setOldEmail('');
            setNewEmail('');
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'E-poçtu dəyişərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' });
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>E-poçtu Dəyişdir</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>} 
                    <div className="pop-order-main-one">
                        <p>Keçmiş E-poçt</p>
                        <input 
                            type="text" 
                            placeholder="Keçmiş E-poçt" 
                            value={oldEmail} 
                            onChange={(e) => setOldEmail(e.target.value)} 
                        />
                        {errors.OldEmail && <span className="error">{errors.OldEmail[0]}</span>}
                    </div>
                    <div className="pop-order-main-one">
                        <p>Yeni E-poçt</p>
                        <input 
                            type="text" 
                            placeholder="Yeni E-poçt" 
                            value={newEmail} 
                            onChange={(e) => setNewEmail(e.target.value)} 
                        />
                        {errors.NewEmail && <span className="error">{errors.NewEmail[0]}</span>} 
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={chgEmail}>Tamam</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeEmail;
