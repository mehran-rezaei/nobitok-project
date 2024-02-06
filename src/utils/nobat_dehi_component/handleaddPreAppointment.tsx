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

export const handleaddPreAppointment = async (
  RequestaddAppointment: any,
  data: any,
  state: any,
  setRequestaddAppointment: any,
  fetchdata: any,
  service: any,
  isLoading2: any,
  setIsLoading2: any,
  t: any
) => {
  let fid = 0;
  let req = {};
  if (state.handletable == 3) {
    req = {
      customerId: data.id,
      status: 0,
      date: RequestaddAppointment.date,
      time: RequestaddAppointment.time,
      description: RequestaddAppointment.description,
      userId: 0,
    };
  } else {
    if (RequestaddAppointment.time != "") {
      req = {
        customerId: data.customerId,
        status: 0,
        date: RequestaddAppointment.date,
        time: RequestaddAppointment.time,
        description: RequestaddAppointment.description,
        userId: 0,
      };
    } else {
      req = {
        customerId: data.customerId,
        status: 0,
        date: RequestaddAppointment.date,
        description: RequestaddAppointment.description,
        userId: 0,
      };
    }
  }
  if (isLoading2) {
    // Prevent multiple clicks while the operation is ongoing
    return;
  }

  setIsLoading2(true);
  await addAppointment(req)
    .then((data) => {
      console.log(data.data);
      if (data.data.isSuccess) {
        (fid = data.data.data.factorId),
          setRequestaddAppointment(requestaddAppointment);
        notify("success", `${t("successful")}`);
      } else {
        notify("error", `${data.data.message}`);
      }
    })
    .catch((error) => {
      notify("error", `${t("error")}`);
    })
    .finally(() => {
      setIsLoading2(false); // Reset loading state
    });
  ////////////////////////////////////////////////////
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
