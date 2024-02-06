const { atom } = require("recoil");

const PageSize = atom({
  key: "page_Size",
  default: 10,
});

export { PageSize };
