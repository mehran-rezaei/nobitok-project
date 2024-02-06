import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AutoComplete, Input, InputNumber, Space } from "antd";
import {
  GetServiceGroup,
  SearchService,
  getAllServices,
  getFactorItemWithAllServices,
} from "@/Dataservice/DashbordProvider";
import { useEffect, useState } from "react";
const { Search } = Input;
import { notify } from "@/helper/toust";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { service_list } from "../../../../atoms/service_list";
import { appointmnet } from "../../../../atoms/appointment";
import Changing_price from "../changeprice";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { MenuItem, Select } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  // p: 4,
};

function Service_modal(props: any) {
  const { t, i18n } = useTranslation();
  const { service, setservice } = props;
  const [Selectedservice, setSelectedservice]: any = useState([]);
  const [Allservice, setAllservice]: any = useState();
  const [Category, setcategory]: any = useState();
  const [selectCategory, setselectCategory]: any = useState(0);
  const [data, setdata] = useRecoilState<any>(appointmnet);
  ///////////////////////////////////////////////////////////
  const onChange = async (event: any, id: any) => {
    const newState = Allservice.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, qty: event };
      }
      return obj;
    });
    await setAllservice(newState);
    if (!!Selectedservice) {
      let x = await Selectedservice.some(function (ele: any) {
        return ele.serviceId === id;
      });
      if (x) {
        const newdata = Selectedservice.map((obj: any) => {
          if (obj.serviceId === id) {
            return { ...obj, quantity: event };
          }
          return obj;
        });
        await setSelectedservice(newdata);
      }
    }
  };

  //////////////////////////////////////////////////////////
  // const [services, setservices] = useRecoilState<any>(service_list);
  //////////////////////////////////////////////////////////
  React.useEffect(() => {
    getAllServices()
      .then((data) => {
        setAllservice(data.data.dataList);
        if (data.data.isSuccess) {
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch(() => notify("error", `${t("error")}`));
    GetServiceGroup()
      .then((data) => {
        setcategory(data.data.dataList);
        if (data.data.isSuccess) {
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch(() => notify("error", `${t("error")}`));
  }, []);
  //////////////////////////////////////////////////////////
  const [selectitem, setselectitem] = useState(false);
  //////////////////////////////////////////////////////////
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  //////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////
  const checked = (val: any) => {
    let x = false;
    if (!!Selectedservice)
      Selectedservice.map((item: any) =>
        item.serviceId === val ? (x = true) : null
      );
    return x;
  };
  ///////////////////////////////////////////////////
  const handleChange = async (item: any) => {
    let x = await Selectedservice.some(function (ele: any) {
      return ele.serviceId === item.id;
    });

    if (x) {
      if (!!Selectedservice) {
        const updated = await Selectedservice.filter(
          (item1: any) => item1.serviceId !== item.id
        );
        await setSelectedservice(updated);
      }
    } else {
      const temp = {
        name: item.name,
        quantity: item.qty,
        servicePercentageId:
          item.servicePercentageId != 0 ? item.servicePercentageId : 0,
        serviceId: item.id,
        price: item.price,
        description: "string",
      };
      // console.log(`temp : ${JSON.stringify(temp)}`);
      await setSelectedservice([...Selectedservice, temp]);
    }
  };
  useEffect(() => {
    // console.log(`here : ${JSON.stringify(Selectedservice)}`);
  }, [Selectedservice]);

  //////////////////////////////////////////////////////////////////////
  const submit = () => {
    if (Selectedservice.length == 0) {
      notify("error", "Select atleast one item");
    } else {
      let final = [];
      // console.log(`Selectedservice1 : ${JSON.stringify(Selectedservice)}`);
      // console.log(`service1 : ${JSON.stringify(service)}`);
      let temp1 = Selectedservice;
      let temp2 = service;
      if (!!temp2 && temp2.length != 0) {
        for (let index = 0; index < temp2.length; index++) {
          if (!!temp2[index].serviceId) {
            var result = temp1.find(
              (item: any) =>
                temp2[index].serviceId === item.serviceId &&
                temp2[index].price === item.price
            );
            if (!!result) {
              const y = {
                name: result.name,
                quantity: result.quantity + temp2[index].quantity,
                servicePercentageId: result.servicePercentageId,
                serviceId: result.serviceId,
                price: result.price,
                description: "string",
              };
              final.push(y);
              let num1 = temp1.findIndex(
                (item: any) => item.serviceId === result.serviceId
              );
              let num2 = temp2.findIndex(
                (item: any) => item.serviceId === result.serviceId
              );
              temp1[num1] = {};
              temp2[num2] = {};
            } else {
              const y = {
                name: !!temp2[index].serviceName
                  ? temp2[index].serviceName
                  : temp2[index].name,
                quantity: temp2[index].quantity,
                servicePercentageId: temp2[index].servicePercentageId,
                serviceId: temp2[index].serviceId,
                price: temp2[index].price,
                description: "string",
              };
              final.push(y);
              let num1 = temp2.findIndex(
                (item: any) => item.serviceId === temp2[index].serviceId
              );
              temp2[num1] = {};
            }
          }
        }
      }
      if (!!temp1 && temp1.length != 0) {
        for (let index = 0; index < temp1.length; index++) {
          if (!!temp1[index].serviceId) {
            const y = {
              name: temp1[index].name,
              quantity: temp1[index].quantity,
              servicePercentageId: temp1[index].servicePercentageId,
              serviceId: temp1[index].serviceId,
              price: temp1[index].price,
              description: "string",
            };
            let num1 = temp1.findIndex(
              (item: any) => item.serviceId === temp1[index].serviceId
            );
            temp1[num1] = {};
            final.push(y);
          }
        }
      }
      // console.log(`final result: ${JSON.stringify(final)}`);
      setservice(final);
      props.handleClose();
    }
  };

  //////////////////////////////////////////////////////////////////////
  const handleChangedropdown = (event: any) => {
    setselectCategory(event.target.value);
  };
  //////////////////////////////////////////////////////////////////////
  const [initdata, setinitdata] = useState<any>();
  const fetchinit = async (name: any) => {
    await SearchService(name)
      .then((data) => {
        setinitdata(data.data.dataList);
        if (data.data.isSuccess) {
        } else {
          notify("error", `${data.data.message}`);
        }
      })
      .catch(() => notify("error", `${t("error")}`));
    setOpen1(true);
  };
  ////////////////////////////////////////////////////
  const { open, handleOpen, handleClose } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center items-center w-full h-[15%] ">
            {/* <div className="w-[90%]">
              <AutoComplete style={{ width: "100%" }} placeholder="Search" />
            </div> */}
            <Select
              size="small"
              sx={{ width: "50%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectCategory}
              // label="دسته بندی"
              onChange={handleChangedropdown}
            >
              <MenuItem value={0}>همه</MenuItem>
              {!!Category && Category.length != 0
                ? Category.map((item: any) => (
                    <MenuItem value={item.id}>{item.groupName}</MenuItem>
                  ))
                : null}
            </Select>
          </div>
          <div className="w-full h-[75%] flex justify-center overflow-y-scroll">
            <div className="w-[90%]  h-[100%] ">
              <div className="h-[10%] sticky w-full text-sm flex items-center justify-center">
                <div className="w-[5%] text-center"><p>{t("No")}.</p></div>
                <div className="w-[25%] text-center">
                  <p>{t("name")}</p>
                </div>
                <div className="w-[25%] text-center">
                  <p>{t("price")} </p>
                </div>
                <div className="w-[10%] text-center">
                  <p>{t("select")}</p>
                </div>
                <div className="w-[10%] text-center">
                  <p>{t("number")}</p>
                </div>
                <div className="w-[25%] text-center">
                  <p> {t("change_price")}</p>
                </div>
              </div>
              {!!Allservice
                ? Allservice.map((item: any, index: any) =>
                    item.serviceCategoryId === selectCategory ? (
                      <div
                        key={index}
                        className="h-[10%] w-full text-xs flex items-center justify-center"
                      >
                        <div className="w-[5%] text-center">{index + 1}</div>
                        <div className="w-[25%] overflow-x-scrolll text-center">
                          <p>{item.name}</p>
                        </div>
                        <div className="w-[25%] text-center">
                          <NumericFormat
                            displayType="text"
                            thousandsGroupStyle="thousand"
                            thousandSeparator=","
                            value={item.price}
                          />
                        </div>
                        <div className="w-[10%] text-center">
                          <Checkbox
                            {...label}
                            checked={checked(item.id)}
                            onChange={(event) => {
                              handleChange(item);
                            }}
                          />
                        </div>
                        <div className="w-[10%] text-center">
                          {/* <p>{item.qty}</p> */}
                          <InputNumber
                            // disabled={checked(item.id)}
                            min={1}
                            max={10}
                            defaultValue={item.qty}
                            onChange={(event) => {
                              onChange(event, item.id);
                            }}
                          />
                        </div>
                        <div
                          className={`w-[25%] text-center flex justify-center`}
                        >
                          <p
                            onClick={() => {
                              {
                                item.priceType == 0
                                  ? // || checked(item.id)
                                    null
                                  : (setselectitem(item), fetchinit(item.name));
                              }
                            }}
                            className={`${
                              item.priceType == 0
                                ? // || checked(item.id)
                                  "opacity-30 cursor-not-allowed"
                                : "cursor-pointer"
                            } border-[2px] rounded-md border-[#3A4EFF] px-6  py-1 w-fit`}
                          >
                            {t("change_price")}
                          </p>
                        </div>
                      </div>
                    ) : selectCategory === 0 ? (
                      <div
                        key={index}
                        className="h-[10%] w-full text-xs flex items-center justify-center"
                      >
                        <div className="w-[5%] text-center">{index + 1}</div>
                        <div className="w-[25%] overflow-x-scrolll text-center">
                          <p>{item.name}</p>
                        </div>
                        <div className="w-[25%] text-center">
                          <NumericFormat
                            displayType="text"
                            thousandsGroupStyle="thousand"
                            thousandSeparator=","
                            value={item.price}
                          />
                        </div>
                        <div className="w-[10%] text-center">
                          <Checkbox
                            {...label}
                            checked={checked(item.id)}
                            onChange={(event) => {
                              handleChange(item);
                            }}
                          />
                        </div>
                        <div className="w-[10%] text-center">
                          {/* <p>{item.qty}</p> */}
                          <InputNumber
                            // disabled={checked(item.id)}
                            min={1}
                            max={10}
                            defaultValue={item.qty}
                            onChange={(event) => {
                              onChange(event, item.id);
                            }}
                          />
                        </div>
                        <div
                          className={`w-[25%] text-center flex justify-center`}
                        >
                          <p
                            onClick={() => {
                              {
                                item.priceType == 0
                                  ? // || checked(item.id)
                                    null
                                  : (setselectitem(item), fetchinit(item.name));
                              }
                            }}
                            className={`${
                              item.priceType == 0
                                ? // || checked(item.id)
                                  "opacity-30 cursor-not-allowed"
                                : "cursor-pointer"
                            } border-[2px] rounded-md border-[#3A4EFF] px-6  py-1 w-fit`}
                          >
                            {t("change_price")}
                          </p>
                        </div>
                      </div>
                    ) : null
                  )
                : null}
              <div></div>
            </div>
          </div>

          <div className="w-full h-[10%]  flex justify-center items-center gap-20 text-sm">
            <div
              onClick={submit}
              className="py-2  px-10 text-white rounded-md bg-[#2CFF74] cursor-pointer"
            >
              {t("submit")}
            </div>
            <div
              onClick={handleClose}
              className="py-2 px-10 text-white rounded-md bg-[#FF5757] cursor-pointer"
            >
              {t("cancel")}
            </div>
          </div>
          {open1 ? (
            <Changing_price
              setSelectedservice={setSelectedservice}
              Selectedservice={Selectedservice}
              initdata={initdata}
              Allservice={Allservice}
              setAllservice={setAllservice}
              data={selectitem}
              open={open1}
              handleOpen={handleOpen1}
              handleClose={handleClose1}
            />
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}

export default Service_modal;
