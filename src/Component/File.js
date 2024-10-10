import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Delate from '../Photos/Delate.svg';
import { useParams } from 'react-router-dom';
import CreateFile from '../Component/CreateFile';
import RemoveFile from '../Component/RemoveFile'; 

const File = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const res = await axios.get(`http://test.loc/api/File/task/${id}`);
                console.log("Fayllar", res.data.data);
                setItems(res.data.data || []);  
            } catch (error) {
                console.error('Məlumat alınarkən xəta baş verdi', error);
            }
        };

        fetchData(id);
    }, [id]);

    const createPopupVisible = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopupVisible = () => {
        setCreatePopupVisible(false);
    };

    const removePopupVisible = (id) => {
        setRemoveId(id);
        setRemovePopupVisible(true);
    };

    const closeRemovePopupVisible = () => {
        setRemovePopupVisible(false);
    };

    const downloadFile = async (fileId, fileName) => {
        try {
            const res = await axios.get(`http://test.loc/api/File/${fileId}`, {
                responseType: 'blob', 
            });

            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', fileName); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        } catch (error) {
            console.error('Fayl yüklənərkən xəta baş verdi', error);
        }
    };

    return (
        <div className="main-info-block">
            <div className="main-info-block-header">
                <div className="main-info-block-header-left">
                    <p>Fayllar</p>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={createPopupVisible}>
                        <i className="fa-solid fa-plus"></i> Əlavə et
                    </a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td className="bold">
                                        <a href="#" onClick={() => downloadFile(item.id, item.fileName)}>
                                            {item.fileName}
                                        </a>
                                    </td>
                                    <td className="action-column">
                                        <a href="#" className='pagin-btn' onClick={() => removePopupVisible(item.id)}>
                                            <img src={Delate} alt="Sil" />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">Heç bir fayl tapılmadı</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isCreatePopupVisible && <CreateFile onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveFile onClose={closeRemovePopupVisible} documentId={removeId} />}
        </div>
    );
};

export default File;
