import React, { useState, useEffect, useContext } from "react";
import ServicesNavbar from "./ServicesNavbar";
import ServicesTable from "./ServicesTable";
import { Divider, Menu, Tooltip } from "antd";
import { Input } from "antd";
import { Button, Dropdown, Space } from "antd";
import axiosInstance from "@/Dataservice/Configs/axiosInstance";
import {
  createGroup,
  getGroup,
  deleteGroup,
  editGroup,
  getGroupBySearch,
  getGroupByFilterSearch,
} from "@/Dataservice/ServicesProvider";
import { Select } from "antd";
import {
  addServices,
  deleteServices,
  editServices,
  getَAllServices,
  getValueBySearch,
} from "@/Dataservice/ServicePageProvider";
import { notify } from "@/helper/toust";
import { modalHandler } from "@/context/ModalContextProvider";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";

const AllService = () => {
  const { t } = useTranslation();
  const { state, dispatch } :any= useContext(modalHandler);
  console.log(state.serachValue);

  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [servicesTableData, setServiceTableData] = useState([]);
  const [searchResult, setSearchResult] = useState<any>(false);
  const [searchGroupResult, setSearchGrouppResult] = useState<any>(false);
  const [optionPercent, setOptionPercent] = useState("");
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    price: "",
    serviceCategory: "",
    serviceCategoryId: "",
  });
  console.log(editData);

  const [id, setId] = useState<any>("");
  const [servicesData, setServicesData] = useState({
    groupId: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    getGroup().then((Response) => {
      setCategoryData(Response.data.dataList);
    });
  }, [show]);
  useEffect(() => {
    getَAllServices()
      .then((Response) => {
        setServiceTableData(Response.data.dataList);
      })
      .catch((error) => {
        console.log(error);
        notify("error", "خطا");
      });
  }, [show]);

  const tableHandler = async (item: any) => {
    setEditData(item);
  };
  useEffect(() => {
    if (state.serachServiceValue.length > 0) {
      getValueBySearch(state.serachServiceValue).then((Response) => {
        console.log(Response);
        setSearchResult(Response.data.dataList);
        setSearchGrouppResult(false);
      });
    } else {
      setSearchResult(false);
    }
  }, [state.serachServiceValue]);

  useEffect(() => {
    if (state.FilterValue) {
      getGroupByFilterSearch(state.FilterValue).then((Response) => {
        console.log(Response);
        setSearchGrouppResult(Response.data.dataList);
        setSearchResult(false);
      });
    } else {
      setSearchGrouppResult(false);
    }
  }, [state.FilterValue]);
  return (
    <div className="">
      <div className="h-[76vh] flex justify-between mt-3 overflow-auto">
        <table className="w-full text-[10px] overflow-scroll mt-3 mx-5 shadow-lg border   hover:bg-gray-100 bg-[#F7F7F7] border-gray-200  rounded-md  h-max lg:text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-[10px] lg:text-xs text-gray-700  uppercase hover:bg-gray-100 h-max bg-[#F7F7F7] border-b border-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="lg:px-6 px-2 py-2 lg:py-3 ">
                {t('No')}
              </th>
              <th scope="col" className="lg:px-6 px-2 py-2 lg:py-3 ">
                {t('servicesName')}
              </th>
              <th scope="col" className="lg:px-6 px-2 py-2 lg:py-3 ">
                {t('categoryName')}
              </th>
              <th scope="col" className="lg:px-6 px-2 py-2 lg:py-3 ">
                {t('pricing')}
              </th>
              <th scope="col" className="lg:px-6 px-2 py-2 lg:py-3 ">
                {t('minimumprice')}
              </th>
              <th scope="col" className="lg:px-6 px-2 py-2  lg:py-3 ">
                {t('maximumprice')}
              </th>

              <th scope="col" className="lg:px-6 px-2 py-2  lg:py-3 ">
                {t('price')}
              </th>
            </tr>
          </thead>
          <tbody className="hover:bg-gray-50">
            {searchResult !== false
              ? searchResult.map((item: any, index: any) => (
                <tr
                key={index}
                className={
                  id === item.id
                    ? "bg-[#F7F7F7]  hover:bg-gray-100   border-b dark:bg-gray-800 dark:border-gray-700"
                    : "bg-[#F7F7F7] hover:bg-gray-100  border-b  dark:bg-gray-800  dark:border-gray-700"
                }
              >
                <td
                  scope="row"
                  className="px-2 py-2 lg:px-6 lg:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </td>
                <td className="px-2 lg:px-6 py-2 lg:py-3">{item.name}</td>
                <td className="px-2 lg:px-6 py-2 lg:py-3">{item.serviceCategory}</td>
                <td className="px-2 lg:px-6 py-2 lg:py-3  ">
                  {item.priceType === 0 && "Fixed price "}
                  {item.priceType === 1 && "Changeable price   "}
                </td>
                <td className="lg:px-6 py-2 px-2 lg:py-3">
                <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.minPrice ? item.minPrice : "-"}
                          />
                  {/* // {item.minPrice ? item.minPrice : "-"} */}
                </td>
                <td className=" px-2 lg:px-6 py-2 lg:py-3">
                  {/* {item.maxPrice ? item.maxPrice : "-"} */}
                  <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.maxPrice ? item.maxPrice : "-"} 
                          />
                </td>

                <td className="lg:px-6 px-2 py-2 lg:py-3">
                  {/* {item.price} */}
                  <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.price}
                          />
                  </td>
              </tr>
                ))
              : searchGroupResult !== false
              ? searchGroupResult.map((item: any, index: any) => (
                <tr
                key={index}
                className={
                  id === item.id
                    ? "bg-[#F7F7F7]  hover:bg-gray-100   border-b dark:bg-gray-800 dark:border-gray-700"
                    : "bg-[#F7F7F7] hover:bg-gray-100  border-b  dark:bg-gray-800  dark:border-gray-700"
                }
              >
                <td
                  scope="row"
                  className="lg:px-6 lg:py-3  py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </td>
                <td className="lg:px-6 lg:py-3  py-2 px-2">{item.name}</td>
                <td className="lg:px-6 lg:py-3  py-2 px-2">{item.serviceCategory}</td>
                <td className="lg:px-6 lg:py-3  py-2 px-2  ">
                  {item.priceType === 0 && "Fixed price "}
                  {item.priceType === 1 && "Changeable price   "}
                </td>
                <td className="lg:px-6 lg:py-3  py-2 px-2">
                  {/* {item.minPrice ? item.minPrice : "-"} */}
                  <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.minPrice ? item.minPrice : "-"}
                          />
                </td>
                <td className="lg:px-6 lg:py-3  py-2 px-2">
                  {/* {item.maxPrice ? item.maxPrice : "-"} */}
                          <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.maxPrice ? item.maxPrice : "-"} 
                          />
                </td>
                <td className="px-6 py-3">
                  {item.price}
                  <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.price}
                          />
                  </td>
              </tr>
                ))
              : servicesTableData[0] ?
                servicesTableData.map((item: any, index: any) => (
                  <tr
                    key={index}
                    className={
                      id === item.id
                        ? "bg-[#F7F7F7]  hover:bg-gray-100   border-b dark:bg-gray-800 dark:border-gray-700"
                        : "bg-[#F7F7F7] hover:bg-gray-100  border-b  dark:bg-gray-800  dark:border-gray-700"
                    }
                  >
                    <td
                      scope="row"
                      className="lg:px-6 lg:py-3  py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>
                    <td className="lg:px-6 lg:py-3  py-2 px-2">{item.name}</td>
                    <td className="lg:px-6 lg:py-3  py-2 px-2">{item.serviceCategory}</td>
                    <td className="lg:px-6 lg:py-3  py-2 px-2  ">
                      {item.priceType === 0 && "Fixed price "}
                      {item.priceType === 1 && "Changeable price   "}
                    </td>
                    <td className="px-6 py-3">
                      {/* {item.minPrice ? item.minPrice : "-"} */}
                      <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.minPrice ? item.minPrice : "-"}
                          />
                    </td>
                    <td className="lg:px-6 lg:py-3 py-2 px-2">
                      {/* {item.maxPrice ? item.maxPrice : "-"} */}
                      <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.maxPrice ? item.maxPrice : "-"} 
                          />
                    </td>
                    {/* <td className="px-6 py-3 ">
                      {item.priceType === 1 ? (
                        <Dropdown
                          className="dddd"
                          overlay={
                            <Menu className="border-2 border-[#3A4EFF]">
                              {item.pricePercentageLists.map(
                                (menuItem: any) => (
                                  <Menu.Item key={menuItem.id}>
                                    {menuItem.percentage}%
                                  </Menu.Item>
                                )
                              )}
                            </Menu>
                          }
                          placement="bottom"
                        >
                          <Button>percentages </Button>
                        </Dropdown>
                      ) : (
                        "-"
                      )}
                    </td> */}
                    <td className="px-2 lg:px-6 py-2 lg:py-3">
                      {/* {item.price} */}
                      <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={item.price}
                          />
                      </td>
                  </tr>
                ))  : 
                <div className="text-center absolute w-[90%] mt-10 text-lg ">
                {t("empty")}
                </div>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllService;
