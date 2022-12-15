import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import WithAuth from "./components/auth";
import LayOut from "./layout";
import AdminPages from "./screens/adminPages";
import PagesForm from "./screens/adminPages/form";
import Appointments from "./screens/appointments";
import Consultation from "./screens/consultation";
import ContactInfo from "./screens/contactInfo";
import ContactForm from "./screens/contactInfo/form";
import HomePage from "./screens/homePage";
import MedicalFiles from "./screens/medicalFiles";
import MedicalForm from "./screens/medicalFiles/form";
import Offers from "./screens/offers";
import OfferForm from "./screens/offers/form";
import Orders from "./screens/orders";
import SignIn from "./screens/signin/test";
import Test from "./screens/test/test";

function App() {
  return (
    <LayOut>
      <Toaster />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/test" element={<Test />} />
        <Route
          path="/"
          element={
            <WithAuth>
              <HomePage />
            </WithAuth>
          }
        />
        <Route
          path="/offersRequest"
          element={
            <WithAuth>
              <Orders />
            </WithAuth>
          }
        />
        <Route
          path="/offers"
          element={
            <WithAuth>
              <Offers />
            </WithAuth>
          }
        />
        <Route
          path="/consultations"
          element={
            <WithAuth>
              <Consultation />
            </WithAuth>
          }
        />
        <Route
          path="/medical-files"
          element={
            <WithAuth>
              <MedicalFiles />
            </WithAuth>
          }
        />
        <Route
          path="/medical-file/:id"
          element={
            <WithAuth>
              <MedicalForm />
            </WithAuth>
          }
        />
        <Route
          path="/appointments"
          element={
            <WithAuth>
              <Appointments />
            </WithAuth>
          }
        />
        <Route
          path="/contactinfo"
          element={
            <WithAuth>
              <ContactInfo />
            </WithAuth>
          }
        />
        <Route
          path="/pages"
          element={
            <WithAuth>
              <AdminPages />
            </WithAuth>
          }
        />
        <Route
          path="/create-offer"
          element={
            <WithAuth>
              <OfferForm />
            </WithAuth>
          }
        />
        <Route
          path="/offer/:id"
          element={
            <WithAuth>
              <OfferForm />
            </WithAuth>
          }
        />
        <Route
          path="/create-page"
          element={
            <WithAuth>
              <PagesForm />
            </WithAuth>
          }
        />
        <Route
          path="/page/:id"
          element={
            <WithAuth>
              <PagesForm />
            </WithAuth>
          }
        />
        <Route
          path="/create-contact"
          element={
            <WithAuth>
              <ContactForm />
            </WithAuth>
          }
        />
        <Route
          path="/contact/:id"
          element={
            <WithAuth>
              <ContactForm />
            </WithAuth>
          }
        />
      </Routes>
    </LayOut>
  );
}

export default App;
