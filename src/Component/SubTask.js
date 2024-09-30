import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '../Photos/Delate.svg'; // Ensure this path is correct
import { useParams } from 'react-router-dom';
import CreateSubTask from './CreateSubTask';
import RemoveSubTask from './RemoveSubTask';

const SubTask = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/SubTask/${id}`);
                console.log("Fetched SubTasks:", res.data.data);
                setItems(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (error) {
                console.error('Error fetching data', error);
                setItems([]);
            }
        };

        fetchData();
    }, [id]);

    const openCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopup = () => {
        setCreatePopupVisible(false);
    };

    const openRemovePopup = (subId) => {
        console.log("Opening remove popup for subId:", subId); // Debugging log
        setRemoveId(subId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopup = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className="subtask-container">
            <div className="subtask-container-name">
                <h1>Alt Tapşırıqlar</h1>
                <button onClick={openCreatePopup}>Yeni Tapşırıq Əlavə Et</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Tapşırıq Adı</th>
                        <th>Prioritet</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map(item => (
                            <tr key={item.id}>
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
                            <td colSpan="3">Alt tapşırıq mövcud deyil</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isCreatePopupVisible && <CreateSubTask onClose={closeCreatePopup} />}
            {isRemovePopupVisible && removeId !== null && (
                <RemoveSubTask subId={removeId} onClose={closeRemovePopup} />
            )}
        </div>
    );
};

export default SubTask;
