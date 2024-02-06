import {
  getAllCompletedAppointments,
  getAllCustomers,
  getAllPreAppointments,
  getAllTodayAppointments,
  getAppointmentsByDate,
  getCompletedAppointmentsByDate,
  getPreAppointmentsByDate,
} from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { useRecoilState, useRecoilValue } from "recoil";
import { Pagenumber } from "../../../atoms/pagenumber";
import { PageSize } from "../../../atoms/pageSize";

export const handleTableChange = async (
  id: any,
  values: any,
  dispatch: any,
  setData: any,
  setlistdata: any,
  t: any,
  pagenumber: any,
  pageSize: any
) => {
  switch (id) {
    case 1:
      // setdata({});
      if (values === "") {
        setlistdata([]);
        console.log("123456");

        await getAllTodayAppointments(1, pageSize)
          .then((response) => {
            if (response) {
              setData(response.data.dataList);
            }
            if (response.data.isSuccess) {
            } else {
              // notify("error", `${response.data.message}`);
            }
          })
          .catch((error) => {
            console.log("11111111111111111");
            notify("error", `${t("error")}`);
          });
      } else if (values.length == 1) {
        await getAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          1,
          pageSize
        ).then((response) => {
          setData(response.data.dataList);
        });
      } else if (values.length == 2) {
        await getAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[1].year}/${values[1].month.number}/${values[1].day}`,
          1,
          pageSize
        ).then((response) => {
          setData(response.data.dataList);
        });
      }
      dispatch({ type: "select_appo" });

      break;
    case 2:
      if (values === "") {
        // setdata({});
        setlistdata([]);
        await getAllPreAppointments(1, pageSize)
          .then((Response) => {
            setData(Response.data.dataList);
            if (Response.data.isSuccess) {
            } else {
              // notify("error", `${Response.data.message}`);
            }
          })
          .catch((error) => {
            console.log("sssssssssssssssssssssssssssss");

            notify("erorr", `${t("error")}`);
          });
      } else if (values.length == 1) {
        await getPreAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          1,
          pageSize
        ).then((response) => {
          setData(response.data.dataList);
        });
      } else if (values.length == 2) {
        await getPreAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[1].year}/${values[1].month.number}/${values[1].day}`,
          1,
          pageSize
        ).then((response) => {
          setData(response.data.dataList);
        });
      }
      dispatch({ type: "select_preappo" });

      break;
    case 3:
      // setdata({});
      setlistdata([]);
      await getAllCustomers(1, pageSize)
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
      dispatch({ type: "select_doc" });

      break;
    case 4:
      setlistdata([]);
      if (values === "") {
        await getAllCompletedAppointments()
          .then((Response) => {
            setData(Response.data.dataList);
            if (Response.data.isSuccess) {
            } else {
            }
          })
          .catch((error) => {
            notify("erorr", `${t("error")}`);
          });
      } else if (values.length == 1) {
        await getCompletedAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          1,
          pageSize
        )
          .then((Response) => {
            setData(Response.data.dataList);
            if (Response.data.isSuccess) {
            } else {
            }
          })
          .catch((error) => {});
      } else if (values.length == 2) {
        await getCompletedAppointmentsByDate(
          `${values[0].year}/${values[0].month.number}/${values[0].day}`,
          `${values[1].year}/${values[1].month.number}/${values[1].day}`,
          1,
          pageSize
        )
          .then((Response) => {
            if (Response.data.isSuccess) {
              setData(Response.data.dataList);
            } else {
              setData([]);
            }
          })
          .catch((error) => {});
      }

      dispatch({ type: "select_pay" });
      break;
  }
};
