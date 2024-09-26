import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem('JWT');

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default PrivateRoutes;