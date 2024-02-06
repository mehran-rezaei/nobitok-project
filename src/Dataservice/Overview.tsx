import axiosInstance from "./Configs/axiosInstance";

export function GetAppointmentWithPaymentDetailsByDate(StartDate: any, EndDate: any) {
  return axiosInstance
    .get(
      `/Appointment/GetAppointmentWithPaymentDetailsByDate?startDate=${StartDate}&endDate=${EndDate}`
    )
    .then((response) => response);
}
export function GetReportBySeasson(StartDate: any, EndDate: any, year:any) {
  return axiosInstance
    .get(
      `Appointment/GetReportBySeasonPersianDate?firstSeasen=${StartDate}&secondSeason=${EndDate}&yearDate=${`${year}%2F02%2F02`}`
    )
    .then((response) => response);
}
export function GetReportByDate(StartDate: any, EndDate: any) {
  return axiosInstance
    .get(
      `Appointment/GetAppointmentReporttt?startDate=${StartDate}&endDate=${EndDate}`
    )
    .then((response) => response);
}
export function GetReportChart(StartDate: any, EndDate: any) {
  return axiosInstance
    .get(
      `Appointment/GetWeeklyReportChart?startDate=${StartDate}&endDate=${EndDate}`
      // `Appointment/GetWeeklyReportChart?startDate=${StartDate}&endDate=${EndDate}`
    )
    .then((response) => response);
}
