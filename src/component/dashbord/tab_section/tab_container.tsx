import Appointment_info from "../appointment_info";
import React, { useContext, useEffect, useState } from "react";
import Nobat_dehi from "../nobat_dehi";
import Parvande_ha from "../parvande";
import Parvande_jadid from "../parvande_jadid";
import { appflow_Handller } from "@/context/appflow";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { appointmnet } from "../../../../atoms/appointment";
import { useTranslation } from "react-i18next";
import { confirmAlert } from "react-confirm-alert";
function Tab_container(props: any) {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext<any>(appflow_Handller);
  const data = useRecoilValue<any>(appointmnet);

  const callstate = () => {
    switch (state.handeltab) {
      case 1:
        return (
          <Appointment_info
            fetchdata={props.fetchdata}
            setnotif={props.setnotif}
          />
        );
      case 2:
        return (
          <Nobat_dehi fetchdata={props.fetchdata} setnotif={props.setnotif} />
        );
      case 3:
        return <Parvande_ha />;
      case 4:
        return <Parvande_jadid />;
    }
  };
  const checkedit = (number: any) => {
    if (state.handleEdit === false || state.handleEditparvnde === false) {
      confirmAlert({
        title: "",
        message: `${t("changetabalert")}`,
        buttons: [
          {
            label: `${t("yes")}`,
            onClick: async () => {
              switch (number) {
                case 1:
                  dispatch({ type: "show_Parvande_jadid" });
                  dispatch({ type: "rev_Edit" });
                  dispatch({ type: "rev_Edit_parvande" });
                  break;
                case 2:
                  dispatch({ type: "show_Appointment_info" });
                  dispatch({ type: "cant_Edit" });
                  dispatch({ type: "cant_Edit_parvande" });
                  break;
                case 3:
                  dispatch({ type: "show_Nobat_dehi" });
                  dispatch({ type: "cant_Edit" });
                  dispatch({ type: "cant_Edit_parvande" });
                  break;
                case 4:
                  dispatch({ type: "show_Parvande_ha" });
                  dispatch({ type: "cant_Edit" });
                  dispatch({ type: "cant_Edit_parvande" });
                  break;
                case 5:
                  dispatch({ type: "show_Parvande_jadid" });
                  dispatch({ type: "cant_Edit" });
                  dispatch({ type: "cant_Edit_parvande" });
                  break;

                default:
                  break;
              }
            },
          },
          {
            label: `${t("no")}`,
            onClick: () => {},
          },
        ],
      });
    } else {
      switch (number) {
        case 1:
          dispatch({ type: "show_Parvande_jadid" });
          break;
        case 2:
          dispatch({ type: "show_Appointment_info" });
          break;
        case 3:
          dispatch({ type: "show_Nobat_dehi" });
          break;
        case 4:
          dispatch({ type: "show_Parvande_ha" });
          break;
        case 5:
          dispatch({ type: "show_Parvande_jadid" });
          break;

        default:
          break;
      }
    }
  };
  return (
    <>
      {data.id !== 0 || props.Shownewdoc == true ? (
        <div className="flex flex-col h-full ">
          <div className="h-[10%] text-sm w-full flex  items-center border-b-2 border-[#777676]">
            <div className="h-full  flex w-[40%] justify-between items-center ">
              {state.handletable == 3 ? (
                <div
                  onClick={() => checkedit(1)}
                  className={`h-full cursor-pointer flex justify-between items-center ${
                    state.handeltab == 4
                      ? " text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
                      : null
                  }`}
                >
                  <p>{t("newDocument")} </p>
                </div>
              ) : (
                <div
                  onClick={() => (data.id != 0 ? checkedit(2) : null)}
                  className={`h-full cursor-pointer flex justify-between items-center ${
                    state.handeltab == 1
                      ? " text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
                      : null
                  } ${data.id != 0 ? null : "opacity-70"}`}
                >
                  {state.handletable == 2 ? (
                    <p>{t("showPreAppointmentInfo")}</p>
                  ) : (
                    <p>{t("showAppointmentInfo")}</p>
                  )}
                </div>
              )}
              <div
                onClick={() => (data.id != 0 ? checkedit(3) : null)}
                className={`h-full cursor-pointer flex justify-between items-center ${
                  state.handeltab == 2
                    ? " text-[#3A4EFF] border-b-2 border-[#3A4EFF]"
                    : null
                } ${data.id != 0 ? null : "opacity-70"}`}
              >
                <p>{t("scheduleAppointment")} </p>
              </div>
              <div
                onClick={() => (data.id != 0 ? checkedit(4) : null)}
                className={`h-full cursor-pointer flex justify-between items-center ${
                  state.handeltab == 3
                    ? " text-[#3A4EFF] border-b-2 border-[#3A4EFF] "
                    : null
                } ${data.id != 0 ? null : "opacity-70"}`}
              >
                <p>{t("document")} </p>
              </div>
              <div
                // onClick={() => dispatch({ type: "show_Parvande_jadid" })}
                className="h-full opacity-70 cursor-pointer flex justify-between items-center "
              >
                <p>{t("payment")}</p>
              </div>
            </div>
          </div>
          <div className="h-[90%] w-full">{callstate()}</div>
        </div>
      ) : null}
    </>
  );
}

export default Tab_container;
