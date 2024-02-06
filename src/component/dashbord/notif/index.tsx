import React, { useContext, useEffect, useState } from "react";
import { Dropdown, MenuProps } from "antd";
import { appflow_Handller } from "@/context/appflow";
import { useRecoilState } from "recoil";
import { appointment_list } from "../../../../atoms/appointment_list";
import {
  getNotfication,
  getTomorrowPreAppointments,
} from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { useTranslation } from "react-i18next";

const Notif = ({ setValues, notifdata, setnotif }: any) => {
  const { state, dispatch }: any = useContext(appflow_Handller);
  const [listdata, setlistdata] = useRecoilState<any>(appointment_list);
  const [firstload, setfirstload] = useState(false);
  const { t, i18n } = useTranslation();
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          onClick={() => {
            dispatch({ type: "set_seetomorrowpreapp" });
            setValues("");
            fungetTomorrowPreAppointments();
          }}
        >
          لیست پیش نوبت های فردا را بررسی کنید
        </a>
      ),
      key: "0",
    },
  ];
  useEffect(() => {
    const fetch = async () => {
      await getNotfication()
        .then((Response) => {
          if (Response.data.isSuccess === false) {
            setnotif();
          } else {
            setnotif(Response.data);
          }
        })
        .catch((error) => notify("erorr", `${t("error")}`));
    };
    fetch();
    setfirstload(true);
  }, []);

  const fungetTomorrowPreAppointments = async () => {
    await getTomorrowPreAppointments()
      .then((response) => {
        setlistdata(response.data.dataList);
        if (response.data.isSuccess) {
        } else {
          notify("error", `${response.data.message}`);
        }
      })
      .catch((error) => notify("erorr", `${t("error")}`));
  };
  return (
    <>
      {firstload === true ? (
        <div className="absolute left-[200px]">
          {notifdata !== undefined ? (
            <>
              <div className="rounded-full h-3 w-3 bg-red-700 absolute z-30 left-[8px]"></div>
              <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </a>
              </Dropdown>
            </>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Notif;
