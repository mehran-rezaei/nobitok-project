import axios from "axios";
import axiosInstance from "./Configs/axiosInstance";

export function sendEmailorPhone(emailorphone:any,type:any) {
    return axios
      .get(`https://appointmentapi.etokco.ir/Account/ForgotPassword?phoneOrEmail=${emailorphone}&RecoveryMehod=${type}`)
      .then((response) => response);
  }
  
  export function sendCodetoVerifyByEmail(email:any,code:any) {
      return axios
        .post(`https://appointmentapi.etokco.ir/Account/VerifyUserByCode`,{
            // phoneNumber: "string",
            email: email,
            code: code
        })
        .then((response) => response);
    }
  
    export function sendChangePassword(email:any,password:any) {
      return axios
        .post(`https://appointmentapi.etokco.ir/Account/ChangeUserPassword`,{
            email: email,
            newPassword: password
        })
        .then((response) => response);
    }