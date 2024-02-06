import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTranslation } from "react-i18next";
import { AutoComplete, Dropdown, Input, InputNumber, Menu, Space } from "antd";
import { SearchService, getAllServices } from "@/Dataservice/DashbordProvider";
import { NumericFormat } from "react-number-format";
import { confirmAlert } from "react-confirm-alert";
import _Dialog from "@/component/material/dialog";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "65%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Changing_price(props: any) {
  const { t, i18n } = useTranslation();

  const {
    data,
    open,
    handleOpen,
    handleClose,
    setAllservice,
    Allservice,
    setSelectedservice,
    Selectedservice,
  } = props;
  console.log(data);
  const [value, setValue] = React.useState(0);
  const [newPrice, setnewPrice] = React.useState({
    value: props.initdata[0].price,
    percentid: 0,
  });
  const [firstload, setfirstload] = useState(true);
  const handleChange = (event: any) => {
    setValue(event.target.value);
    setnewPrice({ value: props.initdata[0].price, percentid: 0 });
  };
  ///////////////////////////////////////////////////////////////
  const [Opendialog, setOpendialog] = React.useState(false);
  const handleOpenDialog = () => {
    setOpendialog(true);
  };
  const handleCloseDialog = () => {
    setOpendialog(false);
  };
  ///////////////////////////////////////////////////////////////
  const onSubmit = async () => {
    console.log(typeof data.maxPrice, newPrice.value);

    if (newPrice.value > data.maxPrice || newPrice.value < data.minPrice) {
      handleOpenDialog();
    } else {
      let x = await Allservice;
      console.log(Allservice);

      x.map((item: any) =>
        item.id === data.id
          ? ((item.price = newPrice.value),
            newPrice.percentid != 0
              ? (item.servicePercentageId = newPrice.percentid)
              : (item.servicePercentageId = 0))
          : null
      );
      setAllservice(x);
      /////////////////
      console.log(`Selectedservice3 : ${JSON.stringify(Selectedservice)}`);
      let y = await Selectedservice;
      y.map((item: any) =>
        item.serviceId === data.id
          ? ((item.price = newPrice.value),
            newPrice.percentid != 0
              ? (item.servicePercentageId = newPrice.percentid)
              : (item.servicePercentageId = 0))
          : null
      );
      console.log(`Selectedservice2 : ${JSON.stringify(y)}`);
      setSelectedservice(y);
      /////////////////

      handleClose();
    }
  };
  //////////////////////////////////////////////////////////////
  const onChange = (event: any) => {
    setnewPrice({ value: event.target.value, percentid: 0 });
  };
  ////////////////////////////////////////////////////////////////
  const [percent, setpercent] = React.useState();
  const handleChangepercent = (val: any) => {
    setpercent(val.id);

    let temp = props.initdata[0].price;
    setnewPrice({
      value:
        props.initdata[0].price -
        (props.initdata[0].price * val.percentage) / 100,
      percentid: val.id,
    });
  };
  ////////////////////////////////////////////////////////////////
  const handleChangepercent0 = () => {
    setnewPrice({
      value: props.initdata[0].price,
      percentid: 0,
    });
  };
  ////////////////////////////////////////////////////////////////
  return (
    <>
      {!!firstload ? (
        <>
          <Button onClick={handleOpen}>Open Child Modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={style} {...{ dir: "rtl" }}>
              {/* <div className="flex justify-center items-center w-full h-[15%] "></div> */}
              <div className="w-full h-[90%] flex flex-col gap-7">
                <div className="w-full">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      {t("pricing")}
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={`${t("max_min")}`}
                        value={0}
                      />
                      {/* <FormControlLabel
                        control={<Radio />}
                        label="Percent"
                        value={1}
                      /> */}
                    </RadioGroup>
                  </FormControl>
                </div>
                {value == 0 ? (
                  <div className="flex gap-10 flex-col">
                    <div className="flex gap-10 ">
                      <div>
                        {t("maximumprice")}:
                        <NumericFormat
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={data.maxPrice}
                        />
                      </div>
                      <div>
                        {t("minimumprice")}:
                        <NumericFormat
                          displayType="text"
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          value={data.minPrice}
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <p>{t("price")} :</p>
                      <NumericFormat
                        className="border-2 py-1 rounded-md px-[11px] w-[50%] border-[#6171FF]"
                        displayType="input"
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                        value={newPrice.value}
                        // onChange={(event) => {
                        //   onChange(event);
                        // }}
                        onValueChange={(values) => {
                          const { formattedValue, value, floatValue } = values;
                          // do something with floatValue
                          setnewPrice({ value: floatValue, percentid: 0 });
                        }}
                      />
                    </div>
                    {/* <InputNumber
                      min={data.minPrice}
                      max={data.maxPrice}
                      // defaultValue={}
                      value={newPrice.value}
                      onChange={(event) => {
                        onChange(event);
                      }}
                    /> */}
                  </div>
                ) : (
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={percent}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem
                          onClick={() => {
                            handleChangepercent0();
                          }}
                          value=""
                        >
                          <em>{t("none")}</em>
                        </MenuItem>
                        {data.pricePercentageLists
                          ? data.pricePercentageLists.map(
                              (item: any, index: number) => (
                                <MenuItem
                                  key={index}
                                  onClick={() => {
                                    handleChangepercent(item);
                                  }}
                                  value={item.id}
                                >
                                  {item.title} - ({item.percentage})
                                </MenuItem>
                              )
                            )
                          : null}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>

              <div className="w-full h-[10%]  flex justify-center items-center gap-20 text-sm">
                <div
                  onClick={onSubmit}
                  className="py-2 text-white px-10 rounded-md bg-[#2CFF74] cursor-pointer"
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
              {Opendialog === true ? (
                <_Dialog
                  open={Opendialog}
                  handleClose={handleCloseDialog}
                  description={" قیمت وارد شده در بازه مجاز نمی باشد"}
                  type={"alert"}
                />
              ) : null}
            </Box>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default Changing_price;
