import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Input, Space } from "antd";
import { Select } from "antd";
import { modalHandler } from "@/context/ModalContextProvider";
import { Checkbox } from "antd";
import axios from "axios";
import { GetAllAppppp } from "@/Dataservice/DashbordProvider";
import { GetAppointmentWithPaymentDetailsByDate } from "@/Dataservice/Overview";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { notify } from "@/helper/toust";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const Doc = (props: any) => {
  const { values } = props;
  const [customerType, setCustomerType] = useState(0);
  const [firstrender, setfirstrender]: any = useState(false);
  const [customerTypeapp, setCustomeapp] = useState<any>([]);
  const [global, setglobal] = useState<any>([]);
  const { t, i18n } = useTranslation();
  const [state, setstate] = useState({
    number: 0,
    price1: 0,
    price2: 0,
    sumprice: 0,
  });

  useEffect(() => {
    const getfun = async () => {
      if (values === "") {
        const date = new DateObject({ calendar: persian, locale: persian_fa });
        GetAppointmentWithPaymentDetailsByDate(
          `${date.year}/${date.month.number}/${date.day}`,
          `${date.year}/${date.month.number}/${date.day}`
        )
          .then((Response) => {
            if (Response.data.isSuccess) {
              const get1 = async () => {
                setglobal(Response.data.dataList);
                setCustomeapp(
                  await checkconditionforget(Response.data.dataList)
                );
                setfirstrender(true);
              };
              get1();
            }
          })
          .catch((error) => {
            console.log("11111111111111111");
            notify("error", `${t("error")}`);
          });
      } else if (values.length === 2) {
        GetAppointmentWithPaymentDetailsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[1].year}/${values[1].month.number}/${values[1].day}`
        )
          .then((Response) => {
            if (Response.data.isSuccess) {
              const get1 = async () => {
                setglobal(Response.data.dataList);
                setCustomeapp(
                  await checkconditionforget(Response.data.dataList)
                );
                setfirstrender(true);
              };
              get1();
            }
          })
          .catch((error) => {
            console.log("11111111111111111");
            notify("error", `${t("error")}`);
          });
      }
    };
    getfun();
  }, [values]);
  ///
  const calculatecashPayment = () => {
    let sum: any = 0;
    customerTypeapp.map((item: any) => {
      sum = sum + item.cashPayment;
    });
    return sum;
  };
  ///
  const calculatecreditcardPayment = () => {
    let sum: any = 0;
    customerTypeapp.map((item: any) => {
      sum = sum + item.creditCardPayment;
    });
    return sum;
  };
  ///
  const [check, setcheck]: any = useState(false);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setcheck(e.target.checked);
  };
  ///
  useEffect(() => {
    function check1(item: any) {
      return item.cashPayment > 0;
    }
    function check2(item: any) {
      return item.creditCardPayment > 0;
    }
    if (firstrender == true) {
      if (check == true) {
        if (customerType === 0) {
          const temp = global.filter(check1);
          setCustomeapp(temp);
        } else {
          const temp = global.filter(check2);
          setCustomeapp(temp);
        }
      } else if (check == false) {
        console.log(customerTypeapp);

        setCustomeapp(global);
      }
    }
  }, [check, customerType]);
  ///
  const checkconditionforget = (data: any) => {
    function check1(item: any) {
      return item.cashPayment > 0;
    }
    function check2(item: any) {
      return item.creditCardPayment > 0;
    }

    if (check == true) {
      if (customerType === 0) {
        const temp = data.filter(check1);
        return temp;
      } else {
        const temp = data.filter(check2);
        return temp;
      }
    } else if (check == false) {
      console.log(data);

      return data;
    }
  };
  return (
    <div className="h-[90%]">
      <div className="flex justify-between  h-full">
        <div className="w-[30%]  pt-3 px-6 ">
          <div className="flex justify-between">
            <h1 className="pb-4 text-sm pr-2 font-semibold">نوع پرداخت :</h1>
            <Checkbox onChange={onChange}></Checkbox>
          </div>

          <div className="flex justify-between py-2.5 px-4 shadow-lg font-medium  text-xs bg-[#F2F2F2] rounded-[6px]">
            <div className="flex justify-center">
              <button
                onClick={() => setCustomerType(0)}
                type="button"
                className={
                  customerType === 0
                    ? " w-[120px] text-white bg-[#3A4EFF] rounded-[5px] py-1.5"
                    : "w-[120px] text-[black] py-1.5"
                }
              >
                نقد
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setCustomerType(1)}
                type="button"
                className={
                  customerType === 1
                    ? " w-[120px] text-white bg-[#3A4EFF] rounded-[5px] py-1.5"
                    : "w-[120px] text-[black] py-1.5"
                }
              >
                کارت
              </button>
            </div>
          </div>
          <div className="bg-[#F2F2F2] px-6 mt-6 rounded-[5px] pt-3 py-2 flex flex-col justify-center items-center">
            <div className="w-full text-center border-b-2 pb-1 font-medium mb-7 border-black">
              <h2 className="font-semibold text-base">
                {customerTypeapp.length}
              </h2>
              <h3 className="py-2 text-sm">کل پرداختی ها </h3>
            </div>
            <div className="w-full text-center border-b-2 pb-1 font-medium mb-7 border-black">
              <h2 className="font-semibold text-base">
                <NumericFormat
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  value={calculatecashPayment()}
                />
              </h2>
              <h3 className="py-2 text-sm">میزان درامد نقدی</h3>
            </div>
            <div className="w-full text-center border-b-2 pb-1 font-medium mb-7 border-black">
              <h2 className="font-semibold text-base">
                <NumericFormat
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  value={calculatecreditcardPayment()}
                />
              </h2>
              <h3 className="py-2 text-sm">میزان درامد از طریق کارت</h3>
            </div>
            <div className="w-full text-center border-b-2 pb-1 font-medium mb-7 border-black">
              <h2 className="font-semibold text-base">
                <NumericFormat
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  value={calculatecreditcardPayment() + calculatecashPayment()}
                />
              </h2>
              <h3 className="py-2 text-sm">کل درامد حاصل </h3>
            </div>
            {/* <div className="w-full text-center border-b-2 pb-2 font-medium mb-7 border-black">
                <h2 className="font-semibold text-base">124</h2>
                <h3 className="py-2">میزان درامد از طریق کارت</h3>
            </div> */}
            <Button
              type="primary"
              className=" text-white bg-[#3A4EFF] w-44 mt-4 mb-3 text-xs"
            >
              چاپ کامل گزارش
            </Button>
          </div>
        </div>
        <div className="h-[90%] w-full">
          <table className="w-full h-fit  text-[10px] font-normal opacity-70 overflow-scroll  shadow-lg border hover:bg-gray-100 bg-[#F7F7F7] border-gray-200 rounded-md lg:text-sm text-center ">
            <thead className="text-[10px] lg:text-xs uppercase h-max bg-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ردیف
                </th>
                <th scope="col" className="px-6 py-3">
                  نام مشتری
                </th>
                <th scope="col" className="px-6 py-3">
                  تاریخ
                </th>
                <th scope="col" className="px-6 py-3">
                  ساعت
                </th>
                <th scope="col" className="px-6 py-3">
                  قیمت کارتی
                </th>
                <th scope="col" className="px-6 py-3">
                  قیمت نقدی
                </th>
                <th scope="col" className="px-6 py-3">
                  قیمت کل
                </th>
              </tr>
            </thead>
            <tbody className=" hover:bg-gray-50 text-xs max-h-[500px] cursor-pointer">
              {customerTypeapp && customerTypeapp.length !== 0 ? (
                (customerTypeapp || []).map((item: any, index: any) => (
                  <tr className="my-3">
                    <th scope="col" className="px-6 py-3">
                      {index + 1}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {item.customerName}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {item.date}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {item.time}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {item.creditCardPayment}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {item.cashPayment}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {item.cashPayment + item.creditCardPayment}
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                1401/2/1   
                </th> */}
                  </tr>
                ))
              ) : (
                <div className="text-center  w-full flex justify-center pb-14 items-center mt-10 text-lg">
                  خالی است
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doc;
