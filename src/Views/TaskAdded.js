import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edit from '../Photos/Edit.svg';
import Comment from '../Component/Comment';
import RemoveTask from '../Component/RemoveTask';
import File from '../Component/File';
import EditTask from '../Component/EditTask';
import SubTask from '../Component/SubTask';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear() !== 1970
        ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';
};

const Task = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [executiveUserName, setExecutiveUserName] = useState('');
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [remPopUp, setRemPopUp] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/Task/${id}`);
                setDetails(res.data.data || {});

                if (res.data.data && res.data.data.executiveUserId) {
                    const userRes = await axios.get(`http://test.loc/api/User/${res.data.data.executiveUserId}`);
                    setExecutiveUserName(userRes.data.data.userName); 
                }
            } catch (error) {
                console.error('Tapşırıq detallarını əldə edərkən xəta:', error);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    const popUpVisible = () => setIsEditPopupVisible(true);
    const closePopUpVisible = () => setIsEditPopupVisible(false);
    const createRemPopUp = () => setRemPopUp(true);
    const closeRemPopUp = () => setRemPopUp(false);

    return (
        <main>
            <div className="main">
                <div className="main-info">
                    <div className="main-info-begin">
                        <div className="main-info-begin-name">
                            <p>{details.taskName || 'N/A'}</p>
                        </div>
                        <div className="main-info-begin-options">
                            <button className="main-info-begin-options-btns" onClick={popUpVisible}>
                                <img src={Edit} alt="Redaktə et" className="edit-icon" />
                            </button>
                        </div>
                    </div>
                    <div className="main-info-text">
                        <div className="main-info-text-main">
                            <div className="main-info-text-main-one">
                                <p>Status</p>
                                <h2>{details.status || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Prioritet</p>
                                <h2>{details.priority || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Son tarix</p>
                                <h2>{formatDate(details.deadLine) || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Yaradılma tarixi</p>
                                <h2>{formatDate(details.createDate) || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Tamamlandı</p>
                                <h2>{details.isCompleted ? 'Bəli' : 'Xeyr'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>İcraçı</p>
                                <h2>{executiveUserName || 'Yoxdur'}</h2>
                            </div>
                        </div>
                        <div className="main-info-text-msg">
                            <p className="main-info-text-msg-name">Təsvir</p>
                            <p className="text">{details.taskDescription || 'Şərh yoxdur'}</p>
                        </div>
                    </div>
                </div>
            </div>
                <SubTask />
            <div className="main-file-comment">
                <Comment />
                <File />
            </div>
            {remPopUp && <RemoveTask onClose={closeRemPopUp} id={id} />}
            {isEditPopupVisible && <EditTask id={id} onClose={closePopUpVisible} />}
        </main>
    );
};

export default Task;
