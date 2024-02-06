import { appflow_Handller } from "@/context/appflow";
import { nextmonth } from "@/utils/handleNextMonthClick";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

function Next_month_weak(props: any) {
  const { data, setdata } = props;
  const { t, i18n } = useTranslation();
  const { state, dispatch }: any = useContext(appflow_Handller);
  return (
    <div
      onClick={() => {
        state.handleEdit == false ? nextmonth(data, setdata) : null;
      }}
      className={` ${
        state.handleEdit == false ? "cursor-pointer" : "cursor-default"
      }   px-6 py-1.5 rounded-md  bg-[#3A4EFF] text-white text-xs`}
    >
      <p>{t("nextmonth")}</p>
    </div>
  );
}

export default Next_month_weak;
