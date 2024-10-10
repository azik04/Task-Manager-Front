import React, { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const ChangeRole = ({ onClose, userId }) => {
    const [newRole, setNewRole] = useState('');

    const chgRole = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const res = await axios.put(`http://test.loc/api/User/ChangeRole?id=${userId}`, {
                newRole: newRole,
            });
            console.log(res);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Rol dəyişdirərkən xəta:', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Rolu Dəyişdir</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Bu İstifadəçini Admin etmək istəyirsiniz?</p>
                    </div>
                    <div className="pop-order-main-footer">
                    <div className="pop-order-main-footer-date">
                    </div>
                        <div className="pop-order-main-footer-date">
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={chgRole}>Tamam</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeRole;
