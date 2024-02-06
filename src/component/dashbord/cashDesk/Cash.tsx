import React, { useState } from "react";
import { useContext } from "react";
import { modalHandler } from "@/context/ModalContextProvider";
import Status from "./Status";
import CashDeskNavbar from "./CashDeskNavbar";
import CashDesk from "./CashDesk";




const Cash = () => {
  const { state, dispatch }: any = useContext(modalHandler);
  const [values, setValues]: any = useState("");
  return (
    <div className=" w-[90vw] h-[90vh] ">
      <CashDeskNavbar values={values} setValues={setValues}/>
      {state.cashPageNumber === 1 && < CashDesk/>}
      {state.cashPageNumber === 2 && <Status values={values} setValues={setValues}/>}

      {/* {state.overViewPageNumber === 4 &&<Options />}  */}
    </div>
  );
};

export default Cash;
