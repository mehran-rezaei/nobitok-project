import { editAppointment, editFactor } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";

export const handleEditAppointment = async (
  state: any,
  data: any,
  service: any,
  fetchdata: any,
  t: any
) => {
  let req = {};
  if (state.handletable == 2) {
    req = {
      id: data.id,
      customerId: data.customerId,
      appointmentStatusId: 0,
      date: data.date,
      time: data.time,
      description: data.description,
    };
  } else {
    req = {
      id: data.id,
      customerId: data.customerId,
      appointmentStatusId: 1,
      date: data.date,
      time: data.time,
      description: data.description,
    };
  }
  let req2 = {
    id: data.factorId,
    factorItems: service,
  };
  await editAppointment(req)
    .then((data) => {
      // console.log(data.data);
      if (data.data.isSuccess) {
        // notify("success", `${t("successful")}`);
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
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
      });
  console.log(fetchdata);
};
