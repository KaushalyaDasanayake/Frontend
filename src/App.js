import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Products from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';


function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/add-product/:id" element={<EditProduct/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
