import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";

function Left_side(props: any) {
  const { t, i18n } = useTranslation();

  const deleteitem = (id: any) => {
    let temp = props.service;
    props.setservice(props.service.filter((a: any) => a.serviceId !== id));
    console.log(props.service);
  };

  const [sum, setsum] = useState(0);
  useEffect(() => {
    let x: any = 0;
    console.log(props.service);
    if (!!props.service && props.service.length != 0) {
      props.service.map((item: any) => {
        x = x + item.price * item.quantity;
      });
    }
    setsum(x);
  }, [props.service]);

  return (
    <div className="w-2/4  p-2">
      <div className=" h-full flex flex-col gap-2">
        <div className="h-full border-[1px] rounded-md border-[#000000] flex items-center  flex-col">
          <div className="flex justify-around items-center w-full p-1 h-[10%]">
            <div className=" w-[10%]">
              <p className="text-xs text-center">{t("No")}</p>
            </div>
            <div className="w-[30%]">
              <p className="text-xs text-center">{t("name")}</p>
            </div>
            <div className="w-[20%]">
              <p className="text-xs text-center">{t("number")} </p>
            </div>
            <div className="w-[30%]">
              <p className="text-xs text-center">{t("price")}</p>
            </div>

            <div className="w-[10%]"></div>
          </div>

          {!!props.service && props.service.length != 0 ? (
            <div className="w-full h-[90%] flex items-center flex-col">
              <div className="w-full h-[80%] overflow-x-scroll">
                {props.service.map((item: any, index: any) => (
                  <>
                    <div className="flex justify-around items-center w-full p-1 h-[30%]">
                      <div className=" w-[10%]">
                        <p className="text-sm text-center">{index + 1}</p>
                      </div>
                      <div className="w-[30%]">
                        <p className="text-sm text-center">
                          {!!item.name ? item.name : item.serviceName}
                        </p>
                      </div>
                      <div className="w-[20%]">
                        <p className="text-sm text-center">{item.quantity}</p>
                      </div>
                      <div className="w-[30%]">
                        <p
                          // onInput={(e) =>
                          //   handleChange(e, item.serviceId)
                          // }
                          className="overflow-x-scroll text-sm text-center"
                          // contentEditable={true}
                        >
                          {/* {item.price} */}
                          <NumericFormat
                            displayType="text"
                            thousandsGroupStyle="thousand"
                            thousandSeparator=","
                            value={item.price}
                          />
                        </p>
                      </div>

                      <div
                        className='
                            
                             "text-red-800"
                            w-[10%]'
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className=" w-6 h-6"
                          onClick={() => {
                            deleteitem(item.serviceId);
                          }}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="flex flex-col items-center w-full h-[20%]">
                <div className="w-[90%] bg-black h-[.5px]"></div>
                <div className="w-full h-[90%] flex justify-between items-center">
                  <div className="w-[20%] flex items-center justify-center">
                    <div
                      onClick={() => {
                        props.handleOpen();
                      }}
                      className="p-2 bg-[#3A4EFF] rounded-md"
                    >
                      <p className="text-xs text-white">{t("addservice")}</p>
                    </div>
                  </div>
                  <div className="w-[20%] flex items-center justify-center">
                    {/* <div className="p-2 bg-[#3A4EFF] rounded-md">
                      <p className="text-xs text-white"> {t("show_factor")}</p>
                    </div> */}
                  </div>
                  <div className="w-[50%] flex justify-around">
                    <p className="text-sm">{t("allprice")}:</p>
                    <p className="text-sm">
                      <NumericFormat
                        displayType="text"
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                        value={sum}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className=" cursor-pointer px-3 py-2 rounded-md bg-[#3A4EFF]">
                <p
                  className="text-white"
                  onClick={() => {
                    props.handleOpen();
                  }}
                >
                  <p>{t("addservice")}</p>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Left_side;
