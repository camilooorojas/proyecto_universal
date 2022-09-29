import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/navBar/navBar'
import { Product } from './components/product/product'
//import { Product } from '../product'
import { ListProduct } from './components/listProduct/listProduct'

function Container() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <h1 className="text-center"> UNIVERSAL </h1>

                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/crearProducto" element={<Product/>} />
                    <Route path="/listadoProductos" element={<ListProduct/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export { Container }