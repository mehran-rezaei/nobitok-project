import React, { useContext, useEffect, useState } from "react";
import { modalHandler } from "@/context/ModalContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { getCustomerAppointments } from "@/Dataservice/DashbordProvider";
import { appointmnet } from "../../../../atoms/appointment";
import { useRecoilState, useRecoilValue } from "recoil";
import { NumericFormat } from "react-number-format";
import Medical_document from "@/component/documnet/medical_document";
import Link from "next/link";
import { document_data } from "../../../../atoms/document";
const DocumnetModal = (props: any) => {
  const { t } = useTranslation();
  /////////////////////////////////////////////////
  console.log(props.modaldata);

  /////////////////////////////////////////////////
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "5px",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pt: 1,
    overflow: "scroll",
    // overflow : 'hidden',
    // maxHeight: 00,
    maxHeight: 700,
    backgroundColor: "#E7E7E7",
  };
  const [state, setstate] = useState<any>();
  const [Firstload, setfirstload] = useState(false);
  /////////////////////////////////////
  useEffect(() => {
    const fetch = async () => {
      console.log(props.modaldata.id);
      await getCustomerAppointments(props.modaldata.id).then((Response) => {
        setstate(Response.data.dataList);
        console.log(Response.data.dataList);
      });
    };
    fetch();
    setfirstload(true);
  }, []);
  //////////////////////////////////////////////////////////////
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  //////////////////////////////////////////////////////////////
  const calprice = (list: any) => {
    let x = 0;
    list.map((item: any) => {
      x = x + item.price;
    });
    return x;
  };
  const handlePrint = () => {
    window.print();
  };

  /////////////////////////////////////

  /////////////////////////////////////
  return Firstload ? (
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
          <div className="py-5 overflow-hidden flex items-center justify-end">
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
              className="w-full px-10 py-4 flex items-start flex-col rounded-md justify-between 
               text-black border border-[#777676B2] "
            >
              <div className="flex w-[100%]  items-center">
                <div className="w-[35%] flex gap-2">
                  {t("fullname")}:
                  <span className="">{props.modaldata.name}</span>
                </div>
                <div className="w-[25%] flex gap-2">
                  {t("phonenumber")}:
                  <span className="">{props.modaldata.phoneNumber} </span>
                </div>
                <div className="w-[15%] flex gap-2">
                  {t("birthdaydate")}:
                  <span className="">{props.modaldata.dateOfBirth} </span>
                </div>
              </div>

              <div className="flex w-full mt-5 justify-between items-center">
                <div className="flex w-[60%]  items-center">
                  <div className="w-[50%]">
                    {t("Docnumber")}:
                    <span className="px-2">
                      {props.modaldata.documentNumber}{" "}
                    </span>
                  </div>
                </div>
                {/* <button
                  // onClick={handlePrint}
                  onClick={handleOpen2}
                  type="button"
                  className="border-[#3A4EFF] border  text-white bg-[#3A4EFF] hover:bg-white hover:text-[#3A4EFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10  py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                       transition-all ease-in duration-100"
                >
                  {t("چاپ پرونده")}
                </button> */}
                <Link
                  href={`/document?phone=${props.modaldata.phoneNumber}`}
                  target="_blank"
                >
                  <button
                    // onClick={handlePrint}
                    // onClick={handleOpen2}
                    type="button"
                    className="border-[#3A4EFF] border  text-white bg-[#3A4EFF] hover:bg-white hover:text-[#3A4EFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10  py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                       transition-all ease-in duration-100"
                  >
                    {t("چاپ پرونده")}
                  </button>
                </Link>
              </div>
            </div>
            {!!state
              ? state.map((item: any, index: number) => (
                  <div className=" px-5 py-3  w-[100%] rounded-md mt-10 border border-[#777676B2]">
                    <div className="flex  py-3 justify-between border-b border-[#777676B2]">
                      <div className="flex  ">
                        <h2>
                          {t("number1")}:
                          <span className="px-2">{index + 1}</span>
                        </h2>
                        <h2 className="mx-10">
                          {t("date")}:<span> {item.date}</span>
                        </h2>
                      </div>
                      <h2 className="mx-10">
                        {t("allprice")} :
                        {!!item.factorItems ? calprice(item.factorItems) : "--"}
                      </h2>
                    </div>
                    <div className="flex flex-wrap flex-row  justify-between py-5 px-20">
                      {!!item.factorItems && item.factorItems.length != 0 ? (
                        item.factorItems.map((item1: any, index1: any) => (
                          <div className="w-2/4 flex py-3">
                            <div className="w-2/4 flex gap-2">
                              <p>{index1 + 1}.</p>
                              <p>
                                {!!item1.serviceName ? item1.serviceName : null}
                              </p>
                            </div>
                            <div className="w-2/4">
                              {!!item1.price ? (
                                <NumericFormat
                                  displayType="text"
                                  thousandsGroupStyle="thousand"
                                  thousandSeparator=","
                                  value={item1.price}
                                />
                              ) : null}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-center items-center w-full text-red-700">
                          {t("service_not_find")}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </Box>
      </Modal>

      {/* <h1 onClick={handleOpen}>open me</h1> */}
    </div>
  ) : null;
};

export default DocumnetModal;
