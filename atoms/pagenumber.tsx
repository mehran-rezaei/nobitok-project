const { atom } = require("recoil");

const Pagenumber = atom({
  key: "page_number",
  default: 1,
});

export { Pagenumber };
