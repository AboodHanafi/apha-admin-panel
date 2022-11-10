import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import LayOut from "./components/layout";
import AdminPages from "./screens/adminPages";
import PagesForm from "./screens/adminPages/form";
import Appointments from "./screens/appointments";
import Consultation from "./screens/consultation";
import ContactInfo from "./screens/contactInfo";
import ContactForm from "./screens/contactInfo/form";
import HomePage from "./screens/homePage";
import MedicalFiles from "./screens/medicalFiles";
import Offers from "./screens/offers";
import OfferForm from "./screens/offers/form";
import Orders from "./screens/orders";
import SignIn from "./screens/signin";

function App() {
  return (
    <LayOut>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/consultations" element={<Consultation />} />
        <Route path="/medical-files" element={<MedicalFiles />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/contactinfo" element={<ContactInfo />} />
        <Route path="/pages" element={<AdminPages />} />
        <Route path="/create-offer" element={<OfferForm />} />
        <Route path="/offer/:id" element={<OfferForm />} />
        <Route path="/create-page" element={<PagesForm />} />
        <Route path="/page/:id" element={<PagesForm />} />
        <Route path="/create-contact" element={<ContactForm />} />
        <Route path="/contact/:id" element={<ContactForm />} />
      </Routes>
    </LayOut>
  );
}

export default App;
