import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HistoryIcon from "@mui/icons-material/History";
import PagesIcon from "@mui/icons-material/Pages";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import logo from "./logo.png";

export const Images = {
  logo,
};
export const sideBarItem = [
  {
    id: 1,
    icon: <DashboardIcon />,
    text: "dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <LocalOfferIcon />,
    text: "offers",
    path: "/offers",
  },
  {
    id: 3,
    icon: <HistoryIcon />,
    text: "orders",
    path: "/orders",
  },
  {
    id: 4,
    icon: <PagesIcon />,
    text: "pages",
    path: "/pages",
  },
  {
    id: 5,
    icon: <MedicationIcon />,
    text: "consultations",
    path: "/consultations",
  },
  {
    id: 6,
    icon: <LocalHospitalIcon />,
    text: "medical files",
    path: "/medical-files",
  },
  {
    id: 7,
    icon: <BookOnlineIcon />,
    text: "appointments",
    path: "/appointments",
  },
  {
    id: 8,
    icon: <ContactPhoneIcon />,
    text: "contact information",
    path: "/contactInfo",
  },
];
