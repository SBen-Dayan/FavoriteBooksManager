import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Authorized from './components/Authorized';
import UserContextComponent from './components/UserContext';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Favorites from './Pages/Favorites';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

const App = () => {
    return (
        <UserContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/my-favorites' element={
                        <Authorized>
                            <Favorites />
                        </Authorized>} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Layout>
        </UserContextComponent>
    );
}

export default App;