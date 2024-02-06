import React, { useContext, useEffect, useState } from "react";
import { modalHandler } from "@/context/ModalContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, ConfigProvider, Input } from "antd";
import { appointmnet } from "../../../../atoms/appointment";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "jalali-moment";
import i18n from "@/i18next";
import { NumericFormat } from "react-number-format";
import TextArea from "antd/es/input/TextArea";
import {
  AddPayment,
  GetFactorById,
  GetPaymentWithDetailsByFactorId,
  editAppointment,
} from "@/Dataservice/DashbordProvider";
import { log } from "console";
import { List, ListItem } from "@mui/material";
import Item from "./item";
import { notify } from "@/helper/toust";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Date_picker from "@/date_picker";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { appflow_Handller } from "@/context/appflow";
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
const Payment = (props: any) => {
  const { t } = useTranslation();
  const { state, dispatch }: any = useContext(appflow_Handller);
  const category = [
    { label: `${t("chash")}`, value: 1 },
    { label: `${t("card")}`, value: 2 },
  ];
  const [data, setdata] = useRecoilState<any>(appointmnet);
  const [price, setprice]: any = useState(-1);
  const [list, setlist]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nameofweak, setnameofweak] = useState();
  // const [state, setState]: any = useState(
  //   new DateObject({
  //     calendar: persian,
  //     locale: persian_fa,
  //   })
  // );
  // console.log(list);
  const initdate = new DateObject({
    calendar: persian,
    locale: persian_fa,
  });
  const [item, setitem]: any = useState({
    id: 0,
    paymentType: 0,
    date: `${initdate.year}/${initdate.month.number}/${initdate.day}`,
    paidAmount: "",
  });
  console.log(list);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // overflow:'scroll',
    // overflow : 'hidden',
    // maxHeight: 00,
    minHeight: 500,
    backgroundColor: "white",
  };
  // console.log(data);
  // console.log(props.service);

  useEffect(() => {
    console.log(data.factorId);
    GetFactorById(data.factorId)
      .then((Response) => {
        setprice(Response.data.data.total);
        if (Response.data.isSuccess) {
        }
        // console.log(Response.data.data.total);
      })
      .catch((error) => {
        // notify("error", `${t("error")}`);
      });
    GetPaymentWithDetailsByFactorId(data.factorId)
      .then((Response) => {
        if (Response.data.isSuccess) {
          setlist(Response.data.dataList);
        }
      })
      .catch((error) => {
        // notify("error", `${t("error")}`);
      });
  }, []);
  function handleChange(checkedValues: any) {
    setitem({ ...item, paymentType: checkedValues.target.value });
  }
  const payment = () => {
    if (
      item.paymentType != 0 &&
      item.paidAmount != "" &&
      item.paidAmount <= price - pricelist
    ) {
      if (list.length == 0) {
        setlist((current: any) => [...current, { ...item, id: 1 }]);
      } else {
        let lastElement = list[list.length - 1];
        setlist((current: any) => [
          ...current,
          { ...item, id: lastElement.id + 1 },
        ]);
      }
      setitem({
        id: 0,
        paymentType: 0,
        paidAmount: "",
        date: `${initdate.year}/${initdate.month.number}/${initdate.day}`,
      });
    } else {
      if (price - pricelist < item.paidAmount) {
        notify("error", `مبلغ وارد شده از باقی مانده فاکتور بیش تر است`);
      }
      if (item.paidAmount == "") {
        notify("error", `مبلغ را وارد کنید   `);
      }
      if (item.paymentType == 0) {
        notify("error", `نوع مبلغ دریافتی را وارد کنید `);
      }
    }
  };
  const submit = async () => {
    setIsLoading(true);
    console.log(data.factorId, list);
    if (state.handletable == 1) {
      let req = {
        id: data.id,
        customerId: data.customerId,
        appointmentStatusId: 2,
        date: data.date,
        time: data.time,
        description: data.description,
      };
      await editAppointment(req)
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
    }
    AddPayment(data.factorId, list)
      .then((Response) => {
        if (Response.data.isSuccess) {
          console.log("ddddddddddddddddddddddddddddddd");
          props.handleClose();
          notify("success", `پرداخت با موفقیت انجام شد`);
          setdata(init);
          props.fetchdata();
        } else {
        }
      })
      .catch((error) => {
        // notify("error", `${t("error")}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [pricelist, setpricelist]: any = useState(0);
  useEffect(() => {
    let sum = 0;
    list.map((item: any) => {
      sum = sum + item.paidAmount;
    });
    setpricelist(sum);
  }, [list]);
  const deleteitem = (index: number) => {
    setlist(list.filter((item: any) => item !== index));
  };
  const updateList = (
    id: number,
    value: number,
    oldprice: number,
    date: any
  ) => {
    if (value != 0 || value <= oldprice || value <= price - pricelist) {
      setlist((prevList: any) =>
        prevList.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              paidAmount: value,
              date: date,
            };
          }
          return item;
        })
      );
      return true;
    }
    return false;
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
        <Box
          sx={style}
          // {...  { dir: "ltr" }}
        >
          {price !== -1 ? (
            <div className="w-full h-[500px] ">
              <div className="w-full h-[10%] flex items-start justify-between">
                <p>پرداخت </p>
              </div>
              <div className="w-full h-[80%] ">
                <div className="flex justify-between h-[10%]  border-black py-1 border-b-[1px]">
                  <p>قیمت کل فاکتور : </p>
                  <div className="flex gap-3">
                    {pricelist != 0 ? (
                      price == pricelist ? (
                        <p className="text-green-800"> پرداخت شد</p>
                      ) : (
                        <p className="text-green-800">
                          <NumericFormat
                            displayType="text"
                            thousandsGroupStyle="thousand"
                            thousandSeparator=","
                            value={price - pricelist}
                          />
                        </p>
                      )
                    ) : null}
                    {pricelist != 0 ? <p> = </p> : null}
                    {pricelist != 0 ? (
                      <p className="text-red-800">
                        <NumericFormat
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={pricelist}
                        />
                      </p>
                    ) : null}

                    {pricelist != 0 ? <p> - </p> : null}
                    <p>
                      <NumericFormat
                        displayType="text"
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                        value={price}
                      />{" "}
                      تومان
                    </p>
                  </div>
                </div>
                <div className="w-full h-[90%]  ">
                  <div className="w-full h-[20%] p-3 border-b-[1px] border-black ">
                    <div className="w-full h-full flex overflow-hidden border-black border-[2px] rounded-xl ">
                      <div className="w-[50%] flex justify-center items-center h-full">
                        <NumericFormat
                          className={`
                         w-full px-2 h-full rounded-md border-none`}
                          placeholder={`مبلغ :`}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          onValueChange={(values) => {
                            const { formattedValue, value, floatValue } =
                              values;
                            // do something with floatValue
                            setitem({ ...item, paidAmount: floatValue });
                          }}
                          value={item.paidAmount}
                        />
                      </div>
                      <div className="flex items-center gap-3 ">
                        <DatePicker
                          inputClass="custom-input"
                          value={item.date}
                          calendar={i18n.language == "fa" ? persian : undefined}
                          locale={
                            i18n.language == "fa" ? persian_fa : undefined
                          }
                          calendarPosition="bottom-right"
                          onChange={(dateObject: any) => {
                            setitem({
                              ...item,
                              date: `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`,
                            });
                          }}
                        />
                      </div>
                      <div className="w-[30%] flex justify-center items-center  h-full">
                        {category.map((val: any) => (
                          <Checkbox
                            key={val.label}
                            onChange={handleChange}
                            checked={val.value == item.paymentType}
                            value={val.value}
                          >
                            {val.label}
                          </Checkbox>
                        ))}
                      </div>
                      <div
                        onClick={payment}
                        className="text-white w-[20%] hover:text-black border-2 border-[#3A4EFF]  hover:bg-[#3A4EFF]/40  transition bg-[#3A4EFF] flex justify-center items-center h-full cursor-pointer"
                      >
                        <p>پرداخت</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[80%] p-3 flex flex-col gap-5 overflow-y-scroll">
                    <List>
                      {!!list && list.length !== 0
                        ? list.map((item: any, index: number) => (
                            <Item
                              item={item}
                              updateList={updateList}
                              deleteitem={deleteitem}
                            />
                          ))
                        : null}
                    </List>
                  </div>
                </div>
              </div>
              <div className="w-full h-[10%] flex justify-center items-center gap-5">
                <div
                  onClick={() => (isLoading === false ? submit() : null)}
                  className="bg-[#24D560] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#2CFF74]/20 border-[#24D560] hover:text-black  px-10"
                >
                  ثبت
                </div>
                <div
                  onClick={() => props.handleClose()}
                  className="bg-[#FF5757] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#FF5757]/20 border-[#FF5757] hover:text-black  px-10"
                >
                  انصراف
                </div>
              </div>
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default Payment;
