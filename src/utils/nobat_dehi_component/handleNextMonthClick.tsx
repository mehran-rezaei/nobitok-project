export const handleNextMonthClick = (
  RequestaddAppointment: any,
  setRequestaddAppointment: any
) => {
  let date: any;
  if (RequestaddAppointment.date === "") {
  } else {
    date = RequestaddAppointment.date.split("/");
    if (date[1] == 12) {
      setRequestaddAppointment({
        ...RequestaddAppointment,
        ["date"]: `${Number(date[0]) + Number(1)}/1/${date[2]}`,
      });
    } else {
      setRequestaddAppointment({
        ...RequestaddAppointment,
        ["date"]: `${date[0]}/${Number(date[1]) + Number(1)}/${date[2]}`,
      });
    }
    console.log(`${date[0]}/${Number(date[1]) + Number(1)}/${date[2]}`);
  }
};
