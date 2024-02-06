import { appflow_Handller } from "@/context/appflow";
import { useContext } from "react";
import { handleNextWeekClick } from "@/utils/handleNextWeekClick";
import { useTranslation } from "react-i18next";

function Next_weak_button(props: any) {
  const { data, setdata } = props;
  const { t, i18n } = useTranslation();
  const { state, dispatch }: any = useContext(appflow_Handller);
  return (
    <div
      onClick={() => {
        state.handleEdit == false ? handleNextWeekClick(data, setdata) : null;
      }}
      className={` ${
        state.handleEdit == false ? "cursor-pointer" : "cursor-default"
      }   px-6 py-1.5 rounded-md  bg-[#3A4EFF] text-white text-xs`}
    >
      <p>{t("nextweak")}</p>
    </div>
  );
}

export default Next_weak_button;
