export const nextmonth = (data:any, setdata:any) => {
  if (!!data.date) {
    const date = data.date.split("/");
    if (date[1] == 12) {
      setdata({
        ...data,
        ["date"]: `${Number(date[0]) + Number(1)}/1/${date[2]}`,
      });
    } else {
      setdata({
        ...data,
        ["date"]: `${date[0]}/${Number(date[1]) + Number(1)}/${date[2]}`,
      });
    }
  }
};
