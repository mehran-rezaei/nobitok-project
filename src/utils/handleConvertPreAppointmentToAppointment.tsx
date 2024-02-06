import {
  addAppointmentFromPreAppointment,
  editFactor,
  getAllPreAppointments,
  getNotfication,
  getTomorrowPreAppointments,
} from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { useTranslation } from "react-i18next";
const init = {
  id: 0,
  userId: 0,
  isPaid: false,
  username: "",
  documentNumber: "",
  customerId: 0,
  customerName: "",
  nationalCode: "",
  description: "",
  phoneNumber: "",
  date: "",
  time: ":",
  appointmentStatus: 0,
  factorId: 0,
};
export const handleConvertPreAppointmentToAppointment = async (
  data: any,
  setdata: any,
  service: any,
  state: any,
  dispatch: any,
  setinitdata: any,
  fetchdata: any,
  setnotif: any,
  t: any
) => {
  const req = {
    preAppointmentId: data.id,
    date: data.date,
    time: data.time,
    description: data.description,
  };
  let req2 = {
    id: data.factorId,
    factorItems: service,
  };
  console.log(fetchdata);
  await addAppointmentFromPreAppointment(req)
    .then((data) => {
      if (data.data.isSuccess) {
      } else {
        notify("error", `${data.data.message}`);
      }
    })
    .catch((error) => {
      notify("error", `${t("error")}`);
    });
  if (!!data.factorId && data.factorId != 0)
    await editFactor(req2)
      .then((data) => {
        if (data.data.isSuccess) {
          notify("success", `${t("successful")}`);
          dispatch({ type: "unselect_row" });
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
      });
  if (state.seetomorrowpreapp === 1) {
    await getTomorrowPreAppointments()
      .then((Response) => {
        setinitdata(Response.data.dataList);
        if (Response.data.isSuccess) {
        } else {
          // notify("error", `${Response.data.message}`);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
      });
    getNotfication()
      .then((Response) => {
        if (Response.data.isSuccess === false) {
          setnotif();
        } else {
          setnotif(Response.data);
        }
      })
      .catch((error) => {});
  } else {
    fetchdata();
    getNotfication()
      .then((Response) => {
        if (Response.data.isSuccess === false) {
          setnotif();
        } else {
          setnotif(Response.data);
        }
      })
      .catch((error) => {});
  }

  setdata(init);
};
