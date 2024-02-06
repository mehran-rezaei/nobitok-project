import React, { useState, useEffect, useContext } from "react";
import ServicesNavbar from "./ServicesNavbar";
import ServicesTable from "./ServicesTable";
import { Divider } from "antd";
import { Input, Space,InputNumber } from "antd";
import axiosInstance from "@/Dataservice/Configs/axiosInstance";
import {
  createGroup,
  getGroup,
  deleteGroup,
  editGroup,
  getGroupByid,
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
import { Checkbox ,Form} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { use } from "i18next";
import { NumericFormat } from "react-number-format";


const MakeServices = () => {
  const { t } = useTranslation();

  const { state, dispatch }: any = useContext(modalHandler);
  console.log(state.serachValue);

  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [servicesTableData, setServiceTableData] = useState<any>(false);
  const [searchResult, setSearchResult] = useState<any>(false);
  const [checkBoxItem, setCheckBoxItem] = useState<any>({
    stable: false,
    Changeable: false,
  });
  console.log(checkBoxItem);

  const [editData, setEditData] = useState<any>({
    priceType: -1,
    name: "",
    price: "",
    serviceCategory: "",
    serviceCategoryId: "",
    maxPrice: "",
    minPrice: "",
  });
  console.log(editData);

  const [id, setId] = useState<any>("");
  console.log(id);

  const [servicesData, setServicesData] = useState({
    groupId: "",
    name: "",
    price: "",
  });

  const changeHandler = (event: any) => {
    setServicesData({
      ...servicesData,
      [event.target.name]: event.target.value,
    });
    console.log(servicesData);
  };
  const changeHandler2 = (event: any) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
    console.log(editData);
  };

  useEffect(() => {
    getGroup().then((Response) => {
      console.log(Response);
      setCategoryData(Response.data.dataList);
    });
  }, [show]);

  const onChangee = (value: string, label: any) => {
    console.log(`selected ${value}`);
    // console.log(label.label);
    setServicesData({ ...servicesData, groupId: value });
    setEditData({
      ...editData,
      serviceCategory: label.label,
      serviceCategoryId: value,
    });
    // setEditData({...editData , serviceCategoryId : value })
    console.log(servicesData);
    console.log(editData);
    getGroupByid(value)
      .then((Response) => {
        console.log(Response);
        console.log(Response.data.dataList);
        setServiceTableData(Response.data.dataList);
      })
      .catch((error) => {
        console.log(error);
        // notify('error','خطا')
      });
  };
  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const createServiceHandler = async () => {
    addServices(editData)
      .then((Response) => {
        console.log(Response);
        setShow(!show);
        if (Response.data.isSuccess == true) {
          notify("success", "registered successfully");
          setEditData({
            priceType: -1,
            name: "",
            price: "",
            serviceCategory: "",
            serviceCategoryId: editData.serviceCategoryId,
            maxPrice: "",
            minPrice: "",
          });
          getGroupByid(editData.serviceCategoryId)
            .then((Response) => {
              console.log(Response);
              //  console.log(Response.data.dataList);
              setServiceTableData(Response.data.dataList);
            })
            .catch((error) => {
              console.log(error);
              // notify('error','خطا')
            });
          setCheckBoxItem({
            stable: false,
            Changeable: false,
          });
        } 
        // else if (
        //   Response.data.message ===
        //   "'Name' must not be empty.\n'Name' must be between 2 and 50 characters. You entered 0 characters."
        // ) {
        //   notify("error", "Name must be between 2 and 50 characters  ");
        // } 
        // else if (Response.data.message === "'Price' must not be empty.") {
        //   notify("error", " Price must not be empty ");
        // } 
        // else if (Response.data.message === "duplicate name") {
        //   notify("error", "duplicate name !!");
        // } 
        else {
           notify("error", `${Response.data.message}`);
        }
      })
      .catch((error) => {
        console.log(error);
        notify("error", " Error, please enter the correct phrase ");
      });
  };

  useEffect(() => {
    if (state.serachServiceValue.length > 0) {
      getValueBySearch(state.serachServiceValue).then((Response) => {
        console.log(Response);
        setSearchResult(Response.data.dataList);
      });
    } else {
      setSearchResult(false);
      console.log("djjj");
    }
  }, [state.serachServiceValue]);
  console.log(editData);
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 11; i++) {
    options.push({
      label: i,
      value: i,
    });
  }

  const [form] = Form.useForm();
  const submit = () => {
    form.validateFields().then((values) => {

    })
  }
  const layout = {
    labelCol: { span: -8 },
  }

  const [showButton , setShowButtton] = useState(true)
 
 
  useEffect(() => {
    if(checkBoxItem.Changeable){
    if(editData.name.length > 0){
      if(editData.serviceCategoryId > 0){
      if(editData.maxPrice.length > 0){
        if(editData.minPrice.length > 0){
        if(editData.price.length > 0){
          setShowButtton(false)
        }
        else{
          setShowButtton(true)
        }
        }
        else{
          setShowButtton(true)
        }
      }
      else{
        setShowButtton(true)
      }
    }
    else{
      setShowButtton(true)
    }
  }
    else{
      setShowButtton(true)
    }
  } 
  else if(checkBoxItem.stable){
    if(editData.name.length > 0){
      if(editData.price.length > 0){
        if(editData.serviceCategoryId){
          setShowButtton(false)
        } else{
      setShowButtton(true)
        }
      } else{
      setShowButtton(true)
      }
    } else{
      setShowButtton(true)
    }
  }

  } ,[editData] )


  return (
    <div>
      <div className="flex justify-between mt-2 lg:mt-3 h-[76vh]">
        <div className="w-[43%] ">
          <div className=" py-1 lg:py-3 justify-between  ml-3  rounded-xl  mt-0 lg:mt-2 items-center px-3 lg:px-8 ">
            <div>
              <h2 className="text-[15px] lg:text-[20px] font-bold">
                {t("createnewservice")}{" "}
              </h2>
            </div> 
            <div className="flex justify-between flex-col lg:flex-row items-start lg:mt-5 mb-2 mt-2 lg:mb-5">
              <div>
              {/* <Form
                   {...layout}
                // form={form}
                name="control-hooks"
                onFinishFailed={() => {}}
                onFinish={submit}
                   >
                    <Form.Item
                          style={{ width: "100%" }}
                          name={`${t("fulname")}`}
                          className="cursor-pointer
                          rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                          hover:border-[#3A4EFF] hover:border-2 
                          focus:border-2 "        
                          rules={[{ required: true, message: `${t("namerequired")}` }]}
                        
                    >
                    <Input
                      className="cursor-pointer placeholder:text-black "
                      autoComplete={"off"}
                      onChange={changeHandler}
                      // value={data}
                      name="data"
                      style={{ width: "100%" }}
                      size="middle"
                      placeholder={`${t('name')}`}
                    />
                    </Form.Item>
                    <div className="flex justify-center ">
                  <button 
                  type="submit"
                    // onClick={createGroupHandler}
                    className="flex mt-5 justify-center items-center px-5 cursor-pointer py-1.5 border-[#24D560] border-2    bg-[#24D560] text-sm hover:bg-[#22EF67]/20 hover:text-black rounded-md text-white"
                  >
                    <p>{t('record')}</p>
                  </button>
                </div>
                  </Form> */}
                <div className="mb-1 lg:mb-3">
                  <Input
                    autoComplete={"off"}
                    className=" cursor-pointer
                             rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                             hover:border-[#3A4EFF] hover:border-2
                             focus:border-2 w-[150px] lg:w-[220px] text-[11px] lg:text-[14px]"
                    value={editData.name}
                    name="name"
                    onChange={changeHandler2}
                    
                    size="middle"
                    placeholder={`${t("servicename")}`}
                  />
                </div>
              </div>

              <div className="text-black   ">
                <Select
                  className="
                  w-[150px] lg:w-[220px]   mt-1 lg:mt-0 "
                  placeholder={`${t("selectcategory")}`}
                  optionFilterProp="children"
                  onChange={onChangee}
                  onSearch={onSearch}
                  
                  // size="small"
                  options={categoryData.map((item: any) => ({
                    value: item.id,
                    label: item.groupName,
                  }))}
                />
              </div>
            </div>
            <div className="  mt-1 lg:mt-5 font-medium text-[14px] lg:text-[18px] mb-0 lg:mb-5">
              {t("Pricing")}
              <div className="flex justify-between  lg:w-[80%] w-[95%] mt-2 lg:mt-5  mb-3 lg:mb-10">
                <Checkbox
                className="text-[11px] lg:text-[14px]"
                  checked={checkBoxItem.stable}
                  onChange={() => {
                    setCheckBoxItem({ stable: !checkBoxItem.stable });
                    setEditData({ ...editData, priceType: 0 });
                  }}
                >
                  {t("fixedprice")}
                </Checkbox>
                <Checkbox
                 className="text-[11px] lg:text-[14px]"
                  checked={checkBoxItem.Changeable}
                  onChange={() => {
                    setCheckBoxItem({ Changeable: !checkBoxItem.Changeable });
                    setEditData({ ...editData, priceType: 1 });
                  }}
                >
                  {t("changeableprice")}
                </Checkbox>
              </div>
            </div>
            <div className=" lg:mt-5 lg:mb-5 mb-2 mt-1">
              <div className="flex flex-col   items-start">
              {/* <NumericFormat
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={5222}
                        /> */}
                {checkBoxItem.stable && (
                  <div className="mb-1 lg:mb-3">
                    <NumericFormat
                    decimalScale={3}
                      autoComplete={"off"}
                      displayType="input"
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      className=" cursor-pointer
                              rounded-[4px] px-3 text-base py-0.5 border-2  text-sm lg:text-auto border-[#3A4EFF] placeholder:text-black
                              hover:border-[#3A4EFF] hover:border-2 h-6 lg:h-auto
                              focus:border-2 w-[130px] lg:w-[220px] text-xs lg:text-sm"
                      value={editData.price}
                      name="price"
                      onChange={changeHandler2}
                      // style={{ width: "220px" }}
                      // size="middle"
                      // type="number"
                      placeholder={`${t("fixedprice")}`}
                    />
                  </div>
                )}
                {checkBoxItem.Changeable && (
                  <div className="">
                    <div className="mb-2 lg:mb-3 flex justify-start ">
                    <NumericFormat
                    
                    decimalScale={3}
                      autoComplete={"off"}
                      displayType="input"
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      className=" cursor-pointer
                              rounded-[4px] px-3 text-base py-0.5 h-6 lg:h-auto  text-sm lg:text-auto border-2 border-[#3A4EFF] placeholder:text-black
                              hover:border-[#3A4EFF] hover:border-2
                              w-[130px] lg:w-[220px] text-xs lg:text-sm
                              focus:border-2 "
                      value={editData.price}
                      name="price"
                      onChange={changeHandler2}
                      // style={{ width: "220px" }}
                      // size="middle"
                      // type="number"
                      placeholder={`${t("fixedprice")}`}
                    />
                    </div>
                    <div className="flex  justify-between"></div>
                    <div className="flex  justify-between">
                      <div className="">
                      <NumericFormat
                         decimalScale={3}
                          autoComplete={"off"}
                          displayType="input"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          className=" cursor-pointer
                                  rounded-[4px] px-3 text-base h-6 lg:h-auto  text-sm lg:text-auto py-0.5 border-2 border-[#3A4EFF] placeholder:text-black
                                  hover:border-[#3A4EFF] hover:border-2
                                  focus:border-2  w-[130px] lg:w-[220px] text-xs lg:text-sm "
                          value={editData.minPrice}
                          name="minPrice"
                          onChange={changeHandler2}
                          // style={{ width: "220px" }}
                          // size="middle"
                          // type="number"
                          placeholder={`${t("minimumprice")}`}
                        />
                      </div>
                      <div className="mx-6 flex items-center ">
                        <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="input"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          className=" cursor-pointer
                          rounded-[4px] px-3 text-base py-0.5 h-6 lg:h-auto text-xs lg:text-sm lg:text-auto  border-2 border-[#3A4EFF] placeholder:text-black
                          hover:border-[#3A4EFF] hover:border-2
                          focus:border-2  w-[130px] lg:w-[220px]"
                          value={editData.maxPrice}
                          name="maxPrice"
                          onChange={changeHandler2}
                          // style={{ width: "210px" }}
                          // size="middle"
                          // type="number"
                          placeholder={`${t("maximumprice")}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-start mt-3 lg:mt-20 ">
              <button
              disabled={ showButton && true}
                onClick={createServiceHandler}
                className="
                disabled:opacity-50 disabled:cursor-not-allowed
                flex justify-center items-center px-5 lg:px-5 cursor-pointer py-0.5 lg:py-1.5 border-[#24D560] border-2    bg-[#24D560] text-[11px] lg:text-sm hover:bg-[#22EF67]/20 hover:text-black rounded-md text-white"
              >
                <p>{t("submit")}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="  w-[55%] overflow-auto">
        <table className=" w-full text-center  shadow-xl overflow-scroll text-[10px] lg:text-sm  text-gray-500 dark:text-gray-400">
          <thead className="text-[9px] lg:text-xs text-gray-700 uppercase h-max border-b border-black  bg-[#F7F7F7] dark:bg-gray-700 dark:text-gray-400">
            <tr className="hover:bg-gray-50">
              <th scope="col" className="lg:px-6 px-0 py-2 lg:py-3">
                {t("No")}
              </th>
              <th scope="col" className="lg:px-6 px-0 py-2 lg:py-3">
                {t("servicesName")}
              </th>
              <th scope="col" className="lg:px-6 px-0 py-2 lg:py-3">
                {t("pricing")}
              </th>
              <th scope="col" className="lg:px-6 px-0 py-2 lg:py-3">
                {t("categoryName")}
              </th>
              <th scope="col" className="lg:px-6 px-0 py-2 lg:py-3">
                {t("price")}
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {servicesTableData[0] ? (
              servicesTableData.map((item: any, index: any) => (
                <tr
                  key={index + 1}
                  onClick={() => {
                  }}
                  className={
                    "bg-[#F7F7F7] hover:bg-gray-50  border-b dark:bg-gray-800 dark:border-gray-700"
                  }
                >
                  <td
                    scope="row"
                    className="lg:px-6 p-2 lg:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </td>
                  <td className="lg:px-6 p-2 lg:py-3">{item.name}</td>
                  <td className="lg:px-1 p-2 lg:py-3">
                    {item.priceType === 0 && "Fixed Price "}
                    {item.priceType === 1 && "Changeable price   "}
                  </td>
                  <td className="lg:px-6 p-2 lg:py-3">{item.serviceCategory}</td>
                  <td className="lg:px-6 p-2 lg:py-3">
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
            ) : (
              <div className="text-center absolute w-1/2 mt-10 text-lg ">
                {t("empty")}
              </div>
            )}
          </tbody>
        </table>
        </div>
      
      </div>
    </div>
  );
};

export default MakeServices;
