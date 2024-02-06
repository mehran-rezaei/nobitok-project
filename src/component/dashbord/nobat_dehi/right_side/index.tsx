import { useTranslation } from "react-i18next";
import { appointmnet } from "../../../../../atoms/appointment";
import { useRecoilValue } from "recoil";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useContext, useEffect, useState } from "react";
import { appflow_Handller } from "@/context/appflow";
// import TextArea from "antd/es/input/TextArea";
const { TextArea } = Input;
import { addAppointment, editFactor } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { handleNextWeekClick } from "@/utils/nobat_dehi_component/handleNextWeekClick";
import { handleNextMonthClick } from "@/utils/nobat_dehi_component/handleNextMonthClick";
import { handleaddPreAppointment } from "@/utils/nobat_dehi_component/handleaddPreAppointment";
import { handleaddAppointment } from "@/utils/nobat_dehi_component/handleaddAppointment";
import { Input } from "antd";

const requestaddAppointment = {
  date: "",
  time: "00:00",
  description: "",
  customerId: 0,
  userId: 0,
  status: 0,
};

function Right_side(props: any) {
  const { t, i18n } = useTranslation();
  const data = useRecoilValue<any>(appointmnet);
  const [RequestaddAppointment, setRequestaddAppointment] = useState(
    requestaddAppointment
  );
  const { state, dispatch }: any = useContext(appflow_Handller);
  //////////////////////////////////////////////////
  const timeParts = RequestaddAppointment.time.split(":");
  const newDate = new Date();
  newDate.setHours(Number(timeParts[0]));
  newDate.setMinutes(Number(timeParts[1]));
  //////////////////////////////////////////////////

  const gethour = (val: number) => {
    if (val < 10) return `0${val}`;
    else return val;
  };
  const getmin = (val: number) => {
    if (val < 10) return `0${val}`;
    else return val;
  };

  ///////////////////////////////////////////////////
  const [nameofweak, setnameofweak] = useState("");
  useEffect(() => {
    const date = new DateObject({
      calendar: persian,
      locale: persian_fa,
      date: RequestaddAppointment.date,
    });
    setnameofweak(date.weekDay.name);
  }, [RequestaddAppointment]);
  useEffect(() => {
    setnameofweak("");
  }, [state.handletable]);

  ///////////////////////////////////////////////////////////////////////////////////////
  const subaddAppointment = async () => {
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
    console.log(req);
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
      });
    let req2 = {
      id: fid,
      factorItems: props.service,
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
    props.fetchdata();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  return (
    <div className="w-2/4 h-full flex flex-col justify-between p-2">
      <div className="flex flex-col gap-4">
        <div className="flex text-xs h-[10%] border-b-2 border-[#777676]  items-center justify-around">
          <div className="flex gap-1">
            <p>{t("fullname")}:</p>
            <p>{!!data.customerName ? data.customerName : data.name}</p>
          </div>
          <div className="flex gap-1">
            <p>{t("Docnumber")}:</p>
            <p>{data.documentNumber}</p>
          </div>
          <div className="flex gap-1">
            <p>{t("phonenumber")}:</p>
            <p>{data.phoneNumber}</p>
          </div>
        </div>
        <div className="w-[30%] flex justify-between gap-3 ">
          <p>{t("hour")}</p>
          <DatePicker
            value={newDate}
            disableDayPicker
            onChange={(dateObject: any) => {
              setRequestaddAppointment({
                ...RequestaddAppointment,
                ["time"]: `${gethour(dateObject.hour)}:${getmin(
                  dateObject.minute
                )}`,
              });
            }}
            format="HH:mm"
            plugins={[<TimePicker hideSeconds />]}
            calendar={i18n.language == "fa" ? persian : undefined}
            locale={i18n.language == "fa" ? persian_fa : undefined}
            calendarPosition="bottom-right"
          />
        </div>
        <div className="flex justify-between gap-3  ">
          <div className="flex  gap-3  ">
            <p>{t("date")}</p>
            <div style={{ direction: "rtl" }}>
              <DatePicker
                inputClass="custom-input"
                value={RequestaddAppointment.date}
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                calendarPosition="bottom-right"
                onChange={(dateObject: any) => {
                  setnameofweak(dateObject.weekDay.name);
                  setRequestaddAppointment({
                    ...RequestaddAppointment,
                    ["date"]: `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`,
                  });
                }}
              />
            </div>
            {nameofweak}
          </div>
          <div className="flex  gap-3  text-xs">
            <div
              onClick={() =>
                handleNextWeekClick(
                  RequestaddAppointment,
                  setRequestaddAppointment
                )
              }
              className="cursor-pointer px-6 py-1.5 rounded-md text-white bg-[#3A4EFF]"
            >
              <p>{t("nextweak")}</p>
            </div>
            <div
              onClick={() =>
                handleNextMonthClick(
                  RequestaddAppointment,
                  setRequestaddAppointment
                )
              }
              className="cursor-pointer px-6 py-1.5 rounded-md  bg-[#3A4EFF] text-white text-xs"
            >
              <p>{t("nextmonth")}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[100px]">
          <TextArea
            className="border-2 border-[#6171FF]"
            value={RequestaddAppointment.description}
            maxLength={100}
            onChange={(e: any) => {
              setRequestaddAppointment({
                ...RequestaddAppointment,
                ["description"]: e.target.value,
              });
            }}
            style={{ height: 60, resize: "none" }}
            placeholder={`${t("description")}:`}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          onClick={() =>
            handleaddAppointment(
              state,
              data,
              RequestaddAppointment,
              setRequestaddAppointment,
              props.service,
              props.fetchdata,
              isLoading,
              setIsLoading,
              t
            )
          }
          className="px-3 py-1.5 cursor-pointer border-2 border-[#2CFF74]  hover:bg-[#22EF67]/20 hover:text-black hover:border-[#24D560] bg-[#2CFF74] rounded-md text-sm text-white"
        >
          <p>{t("submit_appointment")}</p>
        </div>
        <div
          onClick={() =>
            handleaddPreAppointment(
              RequestaddAppointment,
              data,
              state,
              setRequestaddAppointment,
              props.fetchdata,
              props.service,
              isLoading2,
              setIsLoading2,
              t
            )
          }
          className="px-3 py-1.5 cursor-pointer bg-[#3A4EFF] rounded-md  border-2 border-[#3A4EFF]  hover:bg-white hover:text-black hover:border-[#3A4EFF]   text-sm text-white"
        >
          <p>{t("submit_preappointment")}</p>
        </div>
      </div>
    </div>
  );
}

export default Right_side;
