import React , {useContext, useState} from 'react';
import { modalHandler } from '@/context/ModalContextProvider';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { sendEmailorPhone } from '@/Dataservice/ForgetPassProvider';
import { notify } from '@/helper/toust';
import { useTranslation } from 'react-i18next';


const LoginModalEmail = () => {
  const { t } = useTranslation();


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: '20px',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        // overflow:'scroll',
        // overflow : 'hidden',
        maxHeight: 700,
        minHeight: 350,
      };

      const { state , dispatch}:any = useContext(modalHandler)
      const [data , setData] = useState({
        Email : '',
    })
    const changeHandler = (event:any) => {
      setData({ ...data , [event.target.name] : event.target.value })
      console.log(data);
    }
      const sendData = () => {
        sendEmailorPhone(data.Email,1)
        .then(Response => {
          console.log(Response);
          dispatch({type : 'ON_LOGIN_VALIDATION' , payload : data.Email})          
        })
        .catch(error => {
          console.log(error); 
          notify('error','invalid Email  ')     
        })
      }
      const byPhone = () => {
        dispatch({type : 'ON_LOGIN_PHONE'})
      }

      const [open, setOpen] = React.useState(true);
      // const [open, setOpen] = React.useState(false);
  
      const handleOpen = () => setOpen(true);
      const handleClose = () => {
        setOpen(false);
        dispatch({type : 'OFF_LOGIN_EMAIL'})
      }


    return (
        <div>
        <Modal
          keepMounted
          open={open}
          // onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
      <Box sx={style} {...  { dir: "ltr" }}>
        <div className='flex justify-center items-center flex-col w-full'>
            <h1 className="text-center text-2xl">  {t('changePassword')} </h1>
            <div className="text-center mt-3 text-[#9C9C9C]">
          {t('Pleaseenteryouremailtochangeyourpassword')}
            </div>
            <div className='w-[80%]'>
                   <input type="text" name="Email" value={data.Email} id="text"  onChange={changeHandler} className=" text-center my-8 border-b-2 border-[#424874] text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`${t('enterEmail')}`} required/>
            </div>
            <div className='flex justify-center items-center w-[100%]'>
                   <button onClick={sendData} 
                     type="button"
                     className="w-[30%] text-white bg-[#3A4EFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     >{t('sendCode')}
                     </button>        
            </div>
            <div className="flex items-center  justify-center w-[50%] mt-10">
                    <div  onClick={byPhone} className="text-sm cursor-pointer font-light text-[#3A4EFF] dark:text-gray-400">
                  {t('ChangePasswordwithNumber')}
                    </div>
                  </div>
        </div>
        <div className='absolute left-10 top-7 cursor-pointer' 
        onClick={handleClose}
        >{t('close')}</div>
      </Box>
        </Modal>

        {/* <h1 onClick={handleOpen}>open me</h1> */}
        </div>
    );
};

export default LoginModalEmail;