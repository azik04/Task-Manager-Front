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
                const res = await axios.get('https://localhost:7146/api/User');
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
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
            await axios.post('https://localhost:7146/api/Task', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Task created successfully");
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
                        <h2>Create Task</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={createTask} className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Task Name</p>
                        <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                        {errors.TaskName && <span className='error'>{errors.TaskName[0]}</span>} {/* Show first error only */}

                        <p>Description</p>
                        <textarea placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                        {errors.TaskDescription && <span style={{ color: 'red' }}>{errors.TaskDescription[0]}</span>} {/* Show first error only */}

                        <div className="pop-order-main-one">
                            <p>Status</p>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="" disabled>Select status</option>
                                <option value="on track">On Track</option>
                                <option value="at risk">At Risk</option>
                                <option value="behind">Behind</option>
                            </select>
                            {errors.Status && <span className='error'>{errors.Status[0]}</span>}
                        </div>

                        <div className="pop-order-main-one">
                            <p>Priority</p>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} >
                                <option value="" disabled>Select priority</option>
                                <option value="low">Low</option>
                                <option value="mid">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.Priority && <span className='error'>{errors.Priority[0]}</span>}
                        </div>

                        <p>Deadline</p>
                        <input type="date" value={deadLine} onChange={(e) => setDeadLine(e.target.value)}  min={today} />
                        {errors.DeadLine && <span className='error'>{errors.DeadLine[0]}</span>}
                        <div className="pop-order-main-one">
                            <p>Executive User</p>
                            <select className='pop-order-main-one-select' value={executiveUserId} onChange={(e) => setExecutiveUserId(e.target.value)} required>
                                <option value="" disabled>Select an executive user</option>
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
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateTask;
