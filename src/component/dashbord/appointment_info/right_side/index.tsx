import { handleConvertPreAppointmentToAppointment } from "@/utils/handleConvertPreAppointmentToAppointment";
import { handleDeleteAppointment } from "@/utils/handleDeleteAppointment";
import { handleEditAppointment } from "@/utils/handleEditAppointment";
import { Input } from "antd";
const { TextArea } = Input;
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { appflow_Handller } from "@/context/appflow";
import { useRecoilState } from "recoil";
import { appointment_list } from "../../../../../atoms/appointment_list";
import Customer_info from "../../customer_info";
import Time_picker from "../../time_picker";
import Date_picker from "@/date_picker";
import Next_weak_button from "../../next_weak_button";
import Next_month_weak from "../../next_month_button";
import _Dialog from "@/component/material/dialog";
import { notify } from "@/helper/toust";
import { AddPayment, editAppointment } from "@/Dataservice/DashbordProvider";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ConfirmDelete from "../../confirmDelete";
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
function Right_side(props: any) {
  const { data, setdata, service, handleOpen2, handleOpen3 } = props;
  console.log(data);

  const { t, i18n } = useTranslation();
  const { state, dispatch }: any = useContext(appflow_Handller);
  const [initdata, setinitdata] = useRecoilState<any>(appointment_list);

  const setdatatoinit = () => {
    let temp = initdata.find((item: any) => item.id == data.id);
    if (!!temp) setdata(temp);
    else setdata(init);
  };
  useEffect(() => {
    if (!!initdata && initdata.length != 0) setdatatoinit();
    
  }, [state.handeltab]);

  ///////////////////////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const submit = () => {
    AddPayment(data.factorId, [])
      .then((Response) => {
        if (Response.data.isSuccess) {
          props.fetchdata();
          notify("success", `نوبت با موفقیت ثبت شد`);
          setdata(init);
          handleClose();
        } else {
          notify("error", `${t("error")}`);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
      });
    let req = {
      id: data.id,
      customerId: data.customerId,
      appointmentStatusId: 2,
      date: data.date,
      time: data.time,
      description: data.description,
    };
    editAppointment(req)
      .then((data) => {
        // console.log(data.data);
        if (data.data.isSuccess) {
          // notify("success", `${t("successful")}`);
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
      });
  };
  ///////////////////////////////////////////////////////////////////////////
  const [nameofweak, setnameofweak] = useState("");
  useEffect(() => {
    const date = new DateObject({
      calendar: persian,
      locale: persian_fa,
      date: data.date,
    });
    setnameofweak(date.weekDay.name);
  }, [data.date]);
  useEffect(() => {
    setnameofweak("");
  }, [state.handletable]);
  ///////////////////////////////////////////////////////////////////////////
  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  ///////////////////////////////////////////////////////////////////////////
  return (
    <div className="w-2/4 h-full flex flex-col justify-between p-2">
      <div className="flex flex-col gap-4">
        <Customer_info />
        <Time_picker data={data} setdata={setdata} />
        <div className="flex justify-between   ">
          <div className="flex  gap-3 ">
            <Date_picker
              setnameofweak={setnameofweak}
              data={data}
              setdata={setdata}
            />
            {nameofweak}
          </div>
          <div className="flex  gap-3  text-xs">
            <Next_weak_button data={data} setdata={setdata} />
            <Next_month_weak data={data} setdata={setdata} />
          </div>
        </div>
        <div className="w-full h-[100px]">
          <TextArea
            className="border-2 border-[#6171FF]"
            value={data.description}
            onChange={(e: any) => {
              setdata({
                ...data,
                ["description"]: e.target.value,
              });
            }}
            disabled={state.handleEdit}
            maxLength={100}
            style={{ height: 60, resize: "none" }}
            placeholder={`${t("description")}:`}
          />
        </div>
      </div>
      {state.handleEdit == true ? (
        <div className=" flex  items-center gap-5">
          <div
            onClick={() => {
              state.handletable == 2
                ? handleConvertPreAppointmentToAppointment(
                    data,
                    setdata,
                    service,
                    state,
                    dispatch,
                    setinitdata,
                    props.fetchdata,
                    props.setnotif,
                    t
                  )
                : !data.isPaid
                ? service.length !== 0
                  ? handleOpen2()
                  : handleOpen()
                : null;
            }}
            className={` ${
              data.id != 0
                ? " hover:bg-[#22EF67]/20 hover:text-black hover:border-[#24D560] "
                : "cursor-not-allowed"
            } px-3 py-1.5 bg-[#2CFF74] ${
              data.isPaid ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            } border-[#2CFF74] border-2 rounded-md text-sm text-white`}
          >
            {state.handletable == 2 ? (
              <p>{t("submit_appointment")}</p>
            ) : (
              <p>{t("compelete_appointment")}</p>
            )}
          </div>
          <div
            onClick={() => {
              data.id != 0 ? dispatch({ type: "rev_Edit" }) : null;
            }}
            className={` ${
              data.id != 0
                ? "cursor-pointer hover:bg-[#FFCB7C]/20 hover:text-black hover:border-[#FFCB7C]"
                : "cursor-not-allowed"
            }  px-3 py-1.5 bg-[#FFC061] border-2 border-[#FFC061] rounded-md text-sm text-white`}
          >
            {state.handletable == 2 ? (
              <p>{t("editpreappointment")} </p>
            ) : (
              <p>{t("editappointment")}</p>
            )}
          </div>
          <div
            onClick={() => {
              data.id != 0 ? handleOpen3() : null;
            }}
            className={`${
              data.id != 0
                ? "cursor-pointer hover:bg-[#FF947C]/20 hover:text-black hover:border-[#FF947C]"
                : "cursor-not-allowed"
            }  px-3 py-1.5 cancell_color border-2  rounded-md text-sm text-white`}
          >
            {state.handletable == 2 ? (
              <p>{t("cancellpreappointment")}</p>
            ) : (
              <p>{t("cancellappointment")}</p>
            )}
          </div>
          <div
            onClick={() => {
              data.id != 0 ? handleOpen4() : null;
            }}
            className={`${
              data.id != 0
                ? "cursor-pointer hover:bg-[#FF947C]/20 hover:text-black hover:border-[#FF947C]"
                : "cursor-not-allowed"
            }  px-3 py-1.5 bg-[#FF5757] border-2  border-[#FF5757] rounded-md text-sm text-white`}
          >
            {state.handletable == 2 ? (
              <p>{t("deletepreappointment")}</p>
            ) : (
              <p>{t("deleteappointment")}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              dispatch({ type: "cant_Edit" });
              handleEditAppointment(state, data, service, props.fetchdata, t);
            }}
            className="text-sm cursor-pointer px-9 py-1.5 border-2 border-[#2CFF74] bg-[#2CFF74] hover:bg-[#22EF67]/20 hover:text-black hover:border-[#24D560] rounded-md text-white"
          >
            <p>{t("record")}</p>
          </div>
          <div
            onClick={() => {
              dispatch({ type: "cant_Edit" });
              setdatatoinit();
            }}
            className="text-sm cursor-pointer  px-9 py-1.5 border-2 border-[#FF5757] hover:bg-[#FF947C]/20 hover:text-black hover:border-[#FF947C] bg-[#FF5757] rounded-md text-white"
          >
            <p>{t("cancel")}</p>
          </div>
        </div>
      )}
      {open ? (
        <_Dialog
          open={open}
          title={""}
          description={"نوبت بدون خدمت ثبت میشود، آیا مطمعن هستید؟"}
          type={""}
          handelyes={submit}
          handelno={handleClose}
          handleClose={handleClose}
        />
      ) : null}
      {open4 ? (
        <ConfirmDelete
          data={data}
          dispatch={dispatch}
          setdata={setdata}
          t={t}
          fetchdata={props.fetchdata}
          open={open4}
          handleOpen={handleOpen4}
          handleClose={handleClose4}
        />
      ) : null}
    </div>
  );
}

export default Right_side;
