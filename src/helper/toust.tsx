import toast, { Toaster } from 'react-hot-toast';

 export const notify = (type:string ,text:string) => {
    if(type === "success"){
        toast.success(text)
    } else{
        toast.error(text)
    }
   }
