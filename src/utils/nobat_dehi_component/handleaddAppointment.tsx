import { addAppointment, editFactor } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";

const requestaddAppointment = {
  date: "",
  time: "00:00",
  description: "",
  customerId: 0,
  userId: 0,
  status: 0,
};

export const handleaddAppointment = async (
  state: any,
  data: any,
  RequestaddAppointment: any,
  setRequestaddAppointment: any,
  service: any,
  fetchdata: any,
  isLoading: any,
  setIsLoading: any,
  t: any
) => {
  let fid = 0;
  let req = {};
  if (state.handletable == 3) {
    req = {
      customerId: data.id,
      status: 1,
      date: RequestaddAppointment.date,
      time: RequestaddAppointment.time,
      description: RequestaddAppointment.description,
      userId: 0,
    };
  } else {
    if (RequestaddAppointment.time != "") {
      req = {
        customerId: data.customerId,
        status: 1,
        date: RequestaddAppointment.date,
        time: RequestaddAppointment.time,
        description: RequestaddAppointment.description,
        userId: 0,
      };
    } else {
      req = {
        customerId: data.customerId,
        status: 1,
        date: RequestaddAppointment.date,
        description: RequestaddAppointment.description,
        userId: 0,
      };
    }
  }
  if (isLoading) {
    // Prevent multiple clicks while the operation is ongoing
    return;
  }

  setIsLoading(true);
  await addAppointment(req)
    .then((data) => {
      console.log(data.data),
        // notify("success", "Successfuly"),
        ((fid = data.data.data.factorId),
        setRequestaddAppointment(requestaddAppointment));
      if (data.data.isSuccess) {
        notify("success", `${t("successful")}`);
      } else {
        notify("error", `${data.data.message}`);
      }
    })
    .catch((error) => {
      // notify("error", `${t("error")}`);
    })
    .finally(() => {
      setIsLoading(false); // Reset loading state
    });
  let req2 = {
    id: fid,
    factorItems: service,
  };
  console.log(req2);
  await editFactor(req2)
    .then((data) => {
      console.log(data.data);
      if (data.data.isSuccess) {
        // notify("success", "Successfuly");
      } else {
        notify("error", `${data.data.message}`);
      }
    })
    .catch((error) => {
      notify("error", `${t("error")}`);
    });
  fetchdata();
};
