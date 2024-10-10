import React, { useState } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';

const CreateUser = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [errors, setErrors] = useState({}); 

    const createUser = async () => {
        setErrors({});
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const response = await axios.post('http://test.loc/api/User/register', {
                email: email,
                password: password,
                userName: userName
            });
            onClose();
            window.location.reload(); 
        } catch (error) {
            console.log(error);
            if (error.response) {
                const { data } = error.response;
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.description) {
                    setErrors({ general: data.description }); 
                } 
            } 
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>İstifadəçi Yarat</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
                    <div className="pop-order-main-one">
                        <p>İstifadəçi Adı</p>
                        <input type="text" placeholder="İstifadəçi Adı" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        {errors.UserName && <span className="error">{errors.UserName[0]}</span>}
                    </div>
                    <div className="pop-order-main-one">
                        <p>Email</p>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.Email && <span className="error">{errors.Email[0]}</span>} 
                    </div>
                    <div className="pop-order-main-one">
                        <p>Şifrə</p>
                        <input type="text" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.Password && <span className="error">{errors.Password[0]}</span>} 
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={createUser}>Tamamla</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateUser;
