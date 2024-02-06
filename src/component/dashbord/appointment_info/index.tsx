import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "react-confirm-alert/src/react-confirm-alert.css";
import { appointmnet } from "../../../../atoms/appointment";
import { GetFactorItems } from "@/Dataservice/DashbordProvider";
import { appointment_list } from "../../../../atoms/appointment_list";
import { appflow_Handller } from "@/context/appflow";
import Service_modal from "../service_modal";
import ServiceListModal from "@/component/dashbord/servicelistmodal/ServiceListModal";
import Payment from "../payment";
import Right_side from "./right_side";
import Left_side from "./left_side";
import ConfirmCancell from "../confirmCancell";
import ConfirmDelete from "../confirmDelete";
function Appointment_info(props: any) {
  const { state, dispatch }: any = useContext(appflow_Handller);
  const [initdata, setinitdata] = useRecoilState<any>(appointment_list);
  const [data, setdata] = useRecoilState<any>(appointmnet);
  const [service, setservice] = useState<any>([]);

  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!!data.factorId) {
      const f = async () => {
        await GetFactorItems(data.factorId)
          .then((response) => {
            // console.log(response.data.dataList);

            setservice(response.data.dataList);
            setSearchResults(response.data.dataList);
            if (response.data.isSuccess) {
            } else {
              // notify("error", `${response.data.message}`);
            }
          })
          .catch((error) => {});
      };
      f();
    }
  }, [data.id]);

  //////////////////////////////////////////////////////
  useEffect(() => {
    if (state.selectrow == 0) {
      setservice([]);
      setSearchResults([]);
    }
  }, [state.selectrow]);
  //////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ///////////////////////////////////////////////////////
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  ///////////////////////////////////////////////////////
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  //////////////////////////////////////////////////////
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  const deleteitem = (item: any) => {
    setservice(
      service.filter(
        (a: any) => a.serviceId !== item.serviceId || a.price !== item.price
      )
    );
    setSearchResults(
      service.filter(
        (a: any) => a.serviceId !== item.serviceId || a.price !== item.price
      )
    );
  };
  //////////////////////////////////////////////////////
  const [sum, setsum] = useState(0);
  useEffect(() => {
    let x: any = 0;
    if (!!service && service.length != 0) {
      service.map((item: any, index: number) => {
        x = x + item.price * item.quantity;
      });
    }
    setsum(x);
  }, [service]);
  /////////////////////////////////////////////////////////////////
  const [searchResults, setSearchResults] = useState([]);
  //////////////////////////////////////////////////////////////////
  //update my SearchResults state when service state change
  useEffect(() => {
    if (!!service && service.length > 0) {
      setSearchResults(service);
    }
  }, [service]);
  //////////////////////////////////////////////////////////////////
  return (
    <>
      {!!data ? (
        <>
          <div
            className={`${
              data.id != 0 ? null : "opacity-60"
            } flex w-full h-full`}
          >
            <Right_side
              data={data}
              setdata={setdata}
              state={state}
              dispatch={dispatch}
              service={service}
              handleOpen2={handleOpen2}
              handleOpen3={handleOpen3}
              setinitdata={setinitdata}
              fetchdata={props.fetchdata}
            />
            <Left_side
              searchResults={searchResults}
              state={state}
              handleOpen={handleOpen}
              handleOpen1={handleOpen1}
              deleteitem={deleteitem}
              data={data}
              sum={sum}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {open ? (
        <Service_modal
          service={service}
          setservice={setservice}
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
      {/* {open1 ? (
        <Form1
          service={service}
          open={open1}
          handleOpen={handleOpen1}
          handleClose={handleClose1}
        />
      ) : null} */}
      {open2 ? (
        <Payment
          service={service}
          fetchdata={props.fetchdata}
          open={open2}
          handleOpen={handleOpen2}
          handleClose={handleClose2}
        />
      ) : null}
      {open3 ? (
        <ConfirmCancell
          fetchdata={props.fetchdata}
          open={open3}
          handleOpen={handleOpen3}
          handleClose={handleClose3}
        />
      ) : null}
      
    </>
  );
}

export default Appointment_info;
