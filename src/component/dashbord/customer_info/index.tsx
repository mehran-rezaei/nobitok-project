import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { appointmnet } from "../../../../atoms/appointment";

function Customer_info() {
  const data = useRecoilValue<any>(appointmnet);
  const { t, i18n } = useTranslation();
  return (
    <div className="flex text-xs h-[10%] border-b-2 border-[#777676]  items-center   justify-around">
      <div className="flex gap-1">
        <p>{t("fullname")}:</p>
        <p>{data.customerName}</p>
      </div>
      <div className="flex gap-1">
        <p>{t("Docnumber")}:</p>
        <p>{data.documentNumber}</p>
      </div>
      <div className="flex gap-1">
        <p>{t("phonenumber")}:</p>
        <p>{data.phoneNumber}</p>
      </div>
    </div>
  );
}

export default Customer_info;
