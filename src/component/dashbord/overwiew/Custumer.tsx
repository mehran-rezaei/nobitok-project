import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Space } from "antd";
import { Select } from "antd";
import { modalHandler } from "@/context/ModalContextProvider";
import { Checkbox } from "antd";

const Custumer = () => {
  const { state, dispatch } = useContext(modalHandler);
  const [ customerType, setCustomerType] = useState(0);

  const [checkBoxItem, setCheckBoxItem] = useState<any>({});
  

  return (
    <div>
      <div className="flex justify-between mt-3">
        <div className="w-[40%]   px-5 py-1">
          <div className="flex justify-between py-2 px-4 shadow-lg font-medium  text-xs bg-[#F2F2F2] rounded-[6px]">
            <div className="flex justify-center">
              <button
              onClick={() => setCustomerType(0)}
                type="button"
                className={customerType === 0 ? 
                  " w-[120px] text-white bg-[#3A4EFF]   rounded-[5px] py-1" 
                  : 'w-[120px]  text-[black] py-1' }
              >
                کل مشتریان
              </button>
            </div>
            <div className="flex justify-center">
              <button
              onClick={() => setCustomerType(1)}
                type="button"
                className={customerType === 1 ? 
                  " w-[120px] text-white bg-[#3A4EFF]  rounded-[5px] py-1" 
                  : 'w-[120px]  text-[black] py-1' }
              >
                مشتریان ویژه
              </button>
            </div>
          </div>
          <div>
            <h1 className="py-4 text-sm text-[15px] font-medium">
              متن پیام ارسالی :
            </h1>
            <textarea
              className="border-2 border-[#3A4EFF] rounded-sm"
              cols={50}
              rows={6}
            ></textarea>
          </div>
          <div>
            <h1 className="text-[15px] py-5"> انتخاب خدمت جهت تخفیف :</h1>
            <div className="flex justify-between  mb-5">
              <Select
                placeholder="نوع دسته بندی"
                optionFilterProp="children"
                style={{ width: 200 }}
              />
              <Input
                autoComplete={"off"}
                className=" cursor-pointer
                                   rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                                   hover:border-[#3A4EFF] hover:border-2
                                   focus:border-2 disabled:placeholder:text-gray-400
                                   disabled:border-[#3A4EFF] disabled:hover:border-2
                                   disabled:hover:border-[#3A4EFF]"
                name="name"
                style={{ width: 200 }}
                size="middle"
                placeholder="نام خدمت :"
              />
            </div>
            <div className="flex justify-between items-center   mt-8">
              <Input
                autoComplete={"off"}
                className=" cursor-pointer
                                   rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                                   hover:border-[#3A4EFF] hover:border-2
                                   focus:border-2 disabled:placeholder:text-gray-400
                                   disabled:border-[#3A4EFF] disabled:hover:border-2
                                   disabled:hover:border-[#3A4EFF]"
                name="name"
                style={{ width: 200 }}
                size="middle"
                placeholder="درصد تخفیف  :"
              />
              <div>
                <Checkbox
                  //   checked={checkBoxItem.stable}
                  onChange={() => {
                    // setCheckBoxItem({stable : !checkBoxItem.stable})
                    // setEditData({...editData , priceType : 0})
                  }}
                >
                  10%
                </Checkbox>
                <Checkbox
                  // checked={checkBoxItem.Changeable}
                  onChange={() => {
                    //  setCheckBoxItem({Changeable : !checkBoxItem.Changeable})
                    //  setEditData({...editData , priceType : 1})
                  }}
                >
                  20%
                </Checkbox>
                <Checkbox
                  // checked={checkBoxItem.Changeable}
                  onChange={() => {
                    //  setCheckBoxItem({Changeable : !checkBoxItem.Changeable})
                    //  setEditData({...editData , priceType : 1})
                  }}
                >
                  30%
                </Checkbox>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <Input
                autoComplete={"off"}
                className=" cursor-pointer
                                   rounded-[4px] border-2 border-[#3A4EFF] placeholder:text-black
                                   hover:border-[#3A4EFF] hover:border-2
                                   focus:border-2 disabled:placeholder:text-gray-400
                                   disabled:border-[#3A4EFF] disabled:hover:border-2
                                   disabled:hover:border-[#3A4EFF]"
                name="name"
                style={{ width: 200 }}
                size="middle"
                placeholder="  مدت تخفیف  :"
              />
              <div>
                <Checkbox
                  className="ml-5"
                  // checked={checkBoxItem.Changeable}
                  onChange={() => {
                    //  setCheckBoxItem({Changeable : !checkBoxItem.Changeable})
                    //  setEditData({...editData , priceType : 1})
                  }}
                >
                  یک هفته
                </Checkbox>
                <Checkbox
                  // checked={checkBoxItem.Changeable}
                  onChange={() => {
                    //  setCheckBoxItem({Changeable : !checkBoxItem.Changeable})
                    //  setEditData({...editData , priceType : 1})
                  }}
                >
                  یک ماه
                </Checkbox>
              </div>
            </div>
            <Button type="primary" className=" text-white bg-[#3A4EFF] w-44 mt-10 text-xs"
            >ارسال پیام</Button>
          </div>
        </div>

        <table className="w-2/3 mr-13 text-[10px] font-normal opacity-70 overflow-scroll mt-3 mx-5 shadow-lg border   hover:bg-gray-100 bg-[#F7F7F7] border-gray-200  rounded-md  h-max lg:text-sm text-center ">
        <thead className="text-[10px] lg:text-xs   uppercase  h-max bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام و نام خانوادگی
              </th>
              <th scope="col" className="px-6 py-3">
                کد ملی
              </th>
              <th scope="col" className="px-6 py-3">
                شماره تلفن
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ اخرین نوبت نوبت
              </th>
            </tr>
          </thead>
          <tbody className=" hover:bg-gray-50 text-xs cursor-pointer">
            <tr>
              <th scope="col" className="px-6 py-3">
                  علی کیانی 
              </th>
              <th scope="col" className="px-6 py-3">
              174852963 
              </th>
              <th scope="col" className="px-6 py-3">
              09162458385
              </th>
              <th scope="col" className="px-6 py-3">
              1401/2/1   
              </th>
            </tr>
            {/* <div className="text-center absolute w-1/2 mt-10 text-lg">
              خالی است
            </div> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Custumer;
