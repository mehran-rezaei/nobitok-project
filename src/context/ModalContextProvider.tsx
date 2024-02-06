import React, { createContext, useReducer, useState } from "react";


const initialState = {
  showLoginModal: false,
  showModalPhone: false,
  showModalEmail: false,
  showModalValidation: false,
  showModalChangePass: false,
  showModalFinal: false,
  phoneNumber: "",
  password: "",
  email: "",
  serachServiceValue: "",
  SearchGroupValue: "",
  FilterValue: "",
  pageNumber: 1,
  overViewPageNumber : 1,
  textinFilter : '',
  cashPageNumber : 1
};
const modalReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "ON_FINAL":
      return {
        showModalFinal: true,
      };
    case "OFF_FINAL":
      return {
        showModalFinal: false,
      };

    case "ON_LOGIN_PHONE":
      return {
        // ...state,
        showModalPhone: true,
      };
    case "OFF_LOGIN_PHONE":
      return {
        // ...state,
        showModalPhone: false,
      };
    case "ON_LOGIN_EMAIL":
      return {
        showModalEmail: true,
        phoneNumber: action.payload,
      };
    case "OFF_LOGIN_EMAIL":
      return {
        showModalEmail: false,
      };
    case "ON_LOGIN_VALIDATION":
      return {
        showModalValidation: true,
        email: action.payload,
      };
    case "OFF_LOGIN_VALIDATION":
      return {
        showModalValidation: false,
      };
    case "ON_LOGIN_CHANGEPASS":
      return {
        showModalChangePass: true,
        // phoneNumber : action.payload
        email: action.payload,
      };
    case "OFF_LOGIN_CHANGEPASS":
      return {
        showModalChangePass: false,
        phoneNumber: action.payload,
      };

    case "SEARCH_SERVICE_HANDLER":
      return {
        ...state,
        serachServiceValue: action.payload,
      };

    case "SEARCH_GROUP_HANDLER":
      return {
        ...state,
        SearchGroupValue: action.payload,
      };
    case "FILTER_GROUP_HANDLER":
      return {
        ...state,
        FilterValue: action.payload,
      };

    case "PAGE_HANDLER":
      return {
        ...state,
        pageNumber: action.payload,
      };

      case "OVERVIEW_HANDLER":
        return {
          ...state,
          overViewPageNumber: action.payload,
        };  
        case "CASHDESK_HANDLER":
          return {
            ...state,
            cashPageNumber: action.payload,
          }; 
      case "CHANGE-FILTER-TEXT":
        return {
          ...state,
          textinFilter: action.payload,
        };
    default:
      return state;
      console.log(state);
  }
};
export const modalHandler = createContext<any | undefined>(undefined);
const ModalContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  return (
    <modalHandler.Provider value={{ state, dispatch }}>
      {children}
    </modalHandler.Provider>
  );
};
export default ModalContextProvider;
