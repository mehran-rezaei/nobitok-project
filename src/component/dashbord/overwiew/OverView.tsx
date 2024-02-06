import React, { useState } from "react";
import { useContext } from "react";
import OverViewNavbar from "./OverViewNavbar";
import { modalHandler } from "@/context/ModalContextProvider";
import Custumer from "./Custumer";
import Analiz from "./Analiz";
import Doc from "./Doc";
import Options from "./Options";

const OverView = () => {
  const { state, dispatch }: any = useContext(modalHandler);
  const [values, setValues]: any = useState("");
  const [weekValues, setWeekValues]: any = useState("");
  return (
    <div className=" w-[90vw] h-[90vh] ">
      <OverViewNavbar values={values} setValues={setValues}
       weekValues={weekValues} setWeekValues={setWeekValues}  />
      {state.overViewPageNumber === 1 && <Custumer />}
      {state.overViewPageNumber === 2 && <Analiz weekValues={weekValues} />}
      {state.overViewPageNumber === 3 && <Doc    values={values} />}
      {/* {state.overViewPageNumber === 4 &&<Options />}  */}
    </div>
  );
};

export default OverView;
