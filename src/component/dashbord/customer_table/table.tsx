import { useContext, useEffect, useState } from "react";
import { appointmnet } from "../../../../atoms/appointment";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { appointment_list } from "../../../../atoms/appointment_list";
import { appflow_Handller } from "@/context/appflow";
import { useTranslation } from "react-i18next";
import DocumnetModal from "../documentmodal/DocumnetModal";
import ServiceListModal from "@/component/dashbord/servicelistmodal/ServiceListModal";
import { GetFactorItems } from "@/Dataservice/DashbordProvider";
import { AnyARecord } from "dns";
import { document_data } from "../../../../atoms/document";
import Payment from "../payment";
import { Pagenumber } from "../../../../atoms/pagenumber";
import Cookies from "js-cookie";
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
function Custome_Table(props: any) {
  const { t, i18n } = useTranslation();
  const tabledata = useRecoilValue<any>(appointment_list);
  const [pagenumber, setpagenumber] = useRecoilState<any>(Pagenumber);
  const { state, dispatch }: any = useContext(appflow_Handller);
  const [data, setdata] = useRecoilState<any>(appointmnet);
  const setdocumentdata = useSetRecoilState(document_data);

  const showsatus = (satus: any) => {
    if (satus === false) {
      return `${t("paymentpendding")}`;
    } else {
      return `${t("paid")}`;
    }
  };

  const selectrowfun = (number: any) => {
    if (number == state.selectrow) {
      if (state.handletable !== 4) {
        dispatch({ type: "unselect_row" });
        setdata(init);
      }
    } else {
      dispatch({ type: "select_row", payload: number });
    }
  };
  const tmpselectrowfun = (number: any) => {
    if (number == state.selectrow) {
    } else {
      dispatch({ type: "select_row", payload: number });
    }
  };
  const changeStateEdit = () => {
    dispatch({ type: "cant_Edit" });
  };
  const show_Appointment_info = (number: any) => {
    if (state.handletable === 3) {
      if (number == state.selectrow) {
        dispatch({ type: "show_Parvande_jadid" });
      } else {
        dispatch({ type: "show_Nobat_dehi" });
      }
    } else dispatch({ type: "show_Appointment_info" });
  };
  const next = () => {
    setpagenumber(pagenumber + 1);
  };
  const back = () => {
    if (pagenumber !== 1) setpagenumber(pagenumber - 1);
  };
  //////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [modaldata, setmodaldata] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const setitem = async (item: any) => {
    await setmodaldata(item);
    setdocumentdata(item);

    handleOpen();
  };
  // useEffect(() => {
  //   if (!!modaldata) {

  //   }
  // }, [modaldata]);
  //////////////////////////////////////////////////////////
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
  }; //////////////////////////////////////////////////////////
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };
  //////////////////////////////////////////////////////////
  const [service, setservice] = useState<any>([]);
  const fetchdata = (data: any) => {
    if (!!data.factorId) {
      const f = async () => {
        await GetFactorItems(data.factorId)
          .then((response) => {
            setservice(response.data.dataList);
            if (response.data.isSuccess) {
            } else {
              // notify("error", `${response.data.message}`);
            }
          })
          .catch((error) => {});
      };
      f();

      changeStateEdit();
      handleOpen1();
    }
  };

  //////////////////////////////////////////////////////////
  const currentPage: any = Cookies.get("currentPage");
  const pageSize: any = Cookies.get("pageSize");
  //////////////////////////////////////////////////////////
  return (
    <>
      <div className="w-full h-[88%] text-center flex flex-col gap-2 py-1 items-center  overflow-y-scroll">
        <div className="w-full flex justify-center bg-[#F2F2F2] rounded-lg py-3 ">
          <div className="w-[95%] text-[10px] lg:text-xs flex items-center h-full justify-around">
            <div className="w-[5%]">
              <p>{t("No")}</p>
            </div>
            <div className="w-[20%]">
              <p>{t("fullname")}</p>
            </div>
            <div className="w-[20%]">
              <p>{t("phonenumber")}</p>
            </div>
            {state.handletable == 3 ? null : (
              <div className="w-[10%]">
                <p>{t("date")}</p>
              </div>
            )}

            <div className="w-[10%]">
              <p>{t("Docnumber")}</p>
            </div>
            {state.handletable == 3 ? null : (
              <div className="w-[10%]">
                <p>{t("time")} </p>
              </div>
            )}
            {state.handletable == 4 ? (
              <div className="  w-[10%]">ویرایش</div>
            ) : null}
            {state.handletable == 3 ? (
              <div className="w-[10%]">
                <p>{t("information")}</p>
              </div>
            ) : null}

            {state.handletable == 3 ? null : (
              <div className="  w-[15%]">
                <p>{t("paymenttype")}</p>
              </div>
            )}
            {state.handletable == 4 ? <div className="  w-[10%]"></div> : null}
          </div>
        </div>
        <div className="w-[95%] text-sm flex flex-col h-full gap-3  ">
          {!!tabledata
            ? tabledata.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setdata(item);
                    selectrowfun(index + 1);
                    changeStateEdit();
                    show_Appointment_info(index + 1);
                  }}
                  className={`hover:bg-gray-50 cursor-pointer border-2 py-2 text-[10px] lg:text-base rounded-md w-full  flex items-center ${
                    state.selectrow == index + 1 ? "bg-[#F2F2F2]" : null
                  }   justify-around`}
                >
                  <div className="w-[5%]">
                    <p>
                      {index +
                        1 +
                        parseInt(currentPage, 10) * parseInt(pageSize, 10) -
                        parseInt(pageSize, 10)}{" "}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    {state.handletable == 3 ? (
                      <p>{item.name} </p>
                    ) : (
                      <p>{item.customerName}</p>
                    )}
                  </div>
                  <div className="w-[20%]">
                    <p>{item.phoneNumber} </p>
                  </div>
                  {state.handletable == 3 ? null : (
                    <div className="w-[10%]">
                      <p>{item.date} </p>
                    </div>
                  )}
                  <div className="w-[10%]">
                    <p>{item.documentNumber} </p>
                  </div>
                  {state.handletable == 3 ? null : (
                    <div className="w-[10%]">
                      <p>{!!item.time ? item.time : "00:00"}</p>
                    </div>
                  )}
                  {state.handletable == 3 ? (
                    <div
                      onClick={() => {
                        state.handletable == 3 ? setitem(item) : null;
                      }}
                      className="w-[10%] h-[75%] flex  justify-center items-center "
                    >
                      <div className="rounded-sm w-fit px-2 py-2 text-xs border-[1px] border-[#3A4EFF]   h-fit bg-[#3A4EFF]/[.20] flex justify-center items-center">
                        <p>{t("showinformation")}</p>
                      </div>
                    </div>
                  ) : null}
                  {state.handletable == 4 ? (
                    <div
                      onClick={() => {}}
                      className="w-[10%] h-[75%] flex  justify-center items-center "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => {
                          handleOpen2();
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  ) : null}

                  {state.handletable == 3 ? null : (
                    <div className="w-[15%] text-[10px] lg:text-xs h-[75%]  flex  justify-center items-center ">
                      <div
                        className={`rounded-sm border-[1px] border-[#FFCB7C] w-fit px-4 h-fit py-2 ${
                          item.isPaid == true
                            ? "bg-[#2CFF74]/[.33]"
                            : "bg-[#FFCB7C]/[.33]"
                        } bg-[#FFCB7C]/[.33] flex justify-center items-center`}
                      >
                        <p>{showsatus(item.isPaid)}</p>
                      </div>
                    </div>
                  )}
                  {state.handletable == 4 ? (
                    <div
                      onClick={() => {
                        console.log("Click ");

                        fetchdata(item);
                        setdata(item);
                        tmpselectrowfun(index + 1);
                      }}
                      className="w-[10%] h-[75%] flex  justify-center items-center "
                    >
                      <div className="rounded-sm w-fit px-2 py-2 text-[10px] lg:text-xs border-[1px] border-[#3A4EFF]   h-fit bg-[#3A4EFF]/[.20] flex justify-center items-center">
                        <p>{t("showinformation")}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
      {/* ////////////////////////////////// */}
      <div
        className={`w-full text-sm flex justify-center items-center h-[12%]  gap-3 `}
      >
        <div
          className={`bg-[#3A4EFF] ${
            data.id === 0
              ? "w-9 h-9 "
              : state.handletable === 4
              ? "w-9 h-9"
              : "w-6 h-6"
          } flex justify-center items-center rounded-lg ${
            Cookies.get("hasNext") === "true"
              ? "bg-[#3A4EFF]"
              : "bg-[#3A4EFF]/20"
          }`}
          onClick={() => {
            console.log(Cookies.get("hasNext"));

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
          className={`${
            data.id === 0
              ? "w-9 h-9 text-xl"
              : state.handletable === 4
              ? "w-9 h-9 text-xl"
              : "w-6 h-6 text-base"
          } border-[2px] border-[#3A4EFF]   text-[#3A4EFF] rounded-lg flex justify-center items-center`}
        >
          {pagenumber}
        </div>
        <div
          className={`bg-[#3A4EFF] ${
            data.id === 0
              ? "w-9 h-9 "
              : state.handletable === 4
              ? "w-9 h-9"
              : "w-6 h-6"
          }  flex justify-center items-center rounded-lg ${
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
      {open ? (
        <DocumnetModal
          modaldata={modaldata}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      ) : null}
      {open1 ? (
        <ServiceListModal
          service={service}
          open={open1}
          handleOpen={handleOpen1}
          handleClose={handleClose1}
        />
      ) : null}
      {open2 ? (
        <Payment
          service={service}
          fetchdata={props.fetchdata}
          open={open2}
          handleOpen={handleOpen2}
          handleClose={handleClose2}
        />
      ) : null}
    </>
  );
}

export default Custome_Table;
