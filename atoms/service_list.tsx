const { atom } = require("recoil");

const service_list = atom({
  key: "service_list",
  default: []
});

export { service_list };