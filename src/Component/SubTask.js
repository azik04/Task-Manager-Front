import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '../Photos/Delate.svg'; 
import { useParams } from 'react-router-dom';
import CreateSubTask from './CreateSubTask';
import RemoveSubTask from './RemoveSubTask';

const SubTask = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [doneItems, setDoneItems] = useState([]); 
    const [notDoneItems, setNotDoneItems] = useState([]); 
    const { id } = useParams();

    // Fetch Not Done sub-tasks
    useEffect(() => {
        const fetchNotDone = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/SubTask/${id}/NotDone`);
                console.log("Fetched Not Done SubTasks:", res.data.data);
                setNotDoneItems(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (error) {
                console.error('Error fetching Not Done data', error);
                setNotDoneItems([]);
            }
        };

        fetchNotDone();
    }, [id]);

    // Fetch Done sub-tasks
    useEffect(() => {
        const fetchDone = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/SubTask/${id}/Done`);
                console.log("Fetched Done SubTasks:", res.data.data);
                setDoneItems(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (error) {
                console.error('Error fetching Done data', error);
                setDoneItems([]);
            }
        };

        fetchDone();
    }, [id]);

    const compTask = async (subTaskId) => {
        try {
            const res = await axios.put(`http://test.loc/api/SubTask/${subTaskId}/Complite`, null, {
                headers: { 'Accept': '*/*' }
            });
            console.log(res);
            window.location.reload();
        } catch (error) {
            console.error('Error completing sub-task:', error);
        }
    };

    const openCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopup = () => {
        setCreatePopupVisible(false);
    };

    const openRemovePopup = (subId) => {
        console.log("Opening remove popup for subId:", subId); 
        setRemoveId(subId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopup = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className="main-table">
            <div className="subtask-container">
                <div className="subtask-container-name">
                    <h2>Alt Tapşırıqlar</h2>
                    <a href='#' onClick={openCreatePopup}>   <i className="fa-solid fa-plus"></i> Əlavə et</a>
                </div>

                <h3>Tamamlanmamış Alt Tapşırıqlar</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th> 
                            <th>Tapşırıq Adı</th>
                            <th>Prioritet</th>
                            <th>Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notDoneItems.length > 0 ? (
                            notDoneItems.map((item, index) => ( 
                                <tr key={item.id}>
                                    <td className='NotDone_Sub'>
                                        <i onClick={() => compTask(item.id)} className="fa-regular fa-circle-check"></i>
                                    </td>
                                    <td>{index + 1}</td> 
                                    <td>{item.name}</td>
                                    <td>{item.priority}</td>
                                    <td>
                                        <a href="#" onClick={() => openRemovePopup(item.id)}>
                                            <img src={DeleteIcon} alt="Sil" />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Alt tapşırıq mövcud deyil</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h3>Tamamlanmış Alt Tapşırıqlar</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th> 
                            <th>Tapşırıq Adı</th>
                            <th>Prioritet</th>
                            <th>Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doneItems.length > 0 ? (
                            doneItems.map((item, index) => ( 
                                <tr key={item.id}>
                                    <td className='Done_Sub'>
                                        <i className="fa-regular fa-circle-check"></i>
                                    </td>
                                    <td>{index + 1}</td> 
                                    <td>{item.name}</td>
                                    <td>{item.priority}</td>
                                    <td>
                                        <a href="#" className='pagin-btn' onClick={() => openRemovePopup(item.id)}>
                                            <img src={DeleteIcon} alt="Sil" />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Alt tapşırıq mövcud deyil</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {isCreatePopupVisible && <CreateSubTask onClose={closeCreatePopup} />}
                {isRemovePopupVisible && removeId !== null && (
                    <RemoveSubTask subId={removeId} onClose={closeRemovePopup} />
                )}
            </div>
        </div>
    );
};

export default SubTask;
