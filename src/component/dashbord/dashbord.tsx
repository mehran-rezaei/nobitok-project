import Cookies from "js-cookie";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useContext, useEffect, useState } from "react";
import Custome_Table from "./customer_table/table";
import Tab_container from "./tab_section/tab_container";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { appointment_list } from "../../../atoms/appointment_list";
import Sidebar from "./sidebar";
import {
  SearchCustomer,
  getAllCompletedAppointments,
  getAllCustomers,
  getAllPreAppointments,
  getAllTodayAppointments,
  getAppointmentsByDate,
  getCompletedAppointmentsByDate,
  getPreAppointmentsByDate,
  getTomorrowPreAppointments,
  getUserInfo,
} from "@/Dataservice/DashbordProvider";
import Services from "./servicesPage/Services";
import { notify } from "@/helper/toust";
import OverView from "./overwiew/OverView";
import { appflow_Handller } from "@/context/appflow";
import { appointmnet } from "../../../atoms/appointment";
import { useTranslation } from "react-i18next";
import "@/i18next";
import { handleTableChange } from "@/utils/main_page/handleTableChange";
import NavigationBar from "./main_page/navigationBar";
import Header from "./main_page/header";
import Cash from "./cashDesk/Cash";
import { log } from "console";
import { PageSize } from "../../../atoms/pageSize";
import { Pagenumber } from "../../../atoms/pagenumber";
///////////////////////////////////
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
function Dashbord() {
  const [data, setdate] = useRecoilState<any>(appointmnet);
  const [listdata, setlistdata] = useRecoilState<any>(appointment_list);
  const { state, dispatch }: any = useContext(appflow_Handller);
  const [Data, setData]: any = useState();
  const [page, setpage] = useState(2);
  ////////////////////////////////////////////////////////////////
  const [notifdata, setnotif]: any = useState();
  ///////////////////////////////////////////////////////////////
  const [Shownewdoc, setShownewdoc]: any = useState(false);

  ///////////////////////////////////////////////////////////////
  const [pagenumber, setpagenumber] = useRecoilState<any>(Pagenumber);
  const pageSize = useRecoilValue<any>(PageSize);
  ///////////////////////////////////////////////////////////////
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  });

  useEffect(() => {
    getUserInfo()
      .then((Response) => {
        console.log(Response.data.data);
        Cookies.set("username", Response.data.data.username);
        if (Response.data.isSuccess) {
        } else {
          // notify("error", `${Response.data.message}`);
        }
      })
      .catch((error) => {
        console.log("first");

        notify("erorr", `${t("error")}`);
      });
  }, []);

  useEffect(() => {
    console.log(111111111111111111111111);
    getAllTodayAppointments(pagenumber, pageSize)
      .then((Response) => {
        setData(Response.data.dataList);
        if (Response.data.isSuccess) {
        } else {
          // notify("error", `${Response.data.message}`);
        }
      })
      .catch((error) => {
        notify("erorr", `${t("error")}`);
      });
  }, []);
  useEffect(() => {
    setSearchTerm("");
  }, [state.handletable]);
  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.completedappointment != 0) {
      const fetchdata = async () => {
        if (values === "") {
          await getAllCompletedAppointments()
            .then((Response) => {
              setData(Response.data.dataList);
              setlistdata(Response.data.dataList);
              if (Response.data.isSuccess) {
              } else {
                // notify("error", `${Response.data.message}`);
              }
            })
            .catch((error) => {
              notify("erorr", `${t("error")}`);
            });
          dispatch({ type: "select_appo" });
          dispatch({ type: "set_completedappointment_true" });
        }
        // else if (values.length == 2) {

        // }
        //  else {
        //   dispatch({ type: "set_completedappointment_false" });
        //   changetable(1);
        // }
      };
      fetchdata();
    } else if (state.completedappointment === 1) {
    }
  }, [state.completedappointment]);
  const todayfilter = async () => {
    dispatch({ type: "set_completedappointment_true" });
    console.log("4444444444");
  };
  ///////////////////////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (searchTerm.length === 1 || searchTerm.length === 2) {
    } else if (
      searchTerm != "" &&
      searchTerm.length >= 2 &&
      state.handletable !== 3
    ) {
      if (!!listdata && listdata.length > 0) {
        setpagenumber(1);
        const results = listdata.filter((item: any) => {
          if (!!item.customerName) {
            return item.customerName.toLowerCase().includes(searchTerm);
          } else {
            return item.name.toLowerCase().includes(searchTerm);
          }
        });
        setlistdata(results);
      }
    } else if (
      state.handletable == 3 &&
      searchTerm.length >= 2 &&
      searchTerm != ""
    ) {
      setpagenumber(1);
      SearchCustomer(searchTerm).then((reponse) => {
        setlistdata(reponse.data.dataList);
      });
    } else {
      fetchdata();
    }
  }, [searchTerm]);
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchdata();
  }, [pagenumber]);
  //////////////////////////////////////////////////////////////
  const [values, setValues]: any = useState("");
  const fetchdata = async () => {
    if (state.completedappointment === 0) {
      if (values === "") {
        if (state.handletable == 1) {
          await getAllTodayAppointments(pagenumber, pageSize)
            .then((response) => {
              setData(response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 2) {
          if (state.seetomorrowpreapp === 1) {
            await getTomorrowPreAppointments()
              .then((response) => {
                setData(response.data.dataList);
                if (response.data.isSuccess) {
                } else {
                  notify("error", `${response.data.message}`);
                }
              })
              .catch((error) => notify("erorr", `${t("error")}`));
          } else {
            await getAllPreAppointments(pagenumber, pageSize)
              .then((Response) => {
                setData(Response.data.dataList);
              })
              .catch((error) => {});
          }
        }
        if (state.handletable == 3) {
          await getAllCustomers(pagenumber, pageSize)
            .then((Response) => {
              setData(Response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 4) {
          await getAllCompletedAppointments()
            .then((Response) => {
              setData(Response.data.dataList);
            })
            .catch((error) => {});
        }
      } else if (values.length == 1) {
        if (state.handletable == 1) {
          await getAppointmentsByDate(
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            pagenumber,
            pageSize
          )
            .then((response) => {
              setData(response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 2) {
          await getPreAppointmentsByDate(
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            pagenumber,
            pageSize
          )
            .then((response) => {
              setData(response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 4) {
          await getCompletedAppointmentsByDate(
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            pagenumber,
            pageSize
          )
            .then((Response) => {
              setData(Response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 3) {
          await getAllCustomers(pagenumber, pageSize)
            .then((Response) => {
              setData(Response.data.dataList);
            })
            .catch((error) => {});
        }
      } else if (values.length == 2) {
        if (state.handletable == 1) {
          await getAppointmentsByDate(
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            `${values[1].year}/${values[1].month.number}/${values[1].day}`,
            pagenumber,
            pageSize
          )
            .then((response) => {
              setData(response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 2) {
          await getPreAppointmentsByDate(
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            `${values[1].year}/${values[1].month.number}/${values[1].day}`,
            pagenumber,
            pageSize
          )
            .then((response) => {
              setData(response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 4) {
          await getCompletedAppointmentsByDate(
            `${values[0].year}/${values[0].month.number}/${values[0].day}`,
            `${values[1].year}/${values[1].month.number}/${values[1].day}`,
            pagenumber,
            pageSize
          )
            .then((Response) => {
              setData(Response.data.dataList);
            })
            .catch((error) => {});
        }
        if (state.handletable == 3) {
          await getAllCustomers(pagenumber, pageSize)
            .then((Response) => {
              setData(Response.data.dataList);
            })
            .catch((error) => {});
        }
      }
    } else if (state.completedappointment === 1) {
      if (values.length == 2) {
        await getCompletedAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[1].year}/${values[1].month.number}/${values[1].day}`,
          pagenumber,
          pageSize
        )
          .then((Response) => {
            setData(Response.data.dataList);
            if (Response.data.isSuccess) {
            } else {
              // notify("error", `${Response.data.message}`);
            }
          })
          .catch((error) => {});
        dispatch({ type: "select_appo" });
      } else if (values === "") {
        await getAllCompletedAppointments()
          .then((Response) => {
            setData(Response.data.dataList);
            if (Response.data.isSuccess) {
            } else {
              // notify("error", `${Response.data.message}`);
            }
          })
          .catch((error) => {
            notify("erorr", `${t("error")}`);
          });
      }
    }
  };
  useEffect(() => {
    if (state.seetomorrowpreapp != 1) {
      fetchdata();
    }
  }, [values, state.completedappointment]);
  /////////////////////////////////////
  useEffect(() => {
    if (searchTerm != "") {
      if (!!Data && Data.length > 0) {
        const results = Data.filter((item: any) => {
          if (!!item.customerName) {
            return item.customerName.toLowerCase().includes(searchTerm);
          } else {
            return item.name.toLowerCase().includes(searchTerm);
          }
        });
        setlistdata(results);
      }
    } else {
      setlistdata(Data);
    }
  }, [Data]);

  /////////////////////////////////////
  useEffect(() => {
    dispatch({ type: "unselect_row" });
  }, [values]);
  /////////////////////////////////////
  return (
    <div>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col ">
        {/* //////  Head Start ///// */}
        <Header
          notifdata={notifdata}
          setnotif={notifdata}
          setValues={notifdata}
        />
        {/* //////  Head End ///// */}
        {/* //////  body Start ///// */}
        <div className="w-[100vw] h-[90vh]  flex justify-center items-center">
          <div className="w-[10vh] h-[80vh] flex justify-center items-center">
            <Sidebar setpage={setpage} page={page} />
          </div>
          {page === 2 && (
            <div className=" w-[90vw] h-[90vh] ">
              <div className="h-[7%] w-full flex justify-between items-start ">
                <div className="w-2/4 h-[70%] flex justify-start gap-6">
                  <div
                    onClick={() => {
                      handleTableChange(
                        3,
                        values,
                        dispatch,
                        setData,
                        setlistdata,
                        t,
                        pagenumber,
                        pageSize
                      ),
                        setShownewdoc(true),
                        setdate(init),
                        dispatch({ type: "unselect_row" });
                    }}
                    className="px-4  text-[10px] lg:text-sm flex border-2 border-[#3A4EFF] justify-center  hover:bg-white hover:text-black  rounded-[6px] cursor-pointer items-center h-full text-white bg-[#3A4EFF]"
                  >
                    <p>{t("createNewDoc")}</p>
                  </div>
                  {/* <div
                    onClick={() => {
                      state.completedappointment != 1
                        ? todayfilter()
                        : dispatch({ type: "set_completedappointment_false" }),
                        // changetable(1),
                        setdate(init),
                        dispatch({ type: "unselect_row" });
                    }}
                    className={`${
                      state.completedappointment == 1
                        ? "bg-white text-black "
                        : "text-white bg-[#3A4EFF]"
                    } px-4 h-full border-2 border-[#3A4EFF] text-[10px] lg:text-sm 
                      
                         hover:bg-white hover:text-black cursor-pointer 
                        
                       rounded-[6px] flex items-center justify-center`}
                  >
                    <p>{t("completedAppointment")}</p>
                  </div> */}
                </div>

                <div className="w-2/4 h-[70%] flex gap-6 items-center justify-end">
                  <div className="w-2/6 rounded-[6px] overflow-hidden">
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
                      <button
                        // style={{ margin: "5px 0" }}
                        className="text-red-900 "
                        onClick={() => setValues("")}
                      >
                        {t("delete")}
                      </button>
                    </DatePicker>
                  </div>
                  <div className="w-3/6 h-full bg-[#3A4EFF] text-[10px] lg:text-xs  px-2 flex items-center justify-between rounded-[6px]">
                    <input
                      onChange={(value) => {
                        onSearch(value);
                      }}
                      value={searchTerm}
                      placeholder={`${t("search")}`}
                      type="text"
                      className="text-white bg-[#3A4EFF] w-[80%]"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-5 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <NavigationBar
                setShownewdoc={setShownewdoc}
                values={values}
                setData={setData}
              />
              <div
                className={`${
                  (data.id !== 0 && state.handletable !== 4) ||
                  Shownewdoc == true
                    ? "h-[40%]"
                    : " h-[88%] "
                }  w-full pt-1`}
              >
                <Custome_Table
                  fetchdata={fetchdata}
                  Data={Data}
                  state={state}
                />
              </div>
              {state.handletable == 4 ? (
                <div></div>
              ) : (
                <div
                  className={`${
                    data.id !== 0 || Shownewdoc == true
                      ? "text-[10px] lg:text-base  h-[48%] w-full pt-2"
                      : "hidden"
                  } `}
                >
                  <Tab_container
                    Shownewdoc={Shownewdoc}
                    fetchdata={fetchdata}
                    setnotif={setnotif}
                    state={state}
                  />
                </div>
              )}
            </div>
          )}
          {page === 3 && <Services />}
          {page === 4 && <OverView />}
          {page === 5 && <Cash />}
          <div className="w-[10vh] h-[90vh]"></div>
        </div>
        {/* //////  body End ///// */}
      </div>
    </div>
    // <Service_modal/>
  );
}

export default Dashbord;
