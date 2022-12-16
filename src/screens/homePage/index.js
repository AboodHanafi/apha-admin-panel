import { Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUDRequsests from "../../apis";
import { dashboardItem } from "../../assets";
import BasicCard from "../../components/card";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const token = localStorage.getItem("userToken");
  const [patientData, setPatientData] = useState({});
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "/count",
      })
    );
  };
  const getpatientData = async () => {
    const resp = await CRUDRequsests.get("countoffer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPatientData(resp.data.items);
  };
  const getCompaniesList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/compList");
    sessionStorage.setItem(
      "companiesList",
      JSON.stringify(resp.data.companies)
    );
  };
  const getNationalitiesList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/natList");
    sessionStorage.setItem(
      "nationalitiesList",
      JSON.stringify(resp.data.nationalities)
    );
  };
  const getUsersList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/usersList");
    sessionStorage.setItem("usersList", JSON.stringify(resp.data.users));
  };

  const getIdTypeList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/idTypesList");
    sessionStorage.setItem("IdTypeList", JSON.stringify(resp.data.idTypes));
  };

  useEffect(() => {
    getData();
    getpatientData();
    getCompaniesList();
    getNationalitiesList();
    getUsersList();
    getIdTypeList();
  }, []);
  return (
    <Stack flexWrap={"wrap"} gap={4} direction={"row"}>
      <BasicCard
        counter={data.pateint}
        title={"Registered Patients"}
        Icon={dashboardItem[0].icon}
      />
      <BasicCard
        counter={data.openFile}
        title={"Medical Files"}
        Icon={dashboardItem[1].icon}
      />
      <BasicCard
        counter={data.order}
        title={"Consultations"}
        Icon={dashboardItem[2].icon}
      />
      <BasicCard
        counter={data.consultation}
        title={"Appointments"}
        Icon={dashboardItem[3].icon}
      />
      <BasicCard
        counter={patientData["All offer"]}
        title={"Total Offers"}
        Icon={dashboardItem[4].icon}
      />

      <BasicCard
        counter={patientData.offerAvalabel}
        title={"Activated Offers"}
        Icon={dashboardItem[5].icon}
      />
      <BasicCard
        counter={patientData["offer exp"]}
        title={"Expired Offers"}
        Icon={dashboardItem[6].icon}
      />
      <BasicCard
        counter={patientData.orderMonth}
        title={"Offers Requests"}
        Icon={dashboardItem[7].icon}
      />
    </Stack>
  );
};

export default HomePage;
