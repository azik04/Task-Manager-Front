import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateTask from '../Component/CreateTask';

const Tasks = () => {
    const [items, setItems] = useState([]); // Not done tasks
    const [done, setDone] = useState([]); // Done tasks
    const [userNames, setUserNames] = useState({}); // To store user names
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const { themeId } = useParams();

    const handleOpenCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const handleCloseCreatePopup = () => {
        setCreatePopupVisible(false);
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchNotDone = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Task/notdone?themeId=${themeId}`);
                setItems(res.data.data);
                fetchUserNames(res.data.data); 
            } catch (error) {
                console.error('Error fetching not done tasks:', error);
                setItems([]);
            }
        };
        fetchNotDone();
    }, [themeId]);
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
    useEffect(() => {
        const fetchDone = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Task/done?themeId=${themeId}`);
                setDone(res.data.data);
            } catch (error) {
                console.error('Error fetching done tasks:', error);
                setDone([]);
            }
        };
        fetchDone();
    }, [themeId]);

    const fetchUserNames = async (tasks) => {
        const userIds = [...new Set(tasks.map(task => task.executiveUserId))];
    
        if (userIds.length === 0) {
            console.log("No user IDs found.");
            return; 
        }
    
        const userMap = {};
    
        await Promise.all(userIds.map(async (id) => {
            try {
                const response = await axios.get(`https://localhost:7146/api/User/${id}`);
                
                console.log(`Response for user ID ${id}:`, response.data.data);
                
                if (response.data.data && response.data.data.id && response.data.data.userName) {
                    userMap[response.data.data.id] = response.data.data.userName; 
                } else {
                    console.warn(`User data for ID ${id} is missing expected fields.`);
                }
            } catch (error) {
                console.error(`Error fetching user ID ${id}:`, error);
            }
        }));
    
        setUserNames(userMap);
    };
    

    
    
    
    

    const compTask = async (id) => {
        try {
            await axios.put(`https://localhost:7146/api/Task/complite/${id}`, null, {
                headers: { 'Accept': '*/*' }
            });
            window.location.reload();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <main>
            <div className="main">
                {/* Not Done Tasks Section */}
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Not Completed</h2>
                        <p><strong>Total: {items.length} tasks</strong></p>
                    </div>
                    <div className="navbar-content-menu-options">
                        <div className="navbar-content-menu-options-new">
                            <button onClick={handleOpenCreatePopup}>
                                <p>Add New Task</p>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Executor</th>
                                <th>Deadline</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <tr key={item.id}>
                                        <td className='Done_done'>
                                            <i onClick={() => compTask(item.id)} className="fa-regular fa-circle-check"></i>
                                        </td>
                                        <td>{item.id}</td>
                                        <td>{item.taskName}</td>
                                        <td>{item.taskDescription}</td>
                                        <td>{item.status}</td>
                                        <td>{item.priority}</td>
                                        <td>{userNames[item.executiveUserId] || 'Loading...'}</td>
                                        <td>{item.deadLine}</td>
                                        <td>
                                            <Link to={`/Task/${item.id}`}>More</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No tasks available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Done Tasks Section */}
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Completed</h2>
                        <p><strong>Total: {done.length} tasks</strong></p>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {done.length > 0 ? (
                                done.map((item) => (
                                    <tr key={item.id}>
                                        <td className='Done_done'>
                                            <i onClick={() => compTask(item.id)} className="fa-regular fa-circle-check"></i>
                                        </td>
                                        <td>{item.id}</td>
                                        <td>{item.taskName}</td>
                                        <td>{item.taskDescription}</td>
                                        <td>{item.status}</td>
                                        <td>{item.priority}</td>
                                        <td>{item.deadLine}</td>
                                        <td>
                                            <Link to={`/Task/${item.id}`}>More</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No tasks available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isCreatePopupVisible && <CreateTask onClose={handleCloseCreatePopup} />}
        </main>
    );
};

export default Tasks;
