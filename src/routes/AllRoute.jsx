import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../components/Products';
import Todo from '../components/Todo';

function AllRoute() {
    return (
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/todo' element={<Todo/>}/>
        </Routes>
    );
}

export default AllRoute;