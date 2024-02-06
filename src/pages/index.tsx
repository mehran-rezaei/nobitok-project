import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import Dashbord from "@/component/dashbord/dashbord";
import "@/i18next";
import i18n from "@/i18next";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  });
  return (
    <>
      <Head>
        <title>Reminder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" className="w-10 h-10" />
      </Head>

      <div>
        {/* <div className='flex justify-center'>
      <select value={i18n.language} onChange={(e) => {
     i18n.changeLanguage(e.target.value)
      }}
      className='border-b-2 border-blue-600'>
        <option value="fa">Persian</option>
        <option value="en">English</option>
      </select>
      </div> */}
        <Dashbord />
      </div>
    </>
  );
}
