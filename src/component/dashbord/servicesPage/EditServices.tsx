import React, { useState, useEffect, useContext } from "react";
import ServicesNavbar from "./ServicesNavbar";
import ServicesTable from "./ServicesTable";
import { Divider } from "antd";
import { Input, Space,InputNumber } from "antd";
const { Search } = Input;
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
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";


const EditServices = () => {
  const { state, dispatch }: any = useContext(modalHandler);
  const { t } = useTranslation();
  console.log(state.serachValue);

  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [servicesTableData, setServiceTableData] = useState<any>(false);
  const [searchResult, setSearchResult] = useState<any>(false);
  const [showItem, setShowItem] = useState<any>(false);
  const [idd, setIdd] = useState<any>("");
  const [checkBoxItem, setCheckBoxItem] = useState<any>({
    stable: false,
    Changeable: false,
  });
  console.log(checkBoxItem);

  const [editData, setEditData] = useState<any>({
    priceType: -1,
    id: "",
    name: "",
    price: "",
    serviceCategory: "",
    serviceCategoryId: "",
    maxPrice: "",
    minPrice: "",
  }) ;
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
      console.log(Response.data.dataList);
      setCategoryData(Response.data.dataList);
    });
  }, [show]);
  useEffect(() => {
    getGroupByid(editData.serviceCategoryId)
      .then((Response) => {
        console.log(Response);
        console.log(Response.data.dataList);
        setServiceTableData(Response.data.dataList);
      })
      .catch((error) => {
        console.log(error);
        // notify('error','خطا')
      });
  }, [show]);

  const onChangee = (value: string, label: any) => {
    console.log(`selected ${value}`);

    // setEditData([])
    // setEditData( servicesTableData.find(service => service.id === value))
    setServicesData({ ...servicesData, groupId: value });
  };
  useEffect(() => {
    if (editData.priceType === 0) {
      setCheckBoxItem({ stable: true });
    } else if (editData.priceType === 1) {
      setCheckBoxItem({ Changeable: true });
    } else {
      setCheckBoxItem({
        stable: false,
        Changeable: false,
      });
    }
  }, [editData]);
  const onChangee2 = (value: string, label: any) => {
    console.log(`selected ${value}`);
    console.log(label.label);

    setServicesData({ ...servicesData, groupId: value });
    setEditData({
      ...editData,
      serviceCategory: label.label,
      serviceCategoryId: value,
    });
    setEditData({
      id: "",
      priceType: -1,
      name: "",
      price: "",
      serviceCategory: "",
      serviceCategoryId: value,
      maxPrice: "",
      minPrice: "",
    });
    console.log(servicesData);
    console.log(editData);
    getGroupByid(value).then((Response) => {
      console.log(Response);
      setServiceTableData(Response.data.dataList);
    });
  };
  console.log(servicesTableData);

  console.log(editData);

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const editServicesHandler = () => {
    editServices(editData)
      .then((Response) => {
        console.log(Response);
        if (Response.data.isSuccess === true) {
          setShow(!show);
          notify("success", "Changed successfully");
          setEditData({
            priceType: -1,
            id: "",
            name: "",
            price: "",
            serviceCategory: "",
            serviceCategoryId: editData.serviceCategoryId,
            maxPrice: "",
            minPrice: "",
          });
          getGroupByid(editData.serviceCategoryId).then((Response) => {
            console.log(Response);
            setServiceTableData(Response.data.dataList);
          });
        } 
        else{
          notify("error", `${Response.data.message}`);
        }
        // else if (
        //   Response.data.message ===
        //   "'Name' must not be empty.\n'Name' must be between 2 and 50 characters. You entered 0 characters."
        // ) {
        //   notify("error", " Name must be between 2 and 50 characters");
        // }
        //  else if (Response.data.message === "'Price' must not be empty.") {
        //   notify("error", " Price must not be empty ");
        // }
        setShow(!show);
      })
      .catch((error) => {
        console.log(error);
        notify("error", " Error, please enter the correct phrase");
      });
    
  };
  const deleteServicesHandler = () => {
    deleteServices(editData.id)
      .then((Response) => {
        console.log(Response);
        setShow(!show);
        notify("success", " Removed successfully  ");
      })
      .catch((error) => {
        console.log(error);
        notify("error", "Error");
      });
  };
  useEffect(() => {
    if (state.serachServiceValue.length > 0) {
      getValueBySearch(state.serachServiceValue).then((Response) => {
        console.log(Response);
        console.log(Response.data.dataList);
        setSearchResult(Response.data.dataList);
      });
    } else {
      setSearchResult(false);
      console.log("djjj");
    }
  }, [state.serachServiceValue]);

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
    console.log(value);
    // setEditData({...editData ,
    //   pricePercentageLists : value.map((percent:any) => ({
    //       serviceId: 0,
    //       percentage :percent ,
    //       title: ''
    //    }))
    //   })
  };
  console.log(editData);
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 11; i++) {
    options.push({
      label: i,
      value: i,
    });
  }
  const onSearch3 = (value: string) => {
    console.log(value);
    if (value.length > 0) {
      getValueBySearch(value).then((Response) => {
        console.log(Response);
        setServiceTableData(Response.data.dataList);
      });
    } else {
      notify("err", " Enter at least one phrase");
    }
  };

  const onChangee4 = (value: string, label: any) => {
    console.log(`selected ${value}`);
    console.log(label.label);

    setServicesData({ ...servicesData, groupId: value });
    setEditData({
      ...editData,
      serviceCategory: label.label,
      serviceCategoryId: value,
    });
    // setEditData({...editData , serviceCategoryId : value })
    console.log(servicesData);
    console.log(editData);
    // getGroupByid(value)
    // .then(Response => {
    //   console.log(Response);
    //   setServiceTableData(Response.data.dataList)
    // })
  };
  const [showButton , setShowButtton] = useState(true)
  useEffect(() => {
    if(editData.priceType === 1){
    if(editData.name.length > 0){
      if(editData.serviceCategoryId > 0){
      if(editData.maxPrice.length >   0 || editData.maxPrice >0){
        if(editData.minPrice.length > 0 || editData.minPrice >0){
        if(editData.price.length > 0  || editData.price > 0){
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
  } else if(editData.priceType === 0){
    if(editData.name.length > 0){
      if(editData.price.length > 0 || editData.price > 0){
        if(editData.serviceCategoryId){
          setShowButtton(false)
          console.log('assssssssssssssssss');
          
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
      <div className="flex justify-between mt-1 lg:mt-3 h-[76vh]">
        <div className="w-[42%] ">
          <div className=" py-2 lg:py-3  justify-between ml-2 lg:ml-5  rounded-xl lg:mt-0 items-center px-3 lg:px-8 ">
            <div>
              <h2 className="text-[13px] lg:text-[20px]  font-bold mb-1 lg:mb-3">
                {" "}
                {t("editservices")}{" "}
              </h2>
            </div>
            <div className="text-black flex flex-row  lg:flex-row justify-between  mb-1 lg:mb-7">
              {/* <Select
                       placeholder="جست و جو خدمت"
                       optionFilterProp="children"
                       onChange={onChangee}  onSearch={onSearch}
                       style={{ width: 200 }} 
                        options={
                            servicesTableData.map((item:any) => (
                             {
                               value: item.id,
                               label: item.name,
                             }))
                           } /> */}
              <Search
                className="editSearch
                 border-[#3A4EFF] 
                 border-2 
                 overflow-hidden 
                 w-[135px]
                h-7 lg:h-auto
                 lg:w-[220px]
                 mb-1 lg:mb-0
                 rounded-[4px]"
                size="middle"
                placeholder={`${t("search")}`}
                onSearch={onSearch3}
                //  onChange={onchange3}
                
              />
              <div className="text-black lg:border rounded-[4px] ">
                <Select
                className="w-[135px] lg:w-[220px]"
                  //  disabled={editData.id ? false : true}
                  placeholder={`${t("selectcategory")}`}
                  optionFilterProp="children"
                  // defaultValue={
                  //   editData.serviceCategory
                  //     ? editData.serviceCategory
                  //     : `${t("selectcategory")}`
                  // }
                  // value={
                  //   editData.serviceCategory
                  //     ? editData.serviceCategory
                  //     : t("selectcategory")
                  // }
                  onChange={onChangee2}
                  // onSearch={onSearch}
                  // style={{ width: 220 }}
                  options={categoryData.map((item: any) => ({
                    value: item.id,
                    label: item.groupName,
                  }))}
                />
              </div>
            </div>
            <div className="flex  justify-between items-start mt-2 lg:mt-10 mb-1 lg:mb-5">
              <div>
                <div className=" mb-1 lg:mb-3">
                  <Input
                    autoComplete={"off"}
                    className=" cursor-pointer
                                   rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                                   hover:border-[#3A4EFF] hover:border-2 text-[12px] lg:text-[13px]
                                   focus:border-2 disabled:placeholder:text-gray-400
                                   disabled:border-[#3A4EFF] disabled:hover:border-2
                                   disabled:hover:border-[#3A4EFF]
                                   w-[135px] lg:w-[220px] h-7 lg:h-auto"
                    value={editData.name && editData.name}
                    name="name"
                    onChange={changeHandler2}
                    // style={{ width: 220 }}
                    size="middle"
                    placeholder={`${t("servicename")}`}
                    disabled={editData.id ? false : true}
                  />
                </div>
              </div>

              <div className="text-black lg:border rounded-md border-gray-300">
                <Select
                className=" w-[135px] lg:w-[220px]"
                  disabled={editData.id ? false : true}
                  placeholder={t("changecategory")}
                  optionFilterProp="children"
                  value={
                    editData.serviceCategory
                      ? editData.serviceCategory
                      : t("changecategory")
                  }
                  onChange={onChangee4}
                  //  onSearch={onSearch}
                  // style={{ width: 220 }}
                  options={categoryData.map((item: any) => ({
                    value: item.id,
                    label: item.groupName,
                  }))}
                />
              </div>
            </div>
            <div className=" mt-2 lg:mt-6  font-medium text-[14px] lg:text-[18px] mb-2 lg:mb-6">
              {t("Pricing")}
              <div className="flex  justify-around items-center  mt-1 mb-3 lg:mt-5 lg:mb-10">
                <Checkbox
                 className="text-[13px]  lg:text-[15px]"
                  checked={checkBoxItem.stable}
                  disabled={editData.id ? false : true}
                  onChange={() => {
                    setCheckBoxItem({ stable: !checkBoxItem.stable });
                    setEditData({ ...editData, priceType: 0 });
                  }}
                >
                  {" "}
                  {t("fixedprice")}
                </Checkbox>

                <Checkbox className="text-[13px] lg:text-[15px]"
                  checked={checkBoxItem.Changeable}
                  disabled={editData.id ? false : true}
                  onChange={() => {
                    setCheckBoxItem({ Changeable: !checkBoxItem.Changeable });
                    setEditData({ ...editData, priceType: 1, minPrice : "" , maxPrice : "" });
                  }}
                >
                  {" "}
                  {t("changeableprice")}
                </Checkbox>
              </div>
            </div>
            <div className=" lg:mt-5 mt-2 mb-2 lg:mb-5">
              <div className="flex flex-col   items-start">
                {checkBoxItem.stable && (
                  <div className="lg:mb-3">
                    <NumericFormat
                      decimalScale={3}
                      autoComplete={"off"}
                      displayType="input"
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      className=" cursor-pointer
                      rounded-[4px] px-3 lg:text-base py-0.5 border-2 border-[#3A4EFF] placeholder:text-black
                      hover:border-[#3A4EFF] hover:border-2
                      focus:border-2 
                      w-[135px] lg:w-[220px] text-[12px]  h-6 lg:h-auto"       
                      disabled={editData.id ? false : true}
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
                    <div className="mb-3 flex justify-start ">
                      <NumericFormat
                            decimalScale={3}
                            disabled={editData.id ? false : true}
                            autoComplete={"off"}
                            displayType="input"
                            thousandsGroupStyle="thousand"
                            thousandSeparator=","
                            className=" cursor-pointer
                            rounded-[4px] px-3 ;lg:text-base py-0.5 border-2 border-[#3A4EFF] placeholder:text-black
                            hover:border-[#3A4EFF] hover:border-2
                            focus:border-2 
                            w-[135px] lg:w-[220px] text-[12px]  h-6 lg:h-auto"
                        value={editData.price}
                        name="price"
                        onChange={changeHandler2}
                        // style={{ width: "186px" }}
                        // size="middle"
                        placeholder={`${t("fixedprice")}`}
                        // type="number"
                      />
                    </div>
                    <div className="flex  justify-between"></div>
                    {/* <div className='flex justify-start mb-5'>
                     <Space style={{ width: '300px', textAlign: 'left' }} direction="vertical">
                     <Select
                        disabled={editData.id ? false : true}
                           mode="tags"
                           placeholder=" price Range  :"
                           value={editData.pricePercentageLists && 
                            editData.pricePercentageLists.map((percent:any) => (
                              percent.percentage
                            ))
                          }
                           onChange={handleChange}
                           style={{ width: '100%' }}     
                         />
                     </Space>
                    </div>  */}
                    <div className="flex  justify-between">
                      <div className="">
                     <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="input"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          className=" cursor-pointer
                          rounded-[4px] px-3 lg:text-base  py-0.5 border-2 border-[#3A4EFF] placeholder:text-black
                          hover:border-[#3A4EFF] hover:border-2
                          focus:border-2
                         w-[135px] lg:w-[220px] text-[12px]  h-6 lg:h-auto"
                          disabled={editData.id ? false : true}    
                          value={editData.minPrice}
                          name="minPrice"
                          onChange={changeHandler2}
                          // style={{ width: "100%" }}
                          // size="middle"
                          // type="number"
                          placeholder={`${t("minimumprice")}`}
                        />
                      </div>
                      <div className="mx-3 flex items-center ">
                      <NumericFormat
                          decimalScale={3}
                          autoComplete={"off"}
                          displayType="input"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          className=" cursor-pointer
                          rounded-[4px] px-3 lg:text-base py-0.5 border-2 border-[#3A4EFF] placeholder:text-black
                          hover:border-[#3A4EFF] hover:border-2
                          focus:border-2
                          w-[135px] lg:w-[220px] text-[12px]  h-6 lg:h-auto "
                          disabled={editData.id ? false : true}   
                          value={editData.maxPrice}
                          name="maxPrice"
                          onChange={changeHandler2}
                          // style={{ width: "100%" }}
                          // size="middle"
                          // type="number"
                          placeholder={`${t("maximumprice")}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* {checkBoxItem.bazeei && (
                  <div className="">
                    <div className="mb-3 flex justify-start ">
                      <Input
                        autoComplete={"off"}
                        value={editData.price}
                        name="price"
                        onChange={changeHandler2}
                        style={{ width: "186px" }}
                        size="middle"
                        placeholder=" Fixed Price  :"
                      />
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex justify-start mt-3 lg:mt-20 text-[11px] lg:text-[14px] ">
              <button
                disabled={showButton && true}
                onClick={editServicesHandler}
                className="
                disabled:opacity-50 disabled:cursor-not-allowed
                flex justify-center items-center px-4 lg:px-5 cursor-pointer py-0.5 lg:py-1.5 border-[#24D560] border-2    bg-[#24D560]  text-[11px] lg:text-sm hover:bg-[#22EF67]/20 hover:text-black rounded-md text-white"
              >
                <p>{t("submit")}</p>
              </button>
              {/* <div onClick={editServicesHandler} className="px-14 py-1.5  cursor-pointer   bg-[#FFC061] rounded-md text-white">
                          <p>ویرایش</p>
                     </div> */}
              <button
                disabled={showButton && true}
                onClick={deleteServicesHandler}
                className="
                disabled:opacity-50 disabled:cursor-not-allowed
                flex justify-center mx-2 items-center px-4 lg:px-7 cursor-pointer py-0.5 lg:py-1.5 border-[#FF5757] bg-[#FF5757]  border-2  text-[11px] lg:text-sm hover:bg-[#FF5757]/20 hover:text-black rounded-md text-white"
              >
                <p>{t("delete")}</p>
              </button>
            </div>
          </div>
        </div>
        <div className=" w-[57%] overflow-auto">
        <table className="w-full shadow-xl text-[10px]  lg:text-sm overflow-scroll h-max  text-center text-gray-500 dark:text-gray-400">
          <thead className="text-[9px] lg:text-xs text-gray-700 uppercase h-max border-b border-black  bg-[#F7F7F7] dark:bg-gray-700 dark:text-gray-400">
            <tr className="hover:bg-gray-50">
              <th scope="col" className="lg:px-6 lg:py-3 py-1 px-0">
                {t("No")}
              </th>
              <th scope="col" className="lg:px-6 lg:py-3 py-1 px-0">
                {t("servicesName")}
              </th>
              <th scope="col" className="lg:px-6 lg:py-3 py-1 px-0">
                {t("pricing")}
              </th>
              <th scope="col" className="lg:px-6 lg:py-3 py-1 px-0">
                {t("categoryName")}
              </th>
              <th scope="col" className="lg:px-6 lg:py-3 py-1 px-0">
                {t("price")}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {servicesTableData[0] ? (
              servicesTableData.map((item: any, index: any) => (
                <tr
                  key={index + 1}
                  onClick={() => {
                    setEditData(item);
                    setIdd(item.id);
                  }}
                  className={
                    idd === item.id
                      ? "bg-gray-300  cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700"
                      : "bg-[#F7F7F7] hover:bg-gray-50 border-b dark:bg-gray-800 cursor-pointer dark:border-gray-700"
                  }
                >
                  <td
                    scope="row"
                    className="lg:px-6 py-1 lg:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </td>
                  <td className="lg:px-6 py-1 lg:py-3">{item.name}</td>
                  <td className="lg:px-1 py-1 lg:py-3">
                    {item.priceType === 0 && t("fixedprice")}
                    {item.priceType === 1 && t("changeableprice")}
                  </td>
                  <td className="lg:px-6  py-1 lg:py-3">{item.serviceCategory}</td>
                  <td className="lg:px-6  py-1 lg:py-3">
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

export default EditServices;
