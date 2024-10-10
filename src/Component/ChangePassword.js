import React, { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const ChangePassword = ({ onClose, userId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const chgPsw = async () => {
        setErrors({});
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const res = await axios.put(`http://test.loc/api/User/ChangePassword?id=${userId}`, {
                oldPassword: currentPassword,
                newPassword: newPassword
            });
            console.log("Yeniləndi", res);
            if (res.status === 200) {
                onClose();
                window.location.reload();
            } else {
                setErrors({ general: res.data.description || 'Şifrəni dəyişərkən xəta baş verdi.' });
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Gözlənilməz xəta baş verdi.' });
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Şifrəni Dəyişdir</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>} 
                    <div className="pop-order-main-one">
                        <p>Hazırki Şifrə</p>
                        <input type="password" placeholder="Hazırki Şifrə" onChange={(e) => setCurrentPassword(e.target.value)} />
                        {errors.OldPassword && <span className="error">{errors.OldPassword[0]}</span>}
                    </div>
                    <div className="pop-order-main-one">
                        <p>Yeni Şifrə</p>
                        <input type="password" placeholder="Yeni Şifrə" onChange={(e) => setNewPassword(e.target.value)} />
                        {errors.NewPassword && <span className="error">{errors.NewPassword[0]}</span>} 
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={chgPsw}>Tamam</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
