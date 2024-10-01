import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateTask from '../Component/CreateTask';

const Tasks = () => {
    const [items, setItems] = useState([]);  
    const [done, setDone] = useState([]);
    const [userNames, setUserNames] = useState({}); 
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
                console.error('Tamamlanmamış tapşırıqları əldə edərkən xəta:', error);
                setItems([]);
            }
        };
        fetchNotDone();
    }, [themeId]);

    useEffect(() => {
        const fetchDone = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Task/done?themeId=${themeId}`);
                setDone(res.data.data);
            } catch (error) {
                console.error('Tamamlanmış tapşırıqları əldə edərkən xəta:', error);
                setDone([]);
            }
        };
        fetchDone();
    }, [themeId]);

    const fetchUserNames = async (tasks) => {
        const userIds = [...new Set(tasks.map(task => task.executiveUserId))];
    
        if (userIds.length === 0) {
            console.log("İstifadəçi ID-ləri tapılmadı.");
            return; 
        }
    
        const userMap = {};
    
        await Promise.all(userIds.map(async (id) => {
            try {
                const response = await axios.get(`https://localhost:7146/api/User/${id}`);
                
                console.log(`İstifadəçi ID ${id} üçün cavab:`, response.data.data);
                
                if (response.data.data && response.data.data.id && response.data.data.userName) {
                    userMap[response.data.data.id] = response.data.data.userName; 
                } else {
                    console.warn(`ID ${id} üçün istifadəçi məlumatları gözlənilən sahələri əskikdir.`);
                }
            } catch (error) {
                console.error(`ID ${id} üçün xəta:`, error);
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
            console.error('Tapşırığı tamamlarkən xəta:', error);
        }
    };

    return (
        <main>
            <div className="main">
                {/* Tamamlanmamış tapşırıqlar bölməsi */}
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Tamamlanmamış</h2>
                        <p><strong>Cəmi: {items.length} tapşırıq</strong></p>
                    </div>
                    <div className="navbar-content-menu-options">
                        <div className="navbar-content-menu-options-new">
                            <button onClick={handleOpenCreatePopup}>
                                <p>Yeni Tapşırıq Əlavə Et</p>
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
                                <th>No</th> {/* Changed to No */}
                                <th>Tapşırıq Adı</th>
                                <th>Status</th>
                                <th>Prioritet</th>
                                <th>İcraçı</th>
                                <th>Son Tarix</th>
                                <th>Daha çox</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => ( // Added index here
                                    <tr key={item.id}>
                                        <td className='NotDone_Sub'>
                                            <i onClick={() => compTask(item.id)} className="fa-regular fa-circle-check"></i>
                                        </td>
                                        <td>{index + 1}</td> {/* Changed to index + 1 */}
                                        <td>{item.taskName}</td>
                                        <td>{item.status}</td>
                                        <td>{item.priority}</td>
                                        <td>{userNames[item.executiveUserId] || 'Yüklənir...'}</td>
                                        <td>{item.deadLine}</td>
                                        <td>
                                            <Link to={`/Task/${item.id}`}>Daha çox</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Tapşırıq mövcud deyil</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tamamlanmış tapşırıqlar bölməsi */}
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Tamamlanmış</h2>
                        <p><strong>Cəmi: {done.length} tapşırıq</strong></p>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>No</th> {/* Changed to No */}
                                <th>Tapşırıq Adı</th>
                                <th>Status</th>
                                <th>Prioritet</th>
                                <th>İcraçı</th>
                                <th>Son Tarix</th>
                                <th>Daha çox</th>
                            </tr>
                        </thead>
                        <tbody>
                            {done.length > 0 ? (
                                done.map((item, index) => ( // Added index here
                                    <tr key={item.id}>
                                        <td className='Done_Sub'>
                                            <i onClick={() => compTask(item.id)} className="fa-regular fa-circle-check"></i>
                                        </td>
                                        <td>{index + 1}</td> {/* Changed to index + 1 */}
                                        <td>{item.taskName}</td>
                                        <td>{item.status}</td>
                                        <td>{item.priority}</td>
                                        <td>{userNames[item.executiveUserId] || 'Yüklənir...'}</td>
                                        <td>{item.deadLine}</td>
                                        <td>
                                            <Link to={`/Task/${item.id}`}>Daha çox</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Tapşırıq mövcud deyil</td>
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
