import React, { useState, useEffect, useContext } from "react";
import { Button, Divider, Input, Space, Table, Pagination } from "antd";
import { Select } from "antd";
import { modalHandler } from "@/context/ModalContextProvider";
import { Checkbox } from "antd";
import { t } from "i18next";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import i18n from "@/i18next";
import {
  AddEndOfDay,
  GetPaymentsByDate,
  getCompletedAppointmentsByDate,
} from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { NumericFormat } from "react-number-format";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageSize } from "../../../../atoms/pageSize";
import { Pagenumber } from "../../../../atoms/pagenumber";
import Cookies from "js-cookie";
const CashDesk = () => {
  const { state, dispatch } = useContext(modalHandler);
  const [values, setValues]: any = useState("");
  const [Data, setData]: any = useState([]);
  const [actualCredit, setactualCredit]: any = useState("");
  const [actualCash, setactualCash]: any = useState("");
  ////////////////////////////////////////////////////////////////////////////
  const [pagenumber, setpagenumber] = useState<any>(1);
  const [predictedCredit, setpredictedCredit] = useState<any>(0);
  const [predictedCash, setpredictedCash] = useState<any>(0);
  const pageSize = useRecoilValue<any>(PageSize);
  const currentPage: any = Cookies.get("currentPage");
  console.log(predictedCash, predictedCredit);

  ////////////////////////////////////////////////////////////////////////////
  const handlePageChange = (page: any) => {
    setpagenumber(page);
  };
  ////////////////////////////////////////////////////////////////////////////
  const columns: any = [
    {
      title: "شماره",
      dataIndex: "",
      key: "",
      render: (text: string, record: any, index: number) =>
        (currentPage - 1) * 50 + index + 1,
    },
    {
      title: "نام",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "مبلغ پرداخت شده",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount: any) => {
        return (
          <span>
            <NumericFormat
              displayType="text"
              thousandsGroupStyle="thousand"
              thousandSeparator=","
              value={paidAmount}
            />
          </span>
        );
      },
    },
    {
      title: "نوع پرداخت",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (paymentType: any) => {
        const text = paymentType === 1 ? "پرداخت نقد" : "پرداخت کارت";
        return <span>{text}</span>;
      },
    },
    {
      title: "تاریخ",
      dataIndex: "payDate",
      key: "payDate",
      render: (payDate: any) => {
        return <span>{payDate}</span>;
      },
    },
    {
      title: "ساعت",
      dataIndex: "payTime",
      key: "payTime",
      render: (payTime: any) => {
        // const time=payDateAndTime.
        return <span>{payTime}</span>;
      },
    },
  ];
  const next = () => {
    if (Data.length !== 0) setpagenumber(pagenumber + 1);
  };
  const back = () => {
    if (pagenumber !== 1) setpagenumber(pagenumber - 1);
  };
  useEffect(() => {
    const getfun = async () => {
      if (values === "") {
        setpredictedCash(0);
        setpredictedCredit(0);
        setData([]);
        setpagenumber(1);
      } else if (values.length === 1) {
        GetPaymentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          pagenumber,
          50
        )
          .then((Response) => {
            setData(Response.data.data.pagedList);
            setpredictedCredit(Response.data.data.creditPaid);
            setpredictedCash(Response.data.data.cashPaid);
          })
          .catch((error) => {
            console.log("11111111111111111");
            notify("error", `${t("error")}`);
          });
      } else if (values.length === 2) {
        GetPaymentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[1].year}/${values[1].month.number}/${values[1].day}`,
          pagenumber,
          50
        )
          .then((Response) => {
            setData(Response.data.data.pagedList);
            setpredictedCredit(Response.data.data.creditPaid);
            setpredictedCash(Response.data.data.cashPaid);
          })
          .catch((error) => {
            console.log("11111111111111111");
            notify("error", `${t("error")}`);
          });
      }
    };
    getfun();
  }, [values, pagenumber]);

  // const predictedCredit = () => {
  //   let result = 0;
  //   if (!!Data && Data.length !== 0) {
  //     Data.map((item: any) => {
  //       if (item.paymentType === 2) {
  //         result = item.paidAmount + result;
  //       }
  //     });
  //   }
  //   return result;
  // };
  // const predictedCash = () => {
  //   let result = 0;
  //   if (!!Data && Data.length !== 0) {
  //     Data.map((item: any) => {
  //       if (item.paymentType === 1) {
  //         result = item.paidAmount + result;
  //       }
  //     });
  //   }
  //   return result;
  // };
  const submit = () => {
    if (actualCash == "" || actualCredit == "") {
      notify("erorr", ` موجودی اعتباری صندوق و موجودی نقد صندوق را وارد کنید `);
    } else {
      if (values.length === 1) {
        const req = {
          startDate: `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          endDate: `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          predictedCredit: predictedCredit,
          predictedCash: predictedCash,
          actualCredit: actualCredit,
          actualCash: actualCash,
        };
        AddEndOfDay(req)
          .then((Response) => {
            if (Response.data.isSuccess) {
              notify("success", `سند با موفقیت ثبت شد`);
            } else {
              notify("error", `${Response.data.message}`);
            }
          })
          .catch((error) =>
            notify(
              "erorr",
              `بازه زمانی وارد شده معتبر نمی باشد. شروع تاریخ مورد جدید باید از پایان تاریخ آخرین مورد ثبت شده جلوتر باشد`
            )
          );
      } else if (values.length === 2) {
        const req = {
          startDate: `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          endDate: `${values[1].year}/${values[1].month.number}/${values[1].day}`,
          predictedCredit: predictedCredit,
          predictedCash: predictedCash,
          actualCredit: actualCredit,
          actualCash: actualCash,
        };
        AddEndOfDay(req)
          .then((Response) => {
            if (Response.data.isSuccess) {
              notify("success", `سند با موفقیت ثبت شد`);
            } else {
              notify("error", `${Response.data.message}`);
            }
          })
          // .catch((error) => notify("erorr", `${t("error")}`));
          .catch((error) =>
            notify(
              "erorr",
              `بازه زمانی وارد شده معتبر نمی باشد. شروع تاریخ مورد جدید باید از پایان تاریخ آخرین مورد ثبت شده جلوتر باشد`
            )
          );
      }
    }
  };
  return (
    <div>
      <div className="flex  justify-between mt-3">
        <div className="w-[25%]   px-3 py-1">
          <DatePicker
            value={values}
            onChange={(dateObject: any) => {
              setValues(dateObject);
            }}
            inputClass="custom-input_range"
            calendar={i18n.language == "fa" ? persian : undefined}
            locale={i18n.language == "fa" ? persian_fa : undefined}
            range
            placeholder={`${t("date")}`}
          >
            <button className="text-red-900" onClick={() => setValues("")}>
              {t("delete")}
            </button>
          </DatePicker>
          <div className="flex shadow-lg justify-between h-11 lg:h-28 lg:rounded-xl rounded-md mt-1 lg:mt-3 items-center py-1 lg:py-0 px-6 xl:px-8  bg-[#F7F7F7]">
            <div className="">
              <span className="block text-[11px] lg:text-[14px] font-semibold text-center">
                {/* {categoryData && categoryData.length} */}
                <NumericFormat
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  value={predictedCash}
                />
              </span>
              <span className="block text-[10px] lg:text-[12px] font-normal">
                {/* {t('allCategory')} */}
                میزان درامد نقدی
              </span>
            </div>
            <Divider
              className="h-[25px] lg:h-[60px]"
              type="vertical"
              style={{ borderWidth: 2, borderColor: "#000000" }}
            />
            <div>
              <span className="block text-[11px] lg:text-[14px] font-semibold text-center">
                <NumericFormat
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  value={predictedCredit}
                />
              </span>
              <span className="block text-[10px] lg:text-[12px]">
                {/* {" "}
                    {t('mostconsumedCategory')} */}
                میزان درامد از طریق کارت
              </span>
            </div>
          </div>

          <div className="mt-6 pr-3">
            <h1 className="text-[13px] py-2 font-semibold">
              {" "}
              موجودی اعتباری صندوق :
            </h1>
            <div className="flex justify-between  mb-5">
              <Input
                onChange={(e: any) => {
                  setactualCredit(e.target.value);
                }}
                value={actualCredit}
                autoComplete={"off"}
                className=" cursor-pointer
                                   rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                                   hover:border-[#3A4EFF] hover:border-2
                                   focus:border-2 disabled:placeholder:text-gray-400
                                   disabled:border-[#3A4EFF] disabled:hover:border-2
                                   disabled:hover:border-[#3A4EFF]"
                name="name"
                style={{ width: 240 }}
                size="middle"
                placeholder=""
              />
            </div>
          </div>
          <div className="pr-3">
            <h1 className="text-[13px] py-2 font-semibold">
              {" "}
              موجودی نقد صندوق :
            </h1>
            <div className="flex justify-between  mb-5">
              <Input
                onChange={(e: any) => {
                  setactualCash(e.target.value);
                }}
                value={actualCash}
                autoComplete={"off"}
                className=" cursor-pointer
                                   rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                                   hover:border-[#3A4EFF] hover:border-2
                                   focus:border-2 disabled:placeholder:text-gray-400
                                   disabled:border-[#3A4EFF] disabled:hover:border-2
                                   disabled:hover:border-[#3A4EFF]"
                name="name"
                style={{ width: 240 }}
                size="middle"
                placeholder=""
              />
            </div>
          </div>

          <Button
            onClick={submit}
            type="ghost"
            className="mr-3 text-white hover:bg-[#06d84c] bg-[#26F06B] w-36 mt-20 text-xs"
          >
            ثبت
          </Button>
        </div>

        {/* <table className="w-[75%] h-fit mr-13 text-[10px] font-normal opacity-70 overflow-scroll mt-3 mx-5 shadow-lg border   hover:bg-gray-100 bg-[#F7F7F7] border-gray-200  rounded-md   lg:text-sm text-center ">
          <thead className=" text-[10px]    uppercase  h-max bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ردیف
              </th>
              <th scope="col" className="px-6 py-3">
                نام مشتری
              </th>
              <th scope="col" className="px-6 py-3">
                نوع پرداخت
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت
              </th>
            </tr>
          </thead>
          <tbody className=" hover:bg-gray-50 max-h-[500px] text-xs cursor-pointer">
            {!!Data && Data.length !== 0 ? (
              Data.map((item: any, index: any) => (
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {index + 1}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.customerName}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.paymentType === "1" ? "پرداخت نقد" : "پرداخت کارت"}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.paidAmount}
                  </th>
                </tr>
              ))
            ) : (
              <div className="text-center absolute w-1/2 mt-10 text-lg">
                خالی است
              </div>
            )}
          </tbody>
        </table> */}
        <div className="flex max-h-[580px] flex-col justify-between  overflow-scroll">
          <div className="h-[88%] w-full overflow-y-scroll">
            <Table
              pagination={false}
              className="text-sm"
              columns={columns}
              dataSource={Data}
            />
          </div>
          <div
            className={` w-full text-sm flex justify-center items-center h-[10%]  gap-3 `}
          >
            <div
              className={`bg-[#3A4EFF] 
                  w-9 h-9
               flex justify-center items-center rounded-lg ${
                 Cookies.get("hasNext") === "true"
                   ? "bg-[#3A4EFF]"
                   : "bg-[#3A4EFF]/20"
               }`}
              onClick={() => {
                !!Cookies.get("hasNext") && Cookies.get("hasNext") !== "false"
                  ? next()
                  : null;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-white cursor-pointer border-black rounded-lg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </div>
            <div
              className={`${"w-9 h-9 text-xl"} border-[2px] border-[#3A4EFF]   text-[#3A4EFF] rounded-lg flex justify-center items-center`}
            >
              {pagenumber}
            </div>
            <div
              className={`bg-[#3A4EFF] w-9 h-9   flex justify-center items-center rounded-lg ${
                Cookies.get("hasPrevious") === "true"
                  ? "bg-[#3A4EFF]"
                  : "bg-[#3A4EFF]/20"
              }`}
              onClick={back}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-7 h-7  text-white cursor-pointer  rounded-lg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashDesk;
