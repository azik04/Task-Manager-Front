import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const AddToTask = ({ onClose, taskId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://test.loc/${taskId}/GetUnassignedUsers`);
                console.log("İstifadəçilər", res);
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('İstifadəçiləri əldə edərkən xəta:', error);
                setErrors({ general: 'İstifadəçiləri əldə edərkən xəta baş verdi.' });
            }
        };

        fetchUsers();
    }, []);

    const handleAddToTask = async () => {
        setErrors({});

        try {
            if (!selectedUserId) {
                setErrors({ userId: 'Zəhmət olmasa, istifadəçi seçin.' });
                return;
            }

            await axios.post(`http://test.loc/api/UserTask/${taskId}/users/${selectedUserId}`);
            setSuccess('İstifadəçi tapşırığa müvəffəqiyyətlə əlavə edildi.');
            onClose(); 
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'İstifadəçini tapşırığa əlavə edərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' });
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>İstifadəçini Tapşırığa Əlavə Et</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>} 
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div className="pop-order-main-one">
                        <p>İstifadəçi Seçin:</p>
                        <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
                            <option value="" disabled>İstifadəçi seçin</option>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>İstifadəçi yoxdur</option>
                            )}
                        </select>
                        {errors.userId && <span className="error">{errors.userId}</span>} 
                    </div>
                    <div className="pop-order-main-footer">
                    <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button className='pop-order-main-footer-btn-all' onClick={handleAddToTask}>Tamam</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddToTask;
