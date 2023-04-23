import { Routes, Route, Link } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/update/:id" element={<UpdateProduct />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
