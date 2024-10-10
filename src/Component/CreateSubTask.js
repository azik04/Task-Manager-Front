import React, { useState, useEffect } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateSubTask = ({ onClose }) => {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState([]);
    const { id } = useParams(); 

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
        try {
            const res = await axios.post(`http://test.loc/api/SubTask`, {
                name: name,
                priority: priority,
                userId: userId,
                taskId: id
            });

            console.log("Alt tapşırıq müvəffəqiyyətlə yaradıldı", res.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Alt tapşırıq yaradılarkən xəta:", error.response.data.errors);
                setErrors(error.response.data.errors);
            }

    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Alt Tapşırığı Yarat</h2>
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
                        {errors.Name && <span className='error'>{errors.Name[0]}</span>} 
                        <p>Prioritet</p>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                            <option value="" disabled>Prioritet seçin</option>
                            <option value="Aşağı">Aşağı</option>
                            <option value="Orta">Orta</option>
                            <option value="Yüksək">Yüksək</option>
                        </select>
                         {errors.Priority && <span className='error'>{errors.Priority[0]}</span>} 

                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={fetchNew}>Tamamla</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateSubTask;
