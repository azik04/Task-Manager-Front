import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Theme = () => {
    const [data, setData] = useState([]);
    const [added, setAdded] = useState([]);
    const [userId, setUserId] = useState(null);

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
                    console.log("Theme",res.data.data)
                    if (Array.isArray(res.data.data)) {
                        setData(res.data.data);
                    } else {
                        console.error('Məlumat bir array deyil:', res.data.result.data);
                    }
                } catch (error) {
                    console.error('Layihələri əldə edərkən xəta:', error);
                }
            };

            const fetchAddedThemes = async () => {
                try {
                    const res = await axios.get(`https://localhost:7146/api/UserTask/${userId}/theme`);
                    console.log("Əlavə edilmiş", res.data);
                    if (Array.isArray(res.data)) {
                        setAdded(res.data);
                    } else {
                        console.error('Məlumat bir array deyil:', res.data);
                    }
                } catch (error) {
                    console.error('Əlavə edilmiş layihələri əldə edərkən xəta:', error);
                }
            };

            fetchThemes();
            fetchAddedThemes();
        }
    }, [userId]);

    const handleRemove = async (id) => {
        try {
            await axios.delete(`https://localhost:7146/api/Theme?id=${id}`);
            setData((prevData) => prevData.filter(theme => theme.id !== id));
        } catch (error) {
            console.error('Layihəni silərkən xəta:', error);
        }
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
                                    <Link to={`/Task/${item.id}`} className="theme-link">
                                        {item.taskName} {/* API cavabında bu xassənin mövcud olduğundan əmin olun */}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">Məlumat mövcud deyil</div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Theme;
