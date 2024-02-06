const { atom } = require("recoil");

const appointmnet = atom({
  key: "appointmnet",
  default: {
    id: 0,
    userId: 0,
    isPaid: false,
    username: "",
    documentNumber: "",
    customerId: 0,
    customerName: "",
    nationalCode: "",
    description: "",
    phoneNumber: "",
    date: "",
    time: ":",
    appointmentStatus: 0,
    factorId: 0,
  },
});

export { appointmnet };
