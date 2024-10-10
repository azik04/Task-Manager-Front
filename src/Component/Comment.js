import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Delate from '../Photos/Delate.svg';
import { useParams } from 'react-router-dom';
import CreateComment from '../Component/CreateComment';
import RemoveComment from '../Component/RemoveComment';

const Comment = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const [userNames, setUserNames] = useState({}); 
    const { id } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
    
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const res = await axios.get(`http://test.loc/api/Comment?taskId=${id}`);
                console.log("Şərhlər", res.data);
                const comments = res.data.data || [];
                setItems(comments);
                fetchUserNames(comments); 
            } catch (error) {
                console.error('Məlumat alınarkən xəta baş verdi', error);
            }
        };

        fetchData(id);
    }, [id]);

    const fetchUserNames = async (comments) => {
        const userIds = [...new Set(comments.map(comment => comment.userId))];

        if (userIds.length === 0) {
            console.log("İstifadəçi ID-ləri tapılmadı.");
            return; 
        }

        const userMap = {};

        await Promise.all(userIds.map(async (userId) => {
            try {
                const response = await axios.get(`http://test.loc/api/User/${userId}`);
                console.log(`İstifadəçi ID ${userId} üçün cavab:`, response.data.data);
                userMap[userId] = response.data.data.userName; 
            } catch (error) {
                console.error(`İstifadəçi ID ${userId}-ni alarkən xəta baş verdi:`, error);
            }
        }));

        setUserNames(userMap); 
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const createPopupVisible = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopupVisible = () => {
        setCreatePopupVisible(false);
    };

    const removePopupVisible = (commentId) => {
        setRemoveId(commentId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopupVisible = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className="main-info-block">
            <div className="main-info-block-header">
                <div className="main-info-block-header-left">
                    <p>Şərhləri Düzəliş Et</p>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={createPopupVisible}><i className="fa-solid fa-plus"></i> Əlavə et</a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <thead>
                        <tr>
                            <th>İSTİFADƏÇİ</th>
                            <th>ŞƏRH</th>
                            <th>NƏŞR TARİXİ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td className="bold">{userNames[item.userId] || 'Yüklənir...'}</td> 
                                    <td className="bold">{item.message}</td>
                                    <td className="bold">{formatDateTime(item.createAt)}</td>
                                    <td className="action-column">
                                        <a href="#" className='pagin-btn' onClick={() => removePopupVisible(item.id)}>
                                            <img src={Delate} alt="Sil" />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Şərh tapılmadı</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isCreatePopupVisible && <CreateComment onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveComment onClose={closeRemovePopupVisible} commentId={removeId} />}
        </div>
    );
};

export default Comment;
