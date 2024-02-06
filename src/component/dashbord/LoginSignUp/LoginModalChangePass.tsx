import React , {useContext, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { modalHandler } from '@/context/ModalContextProvider';
import { sendChangePassword } from '@/Dataservice/ForgetPassProvider';


const LoginModalChangePass = () => {
  const { state , dispatch}:any = useContext(modalHandler)

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

      const [open, setOpen] = React.useState(true);
      // const [open, setOpen] = React.useState(false);
  
      const handleOpen = () => setOpen(true);
      const handleClose = () => {
        setOpen(false);
        dispatch({type : 'OFF_LOGIN_CHANGEPASS'})
      }
      const [data , setData] = useState({
        password : '',
        repeatPassword : '',
    })

    const sendData = () => {
      sendChangePassword(state.email,data.password)
      .then(Response => {
        console.log(Response);
        dispatch({type : 'ON_FINAL'})    
      })
      .catch(error => {
        console.log(error);
      })
    }
    const changeHandler = (event:any) => {
      setData({ ...data , [event.target.name] : event.target.value })
      console.log(data);
    }


    return (
        <div>
        <Modal
          // keepMounted
          open={open}
          // onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
      <Box sx={style} {...  { dir: "rtl" }}>
        <div className='flex justify-center items-center flex-col w-full'>
            <h1 className="text-center text-2xl">تغییر رمز عبور</h1>
            <div className="text-center mt-3 text-[#9C9C9C]">
              رمز عبور جدید خود را وارد کنید
            </div>
            <div className='w-[80%]'>
                   <input type="text" name="password" value={data.password} onChange={changeHandler} id="text" className=" text-center my-8 border-b-2 border-[#424874] text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="رمز عبور جدید را وارد کنید :" required/>
            </div>
            <div className='w-[80%]'>
                   <input type="text" name="repeatPassword" value={data.repeatPassword} onChange={changeHandler} 
                   id="text" className=" text-center mb-8 border-b-2 border-[#424874] text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="رمز عبور را مجدد وارد کنید :" required/>
            </div>
            <div className='flex justify-center items-center w-[100%]'>
                   <button  onClick={sendData} 
                    type="button"
                    className="w-[30%] text-white bg-[#3A4EFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     >تغییر رمز 
                     </button>        
            </div>
        </div>
        <div className='absolute left-10 top-7 cursor-pointer' 
        onClick={handleClose}
        >بستن</div>
      </Box>
        </Modal>
        
        <h1 onClick={handleOpen}>open me</h1>
        </div>
    );
};

export default LoginModalChangePass;