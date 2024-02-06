const { atom } = require("recoil");

const document_data = atom({
  key: "document_data",
  default: {},
});

export { document_data };
