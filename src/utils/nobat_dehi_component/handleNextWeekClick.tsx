import moment from "jalali-moment";

export const handleNextWeekClick = async (RequestaddAppointment: any,setRequestaddAppointment:any) => {
  if (RequestaddAppointment.date === "") {
  } else {
    const date = RequestaddAppointment.date.split("/");
    const temp = moment
      .from(`${date[0]}/${date[1]}/${date[2]}`, "fa", "YYYY/MM/DD")
      .format("YYYY/MM/DD");
    const newDate = moment(temp).add(1, "w");
    const formattedDate = newDate.format("YYYY/MM/DD");
    let show = moment(formattedDate, "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    console.log(show);
    setRequestaddAppointment({
      ...RequestaddAppointment,
      ["date"]: show,
    });
  }
};
