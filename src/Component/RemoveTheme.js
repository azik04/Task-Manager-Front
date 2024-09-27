import React from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg'; 

const RemoveTheme = ({ onClose, themeId, setData }) => {
    const remTheme = async () => {
        try {
            await axios.delete(`https://localhost:7146/api/Theme?id=${themeId}`);
            setData((prevData) => prevData.filter(theme => theme.id !== themeId));
            onClose(); 
            window.location.reload()
        } catch (error) {
            console.error('Error removing theme:', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
            <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Layihəni Sil</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Bu Layihəni silmək istəyirsiniz?</p>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={remTheme}>Sil</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveTheme;
