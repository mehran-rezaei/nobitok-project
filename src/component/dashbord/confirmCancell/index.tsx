import React, { useContext, useEffect, useState } from "react";
import { modalHandler } from "@/context/ModalContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import {
  MarkAppointmentAsCancelled,
  getCustomerAppointments,
} from "@/Dataservice/DashbordProvider";
import { appointmnet } from "../../../../atoms/appointment";
import { useRecoilState, useRecoilValue } from "recoil";
import { NumericFormat } from "react-number-format";
import Medical_document from "@/component/documnet/medical_document";
import Link from "next/link";
import { document_data } from "../../../../atoms/document";
import Date_picker from "@/date_picker";
import i18n from "@/i18next";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { notify } from "@/helper/toust";
const ConfirmCancell = (props: any) => {
  const { t } = useTranslation();
  /////////////////////////////////////////////////
  const [state, setstate] = useRecoilState<any>(appointmnet);
  /////////////////////////////////////////////////
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "5px",
    transform: "translate(-50%, -50%)",
    width: 480,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    pt: 1,
    overflow: "scroll",
    height: 400,
    backgroundColor: "#E7E7E7",
  };
  const [showData, setshowData] = useState(1);
  const [data, setdata] = useState("");
  console.log(data);
  const submit = () => {
    if (data !== "") {
      let req = {
        appointmentId: state.id,
        addPreAppointment: true,
        preAppointmentDate: data,
        userId: 0,
      };
      console.log(state.id);

      MarkAppointmentAsCancelled(req)
        .then((Response) => {
          if (Response.data.isSuccess) {
            notify("success", `${t("successful")}`);
            props.fetchdata();
            props.handleClose();
          }
        })
        .catch((error) => {
          notify("error", `${t("error")}`);
        });
    } else {
      let req = {
        appointmentId: state.id,
        addPreAppointment: false,
        preAppointmentDate: "",
        userId: 0,
      };
      MarkAppointmentAsCancelled(req)
        .then((Response) => {
          if (Response.data.isSuccess) {
            notify("success", `${t("successful")}`);
            props.fetchdata();
            props.handleClose();
          }
        })
        .catch((error) => {
          notify("error", `${t("error")}`);
        });
    }
  };
  const ShowData = () => {
    switch (showData) {
      case 1:
        return (
          <>
            <div className="py-3">
              <p>آیا از حذف مطمعن هستید؟</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setshowData(2);
                }}
                className="px-8 bg-blue-500"
                type="primary"
              >
                بله{" "}
              </Button>
              <Button
                onClick={props.handleClose}
                className="px-8 bg-blue-500"
                type="primary"
              >
                خیر{" "}
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="py-3">
              <p>آیا میخواهید پیش نوبتی بعد از لغو ثبت کنید؟</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setshowData(3);
                }}
                className="px-8 bg-blue-500"
                type="primary"
              >
                بله{" "}
              </Button>
              <Button
                onClick={() => {
                  submit();
                }}
                className="px-8 bg-blue-500"
                type="primary"
              >
                خیر{" "}
              </Button>
              <Button
                onClick={props.handleClose}
                className="px-8 bg-blue-500"
                type="primary"
              >
                لغو{" "}
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="flex items-center justify-center gap-3">
              <div className="py-3">
                <p>تاریخ را وارد کنید</p>
              </div>
              <DatePicker
                //   placeholder={`${t("birthdaydate")}`}
                placeholder={``}
                className="py-1 px-[11px] rounded-md"
                inputClass="custom-input_add"
                value={data as string}
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                calendarPosition="bottom-right"
                onChange={(dateObject: any) => {
                  if (
                    !!dateObject.year &&
                    !!dateObject.month.number &&
                    !!dateObject.day
                  ) {
                    setdata(
                      `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`
                    );
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  submit();
                }}
                className="px-8 bg-blue-500"
                type="primary"
              >
                تایید
              </Button>
              <Button
                onClick={props.handleClose}
                className="px-8 bg-blue-500"
                type="primary"
              >
                لغو
              </Button>
            </div>
          </>
        );
    }
  };
  /////////////////////////////////////
  return (
    <div>
      <Modal
        // keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className="w-full h-full flex flex-col justify-between ">
            {ShowData()}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmCancell;
