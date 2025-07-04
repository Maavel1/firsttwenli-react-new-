import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import ServicesPage from "./pages/services/ServicesPage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import ServiceDetailsPage from "./components/ServiceDetailsPage/ServiceDetailsPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
