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
import { handleDeleteAppointment } from "@/utils/handleDeleteAppointment";
const ConfirmDelete = (props: any) => {
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
    width: 440,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    pt: 1,
    overflow: "scroll",
    height: 200,
    backgroundColor: "#E7E7E7",
  };
  const [showData, setshowData] = useState(1);
  const submit = () => {
    handleDeleteAppointment(
      props.data,
      props.dispatch,
      props.setdata,
      props.fetchdata,
      t
    );
    props.handleClose();
  };
  const ShowData = () => {
    switch (showData) {
      case 1:
        return (
          <>
            <div className="py-3">
              <p>آیااز حذف مطمعن هستید؟</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  submit();
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

export default ConfirmDelete;
