import { useEffect, useState } from "react";
import Service_modal from "../service_modal";
import Right_side from "./right_side";
import Left_side from "./left_side";
import { GetFactorItems } from "@/Dataservice/DashbordProvider";
import { useRecoilState, useRecoilValue } from "recoil";
import { appointmnet } from "../../../../atoms/appointment";

function Nobat_dehi(props: any) {
  const [service, setservice] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = useRecoilValue<any>(appointmnet);
  useEffect(() => {
    if (!!data.factorId) {
      const f = async () => {
        await GetFactorItems(data.factorId)
          .then((response) => {
            setservice(response.data.dataList);
            if (response.data.isSuccess) {
            } else {
            }
          })
          .catch((error) => {});
      };
      f();
    }
  }, []);
  /////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="flex w-full h-full">
        <Right_side service={service} fetchdata={props.fetchdata} />
        <Left_side
          service={service}
          setservice={setservice}
          handleOpen={handleOpen}
        />
      </div>
      {open ? (
        <Service_modal
          service={service}
          setservice={setservice}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
}

export default Nobat_dehi;
