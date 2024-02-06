import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Space } from "antd";
const { Search } = Input;
import { AudioOutlined } from "@ant-design/icons";
import { modalHandler } from "@/context/ModalContextProvider";
import { getGroup } from "@/Dataservice/ServicesProvider";
import { useTranslation } from "react-i18next";

const ServicesNavbar = (props: any) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const { state, dispatch } = useContext(modalHandler);

  const onSearch = (value: string) => {
    console.log(value);

    if (state.pageNumber === 1) {
      dispatch({ type: "SEARCH_GROUP_HANDLER", payload: value });
    } else if (state.pageNumber === 2 || state.pageNumber === 4) {
      dispatch({ type: "SEARCH_SERVICE_HANDLER", payload: value });
    }
  };
  const onchange = (event: any) => {
    console.log(event.target.value);
    if (event.target.value.length === 0) {
      dispatch({ type: "SEARCH_SERVICE_HANDLER", payload: "" });
      dispatch({ type: "SEARCH_GROUP_HANDLER", payload: "" });
    }
  };
  useEffect(() => {
    getGroup()
    .then(Response => {
         console.log(Response);
         console.log(Response.data.dataList);
         setCategoryData(Response.data.dataList)
    })
   } , [show])
    return (
        <div className="h-[7%] py-2  w-full flex justify-center pb-4 items-center border-b-2 border-[#777676]">
              <div className="h-full    flex w-full px-5 justify-between items-center ">
                <div className='flex'>
                <div    onClick={() => dispatch({ type : 'PAGE_HANDLER' , payload: 4})}
                   className={ state.pageNumber === 4 ?
                    'cursor-pointer  text-[10px] lg:text-[14px] font-normal shadow-lg px-4 lg:px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white'
                    :
                  'cursor-pointer shadow-[#3a4eff]/30 hover:opacity-80  text-[10px] lg:text-[14px] font-normal shadow-lg border-2 border-[#3a4eff]  px-4 lg:px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF] transition-all ease-in duration-100 '}
                 >
                  <p className='font-normal'>  {t('services')} </p>
                </div>
              <div   onClick={() => dispatch({ type : 'PAGE_HANDLER' , payload: 1})} 
                className={ state.pageNumber === 1 ?
                  'cursor-pointer  text-[10px] lg:text-[14px] font-normal shadow-lg px-4 lg:px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white'
                   :
                 'cursor-pointer shadow-[#3a4eff]/30 hover:opacity-80  text-[10px] lg:text-[14px] font-normal shadow-lg border-2 border-[#3a4eff]  px-4 lg:px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF] transition-all ease-in duration-100 '}
              >
                   <p> {t('category')} </p>
              </div>
                <div   onClick={() => dispatch({ type : 'PAGE_HANDLER' , payload: 2})}
                 className={ state.pageNumber === 2 ?
                  'cursor-pointer  text-[10px] lg:text-[14px] font-normal shadow-lg  px-4 lg:px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white'
                   :
                 'cursor-pointer shadow-[#3a4eff]/30 hover:opacity-80   text-[10px] lg:text-[14px] font-normal shadow-lg border-2 border-[#3a4eff] px-4 lg:px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF] transition-all ease-in duration-100 '}
                 >
                  <p>{t('addnewservice')}</p>
                </div>
                <div    onClick={() => dispatch({ type : 'PAGE_HANDLER' , payload: 3})} 
                 className={ state.pageNumber === 3 ?
                  'cursor-pointer  text-[10px]  lg:text-[14px] font-normal shadow-lg px-4 lg:px-8 border-2 border-[#3a4eff] py-1 mr-5 rounded-md text-black bg-white'
                   :
                 'cursor-pointer shadow-[#3a4eff]/30 text-[10px] lg:text-[14px] hover:opacity-80 font-normal shadow-lg border-2 border-[#3a4eff] px-4 lg:px-8 py-1 mr-5 rounded-md text-white bg-[#3A4EFF] transition-all ease-in duration-100 '}
                >
                  <p>{t('editservice')}</p>
                </div>
   
                </div>
                <div className='flex justify-between items-center'>
                {state.pageNumber === 4 &&
                 <div className="cursor-pointer ml-3 lg:ml-6 rounded-md text-white">
                  {/* <p>فیلتر</p> */}
                  <Dropdown 
            overlay={(
            <Menu className='text-right   '>  
                {<Menu.Item
                  onClick={() =>{
                  dispatch({type : 'FILTER_GROUP_HANDLER' , payload : 0})
                  dispatch({type : 'CHANGE-FILTER-TEXT' , payload : 'All'})
                    }}>
                {t('all')}
                </Menu.Item>}
                {categoryData.map((menuItem:any) => (  
             <Menu.Item key={menuItem.id}
             onClick={() => {
              dispatch({type : 'FILTER_GROUP_HANDLER' , payload : menuItem.id})
              dispatch({type : 'CHANGE-FILTER-TEXT' , payload : menuItem.groupName})
             }}>
                 {menuItem.groupName}
             </Menu.Item>       
                ))}
          </Menu>
        )}
         placement="bottom">
        <Button 
        className='hover:opacity-90 transition-all ease-in duration-100'
         style={{ fontSize: 13 ,  color: 'white', border: 'none' , padding : '1px  20px',height: '30px' , backgroundColor: '#3A4EFF',}}
        >
          {state.textinFilter ? state.textinFilter : t('filter')}
          {/* filter */}
          </Button>
      </Dropdown>
                </div>}
                {state.pageNumber === 4 || state.pageNumber === 1 ?
                <Search
                className='searchNavbar ml-3 lg:ml-6 border-[#3A4EFF] border-2 rounded-md hover:opacity-90
                shadow-blue-gray-300 shadow-lg bg-[#3A4EFF] 
                 transition-all ease-in duration-100 w-[100px] h-[30px] lg:h-[32px] lg:w-[350px]'
                size="middle"
                 placeholder={`${t('search')}`} 
                 onSearch={onSearch} 
                 onChange={onchange}
                 style={{  color: 'white'}} />
                 : ''}
                <div className=" mr-1 lg:mr-3 "> 
              </div>
                </div>
  
              </div>
            </div>
  );
};

export default ServicesNavbar;
