import React from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const RemoveUser = ({ onClose, userId }) => {
    const handleRemove = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

            await axios.delete(`http://test.loc/api/User?id=${userId}`); 
            console.log("User removed:", userId);
            window.location.reload(); 
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>İstifadəçini Sil</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Bu istifadəçini silmək istəyirsiniz?</p>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={handleRemove}>Sil</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveUser;
