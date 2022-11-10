import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUDRequsests from "../../apis";
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
  useEffect(() => {
    getData();
    getpatientData();
  }, []);
  return (
    <Stack spacing={2}>
      <Typography fontSize={30}>First section</Typography>
      <Stack flexWrap={"wrap"} gap={2} direction={"row"}>
        <BasicCard
          counter={data.pateint}
          title={"عدد المرضى المسجلين"}
          bgColor={"#ccb9bc"}
        />
        <BasicCard
          counter={data.openFile}
          title={"عدد طلبات فتح ملف"}
          bgColor={"#c0b3c2"}
        />
        <BasicCard
          counter={data.order}
          title={"عدد طلبات استشارة"}
          bgColor={"#b1bfca"}
        />
        <BasicCard
          counter={data.consultation}
          title={"طلبات الحجوزات"}
          bgColor={"#aec4c7"}
        />
      </Stack>
      <Typography fontSize={30}>Second section</Typography>
      <Stack flexWrap={"wrap"} gap={2} direction={"row"}>
        <BasicCard
          counter={patientData["All offer"]}
          title={"عدد العروض"}
          bgColor={"#ccb9bc"}
        />
        <BasicCard
          counter={patientData["offer exp"]}
          title={"العروض المنتهية"}
          bgColor={"#c0b3c2"}
        />
        <BasicCard
          counter={patientData.offerAvalabel}
          title={"العروض المتاحة"}
          bgColor={"#b1bfca"}
        />
        <BasicCard
          counter={patientData.orderMonth}
          title={"عدد الطلبات هذا الشهر"}
          bgColor={"#aec4c7"}
        />
      </Stack>
    </Stack>
  );
};

export default HomePage;
