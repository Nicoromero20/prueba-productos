import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import CrearPage from "./pages/CrearPage";
import EditarPage from "./pages/EditarPage";
import ListadoPage from "./pages/ListadoPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Productos</Link> | <Link to="/productos/nuevo">Nuevo producto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListadoPage />} />
        <Route path="/productos/nuevo" element={<CrearPage />} />
        <Route path="/productos/:id/editar" element={<EditarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;