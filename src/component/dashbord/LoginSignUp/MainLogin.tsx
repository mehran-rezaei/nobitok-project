import React ,{useContext , useState} from 'react';
import Router, {useRouter} from 'next/router'
import { notify } from '@/helper/toust';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
import LoginModalPhone from './LoginModalPhone';
import LoginModalEmail from './LoginModalEmail';
import LoginModalValidation from './LoginModalValidation';
import LoginModalChangePass from './LoginModalChangePass';
import LoginModalFInal from './LoginModalFInal';
import { modalHandler } from '@/context/ModalContextProvider';
import { CreateTokenForUser } from '@/Dataservice/LoginProvider';
import { setCookie } from '@/Dataservice/Configs/cookieProvider';
import { useTranslation } from "react-i18next";

function MainLogin() {
   const { t } = useTranslation();
   const { state , dispatch}:any = useContext(modalHandler)
   const [data , setData] = useState({
    userName : '',
    password : '',
})
    let router = useRouter()


  const loginHandler = () => {
    CreateTokenForUser(data)
    .then(Response => {
      console.log(Response);
      setCookie('token', Response.data.token)
      setCookie('refreshToken', Response.data.refreshToken)
      notify('success','you login successfully     ')
      setTimeout(function() {
      router.push('/') 
         }, 1000)
    })
    .catch(error =>  {
        console.log(error)
        notify('error','invalid Data  ')
    })
  }
const changeHandler = (event:any) => {
  setData({ ...data , [event.target.name] : event.target.value })
  console.log(data);
}
    const changePass = () => {
      dispatch({type : 'ON_LOGIN_EMAIL'})
    }
   const [typeInput , setTypeInput] = useState(true)

    const changeType = () => {
      setTypeInput(!typeInput)
    }
    return (
        <div className="flex justify-center items-center flex-col pt-5">
            <div className="mt-6 mb-10">
            <img src="../../../../../images/loginImg2.png" alt="" className="h-8 w-8 lg:w-16 lg:h-16 " />
            </div>


<section className="sm:w-[60%] rounded-xl">
  <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto  lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
               {t('Logintodashboard')}   
              </h1>
              <form className="space-y-4 md:space-y-6">
                  <div>
                      <input type="text" onChange={changeHandler} value={data.userName} name="userName" id="email" className=" border-b-2 border-[#424874] text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={`${t("username")}`}  required/>
                  </div>
                  <div className=" flex justify-between border-b-2 border-[#424874] text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <input type={typeInput ? 'password' : 'text'} onChange={changeHandler} value={data.password} name="password" id="email" 
                      className='text-gray-900 sm:text-sm outline-none focus:ring-primary-600 focus:border-primary-600  w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                       placeholder={`${t("password")}`} required/>
                      {typeInput ? 
                         <svg  onClick={changeType} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#42487470" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg> : 
                            <svg  onClick={changeType} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#42487470" className="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                          </svg> }
                  </div>
   
                  <div className="flex justify-center">
                     <button  onClick={loginHandler} 
                      type="button"
                       className="w-[45%] text-white bg-[#3A4EFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     >{t('Login')}
                     </button>        
                  </div>
                  {/* <div className="flex justify-center">
                     <button type="button" className="w-[40%] text-[#848484] bg-white border outline-none border-[#848484] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-1  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     >
                        {t('addAdmin')} 
                     </button>        
                  </div> */}
                  <div className="flex items-center flex-col justify-center">
                    <div className="flex justify-center  text-sm mb-3 font-medium text-[#9C9C9C] hover:underline dark:text-primary-500">
                        <span></span>
                        <span className='cursor-pointer' 
                         onClick={changePass}>
                    {t('forgetPassword')}
                        </span>
                    <span></span>
                    </div>
                    <div  onClick={changePass} className="cursor-pointer text-sm font-light text-[#3A4EFF] dark:text-gray-400">
                    {t('changePassword')}
                    </div>
                  </div>
              </form>
          
          </div>
      </div>
  </div>
</section>
             <div className="flex justify-center flex-col items-center mt-6 font-bold text-white">
                <h1> C O M P A N Y</h1>
                <h2 className="text-xs">TAGLINE GOES HERE</h2>
              </div>
    
              {state.showModalPhone && <LoginModalPhone />}
              {state.showModalEmail && <LoginModalEmail />}
              {state.showModalValidation && <LoginModalValidation />}
              {state.showModalChangePass && <LoginModalChangePass />}
              {state.showModalFinal && <LoginModalFInal />}
              {/* <ServiceListModal /> */}
              {/* <DocumnetModal /> */}

        </div>
    );
}

export default MainLogin;