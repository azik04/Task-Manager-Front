import React from 'react';
import Nav from '../Component/Nav';
import Header from '../Component/Header';
import { Outlet } from 'react-router-dom';

const LayOut = () => {
    return (
        <>
            <Nav />
            <Header />
            <Outlet />
        </>
    );
}

export default LayOut;