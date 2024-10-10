import React from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const RemoveComment = ({ onClose, commentId }) => {
    const remItem = async () => {
        try {
            const response = await axios.delete(`http://test.loc/api/Comment?id=${commentId}`);
            console.log('Şərh uğurla silindi', response.data);
            onClose();
            window.location.reload(); 
        } catch (error) {
            console.error("Şərhi silərkən xəta:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Şərhi Sil</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Bu şərhi silmək istəyirsinizmi?</p>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={remItem}>Sil</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveComment;
