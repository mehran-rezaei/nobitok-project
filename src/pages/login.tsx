import MainLogin from '@/component/dashbord/LoginSignUp/MainLogin';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const login = () => {
    const { t, i18n } = useTranslation();
    useEffect(() => {
        document.body.dir = i18n.dir();
      });
    return (
        <div className="bg-gradient-to-r from-[#8D0BAD]  to-[#3A4EFF] h-screen">
      
            <MainLogin />
            <div className="flex justify-center ">
              <select
                value={i18n.language}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
                className="border-b-2 border-blue-600 active:border-none outline-none
                rounded-md px-2 mt-2"
              >
                <option value="fa">Persian</option>
                <option value="en">English</option>
              </select>
            </div>
           
        </div>
    );
};

export default login;