import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useContext } from "react";
import { appflow_Handller } from "@/context/appflow";

function Time_picker(props: any) {
  const { data, setdata } = props;
  const { t, i18n } = useTranslation();
  const { state, dispatch }: any = useContext(appflow_Handller);
  let newDate;
  if (!!data.time) {
    const timeParts = data.time.split(":");
    newDate = new Date();
    newDate.setHours(Number(timeParts[0]));
    newDate.setMinutes(Number(timeParts[1]));
  }

  const gethour = (val: number) => {
    if (val < 10) return `0${val}`;
    else return val;
  };
  const getmin = (val: number) => {
    if (val < 10) return `0${val}`;
    else return val;
  };
  return (
    <div className="w-[30%] flex justify-between gap-3 ">
      <p>{t("hour")}</p>
      <DatePicker
        calendar={i18n.language == "fa" ? persian : undefined}
        locale={i18n.language == "fa" ? persian_fa : undefined}
        inputClass="custom-input"
        value={newDate}
        disableDayPicker
        onChange={(dateObject: any) => {
          // console.log(dateObject);
          setdata({
            ...data,
            ["time"]: `${gethour(dateObject.hour)}:${getmin(
              dateObject.minute
            )}`,
          });
        }}
        format="HH:mm"
        disabled={state.handleEdit}
        plugins={[<TimePicker hideSeconds />]}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

export default Time_picker;
