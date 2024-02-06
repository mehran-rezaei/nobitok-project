import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { document_data } from "../../../../atoms/document";
import { useRouter } from "next/router";
import {
  GetCustomerServiceHistory,
  SearchCustomer,
} from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
interface DataType {
  key: number;
  date: string;
  services: string;
  cost: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: " تاریخ نوبت",
    dataIndex: "date",
    key: "date",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "خدمات",
    dataIndex: "services",
    key: "services",
  },
  {
    title: "هزینه",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "توضیحات",
    dataIndex: "description",
    key: "description",
  },
];

function Medical_document() {
  const [firstloading, setfirstloading] = useState(false);
  const [user_data, setuser_data]: any = useState();
  const [table_data, settable_data]: any = useState();
  const router = useRouter();
  const { phone } = router.query;
  console.log(phone);

  useEffect(() => {
    if (!!phone) {
      const fetch = async () => {
        console.log(phone);
        await SearchCustomer(phone)
          .then((data) => {
            if (data.data.isSuccess) {
              setuser_data(data.data.dataList[0]);
            } else {
              notify("error", `${data.data.message}`);
            }
          })
          .catch((error) => {
            notify("error", `${t("error")}`);
          });
        await GetCustomerServiceHistory(phone)
          .then((data) => {
            if (data.data.isSuccess) {
              settable_data(data.data.dataList);
            } else {
              notify("error", `${data.data.message}`);
            }
          })
          .catch((error) => {
            notify("error", `${t("error")}`);
          });
      };
      fetch();
    }
  }, [phone]);
  useEffect(() => {
    if (!!user_data && !!table_data) {
      console.log(table_data);

      setfirstloading(true);
      // handlePrint();
    }
  }, [user_data, table_data]);
  const handlePrint = () => {
    window.print();
  };
  const { t } = useTranslation();
  return (
    <>
      {firstloading !== false ? (
        <div>
          <div
            onClick={() => {
              handlePrint();
            }}
            className="w-full flex cursor-pointer justify-end "
          >
            {" "}
            <div className="p-2">چاپ</div>
          </div>
          <div
            className="w-full px-5 py-4 flex items-start flex-col rounded-md justify-between 
             text-black text-xs border border-[#777676B2] "
          >
            <div className="flex w-[100%] justify-between  items-center">
              <div className="w-[50%] flex gap-2 justify-center text-center">
                {t("fullname")}:<span className="">{user_data.name}</span>
              </div>
              <div className="w-[50%] flex gap-2 justify-center text-center">
                {t("phonenumber")}:
                <span className="">{user_data.phoneNumber} </span>
              </div>
            </div>

            <div className="flex w-full mt-5 justify-between items-center">
              <div className="flex w-[100%]  items-center">
                <div className="w-[50%] flex gap-2 justify-center text-center">
                  {t("Docnumber")}:
                  <span className="px-2">{user_data.documentNumber} </span>
                </div>
                <div className="w-[50%] flex gap-2 justify-center text-center">
                  {t("birthdaydate")}:
                  <span className="">{user_data.dateOfBirth} </span>
                </div>
              </div>
            </div>
          </div>
          <Table className="text-sm" pagination={false} columns={columns} dataSource={table_data} />
        </div>
      ) : null}
    </>
  );
}

export default Medical_document;
