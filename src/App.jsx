import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
// ...importa el resto

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/sectores" element={<SectorsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
