import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Space } from "antd";
const { Search } = Input;
import { AudioOutlined } from "@ant-design/icons";
import { modalHandler } from "@/context/ModalContextProvider";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import i18n from "@/i18next";
import { t } from "i18next";

const OverViewNavbar = (props:any) => {
  
  const { state, dispatch }: any = useContext(modalHandler);
  
  return (
    <div className="h-[7%] py-2 mt-3  w-full flex justify-center pb-4 items-center border-b-2 border-[#777676]">
      <div className="h-full    flex w-full px-5 justify-between items-center ">
        <div className="flex">
          <div
            onClick={() => dispatch({ type: "OVERVIEW_HANDLER", payload: 1 })}
            className={
              state.overViewPageNumber === 1
                ? "cursor-pointer shadow-blue-gray-300 text-[13px] font-normal shadow-lg border-2 border-[#3a4eff] px-8 py-1 mr-5 rounded-md text-black bg-white"
                : "cursor-pointer shadow-blue-gray-300 shadow-lg  border-2  text-[13px] font-normal border-[#3a4eff] px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF]"
            }
          >
            <p className="font-normal"> مشتریان </p>
          </div>
          <div
            onClick={() => dispatch({ type: "OVERVIEW_HANDLER", payload: 2 })}
            className={
              state.overViewPageNumber === 2
                ? "cursor-pointer shadow-blue-gray-300  text-[13px] font-normal shadow-lg px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white"
                : "cursor-pointer shadow-blue-gray-300  text-[13px] font-normal shadow-lg border-2 border-[#3a4eff]  px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF]"
            }
          >
            <p>آنالیز</p>
          </div>
          <div
            onClick={() => dispatch({ type: "OVERVIEW_HANDLER", payload: 3 })}
            className={
              state.overViewPageNumber === 3
                ? "cursor-pointer shadow-blue-gray-300  text-[13px] font-normal shadow-lg  px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white"
                : "cursor-pointer shadow-blue-gray-300  text-[13px] font-normal shadow-lg border-2 border-[#3a4eff] px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF]"
            }
          >
            <p>گزارش گیری</p>
          </div>
        </div>
        <div className="flex justify-between items-center">

  {state.overViewPageNumber === 2  ? (
            <div className="px-2 rounded-[6px] overflow-hidden">
              <DatePicker
                
                value={props.weekValues}
                onChange={(dateObject: any) => {
                  props.setWeekValues(dateObject);
                }}
                 inputClass="custom-input_range"
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                range
                // weekPicker
                placeholder={`${t("date")}`}
              >
                <button
                  className="text-red-900 "
                  onClick={() => props.setWeekValues("")}
                >
                  {t("delete")}
                </button>
              </DatePicker>
            </div>
          ) : (
            ""
          )}
          {state.overViewPageNumber ===  3 ? (
            <div className="px-2 rounded-[6px] overflow-hidden">
              <DatePicker
                value={props.values}
                onChange={(dateObject: any) => {
                  props.setValues(dateObject);
                }}
                inputClass="custom-input_range"
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                range
                placeholder={`${t("date")}`}
              >
                <button
                  // style={{ margin: "5px 0" }}
                  className="text-red-900 "
                  onClick={() => props.setValues("")}
                >
                  {t("delete")}
                </button>
              </DatePicker>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default OverViewNavbar;
