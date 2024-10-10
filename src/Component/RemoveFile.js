import axios from 'axios';
import React, { useState } from 'react';
import Photo from '../Photos/Cancel.svg';

const RemoveFile = ({ onClose, documentId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const remItem = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.delete(`http://test.loc/api/File/${documentId}`);
            console.log('Fayl uğurla silindi');
            console.log(response);
            onClose();
            window.location.reload(); 
        } catch (error) {
            setError("Faylı silmək alınmadı. Zəhmət olmasa, yenidən cəhd edin.");
            console.log("Xəta", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Faylı Sil</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Bu faylı silmək istəyirsinizmi?</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={remItem} disabled={loading}>Sil</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveFile;
