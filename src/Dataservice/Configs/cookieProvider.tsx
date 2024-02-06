import Cookies from "js-cookie";

export function setCookie(key:any, value:any){
    Cookies.set(key, value, { expires : 14 });
}

export function getCookie(key:any){
    return Cookies.get(key);
}