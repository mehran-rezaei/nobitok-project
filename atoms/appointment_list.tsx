const { atom } = require("recoil");

const appointment_list = atom({
  key: "appointmentlist",
  default: []
});

export { appointment_list };