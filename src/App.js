import ProductsList from "./products/Products-list";
import AddProduct from "./products/Add-product";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
