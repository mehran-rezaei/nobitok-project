import React, { useContext, useEffect, useState } from "react";
import { modalHandler } from "@/context/ModalContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";

const LoginModalPhone = () => {
  const { t } = useTranslation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // overflow:'scroll',
    // overflow : 'hidden',
    maxHeight: 700,
    minHeight: 350,
  };

  const { state, dispatch }: any = useContext(modalHandler);
  const sendData = () => {
    // dispatch({ type: "ON_LOGIN_VALIDATION" });
  };

  const [data, setData] = useState({
    phoneNoumber: "",
  });
  const changeHandler = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const [open, setOpen] = React.useState(true);
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "OFF_LOGIN_PHONE" });
  };
  const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                    clearInterval(myInterval)        
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        
        // onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}
         {...{ dir: "ltr" }}
         >
          <div className="flex justify-center items-center flex-col w-full">
            <h1 className="text-center text-2xl">{t('changePassword')} </h1>
            <div className="text-center mt-3 text-[#9C9C9C]">
              {t('Enteryourphonenumbertochangeyourpassword')}
            </div>
            <div className="w-[80%]">
              <input
                type="text"
                name="phoneNoumber"
                value={data.phoneNoumber}
                onChange={changeHandler}
                id="text"
                className=" text-center my-8 border-b-2 border-[#424874] text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" +98 - - - - - - - - -"
                required
              />
            </div>
            <div className="flex justify-center items-center w-[100%]">
              <button
                onClick={sendData}
                type="button"
                className="w-[30%] text-white bg-[#3A4EFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t('sendCode')}
              </button>
            </div>
            <div className='absolute left-10 top-7 cursor-pointer' 
        onClick={handleClose}
        >{t('close')}</div>
            {/* <div className="flex items-center  justify-between mt-10">
              <div className="flex justify-center  text-sm font-medium text-[#9C9C9C] hover:underline dark:text-primary-500">
                <span></span>
                <span className="mr-8">To resend the code</span>
                <span></span>
              </div>
              <div className="text-sm cursor-pointer font-light text-[#3A4EFF] dark:text-gray-400">
                {t('Click')}
              </div>
            </div> */}
        {/* <div>
        { seconds === 0  
            ? 
            <div className="flex items-center  justify-between mt-10">
            <div className="flex justify-center  text-sm font-medium text-[#9C9C9C] hover:underline dark:text-primary-500">
                <span></span>
                <span className='mx-5'>
                {t('Ifthecodehasnotbeensenttoyou')}
                </span>
            <span></span>
            </div>
            <div 
            // onClick={() => sendAgain()}
             className="text-sm cursor-pointer font-light text-[#3A4EFF] dark:text-gray-400">
            {t('Click')}   
            </div>
          </div>

            : 
            <div className="flex items-center  justify-between mt-10">
            <div className="flex justify-center  text-sm font-medium text-[#9C9C9C] hover:underline dark:text-primary-500">
                <span></span>
                <span className='mx-5'>
                {t('Try Again')}
                </span>
            <span></span>
            </div>
            <h1> {seconds < 10 ?  `0${seconds}` : seconds}</h1>
          </div> 
        }
        </div> */}
          </div>
        </Box>
      </Modal>

      {/* <h1 onClick={handleOpen}>open me</h1> */}
    </div>
  );
};

export default LoginModalPhone;
