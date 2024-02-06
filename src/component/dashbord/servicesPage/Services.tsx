import React, { useState, useEffect, useContext } from "react";
import ServicesNavbar from "./ServicesNavbar";
import { Divider } from "antd";
import { Input, Space,Form } from "antd";
import {
  createGroup,
  getGroup,
  deleteGroup,
  editGroup,
  getGroupBySearch,
} from "@/Dataservice/ServicesProvider";
import MakeServices from "./MakeServices";
import { notify } from "@/helper/toust";
import { modalHandler } from "@/context/ModalContextProvider";
import AllService from "./AllService";
import EditServices from "./EditServices";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  // const [state, setstate] = useState(1);
  const [data, setData] = useState("");
  const [editData, setEditData] = useState("");
  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [fisrtLoad, setFirstLoad] = useState<any>(false);
  const [id, setId] = useState<any>("");
  const [itemForEdit, setItemForEdit] = useState<any>("");
  const [filteredGroup, setFiilteredGroup] = useState<any>(false);

  const { state, dispatch }:any = useContext(modalHandler);
  console.log(state.pageNumber);

  console.log(id);

  const changeHandler = (event: any) => {
    setData(([event.target.name] = event.target.value));
    console.log(data);
  };
  const changeHandler2 = (event: any) => {
    setEditData(([event.target.name] = event.target.value));
    console.log(editData);
  };
  const createGroupHandler = async () => {
    console.log("yess");
    createGroup(data)
      .then((Response) => {
        console.log(Response);
        setShow(!show);
      
        if (Response.data.isSuccess == true) {
          setEditData('')
          notify("success", "registered successfully");
          setData('')
          setId('')
        }
        else  if(Response.data.code === 209){
          notify("error", Response.data.message);
          // validation error
        }
         else if (Response.data.code === 208) {
          // "duplicate name"
          notify("error", Response.data.message);
        } else if (
          Response.data.message ===
          "'Group Name' must be between 2 and 50 characters. You entered 1 characters."
        ) {
          notify("error", " Name must be between 2 and 50 characters ");
        } else {
          notify("error", "Error, please enter the correct phrase");
        setData('')
        }
      })
      .catch((error) => {
        console.log(error);

        notify("error", "error");
      });
  };
  useEffect(() => {
    getGroup()
      .then((Response) => {
        console.log(Response);
        console.log(Response.data.dataList);
        setCategoryData(Response.data.dataList);
        // setEditData('')
        // setId('')
      })
      .catch((error) => {
        console.log(error);
        notify("error", "error");
      });
  },[show]);

  useEffect(() => {
    if (fisrtLoad === false) {
      if (categoryData.length > 0) {
        setFirstLoad(true);
      }
    }
  }, [categoryData]);

  const tableHandler = async (item: any) => {
    console.log(item);
    setItemForEdit(item);
    setEditData(item.groupName);
  };

  const deleteGroupHandler = async () => {
     deleteGroup(id)
     .then(Response => {
          console.log(Response);
          setId(0)
          setEditData('')
          setShow(!show)
          if(Response.data.isSuccess == true ){
            notify('success','Removed successfully')
            // setEditData('')
          } else if(Response.data.code === 500){
            notify('error',Response.data.message)

          }
     })
     .catch(error => {
        console.log(error);
        notify("error", "error");
      });
  };

  const editGroupHandler = async () => {
    console.log(itemForEdit);
    editGroup(id, editData)
      .then((Response) => {
        console.log(Response);
        setShow(!show);
        if (Response.data.isSuccess == true) {
          notify("success", "changed successfully");
          setId(0)
          setEditData('')
          
        } else{
          notify("error", `${Response.data.message}`);
        }

        // else  if(Response.data.code === 209){
        //   notify("error", Response.data.message);
        //   // validation error
        // }
        //  else if (Response.data.code === 208) {
        //   // "duplicate name"
        //   notify("error", Response.data.message);
        // }
        // else if (Response.data.message === "duplicate name") {
        //   notify("error", " Same name!!");
        // } else if (
        //   Response.data.message ===
        //   "'Group Name' must not be empty.\n'Group Name' must be between 2 and 50 characters. You entered 0 characters."
        // ) {
        //   notify("error", " Name must be between 2 and 50 characters ");
        //   // setEditData('')
        // }
      })
      .catch((error) => {
        console.log(error);
        notify("error", "error");
      });
  };

  useEffect(() => {
    if(state){
      if (state.SearchGroupValue.length > 0) {
        getGroupBySearch(state.SearchGroupValue).then((Response) => {
          console.log(Response);
          setFiilteredGroup(Response.data.dataList);
        });
      } else {
        setFiilteredGroup(false);
      }
    }
  }, [state.SearchGroupValue]);
  console.log(state.SearchGroupValue);



  const [form] = Form.useForm();
  const submit = () => {
    form.validateFields().then((values) => {
      createGroupHandler()
    })
  }
  // const submit2 = () => {
  //   form.validateFields().then((values) => {

  //   })
  // }
  const layout = {
    labelCol: { span: -8 },
  }
  return (
    <div className=" w-[90vw] h-[90vh]  ">
      {state.pageNumber == 1 && (
        <div>
          <div>
            <ServicesNavbar />
          </div>
          <div className="flex justify-between mt-1 lg:mt-5 ">
            <div className="w-[42%] ml-3 lg:ml-6">
              <div className="topRightSection flex    shadow-lg mr-5 lg:mr-10   justify-between h-11 lg:h-28 lg:rounded-xl rounded-md mt-1 lg:mt-3 items-center py-1 lg:py-0 px-8 lg:px-16 bg-[#F7F7F7]">
                <div className="">
                  <span className="block text-[11px] lg:text-[20px] font-semibold text-center">
                    {categoryData && categoryData.length}
                  </span>
                  <span className="block text-[10px] lg:text-[14px] font-normal">
                    {t('allCategory')}
                  </span>
                </div>
                <Divider
                className="h-[25px] lg:h-[60px]"
                  type="vertical"
                  style={{ borderWidth: 2, borderColor: "#000000" }}
                />
                <div>
                  <span className="block text-[11px] lg:text-[20px] font-semibold text-center">
                    0
                  </span>
                  <span className="block text-[10px] lg:text-[14px]">
                    {" "}
                    {t('mostconsumedCategory')}
                  </span>
                </div>
              </div>
              <div className=" py-2 lg:py-5  shadow-lg text-center justify-between mr-5 lg:mr-10 h-[100px] lg:h-48 rounded-xl mt-3 lg:mt-6 items-center  px-5 lg:px-10 bg-[#F7F7F7]">
                <div>
                  <h2 className="text-[11px] lg:text-[18px] font-bold">  {t('addnewcategory')} </h2>
                </div>
         
                <div className="warnigggg mt-1 lg:mt-5 flex flex-col justify-center items-center mb-1 lg:mb-10">
                <Form
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
                          rounded-[2px] placeholder:text-black
                          focus:border-2 h-3"        
                          rules={[{ required: true, message: `${t("namerequired")}` }]}  
                    >
                    <Input
                      className="cursor-pointer
                      border-2 border-[#3A4EFF] w-[140px] 
                       lg:w-[210px] h-[24px] lg:h-auto text-[12px] 
                       lg:text-[14px] placeholder:text-black "
                      autoComplete={"off"}
                      onChange={changeHandler}
                      value={data}
                      name="data"
                      // style={{ width: "210px" }}
                      size="middle"
                      placeholder={`${t('name')}`}
                    />
                    </Form.Item>
                    <div className="flex justify-center ">
                  <button 
                  type="submit"
                    // onClick={createGroupHandler}
                    className="flex mt-1 lg:mt-5 justify-center items-center px-3 lg:px-5 cursor-pointer py-0.5 lg:py-1.5 border-[#24D560] border-2    bg-[#24D560] text-[11px] lg:text-sm hover:bg-[#22EF67]/20 hover:text-black rounded-md text-white"
                  >
                    <p>{t('record')}</p>
                  </button>
                </div>
                  </Form>
 
                </div>

              </div>
              <div className="py-3 lg:py-5 shadow-lg text-center justify-between mr-5 lg:mr-10 h-[105px] lg:h-48 rounded-xl mt-3 lg:mt-6 items-center px-4 lg:px-10 bg-[#F7F7F7]">
                <div>
                  <h2 className="text-[12px] lg:text-[18px] font-bold"> {t('editcategory')} </h2>
                </div>
                <div className="flex justify-center flex-col  items-center mt-3 lg:mt-8 mb-2 lg:mb-5">
                <Input
                     required={true}
                      className="cursor-pointer placeholder:text-black
                      rounded-[4px] border-2 border-[#3A4EFF] 
                      hover:border-[#3A4EFF] hover:border-2 mb-1 lg:mb-6
                      focus:border-2  h-[24px] lg:h-auto w-[140px] lg:w-[210px]
                      text-[12px] lg:text-auto"
                      autoComplete={"off"}
                      value={editData }
                      onChange={changeHandler2}
                      name="editData"
                     
                      size="middle"
                      placeholder={`${t('name')}`}
                      
                    />
                  <div className="flex justify-center mt-1 mb-1 lg:mb-6">
                  <button
                   disabled={editData.length === 0 && true}  
                    onClick={editGroupHandler}
                    className="disabled:opacity-50 disabled:cursor-not-allowed
                    px-3 lg:px-7 mx-2 cursor-pointer py-0.5 lg:py-1.5 bg-[#FFC061] rounded-md border-2 border-[#FFCB7C]  hover:bg-[#FFCB7C]/20 hover:text-black hover:border-[#FFCB7C]  text-[11px] lg:text-sm text-white"
                  >
                    <p>{t('edit')}</p>
                  </button>
                  <button
                   disabled={editData.length === 0 && true}  
                    onClick={deleteGroupHandler}
                    className="disabled:opacity-50 disabled:cursor-not-allowed
                    flex justify-center items-center px-3 lg:px-7 cursor-pointer py-0.5 lg:py-1.5 border-[#FF5757] bg-[#FF5757]  border-2  text-[11px] lg:text-sm hover:bg-[#FF5757]/20 hover:text-black rounded-md text-white"
                  >
                    <p>{t('delete')}</p>
                  </button >
                </div>
                </div>

              </div>
            </div>
            <div className="w-[55%] overflow-auto">
            <table className="w-full shadow-lg overflow-scroll text-[10px] lg:text-sm h-max  text-gray-500 dark:text-gray-400">
                  <thead className="text-[10px] lg:text-xs text-gray-700 hover:bg-gray-50 uppercase border-b border-black  bg-[#F7F7F7] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="lg:px-6 px-2 lg:py-3 py-2">
                        {t('No')}
                      </th>
                      <th scope="col" className="lg:px-6 lg:py-3 py-2 px-2">
                        {t('categoryName')}
                      </th>
                    </tr>
                  </thead>
                  <tbody  >
                    {fisrtLoad
                      ? filteredGroup
                        ? filteredGroup.map((item: any, index: any) => (
                            <tr
                              key={index}
                              onClick={() => {
                                tableHandler(item);
                                setId(item.id);
                              }}
                              className={
                                id === item.id
                                ? "bg-gray-200  cursor-pointer text-center border-b dark:bg-gray-800 dark:border-gray-700"
                                : "bg-[#F7F7F7] border-b hover:bg-gray-50 text-center dark:bg-gray-800 cursor-pointer dark:border-gray-700"
                              }
                            >
                              <td
                                scope="row"
                                className="lg:px-6 px-2 py-2 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {/* {item.id} */}
                                {index + 1}
                              </td>
                              <td 
                              scope="row"
                              className="lg:px-6 px-2 py-2 lg:py-4">{item.groupName}</td>
                            </tr>
                          ))
                        : categoryData.map((item: any, index: any) => (
                            <tr
                              key={index}
                              onClick={() => {
                                tableHandler(item);
                                setId(item.id);
                              }}
                              className={
                                id === item.id
                                  ? "bg-gray-200  cursor-pointer text-center border-b dark:bg-gray-800 dark:border-gray-700"
                                  : "bg-[#F7F7F7] border-b hover:bg-gray-50 text-center dark:bg-gray-800 cursor-pointer dark:border-gray-700"
                              }
                            >
                              <td
                               scope="row"
                                className="lg:px-6 px-2 py-2 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {/* {item.id} */}
                                {index + 1}
                              </td>
                              <td 
                               scope="row"
                              className="lg:px-6 px-2 py-2 lg:py-4">{item.groupName}</td>
                            </tr>
                          ))
                      : 
                      <div className="text-center absolute w-1/2 mt-6 lg:mt-10 text-lg ">
                      {t("empty")}
                      </div>
                      }
                  </tbody>
                </table>
            </div>
        
          </div>
        </div>
      )}
      {state.pageNumber === 2 && (
        <div>
          <ServicesNavbar />
          <MakeServices />
        </div>
      )}

      {state.pageNumber === 3 && (
        <div>
          <ServicesNavbar />
          <EditServices />
        </div>
      )}

      {state.pageNumber === 4 && (
        <div>
          <ServicesNavbar />
          <AllService />
        </div>
      )}
    </div>
  );
};

export default Services;
