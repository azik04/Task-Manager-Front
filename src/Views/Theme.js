import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RemoveTheme from '../Component/RemoveTheme';

const Theme = () => {
    const [data, setData] = useState([]);
    const [added, setAdded] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [themeToRemove, setThemeToRemove] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("UserId"); 
        if (storedUserId) {
            setUserId(storedUserId); 
        } else {
            console.error('Yerli saxlama daxilində UserId tapılmadı');
        }
    }, []);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        if (userId) {
            const fetchThemes = async () => {
                try {
                    const res = await axios.get(`https://localhost:7146/api/Theme/userId/${userId}`);
                    setData(res.data.data || []);
                } catch (error) {
                    console.error('Layihələri əldə edərkən xəta:', error);
                }
            };

            const fetchAddedThemes = async () => {
                try {
                    const res = await axios.get(`https://localhost:7146/api/UserTask/${userId}/theme`);
                    setAdded(res.data || []);
                } catch (error) {
                    console.error('Əlavə edilmiş layihələri əldə edərkən xəta:', error);
                }
            };

            fetchThemes();
            fetchAddedThemes();
        }
    }, [userId]);

    const handleRemove = (id) => {
        setThemeToRemove(id);
        setIsPopupOpen(true);
    };

    return (
        <main>
            <div className="main">
                <div className="theme-container">
                    <div className="theme-header">
                        <h1>Layihələr</h1>
                    </div>
                    <div className="theme-list">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <div key={item.id} className="theme-item">
                                    <Link to={`/Theme/${item.id}/Task`} className="theme-link">
                                        {item.name}
                                    </Link>
                                    <button onClick={() => handleRemove(item.id)} className="remove-button">
                                        Sil
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">Məlumat mövcud deyil</div>
                        )}
                    </div>
                    <div className="theme-header">
                        <h1>Tapşırıqlara Əlavə Edilmiş</h1>
                    </div>
                    <div className="theme-list"> 
                        {added.length > 0 ? (
                            added.map((item) => (
                                <div key={item.id} className="theme-item">
                                    <Link to={`/Task/${item.id}/Added`} className="theme-link">
                                        {item.taskName}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">Məlumat mövcud deyil</div>
                        )}
                    </div>
                </div>
                {isPopupOpen && (
                    <RemoveTheme onClose={() => setIsPopupOpen(false)} themeId={themeToRemove} setData={setData} />
                )}
            </div>
        </main>
    );
};

export default Theme;
