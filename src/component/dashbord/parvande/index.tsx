import { useContext, useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Input, Space } from "antd";
const { Search } = Input;
import { Select } from "antd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import type { SelectProps } from "antd";
import { appointmnet } from "../../../../atoms/appointment";
import { appflow_Handller } from "@/context/appflow";
import {
  GetDocumentByCustomerId,
  GetFactorItems,
  SearchCustomer,
  editCustomer,
  getAllCustomers,
  getAllPreAppointments,
  getAllTodayAppointments,
  getCustomerAppointments,
} from "@/Dataservice/DashbordProvider";
import { useTranslation } from "react-i18next";
import { appointment_list } from "../../../../atoms/appointment_list";
import { notify } from "@/helper/toust";
import { NumericFormat } from "react-number-format";
import Form1 from "../form/form1";
import { log } from "console";
import { PageSize } from "../../../../atoms/pageSize";
import { Pagenumber } from "../../../../atoms/pagenumber";
const { TextArea } = Input;
interface dataType {
  drugConsume: string;
  thyroidDisease: string;
  bloodPressure: string;
  smokingOrAlcoholConsumption: string;
  acutanConsumption: string;
  cardiovascularDisease: string;
  pregnancy: string;
  diabetes: string;
  breastFeeding: string;
  deformedWounds: string;
  herpes: string;
  radioTherapy: string;
  medicalAllergy: string;
  neuropsychiatricDiseases: string;
  hiv: string;
  hepatitis: string;
  shockDuringInjection: string;
  presenceOfMetalPlates: string;
  customerId: Number;
}
const dataType_init = {
  drugConsume: "",
  thyroidDisease: "",
  bloodPressure: "",
  smokingOrAlcoholConsumption: "",
  acutanConsumption: "",
  cardiovascularDisease: "",
  pregnancy: "",
  diabetes: "",
  breastFeeding: "",
  deformedWounds: "",
  herpes: "",
  radioTherapy: "",
  medicalAllergy: "",
  neuropsychiatricDiseases: "",
  hiv: "",
  hepatitis: "",
  shockDuringInjection: "",
  presenceOfMetalPlates: "",
  customerId: 0,
};
/////////////////////////////////////////////
const initdata = {
  id: 0,
  name: "",
  phoneNumber: "",
  nationalCode: "",
  documentNumber: "",
  dateOfBirth: "",
  description: "",
};
/////////////////////////////////////////////

/////////////////////////////////////////////
const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
/////////////////////////////////////////////
function Parvande_ha() {
  const { t, i18n } = useTranslation();
  const [data, setdata]: any = useRecoilState<any>(appointmnet);
  const setlist = useSetRecoilState<any>(appointment_list);
  const { state, dispatch }: any = useContext(appflow_Handller);
  const [customer_info, setcustomer_info]: any = useState(initdata);
  const [firstloading, setfirstloading] = useState(true);
  const [CustomerAppointment, setCustomerAppointment] = useState<any>();
  const [FactorItems, setFactorItems] = useState<any>();

  let init: any = {};

  //////////////////////////////////////////////////////////
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [Docdata, setDocdata] = useState<dataType>(dataType_init);
  // console.log(Docdata);

  //////////////////////////////////////////////////////////
  const [pagenumber, setpagenumber] = useRecoilState<any>(Pagenumber);
  const pageSize = useRecoilValue<any>(PageSize);
  //////////////////////////////////////////////////////////

  useEffect(() => {
    const get = async () => {
      await SearchCustomer(data.phoneNumber)
        .then((data) => {
          setcustomer_info(data.data.dataList[0]);
          if (data.data.isSuccess) {
          } else {
            notify("error", `${data.data.message}`);
          }
        })
        .catch((error) => {
          notify("error", `${t("error")}`);
        });
    };
    get();
  }, []);
  useEffect(() => {
    if (customer_info.id != 0) {
      getCustomerAppointments(customer_info.id)
        .then((data) => {
          setCustomerAppointment(data.data.dataList);
          if (data.data.isSuccess) {
          } else {
            // notify("error", `${data.data.message}`);
          }
        })
        .catch((error) => {
          notify("error", `${t("error")}`);
        });
      GetDocumentByCustomerId(customer_info.id)
        .then((data) => {
          console.log(customer_info.id);
          console.log(data.data);
          if (data.data.isSuccess) {
            setDocdata(data.data.data);
          } else {
            setDocdata(dataType_init);
          }
        })
        .catch((error) => {
          setDocdata(dataType_init);
          notify("error", `${t("error")}`);
        });
      init = customer_info;
      // console.log(Docdata);
      setfirstloading(true);
    }
  }, [customer_info]);
  //////////////////////////////////////////////////////////////
  const onclickgetfactoritem = (id: number) => {
    if (!!id)
      GetFactorItems(id)
        .then((data) => {
          setFactorItems(data.data.dataList);
          if (data.data.isSuccess) {
          } else {
            notify("error", `${data.data.message}`);
          }
        })
        .catch((error) => {
          notify("error", `${t("error")}`);
        });
  };

  //////////////////////////////////////////////////////////
  const Submit = async () => {
    const req = {
      id: customer_info.id,
      name: customer_info.name,
      phone: customer_info.phoneNumber,
      nationalCode: customer_info.nationalCode,
      dateOfBirth: customer_info.dateOfBirth,
      description: customer_info.description,
    };
    console.log(req);

    await editCustomer(req)
      .then((data) => {
        if (data.data.isSuccess) {
          notify("success", `${t("successful")}`);
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
        SearchCustomer(data.phoneNumber)
          .then((data) => {
            setcustomer_info(data.data.dataList[0]);
            if (data.data.isSuccess) {
            } else {
              notify("error", `${data.data.message}`);
            }
          })
          .catch(() => notify("error", `${t("error")}`));
        console.log(data);
      });
    if (state.handletable == 1) {
      getAllTodayAppointments(pagenumber, pageSize)
        .then((Response) => setlist(Response.data.dataList))
        .catch((error) => notify("error", `${t("error")}`));
    } else if (state.handletable == 2) {
      getAllPreAppointments(1, pageSize)
        .then((Response) => setlist(Response.data.dataList))
        .catch((error) => notify("error", `${t("error")}`));
    } else if (state.handletable == 3) {
      await getAllCustomers(pagenumber, pageSize)
        .then((Response) => {
          setlist(Response.data.dataList);
        })
        .catch((error) => notify("error", `${t("error")}`));
    }
  };
  //////////////////////////////////////////////////////////
  const handelcancel = () => {
    SearchCustomer(data.phoneNumber)
      .then((data) => {
        setcustomer_info(data.data.dataList[0]);
        if (data.data.isSuccess) {
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch(() => notify("error", `${t("error")}`));
    // console.log(data);

    // setcustomer_info(data);
  };
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (initdata.id != 0) handelcancel();
  }, [state.handeltab]);
  //////////////////////////////////////////////////////////
  const [selectrow, setrow] = useState(0);
  //////////////////////////////////////////////////////////
  return (
    <>
      {!!firstloading && !!customer_info ? (
        <div className="flex w-full h-full">
          <div className="w-2/4 h-full flex flex-col justify-between p-2">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <Input
                  className="border-2  border-[#6171FF]"
                  onChange={(e: any) => {
                    setcustomer_info({
                      ...customer_info,
                      ["name"]: e.target.value,
                    });
                  }}
                  id="disable"
                  value={
                    !!customer_info.name
                      ? customer_info.name
                      : customer_info.customerName
                  }
                  disabled={state.handleEditparvnde}
                  style={{ width: "50%" }}
                  size="small"
                  placeholder={`${t("fullname")} :`}
                />
                <NumericFormat
                  className={`${
                    state.handleEditparvnde
                      ? "border-[#d9d9d9] bg-black/5 cursor-not-allowed"
                      : "border-[#6171FF]"
                  } border-2   rounded-md border-[#6171FF]`}
                  value={customer_info.documentNumber}
                  disabled={state.handleEditparvnde}
                  style={{ width: "40%" }}
                  placeholder={`${t("Docnumber")} :`}
                />
              </div>
              <div className="flex gap-4">
                <NumericFormat
                  className={`${
                    state.handleEditparvnde
                      ? "border-[#d9d9d9] bg-black/5 cursor-not-allowed"
                      : "border-[#6171FF]"
                  } border-2   rounded-md border-[#6171FF]`}
                  onChange={(e: any) => {
                    setcustomer_info({
                      ...customer_info,
                      ["nationalCode"]: e.target.value,
                    });
                  }}
                  value={customer_info.nationalCode}
                  disabled={state.handleEditparvnde}
                  style={{ width: "50%" }}
                  placeholder={`${t("nationalcode")} :`}
                />
                <DatePicker
                  inputClass={`${
                    state.handleEditparvnde
                      ? "custom-input_disable"
                      : "custom-input"
                  }`}
                  placeholder={`${t("birthdaydate")}`}
                  disabled={state.handleEditparvnde}
                  value={customer_info.dateOfBirth}
                  calendar={i18n.language == "fa" ? persian : undefined}
                  locale={i18n.language == "fa" ? persian_fa : undefined}
                  calendarPosition="bottom-right"
                  onChange={(dateObject: any) => {
                    setcustomer_info({
                      ...customer_info,
                      ["dateOfBirth"]: `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`,
                    });
                  }}
                />
              </div>
              <div>
                <NumericFormat
                  className={`${
                    state.handleEditparvnde
                      ? "border-[#d9d9d9] bg-black/5 cursor-not-allowed"
                      : "border-[#6171FF]"
                  } border-2   rounded-md border-[#6171FF]`}
                  onChange={(e: any) => {
                    setcustomer_info({
                      ...customer_info,
                      ["phoneNumber"]: e.target.value,
                    });
                  }}
                  allowLeadingZeros
                  id="disable"
                  value={customer_info.phoneNumber}
                  disabled={state.handleEditparvnde}
                  style={{ width: "50%" }}
                  placeholder={`${t("phonenumber")} :`}
                />
              </div>
              <div className="w-full h-fit">
                <TextArea
                  className="border-2 border-[#6171FF]"
                  onChange={(e: any) => {
                    setcustomer_info({
                      ...customer_info,
                      ["description"]: e.target.value,
                    });
                  }}
                  value={customer_info.description}
                  disabled={state.handleEditparvnde}
                  maxLength={100}
                  style={{ height: 60, resize: "none" }}
                  placeholder={`${t("description")} :`}
                />
              </div>
              {/* /////////////////////////////// */}
              <div className="w-full text-xs flex justify-end cursor-pointer">
                <div
                  onClick={() => {
                    !!Docdata ? handleOpen1() : null;
                  }}
                  className="  px-3 py-1 bg-[#3A4EFF] rounded-md flex justify-center items-center border-2 border-[#3A4EFF] text-white  hover:bg-white hover:text-black hover:border-[#3A4EFF]"
                >
                  سابقه پزشکی
                </div>
              </div>
              {/* /////////////////////////////// */}
            </div>
            {state.handleEditparvnde == true ? (
              <div className="flex items-center gap-3">
                <div
                  onClick={() => {
                    dispatch({ type: "rev_Edit_parvande" });
                  }}
                  className="px-3 cursor-pointer py-1.5 bg-[#FFC061] rounded-md border-2 border-[#FFCB7C]  hover:bg-[#FFCB7C]/20 hover:text-black hover:border-[#FFCB7C]  text-sm text-white"
                >
                  <p>{t("edit")}</p>
                </div>
                <div className="px-3 cursor-pointer py-1.5 bg-[#FF5757] border-2 border-[#FF5757]  hover:bg-[#FF5757]/20 hover:text-black hover:border-[#FF5757] rounded-md text-sm text-white">
                  <p>{t("deletedocument")}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div
                  onClick={() => {
                    Submit();
                    dispatch({ type: "rev_Edit_parvande" });
                  }}
                  className="px-3 py-1.5 cursor-pointer border-2 border-[#2CFF74]  hover:bg-[#22EF67]/20 hover:text-black hover:border-[#24D560] bg-[#2CFF74] rounded-md text-sm text-white"
                >
                  <p>{t("submit")}</p>
                </div>
                <div
                  onClick={() => {
                    dispatch({ type: "cant_Edit_parvande" });
                    handelcancel();
                  }}
                  className="px-3 cursor-pointer py-1.5 bg-[#FF5757] border-2 border-[#FF5757]  hover:bg-[#FF5757]/20 hover:text-black hover:border-[#FF5757] rounded-md text-sm text-white"
                >
                  <p>{t("cancel")}</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-2/4 p-2">
            <div className=" h-full flex flex-col gap-2">
              {/* <div className=" flex  gap-2 h-[10%]">
                <div className="w-4/6">
                  <Select
                    size="small"
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Fillter"
                    onChange={handleChange}
                    options={options}
                  />
                </div>
                <div className="w-2/6">
                  <Search
                    size="small"
                    placeholder={`${t("search")}`}
                    onSearch={onSearch}
                    enterButton
                  />
                </div>
              </div> */}
              <div className="flex justify-between w-full h-full ">
                <div className="h-full w-[49%] border-[1px] overflow-scroll rounded-md border-[#000000] flex items-center  flex-col">
                  <div className="p-1">
                    <p className="text-sm">{t("appointmentlist")}</p>
                  </div>
                  <div className="w-[90%]  text-center flex justify-between p-2 ">
                    <p className="text-sm w-[45%]">{t("time")}</p>
                    <p className="text-sm w-[45%]">{t("date")}</p>
                  </div>
                  {!!CustomerAppointment
                    ? CustomerAppointment.map((item: any, index: any) => (
                        <div
                          key={index + 1}
                          onChange={() => {
                            selectrow == index + 1
                              ? setrow(0)
                              : setrow(index + 1);
                          }}
                          onClick={() => {
                            onclickgetfactoritem(item.factorId);
                          }}
                          className="w-[90%] text-center flex justify-between p-2 hover:bg-gray-100  cursor-pointer rounded-md"
                        >
                          <p className="text-sm w-[45%]">{item.time}</p>
                          <p className="text-sm w-[45%]">{item.date}</p>
                        </div>
                      ))
                    : null}
                </div>
                <div className="h-full w-[49%] border-[1px] rounded-md border-[#000000] flex items-center  flex-col">
                  <div className="p-1">
                    <p className="text-sm">{t("serviceslist")}</p>
                  </div>
                  <div className="w-[90%] text-sm text-center flex justify-between p-1  ">
                    <p className="w-[45%]">{t("name")}</p>
                    <p className=" w-[45%]">{t("price")}</p>
                  </div>
                  {!!FactorItems
                    ? FactorItems.map((item: any, index: any) => (
                        <div
                          key={index}
                          className="w-[90%] hover:bg-gray-100  p-2 cursor-pointer text-sm text-center flex justify-between rounded-md"
                        >
                          <p className=" w-[45%]">{item.serviceName}</p>
                          <p className=" w-[45%]">
                            <NumericFormat
                              displayType="text"
                              thousandsGroupStyle="thousand"
                              thousandSeparator=","
                              value={item.price}
                            />
                          </p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {open1 ? (
        <Form1
          canedit={true}
          edit={true}
          data={Docdata}
          setdata={setDocdata}
          open={open1}
          handleOpen={handleOpen1}
          handleClose={handleClose1}
        />
      ) : null}
    </>
  );
}
export default Parvande_ha;
