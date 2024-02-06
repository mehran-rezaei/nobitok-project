import { deleteAppointment } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
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
export const handleDeleteAppointment = async (
  data: any,
  dispatch: any,
  setdata: any,
  fetchdata: any,
  t: any
) => {
  await deleteAppointment(data.id)
    .then((response) => {
      dispatch({ type: "unselect_row" });
      setdata(init);
      notify("success", `${t("successful")}`);
    })
    .catch((error) => notify("error", "Error"));
  fetchdata();
};
