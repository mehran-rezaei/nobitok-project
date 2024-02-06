import React, { useContext, useEffect, useState } from "react";
// import { Button, Dropdown, Input, Menu, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { modalHandler } from "@/context/ModalContextProvider";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import i18n from "@/i18next";
import { t } from "i18next";

const CashDeskNavbar = (props: any) => {
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const { state, dispatch }: any = useContext(modalHandler);
  const onSearch = (value: string) => {
    console.log(value);
  };
  const onchange = (event: any) => {
    console.log(event.target.value);
  };
  const searchapp = () => {
    console.log(props.values);
  };
  return (
    <div className="h-[7%] py-2 mt-3  w-full flex justify-center pb-4 items-center border-b-2 border-[#777676]">
      <div className="h-full    flex w-full px-5 justify-between items-center ">
        <div className="flex">
          <div
            onClick={() => dispatch({ type: "CASHDESK_HANDLER", payload: 1 })}
            className={
              state.cashPageNumber === 1
                ? "cursor-pointer shadow-blue-gray-300 text-[13px] font-normal shadow-lg border-2 border-[#3a4eff] px-8 py-1 mr-5 rounded-md text-black bg-white"
                : "cursor-pointer shadow-blue-gray-300 shadow-lg  border-2  text-[13px] font-normal border-[#3a4eff] px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF]"
            }
          >
            <p className="font-normal"> صندوق </p>
          </div>
          <div
            onClick={() => dispatch({ type: "CASHDESK_HANDLER", payload: 2 })}
            className={
              state.cashPageNumber === 2
                ? "cursor-pointer shadow-blue-gray-300  text-[13px] font-normal shadow-lg px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white"
                : "cursor-pointer shadow-blue-gray-300  text-[13px] font-normal shadow-lg border-2 border-[#3a4eff]  px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF]"
            }
          >
            <p>وضعیت صندوق</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {state.cashPageNumber === 2 ? (
            <div className="px-2 text-xs rounded-[6px] overflow-hidden">
              <DatePicker
                value={props.values}
                onClose={searchapp}
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
                  className="text-red-900   "
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

export default CashDeskNavbar;
