import { appflow_Handller } from "@/context/appflow";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function Date_picker(props: any) {
  const { data, setdata } = props;
  const { t, i18n } = useTranslation();
  const { state, dispatch }: any = useContext(appflow_Handller);
  console.log(data.date);

  return (
    <div className="flex  gap-3  ">
      <p>{t("date")}</p>
      <div style={{ direction: "rtl" }}>
        <DatePicker
          inputClass="custom-input"
          disabled={state.handleEdit}
          value={data.date}
          calendar={i18n.language == "fa" ? persian : undefined}
          locale={i18n.language == "fa" ? persian_fa : undefined}
          calendarPosition="bottom-right"
          onChange={(dateObject: any) => {
            props.setnameofweak(dateObject.weekDay.name);
            setdata({
              ...data,
              ["date"]: `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`,
            });
          }}
        />
      </div>
    </div>
  );
}

export default Date_picker;
