import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';
import { useParams } from 'react-router-dom';

const CreateTask = ({ onClose }) => {
    const { themeId } = useParams();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [executiveUserId, setExecutiveUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://test.loc/api/User');
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('İstifadəçiləri əldə edərkən xəta:', error);
                setError('İstifadəçiləri əldə etmək mümkün olmadı. Zəhmət olmasa, yenidən cəhd edin.');
            }
        };

        fetchUsers();
    }, []);

    const createTask = async (event) => {
        event.preventDefault();
        setError('');
        setErrors({});
    
        const formData = {
            TaskName: taskName,
            TaskDescription: taskDescription,
            Status: status,
            Priority: priority,
            ThemeId: themeId,
            DeadLine: deadLine,
            ExecutiveUserId: executiveUserId,
        };
    
        try {
            const response = await axios.post('http://test.loc/api/Task', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const taskId = response.data.data.id; 
            await axios.post(`http://test.loc/api/UserTask/${taskId}/users/${executiveUserId}`);
            console.log("TaskId", taskId)
            console.log("Tapşırıq uğurla yaradıldı, ID:", taskId);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setError('Gözlənilməz bir xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.');
            }
        } 
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Tapşırıq Yarat</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={createTask} className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Tapşırıq Adı</p>
                        <input type="text" placeholder="Tapşırıq Adı" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                        {errors.TaskName && <span className='error'>{errors.TaskName[0]}</span>} 

                        <p>Təsvir</p>
                        <textarea placeholder="Tapşırıq Təsviri" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                        {errors.TaskDescription && <span style={{ color: 'red' }}>{errors.TaskDescription[0]}</span>} 

                        <div className="pop-order-main-one">
                            <p>Status</p>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="" disabled>Status seçin</option>
                                <option value="Prosesdedir">Prosesdedir</option>
                                <option value="Riskdə">Riskdə</option>
                                <option value="Gecikmə">Gecikmə</option>
                            </select>
                            {errors.Status && <span className='error'>{errors.Status[0]}</span>}
                        </div>

                        <div className="pop-order-main-one">
                            <p>Prioritet</p>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} >
                                <option value="" disabled>Prioritet seçin</option>
                                <option value="Aşağı">Aşağı</option>
                                <option value="Orta">Orta</option>
                                <option value="Yüksək">Yüksək</option>
                            </select>
                            {errors.Priority && <span className='error'>{errors.Priority[0]}</span>}
                        </div>

                        <p>Son Tarix</p>
                        <input type="date" value={deadLine} onChange={(e) => setDeadLine(e.target.value)} min={today} />
                        {errors.DeadLine && <span className='error'>{errors.DeadLine[0]}</span>}
                        <div className="pop-order-main-one">
                            <p>İcraçı</p>
                            <select className='pop-order-main-one-select' value={executiveUserId} onChange={(e) => setExecutiveUserId(e.target.value)} required>
                                <option value="" disabled>İcraçı istifadəçi seçin</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date"></div>
                        <div className="pop-order-main-footer-btn">
                            <button type="submit" className='pop-order-main-footer-btn-all'>
                            Tamamla
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateTask;
