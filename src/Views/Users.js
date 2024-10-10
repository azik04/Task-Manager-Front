import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from '../Component/CreateUser';
import ChangePassword from '../Component/ChangePassword';
import ChangeEmail from '../Component/ChangeEmail';
import ChangeRole from '../Component/ChangeRole';
import RemoveUser from '../Component/RemoveUser';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [remPopUp, setRemPopUp] = useState(false);
    const [changeRolePopUp, setChangeRolePopUp] = useState(false);
    const [createUserPopUp, setCreateUserPopUp] = useState(false);
    const [changePasswordPopUp, setChangePasswordPopUp] = useState(false);
    const [changeEmailPopUp, setChangeEmailPopUp] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [changeRoleId, setChangeRoleId] = useState(null);
    const [changePasswordId, setChangePasswordId] = useState(null);
    const [changeEmailId, setChangeEmailId] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
    }, []);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const adminRes = await axios.get('http://test.loc/api/User/Admins');
                setAdmins(adminRes.data.data);
                console.log("adminRes", adminRes.data.data);
            } catch (error) {
                console.error('Adminləri əldə edərkən xəta:', error);
            }
        };
        fetchAdmins();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userRes = await axios.get('http://test.loc/api/User/Users');
                setUsers(userRes.data.data);
                console.log("userRes", userRes.data.data);
            } catch (error) {
                console.error('İstifadəçiləri əldə edərkən xəta:', error);
            }
        };
        fetchUsers();
    }, []);

    const openRemPopUp = (userId) => {
        setRemoveId(userId);
        setRemPopUp(true);
    };

    const closeRemPopUp = () => {
        setRemPopUp(false);
        setRemoveId(null);
    };

    const openChangeRolePopUp = (userId) => {
        setChangeRoleId(userId);
        setChangeRolePopUp(true);
    };

    const closeChangeRolePopUp = () => {
        setChangeRolePopUp(false);
        setChangeRoleId(null);
    };

    const openCreateUserPopUp = () => {
        setCreateUserPopUp(true);
    };

    const closeCreateUserPopUp = () => {
        setCreateUserPopUp(false);
    };

    const openChangePasswordPopUp = (userId) => {
        setChangePasswordId(userId);
        setChangePasswordPopUp(true);
    };

    const closeChangePasswordPopUp = () => {
        setChangePasswordPopUp(false);
        setChangePasswordId(null);
    };

    const openChangeEmailPopUp = (userId) => {
        setChangeEmailId(userId);
        setChangeEmailPopUp(true); 
    };

    const closeChangeEmailPopUp = () => {
        setChangeEmailPopUp(false);
        setChangeEmailId(null);
    };

    return (
        <main>
            <div className="main">
                {/* Admins Table */}
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Bütün Adminlər</h2>
                        <p><strong>Cəmi: {admins.length} admin</strong></p>
                    </div>
                    <div className="navbar-content-menu-options">
                        <div className="navbar-content-menu-options-new">
                            <button onClick={openCreateUserPopUp}>
                                <p>Yeni İstifadəçi Əlavə Et</p>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th className="main-table-name">İstifadəçi Adı</th>
                                <th>Emaili</th>
                                <th>Emaili Dəyiş</th>
                                <th>Şifrəni Dəyiş</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => openChangeEmailPopUp(user.id)}>Emaili Dəyiş</button>
                                    </td>
                                    <td>
                                        <button onClick={() => openChangePasswordPopUp(user.id)}>Şifrəni Dəyiş</button>
                                    </td>
                                    <td>
                                        <button onClick={() => openRemPopUp(user.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Users Table */}
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>İstifadəçilər</h2>
                        <p><strong>Cəmi: {users.length} istifadəçi</strong></p>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th className="main-table-name">İstifadəçi Adı</th>
                                <th>Emaili</th>
                                <th>Emaili Dəyiş</th>
                                <th>Şifrəni Dəyiş</th>
                                <th>Rolu Dəyiş</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => openChangeEmailPopUp(user.id)}>Emaili Dəyiş</button>
                                    </td>
                                    <td>
                                        <button onClick={() => openChangePasswordPopUp(user.id)}>Şifrəni Dəyiş</button>
                                    </td>
                                    <td>
                                        <button onClick={() => openChangeRolePopUp(user.id)}>Rolu Dəyiş</button>
                                    </td>
                                    <td>
                                        <button onClick={() => openRemPopUp(user.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {remPopUp && <RemoveUser onClose={closeRemPopUp} userId={removeId} />}
            {changeRolePopUp && <ChangeRole onClose={closeChangeRolePopUp} userId={changeRoleId} />}
            {createUserPopUp && <CreateUser onClose={closeCreateUserPopUp} />}
            {changePasswordPopUp && <ChangePassword onClose={closeChangePasswordPopUp} userId={changePasswordId} />}
            {changeEmailPopUp && <ChangeEmail onClose={closeChangeEmailPopUp} userId={changeEmailId} />}
        </main>
    );
};

export default Users;
