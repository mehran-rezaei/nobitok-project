import { Select, Form } from "antd";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Input, Space } from "antd";
import { InputNumber } from "antd";
import type { SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  AddDocument,
  SearchCustomer,
  addCustomer,
  getAllCustomers,
} from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { appointment_list } from "../../../../atoms/appointment_list";
import { NumericFormat } from "react-number-format";
import { log } from "console";
import Form1 from "../form/form1";
import { PageSize } from "../../../../atoms/pageSize";
import { Pagenumber } from "../../../../atoms/pagenumber";
const { TextArea } = Input;
const { Search } = Input;
interface dataType {
  drugConsume: Boolean;
  thyroidDisease: Boolean;
  bloodPressure: Boolean;
  smokingOrAlcoholConsumption: Boolean;
  cardiovascularDisease: Boolean;
  pregnancy: Boolean;
  diabetes: Boolean;
  breastFeeding: Boolean;
  deformedWounds: Boolean;
  herpes: Boolean;
  radioTherapy: Boolean;
  medicalAllergy: Boolean;
  neuropsychiatricDiseases: Boolean;
  hiv: Boolean;
  hepatitis: Boolean;
  accutane: Boolean;
  roaccutane: Boolean;
  daccutane: Boolean;
  tatto: Boolean;
  shockDuringInjection: string;
  presenceOfMetalPlates: string;
  customerId: Number;
}
const dataType_init = {
  drugConsume: false,
  thyroidDisease: false,
  bloodPressure: false,
  smokingOrAlcoholConsumption: false,
  cardiovascularDisease: false,
  pregnancy: false,
  diabetes: false,
  breastFeeding: false,
  deformedWounds: false,
  herpes: false,
  radioTherapy: false,
  medicalAllergy: false,
  neuropsychiatricDiseases: false,
  hiv: false,
  hepatitis: false,
  accutane: false,
  roaccutane: false,
  daccutane: false,
  tatto: false,
  shockDuringInjection: "",
  presenceOfMetalPlates: "",
  customerId: 0,
};
const initdata = {
  name: "",
  phone: "",
  nationalCode: "",
  dateOfBirth: "",
  description: "",
};
interface initdata {
  name: String | undefined;
  phone: String | undefined;
  nationalCode: String | undefined;
  dateOfBirth: String | undefined;
  description: String | undefined;
}
function Parvande_jadid() {
  const { t, i18n } = useTranslation();
  const [state, setstate] = useState<initdata>(initdata);
  /////////////////////////////////////////////
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  /////////////////////////////////////////////
  const [data_, setdata] = useState<dataType>(dataType_init);
  /////////////////////////////////////////////
  const [pagenumber, setpagenumber] = useRecoilState<any>(Pagenumber);
  const pageSize = useRecoilValue<any>(PageSize);
  /////////////////////////////////////////////
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const setlist = useSetRecoilState<any>(appointment_list);
  const newdata = () => {
    getAllCustomers(pagenumber, pageSize)
      .then((Response) => {
        setlist(Response.data.dataList);
        if (Response.data.isSuccess) {
        } else {
          notify("error", `${Response.data.message}`);
        }
      })
      .catch(() => notify("error", `${t("error")}`));
  };
  const showerror = (message: string) => {
    notify("error", `${message}`);
  };
  const submit = async () => {
    form.validateFields().then((values) => {
      if (isLoading) {
        // Prevent multiple clicks while the operation is ongoing
        return;
      }

      //////////////////
      setIsLoading(true);
      //////////////////
      let nationalCodechek = state;
      nationalCodechek.nationalCode === ""
        ? delete nationalCodechek.nationalCode
        : null;
      addCustomer(state)
        .then((Response) => {
          newdata();
          // console.log(Response.data.isSuccess);
          if (Response.data.isSuccess) {
            notify("success", `${t("successful")}`);
            SearchCustomer(state.phone).then((data) => {
              // setcustomer_info(data.data.dataList[0].id);
              if (data.data.isSuccess) {
                let t: any = data_;
                console.log(data);
                t.customerId = data.data.dataList[0].id;
                console.log(t);
                AddDocument(t).then((res) => {
                  console.log(t);
                  console.log(res.data);
                });
              }
            });
            rest();
          } else {
            notify("error", `${Response.data.message}`);
          }
        })
        .catch(() => notify("error", `${t("error")}`))
        .finally(() => {
          setIsLoading(false); // Reset loading state
        });
    });
  };

  const rest = () => {
    setstate(initdata);
    form.resetFields();
  };
  /////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  /////////////////////////////////////////////
  const [error, seterror] = useState(0);
  const [form] = Form.useForm();
  /////////////////////////////////////////////////////
  function phonenumber(inputtxt: string) {
    return validatePhoneNumber(inputtxt);
  }
  function validatePhoneNumber(phoneNumber: any) {
    const phoneNumberRegex = /^09\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
  const onChange = (e: any) => {
    const { value } = e.target;
  };
  /////////////////////////////////////////////
  // console.log(state);

  /////////////////////////////////////////////
  // const onSearch = (value: string) => console.log(value);
  return (
    <Form
      className="w-full h-full"
      form={form}
      name="control-hooks"
      onFinishFailed={() => {}}
      onFinish={submit}
    >
      <div className=" flex justify-between flex-col gap-5 w-full h-full py-2">
        <div className=" flex flex-col  w-full h-full ">
          <div className="w-full flex gap-6 mt-5">
            <Form.Item
              style={{ width: "25%" }}
              name={`${t("fullname")}`}
              // label={t("fullname")}
              rules={[{ required: true, message: `${t("namevalidation")}` }]}
            >
              <Input
                placeholder={`${t("fullname")}`}
                className="border-2 border-[#6171FF]"
                onChange={(e: any) => {
                  setstate({
                    ...state,
                    ["name"]: e.target.value,
                  });
                }}
                value={state.name as string}
              />
            </Form.Item>
            <Form.Item
              name={`${t("phonenumber")}`}
              style={{ width: "15%" }}
              // label={t("phonenumber")}
              rules={[
                { required: true, message: `${t("phonevalidation")}` },
                {
                  validator: (_, value) => {
                    if (phonenumber(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(`${t("phonetypevalidation")}`);
                  },
                },
              ]}
            >
              <NumericFormat
                placeholder={`${t("phonenumber")}`}
                allowLeadingZeros
                className="border-2 py-1 rounded-md px-[11px] border-[#6171FF]"
                onChange={(e: any) => {
                  setstate({
                    ...state,
                    ["phone"]: e.target.value,
                  });
                }}
                value={state.phone as string}
              />
            </Form.Item>
            <Form.Item
              style={{ width: "15%" }}
              name={`${t("nationalcode")}`}
              // label={t("nationalcode")}
            >
              <NumericFormat
                placeholder={`${t("nationalcode")}`}
                className="border-2 py-1 px-[11px] rounded-md border-[#6171FF]"
                onChange={(e: any) => {
                  setstate({
                    ...state,
                    ["nationalCode"]: e.target.value,
                  });
                }}
                value={state.nationalCode as string}
              />
            </Form.Item>
            <Form.Item
              style={{ width: "20%" }}
              name={`${t("birthdaydate")}`}
              // label={t("birthdaydate")}
              rules={[{ required: true, message: `${t("datevalidation")}` }]}
            >
              <DatePicker
                placeholder={`${t("birthdaydate")}`}
                className="py-1 px-[11px] rounded-md"
                inputClass="custom-input_add"
                value={state.dateOfBirth as string}
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                calendarPosition="bottom-right"
                onChange={(dateObject: any) => {
                  if (
                    !!dateObject.year &&
                    !!dateObject.month.number &&
                    !!dateObject.day
                  ) {
                    setstate({
                      ...state,
                      ["dateOfBirth"]: `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`,
                    });
                  }
                }}
              />
            </Form.Item>
          </div>
          <div className=" w-full flex gap-6 align-bottom ">
            <div className="w-[30%]">
              <Form.Item name="history">
                <TextArea
                  placeholder={`${t("description")}`}
                  className="border-2 border-[#6171FF]"
                  value={state.description as string}
                  onChange={(e: any) => {
                    setstate({
                      ...state,
                      ["description"]: e.target.value,
                    });
                  }}
                  maxLength={100}
                  style={{ height: 60, resize: "none" }}
                />
              </Form.Item>
            </div>
            <div className="w-[30%]">
              {/* <TextArea
              maxLength={100}
              style={{ height: 120, resize: "none" }}
              placeholder="آدرس محل سکونت:"
            /> */}
            </div>
          </div>
          <div className="w-full h-10 flex justify-start cursor-pointer">
            <div
              onClick={() => {
                handleOpen1();
              }}
              className="  px-3  bg-[#3A4EFF] rounded-md flex justify-center items-center border-2 border-[#3A4EFF] text-white  hover:bg-white hover:text-black hover:border-[#3A4EFF]"
            >
              سابقه پزشکی
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[30%] gap-3 flex justify-end items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center items-center px-5 cursor-pointer py-1.5 border-[#24D560] border-2   bg-[#24D560] text-sm hover:bg-[#22EF67]/20 hover:text-black rounded-md text-white"
            >
              <p>{t("submit")}</p>
            </button>
            <button
              onClick={rest}
              type="button"
              className="flex justify-center items-center px-7 cursor-pointer py-1.5 border-[#FF5757] bg-[#FF5757]  border-2  text-sm hover:bg-[#FF5757]/20 hover:text-black rounded-md text-white"
            >
              <p>{t("cancel")}</p>
            </button>
          </div>
        </div>
        {open1 ? (
          <Form1
            canedit={false}
            data={data_}
            setdata={setdata}
            open={open1}
            handleOpen={handleOpen1}
            handleClose={handleClose1}
          />
        ) : null}
      </div>
    </Form>
  );
}

export default Parvande_jadid;
