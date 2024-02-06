import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, ConfigProvider, Input } from "antd";
import { appointmnet } from "../../../../atoms/appointment";
import { useRecoilState } from "recoil";
import moment from "jalali-moment";
import i18n from "@/i18next";
import { NumericFormat } from "react-number-format";
import { EditDocument } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import Left_section from "./left_section";
import Right_section from "./right_section";
// import TextArea from "antd/es/input/TextArea";
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
const Form1 = (props: any) => {
  const { data, setdata } = props;
  const [tempdata, settempdata] = useState(data);
  console.log(data);
  const [editform, seteditform] = useState(props.canedit);
  const { t } = useTranslation();

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
    backgroundColor: "white",
  };
  const handeledit = () => {
    console.log(data);
    EditDocument(data)
      .then((data) => {
        console.log(data.data);
        if (data.data.isSuccess) {
          seteditform(true);
        } else {
          setdata(tempdata);
        }
      })
      .catch((error) => {
        notify("error", `${t("error")}`);
        setdata(tempdata);
      });
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
          {/* //////// head */}
          <div className="h-[50px] w-full px-2 border-b-[1px] border-black ">
            <p className="font-[24px]">
              در صورت وجود هر یک از موارد زیر خواهشمند است مشخص نمایید
            </p>
          </div>
          {/* ///// main section */}

          <div className="flex h-[550px]  w-full">
            <Right_section editform={editform} setdata={setdata} data={data} />
            <Left_section editform={editform} setdata={setdata} data={data} />
          </div>
          {/* ///// buttons */}

          <div className="h-[50px] btn_cont w-full flex items-end  justify-end gap-5">
            {props.edit ? (
              editform ? (
                <>
                  <div
                    onClick={() => {
                      seteditform(false);
                    }}
                    className="bg-[#24D560] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#2CFF74]/20 border-[#24D560] hover:text-black  px-10"
                  >
                    <p>ویرایش</p>
                  </div>

                  <div
                    onClick={() => {
                      // setdata(tempdata);
                      props.handleClose();
                    }}
                    className="bg-[#FFC061] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#FFCB7C]/20 border-[#FFC061] hover:text-black  px-10"
                  >
                    <p>خروج</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      handeledit();
                    }}
                    className="bg-[#24D560] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#2CFF74]/20 border-[#24D560] hover:text-black  px-10"
                  >
                    <p>ثبت</p>
                  </div>

                  <div
                    onClick={() => {
                      setdata(tempdata);
                      seteditform(true);
                    }}
                    className="bg-[#FFC061] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#FFCB7C]/20 border-[#FFC061] hover:text-black  px-10"
                  >
                    <p>انصراف</p>
                  </div>
                </>
              )
            ) : (
              <>
                <div
                  onClick={() => {
                    props.handleClose();
                  }}
                  className="bg-[#24D560] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#2CFF74]/20 border-[#24D560] hover:text-black  px-10"
                >
                  <p>تایید</p>
                </div>

                <div
                  onClick={() => {
                    setdata({} as dataType);
                    props.handleClose();
                  }}
                  className="bg-[#FFC061] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#FFCB7C]/20 border-[#FFC061] hover:text-black  px-10"
                >
                  <p>انصراف</p>
                </div>
              </>
            )}

            {/* <div className="bg-[#FF5757] flex justify-center items-center border-2 py-1 rounded-md text-white text-sm shadow-md cursor-pointer transition delay-350 hover:bg-[#FF5757]/20 border-[#FF5757] hover:text-black  px-10">
              <p>حذف فرم</p>
            </div> */}
          </div>
        </Box>
      </Modal>

      {/* <h1 onClick={handleOpen}>open me</h1> */}
    </div>
  );
};

export default Form1;
