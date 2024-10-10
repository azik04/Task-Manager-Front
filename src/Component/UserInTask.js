import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Delate from '../Photos/Delate.svg';
import { useParams } from 'react-router-dom';
import AddToTask from './AddToTask';
import RemoveUserFromTask from './RemoveUserFromTask';

const UserInTask = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const { id } = useParams(); // Task ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/UserTask/${id}/users`);
                console.log("Users", res.data);
                setItems(res.data || []);
            } catch (error) {
                console.error('Error fetching data', error);
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

    const openRemovePopup = (userId) => {
        setRemoveId(userId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopup = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className="main-info-block">
            <div className="main-info-block-header">
                <div className="main-info-block-header-left">
                    <p>İstifadəçilərı Düzəlt</p>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={openCreatePopup}><i className="fa-solid fa-plus"></i> Əlavə et</a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td className="bold">{item.userName}</td>
                                    <td className="action-column">
                                         <a href="#" className='pagin-btn' onClick={() => openRemovePopup(item.id)}>
                                            <img src={Delate} alt="Sil" />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">İstifadəçi tapılmadı</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isCreatePopupVisible && <AddToTask onClose={closeCreatePopup} taskId={id} />}
            {isRemovePopupVisible && removeId !== null && (
                <RemoveUserFromTask onClose={closeRemovePopup} userId={removeId} taskId={id} />
            )}
        </div>
    );
};

export default UserInTask;
