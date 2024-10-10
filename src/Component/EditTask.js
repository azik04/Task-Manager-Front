import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const EditTask = ({ id, onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/Task/${id}`);
                const task = res.data.data;
                setTaskName(task.taskName);
                setTaskDescription(task.taskDescription);
                setStatus(task.status);
                setPriority(task.priority);
                setDeadLine(task.deadLine);
            } catch (error) {
                console.error('Vəzifə detallarını alarkən xəta', error);
                setError('Vəzifə detallarını əldə etmək mümkün olmadı.');
            }
        };

        if (id) {
            fetchTaskDetails();
        }
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError('');
        setErrors({}); 

        try {
            const res = await axios.put(`http://test.loc/api/Task?id=${id}`, {
                taskName,
                taskDescription,
                status,
                priority,
                deadLine,
            });
            console.log("Yeniləmə uğurlu oldu", res.data.data);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Vəzifəni Düzəlt</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Bağla" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <form onSubmit={handleUpdate}>
                        <div className="pop-order-main-one">
                            <p>Vəzifənin Adı</p>
                            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                            {errors.TaskName && <span className="error">{errors.TaskName[0]}</span>} 
                        </div>
                        <div className="pop-order-main-one">
                            <p>Vəzifə Təsviri</p>
                            <input type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                            {errors.TaskDescription && <span className="error">{errors.TaskDescription[0]}</span>}
                        </div>
                        <div className="pop-order-main-one">
                            <p>Status</p>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="" disabled>Status seçin</option>
                                <option value="Prosesdedir">Prosesdedir</option>
                                <option value="Riskdə">Riskdə</option>
                                <option value="Gecikmiş">Gecikmiş</option>
                            </select>
                            {errors.Status && <span className='Error'>{errors.Status[0]}</span>} 
                        </div>
                        <div className="pop-order-main-one">
                            <p>Prioritet</p>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                                <option value="" disabled>Prioritet seçin</option>
                                <option value="Aşağı">Aşağı</option>
                                <option value="Orta">Orta</option>
                                <option value="Yüksək">Yüksək</option>
                            </select>
                            {errors.Priority && <span className='Error'>{errors.Priority[0]}</span>} 
                        </div>
                        <div className="pop-order-main-one">
                            <p>Son Tarix</p>
                            <input type="date" value={deadLine} onChange={(e) => setDeadLine(e.target.value)} />
                            {errors.DeadLine && <span className='Error'>{errors.DeadLine[0]}</span>} 
                        </div>
                        <div className="pop-order-main-footer">
                            <div className="pop-order-main-footer-date"></div>
                            <div className="pop-order-main-footer-btn">
                                <button className='pop-order-main-footer-btn-all' type="submit">Yenilə</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditTask;
