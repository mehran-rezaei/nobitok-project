import axiosInstance from "./Configs/axiosInstance";

export function getAllPreAppointments(PageNumber: any, PageSize: any) {
  return axiosInstance
    .get(
      `Appointment/getAllPreAppointments?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}
export function getAllTodayAppointments(PageNumber: any, PageSize: any) {
  return axiosInstance
    .get(
      `/Appointment/getAllTodayAppointments?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}
export function getAllCustomers(PageNumber: any, PageSize: any) {
  return axiosInstance
    .get(
      `/Customer/getAllCustomers?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}

//پرداختی ها
// export function getAllCustomers() {
//   return axiosInstance
//     .get(`/Customer/getAllCustomers`)
//     .then((response) => response);
// }
export function addAppointment(data: any) {
  return axiosInstance
    .post(`/Appointment/addAppointment`, data)
    .then((response) => response);
}
export function editAppointment(data: any) {
  return axiosInstance
    .post(`/Appointment/editAppointment`, data)
    .then((response) => response);
}
export function GetFactorItems(data: any) {
  return axiosInstance
    .get(`/FactorItem/GetFactorItems?FactorID=${data}`)
    .then((response) => response);
}

// userInfo
export function getUserInfo() {
  return axiosInstance.get(`/Account/getUserInfo`).then((response) => response);
}
export function getAllServices() {
  return axiosInstance
    .get("/Service/getAllServices")
    .then((response) => response);
}
export function getFactorItemWithAllServices(data: any) {
  return axiosInstance
    .get(`/Factor/getFactorItemWithAllServices?FactorId=${data}`)
    .then((response) => response);
}
export function GetServiceGroup() {
  return axiosInstance
    .get(`ServiceGroup/GetServiceGroup`)
    .then((response) => response);
}
export function SearchService(data: any) {
  return axiosInstance
    .get(`/Service/SearchService?searchValue=${data}`)
    .then((response) => response);
}
export function getCustomerAppointments(data: any) {
  return axiosInstance
    .get(`/Appointment/getCustomerAppointments?CustomerId=${data}`)
    .then((response) => response);
}
export function editFactor(data: any) {
  return axiosInstance
    .post(`/Factor/editFactor`, data)
    .then((response) => response);
}

export function SearchCustomer(data: any) {
  return axiosInstance
    .get(`/Customer/SearchCustomer?searchValue=${data}`)
    .then((response) => response);
}
export function editCustomer(data: any) {
  return axiosInstance
    .post(`/Customer/editCustomer`, data)
    .then((response) => response);
}

export function addCustomer(data: any) {
  return axiosInstance
    .post(`/Customer/addCustomer`, data)
    .then((response) => response);
}
export function getTomorrowPreAppointments() {
  return axiosInstance
    .get(`/Appointment/getTomorrowPreAppointments`)
    .then((response) => response);
}

export function addAppointmentFromPreAppointment(data: any) {
  return axiosInstance
    .post(`/Appointment/addAppointmentFromPreAppointment`, data)
    .then((response) => response);
}
export function deleteAppointment(data: any) {
  return axiosInstance
    .delete(`/Appointment/deleteAppointment?Id=${data}`)
    .then((response) => response);
}
export function deleteFactor(data: any) {
  return axiosInstance
    .delete(`/Factor/deleteFactor?Id=${data}`)
    .then((response) => response);
}
export function getNotfication() {
  return axiosInstance
    .get(`/BroadCastCenter/getNotfication`)
    .then((response) => response);
}
export function MarkFactorAsPaid(data: any) {
  return axiosInstance
    .get(`/Factor/MarkFactorAsPaid?FactorId=${data}`)
    .then((response) => response);
}
//
export function getPreAppointmentsByDate(
  startData: any,
  endDate: any,
  PageNumber: any,
  PageSize: any
) {
  return axiosInstance
    .get(
      `/Appointment/getPreAppointmentsByDate?StartDate=${startData}&EndDate=${endDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}
export function getAppointmentsByDate(
  startData: any,
  endDate: any,
  PageNumber: any,
  PageSize: any
) {
  return axiosInstance
    .get(
      `/Appointment/getAppointmentsByDate?StartDate=${startData}&EndDate=${endDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}
export function getAllCompletedAppointments() {
  return axiosInstance
    .get("/Appointment/getTodayCompletedAppointments")
    .then((response) => response);
}
export function getCompletedAppointmentsByDate(
  startData: any,
  endDate: any,
  PageNumber: any,
  PageSize: any
) {
  return axiosInstance
    .get(
      `/Appointment/getCompletedAppointmentsByDate?StartDate=${startData}&EndDate=${endDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}
export function GetFactorById(data: any) {
  return axiosInstance
    .get(`/Factor/getFactorById?Id=${data}`)
    .then((response) => response);
}
export function AddDocument(data: any) {
  return axiosInstance
    .post(`/Document/AddDocument`, data)
    .then((response) => response);
}
export function EditDocument(data: any) {
  return axiosInstance
    .post(`/Document/EditDocument`, data)
    .then((response) => response);
}

export function GetDocumentByCustomerId(data: any) {
  return axiosInstance
    .get(`/Document/GetDocumentByCustomerId?customerId=${data}`)
    .then((response) => response);
}
export function AddPayment(Factorid: any, data: any) {
  return axiosInstance
    .post(`/Payment/AddPayment?FactorId=${Factorid}`, data)
    .then((response) => response);
}
export function GetCustomerServiceHistory(data: any) {
  return axiosInstance
    .get(`/Customer/getCustomerServiceHistory?phoneNumber=${data}`)
    .then((response) => response);
}

export function GetAllAppppp() {
  return axiosInstance
    .get(`/Appointment/GetAppointmentWithPaymentDetailsByDate`)
    .then((response) => response);
}

export function GetPaymentsByDate(
  startData: any,
  endDate: any,
  PageNumber: any,
  PageSize: any
) {
  return axiosInstance
    .get(
      `/Payment/GetPaymentsByDate?StartDate=${startData}&EndDate=${endDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    .then((response) => response);
}
export function AddEndOfDay(data: any) {
  return axiosInstance
    .post(`/EndOfDays/AddEndOfDay`, data)
    .then((response) => response);
}
export function GetAllEndofDay(startData: any, endDate: any) {
  return axiosInstance
    .get(`/EndOfDays/GetAllEndofDay?StartDate=${startData}&EndDate=${endDate}`)
    .then((response) => response);
}

export function MarkAppointmentAsCancelled(data: any) {
  return axiosInstance
    .post(`/Appointment/MarkAppointmentAsCancelled`, data)
    .then((response) => response);
}
export function GetPaymentWithDetailsByFactorId(data: any) {
  return axiosInstance
    .get(`/Payment/GetPaymentWithDetailsByFactorId?Id=${data}`)
    .then((response) => response);
}
export function SearchCustomer_(data: any) {
  return axiosInstance
    .get(`/Customer/SearchCustomer?searchValue=${data}`)
    .then((response) => response);
}
