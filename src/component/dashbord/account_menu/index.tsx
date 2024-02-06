import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function AccountMenu({ userName }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [Showdrop, setShowdrop] = React.useState(false);
  const { t, i18n } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowdrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("username");
    setTimeout(function () {
      router.push("/login");
    }, 500);
    console.log("yes");
  };
  ///////////////////////////////////////////////
  let router = useRouter();
  ///////////////////////////////////////////////
  return (
    <React.Fragment>
      <div
        ref={modalRef}
        className={`flex items-center top-3 transition duration-700  rounded-2xl absolute z-[999] bg-white flex-col gap-3 ${
          Showdrop ? " shadow-2xl h-fit" : "h-fit"
        }`}
      >
        <div className="flex w-full  justify-center items-center gap-5 p-2">
          <Avatar alt="Remy Sharp " style={{}} />
          <div className="flex flex-col justify-center items-center ">
            <p>{userName && userName}</p>
            <p className="text-xs text-[#898989]">{t("admin")}</p>
          </div>
          <div
            onClick={() => {
              setShowdrop(!Showdrop);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div
          className={`py-2 px-4 cursor-pointer w-full ${
            Showdrop ? "" : "hidden"
          }`}
        >
          حساب کاربری
        </div>
        <div
          onClick={() => {
            logOut();
          }}
          className={`py-2 px-4 cursor-pointer w-full ${
            Showdrop ? "border-b-[1px] border-black" : "hidden"
          }`}
        >
          خروج
        </div>
        <div
          className={`p-3 w-full items-center justify-center flex gap-5 ${
            Showdrop ? "" : "hidden"
          }`}
        >
          <p>زبان :</p>
          <img src="../../../images/iran.svg" className="w-6 h-6" alt="" />
        </div>
      </div>
    </React.Fragment>
  );
}
