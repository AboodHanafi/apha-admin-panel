import logo from "./logo.png";
import dashboard from "./dashboard.png";
import offers from "./offers.png";
import offersRequest from "./offersRequest.png";
import medical from "./medical.png";
import setting from "./setting.png";
import appointments from "./appointments.png";
import consultations from "./consultations.png";

export const Images = {
  logo,
};
export const sideBarItem = [
  {
    id: 1,
    icon: dashboard,
    name: "dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: consultations,
    name: "consultations",
    path: "/consultations",
  },
  {
    id: 3,
    icon: medical,
    name: "medical files",
    path: "/medical-files",
  },
  {
    id: 4,
    icon: appointments,
    name: "appointments",
    path: "/appointments",
  },
  {
    id: 5,
    icon: offers,
    name: "offers",
    path: "/offers",
  },
  {
    id: 6,
    icon: offersRequest,
    name: "offers request",
    path: "/offersRequest",
  },
  {
    id: 7,
    icon: setting,
    name: "settings",
    children: [
      { id: 0, name: "pages", path: "/pages" },
      { id: 1, name: "contact information", path: "/contactinfo" },
    ],
  },
];
