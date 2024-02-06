import { useTranslation } from "react-i18next";
import AccountMenu from "../../account_menu";
import Notif from "../../notif";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Header(props: any) {
  const { notifdata, setnotif, setValues } = props;
  const { t, i18n } = useTranslation();
  const [userName, setUserName] = useState<any>("");
  useEffect(() => {
    setUserName(Cookies.get("username"));
  }, []);
  return (
    <div className="w-[90vw] h-[10vh] flex justify-between  border-[#777676] ">
      {/* //////  Head Item 1 ///// */}
      <div className="h-4/6 w-32 bg-[#F2F2F2] rounded-b-lg shadow-xl flex justify-center items-center">
        <p className="text-[#3A4EFF] text-lg ">{t("dashboard")} </p>
      </div>
      {/* //////  Head Item 2 ///// */}
      <div className="relative h-full w-[50%] flex justify-end gap-3 items-center">
        <Notif
          notifdata={notifdata}
          setnotif={setnotif}
          setValues={setValues}
        />
        <AccountMenu userName={Cookies.get("username")} />
      </div>
    </div>
  );
}

export default Header;
