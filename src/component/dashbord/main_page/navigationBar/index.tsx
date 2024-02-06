import { appflow_Handller } from "@/context/appflow";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { appointmnet } from "../../../../../atoms/appointment";
import { handleTableChange } from "@/utils/main_page/handleTableChange";
import { appointment_list } from "../../../../../atoms/appointment_list";
import { PageSize } from "../../../../../atoms/pageSize";
import { Pagenumber } from "../../../../../atoms/pagenumber";
import Tooltip from "@mui/material/Tooltip";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import InfoIcon from "@mui/icons-material/Info";
import Zoom from "@mui/material/Zoom";
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

function NavigationBar(props: any) {
  const { values, setData } = props;
  const { state, dispatch }: any = useContext(appflow_Handller);
  const { t, i18n } = useTranslation();
  const setdate = useSetRecoilState(appointmnet);
  const [listdata, setlistdata] = useRecoilState<any>(appointment_list);
  ////////////////////////////////////////////////////////////////////////
  const [pagenumber, setpagenumber] = useRecoilState<any>(Pagenumber);
  const pageSize = useRecoilValue<any>(PageSize);
  return (
    <div className="h-[5%] w-full flex justify-center items-center border-b-2 border-t-2 border-[#777676]">
      <div className="h-full  flex w-2/4 justify-between items-center ">
        <div
          onClick={async () => {
            await setpagenumber(1);
            handleTableChange(
              1,
              values,
              dispatch,
              setData,
              setlistdata,
              t,
              pagenumber,
              pageSize
            ),
              dispatch({ type: "set_completedappointment_false" });
            setdate(init), dispatch({ type: "unselect_row" });
            props.setShownewdoc(false);
          }}
          className={` text-[10px] lg:text-base gap-2 cursor-pointer h-full flex justify-between items-center ${
            state.handletable == 1
              ? " text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
              : null
          }`}
        >
          <p>
            {state.completedappointment
              ? t(" نوبت های تکمیل شده")
              : t("todayAppointment")}
          </p>
          {/* {state.handletable == 1 ? (
            <Tooltip
              enterTouchDelay={2000}
              title={
                "در صورت عدم انتخاب تاریخ نوبت های امروز نمایش داده می شوند"
              }
            >
              <PriorityHighIcon />
            </Tooltip>
          ) : null} */}
        </div>
        <div
          onClick={async () => {
            await setpagenumber(1);
            handleTableChange(
              2,
              values,
              dispatch,
              setData,
              setlistdata,
              t,
              pagenumber,
              pageSize
            ),
              setdate(init),
              dispatch({ type: "set_completedappointment_false" });
            dispatch({ type: "unselect_row" });
            props.setShownewdoc(false);
          }}
          className={` text-[10px] lg:text-base  cursor-pointer h-full flex justify-between items-center ${
            state.handletable == 2
              ? " text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
              : null
          }`}
        >
          {/* <Tooltip
            enterDelay={200}
            TransitionComponent={Zoom}
            title={"نمایش پیش نوبت های ثبت شده برای هفته آینده"}
          > */}
            <p>
              {state.seetomorrowpreapp == 1 && values == ""
                ? t("پیش نوبت های فردا")
                : t("preAppointment")}
            </p>
          {/* </Tooltip> */}
        </div>
        <div
          onClick={async () => {
            await setpagenumber(1);
            handleTableChange(
              3,
              values,
              dispatch,
              setData,
              setlistdata,
              t,
              pagenumber,
              pageSize
            ),
              setdate(init),
              dispatch({ type: "set_completedappointment_false" });
            dispatch({ type: "unselect_row" });
            props.setShownewdoc(false);
          }}
          className={` text-[10px] lg:text-base cursor-pointer h-full flex justify-between items-center ${
            state.handletable == 3
              ? "text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
              : null
          }`}
        >
          <p>{t("documnets")}</p>
        </div>
        <div
          onClick={async () => {
            await setpagenumber(1);
            handleTableChange(
              4,
              values,
              dispatch,
              setData,
              setlistdata,
              t,
              pagenumber,
              pageSize
            ),
              setdate(init),
              dispatch({ type: "set_completedappointment_false" });
            dispatch({ type: "unselect_row" });
            props.setShownewdoc(false);
          }}
          className={` text-[10px] lg:text-base  cursor-pointer h-full flex justify-between items-center ${
            state.handletable == 4
              ? "text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
              : null
          }`}
        >
          {/* <p>{t("payments")}</p> */}
          <p>{t("نوبت های تکمیل شده")}</p>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
