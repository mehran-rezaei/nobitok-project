import { useContext, useReducer, createContext } from "react";
const initstate = {
  handletable: 1,
  selectrow: 0,
  handleEdit: true,
  handleEditparvnde: true,
  handeltab: 1,
  completedappointment: 0,
  firsttime: 1,
  seetomorrowpreapp: 0,
};
const _reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "can_Edit":
      return {
        ...state,
        handleEdit: false,
      };
    case "cant_Edit":
      return {
        ...state,
        handleEdit: true,
      };
    case "rev_Edit":
      return {
        ...state,
        handleEdit: !state.handleEdit,
      };
    case "show_Appointment_info":
      return {
        ...state,
        handeltab: 1,
      };
    case "show_Nobat_dehi":
      return {
        ...state,
        handeltab: 2,
      };
    case "show_Parvande_ha":
      return {
        ...state,
        handeltab: 3,
      };
    case "show_Parvande_jadid":
      return {
        ...state,
        handeltab: 4,
      };
    case "can_Edit_parvande":
      return {
        ...state,
        handleEditparvnde: false,
      };
    case "cant_Edit_parvande":
      return {
        ...state,
        handleEditparvnde: true,
      };
    case "rev_Edit_parvande":
      return {
        ...state,
        handleEditparvnde: !state.handleEditparvnde,
      };
    case "select_appo":
      return {
        ...state,
        seetomorrowpreapp: 0,
        handletable: 1,
        handleEdit: true,
        handeltab: 1,
      };
    case "select_preappo":
      return {
        ...state,
        seetomorrowpreapp: 0,
        handletable: 2,
        handleEdit: true,
        handeltab: 1,
      };
    case "select_doc":
      return {
        ...state,
        seetomorrowpreapp: 0,
        handletable: 3,
        handeltab: 4,
      };
    case "select_pay":
      return {
        ...state,
        seetomorrowpreapp: 0,
        handletable: 4,
      };
    case "unselect_row":
      return {
        ...state,
        selectrow: 0,
      };
    case "select_row":
      return {
        ...state,
        selectrow: action.payload,
      };
    case "set_completedappointment_true":
      return {
        ...state,
        completedappointment: 1,
      };
    case "set_completedappointment_false":
      return {
        ...state,
        completedappointment: 0,
      };
    case "set_firsttime":
      return {
        ...state,
        firsttime: 0,
      };
    case "set_seetomorrowpreapp":
      return {
        ...state,
        handletable: 2,
        handleEdit: true,
        handeltab: 1,
        seetomorrowpreapp: 1,
      };
    case "unset_seetomorrowpreapp":
      return {
        ...state,
        seetomorrowpreapp: 0,
      };

    default:
      return state;
  }
};
export const appflow_Handller = createContext<any | undefined>(undefined);
const AppflowContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(_reducer, initstate);
  return (
    <appflow_Handller.Provider value={{ state, dispatch }}>
      {children}
    </appflow_Handller.Provider>
  );
};
export default AppflowContextProvider;
