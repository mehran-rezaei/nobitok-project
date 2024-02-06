import moment from "jalali-moment";

export const handleNextWeekClick = async (data: any, setdata: any) => {
  const date = data.date.split("/");
  const temp = moment
    .from(`${date[0]}/${date[1]}/${date[2]}`, "fa", "YYYY/MM/DD")
    .format("YYYY/MM/DD");
  const newDate = moment(temp).add(1, "w");
  const formattedDate = newDate.format("YYYY/MM/DD");
  let show = moment(formattedDate, "YYYY/MM/DD")
    .locale("fa")
    .format("YYYY/MM/DD");
  // console.log(show);
  setdata({
    ...data,
    ["date"]: show,
  });
};
