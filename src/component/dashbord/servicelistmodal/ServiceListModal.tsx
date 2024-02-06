import React, { useContext, useEffect, useState } from "react";
import { modalHandler } from "@/context/ModalContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { appointmnet } from "../../../../atoms/appointment";
import { useRecoilState } from "recoil";
import moment from "jalali-moment";
import i18n from "@/i18next";
import { NumericFormat } from "react-number-format";
const ServiceListModal = (props: any) => {
  const { t } = useTranslation();
  const [data, setdata] = useRecoilState<any>(appointmnet);

  const { state, dispatch }: any = useContext(modalHandler);
  const sendData = () => {
    dispatch({ type: "OFF_FINAL" });
  };
  console.log(props.service);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    minHeight: 700,
    backgroundColor: "#E7E7E7",
  };
  const nameweaktopersian = (val: any) => {
    if (val == "Monday") {
      return "دوشنبه";
    } else if (val == "Tuesday") {
      return "سه شنبه";
    } else if (val == "Wednesday") {
      return "چهارشنبه";
    } else if (val == "Thursday") {
      return "پنجشنبه";
    } else if (val == "Friday") {
      return "جمعه";
    } else if (val == "Saturday") {
      return "شنبه";
    } else if (val == "Sunday") {
      return "یکشنبه";
    } else {
      return "";
    }
  };
  const dayofweak = () => {
    const date = data.date.split("/");
    const temp = moment
      .from(`${date[0]}/${date[1]}/${date[2]}`, "fa", "YYYY/MM/DD")
      .format("YYYY/MM/DD");
    const name =
      i18n.language == "en"
        ? moment(temp).format("dddd")
        : nameweaktopersian(moment(temp).format("dddd"));
    return name;
  };
  const countall = () => {
    let v = 0;
    props.service.map((item: any) => {
      v = v + item.quantity;
    });

    return v;
  };
  const [sum, setsum] = useState(0);
  useEffect(() => {
    cal();
  });
  const cal = () => {
    let x: any = 0;
    if (!!props.service && props.service.length != 0) {
      props.service.map((item: any, index: number) => {
        x = x + item.price * item.quantity;
      });
    }
    setsum(x);
  };
  const paitstatus = () => {
    if (data.isPaid) {
      return `${t("paid")}`;
    } else {
      return `${t("paymentpendding")}`;
    }
  };
  return (
    <div>
      <Button onClick={props.handleOpen}>Open Modal</Button>
      <Modal
        // keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <>
          {!!data ? (
            <Box
              sx={style}
              // {...  { dir: "ltr" }}
            >
              <div className="h-[10%] overflow-hidden flex justify-end">
                <svg
                  onClick={props.handleClose}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 opacity-70 cursor-pointer hover:text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="flex justify-center text-sm items-center flex-col w-full">
                <div
                  className="w-full  px-10 pb-4 flex justify-between items-center
              mt-3 text-black  border-b border-[#9C9C9C]   "
                >
                  <div className="w-[10%] text-center">{t("fullname")}</div>
                  <div className="w-[10%] text-center">{t("phonenumber")}</div>
                  <div className="w-[10%] text-center">{t("Docnumber")}</div>
                  <div className="w-[10%] text-center">{t("day")}</div>
                  <div className="w-[10%] text-center">{t("timeapp")}</div>
                  <div className="w-[10%] text-center">{t("date")}</div>
                </div>
                <div
                  className="w-full px-10 flex justify-between items-center
              mt-6 text-black   "
                >
                  <div className="w-[10%] text-center">{data.customerName}</div>
                  <div className="w-[10%] text-center">{data.phoneNumber} </div>
                  <div className="w-[10%] text-center">
                    {data.documentNumber}{" "}
                  </div>
                  <div className="w-[10%] text-center"> {dayofweak()} </div>
                  <div className="w-[10%] text-center">
                    {data.time == "" ? "--" : data.time}
                  </div>
                  <div className="w-[10%] text-center">{data.date}</div>
                </div>
                <div className="tableServices h-[300px] w-[95%]  mt-24 border-b-2 border-[#9C9C9C]">
                  <table className="w-full  text-sm text-center  dark:text-gray-400">
                    <thead className="text-xs w-full uppercase sticky top-0 border-b border-[#9C9C9C] dark:bg-gray-700 dark:text-gray-400">
                      <tr className="">
                        <th scope="col" className="w-[30%] px-6 py-3">
                          {t("servicesName")}
                        </th>
                        <th scope="col" className=" w-[30%] px-6 py-3">
                          {t("number")}
                        </th>
                        <th scope="col" className="w-[40%] px-6 py-3">
                          {t("price")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-auto w-full h-[250px] ">
                      {props.service.map((item: any, index: any) => (
                        <tr
                          key={index + 1}
                          onClick={() => {}}
                          className={
                            "hover:bg-gray-200 py-3 h-[50px] dark:bg-gray-800 dark:border-gray-700"
                          }
                        >
                          <td className="w-[30%] px-6 py-3">
                            {item.serviceName}
                          </td>
                          <td className="w-[30%]  px-6 py-3">
                            {item.quantity}
                          </td>
                          <td className="w-[40%]  px-6 py-3">
                            <NumericFormat
                              displayType="text"
                              thousandsGroupStyle="thousand"
                              thousandSeparator=","
                              value={item.price}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="h-[60px]">
                      <td className="w-[30%] px-6 py-3">{paitstatus()}</td>
                      <td className="w-[30%] px-6 py-3">{countall()}</td>
                      <td className="w-[40%] px-6 py-3">
                        <div className=" text-sm flex justify-center gap-2 ">
                          <p className="text-black">{t("allprice")}:</p>
                          <NumericFormat
                            displayType="text"
                            thousandsGroupStyle="thousand"
                            thousandSeparator=","
                            value={sum}
                          />
                        </div>
                      </td>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Box>
          ) : (
            <></>
          )}
        </>
      </Modal>

      {/* <h1 onClick={handleOpen}>open me</h1> */}
    </div>
  );
};

export default ServiceListModal;
