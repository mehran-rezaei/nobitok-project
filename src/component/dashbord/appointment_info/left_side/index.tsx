import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";

function Left_side(props: any) {
  const {
    searchResults,
    state,
    handleOpen1,
    handleOpen,
    deleteitem,
    data,
    sum,
  } = props;
  const { t, i18n } = useTranslation();
  return (
    <div className="w-2/4  p-2">
        <div className="h-full border-[1px] rounded-md border-[#000000] flex items-center  flex-col">
          <div className="flex justify-around items-center w-full  h-[10%]">
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

          {!!searchResults && searchResults.length != 0 ? (
            <div className="w-full h-[90%] flex items-center flex-col">
              <div className="w-full h-[80%] overflow-x-scroll">
                {searchResults.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex justify-around items-center w-full  h-[30%]"
                  >
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
                    <div className="w-[30%] text-sm text-center">
                      {/* <p
                        // onInput={(e) =>
                        //   handleChange(e, item.serviceId)
                        // }
                        className="text-sm text-center"
                        // contentEditable={true}
                      >
                        {item.price}
                      </p> */}
                      <NumericFormat
                        displayType="text"
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                        value={item.price}
                      />
                    </div>

                    <div
                      className={`${
                        state.handleEdit === true ? null : "text-red-800"
                      }  w-[10%]`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className=" w-6 h-6"
                        onClick={() => {
                          state.handleEdit === true ? null : deleteitem(item);
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
                ))}
              </div>
              <div className="flex flex-col items-center w-full h-[20%]">
                <div className="w-[90%] bg-black h-[.5px]"></div>
                <div className="w-full h-[90%] flex justify-between items-center">
                  <div className="w-[20%] flex items-center justify-center">
                    <div
                      onClick={() => {
                        !!state.handleEdit ? handleOpen1() : handleOpen();
                      }}
                      className="p-2 bg-[#3A4EFF] rounded-md"
                    >
                      <p className="text-xs text-white">
                        {!!state.handleEdit
                          ? t("show_factor")
                          : t("addservice")}
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-[20%] flex items-center justify-center">
                  <div className="p-2 bg-[#3A4EFF] rounded-md">
                    <p className="text-xs text-white">
                      {t("show_factor")}
                    </p>
                  </div>
                </div> */}
                  <div className="w-[50%] text-sm flex justify-around">
                    <p className="">{t("allprice")}:</p>
                    <NumericFormat
                      displayType="text"
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      value={sum}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col  justify-center items-center">
              <div
                className={` ${
                  data.id == 0 && !!state.handleEdit
                    ? "cursor-default"
                    : "cursor-pointer"
                } px-3 py-2 rounded-md bg-[#3A4EFF]`}
              >
                <div
                  className="text-white"
                  onClick={() => {
                    !!state.handleEdit ? null : handleOpen();
                  }}
                >
                  {!!state.handleEdit ? (
                    <p>{t("service_not_find")} !</p>
                  ) : (
                    <p> {t("addservice")}</p>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Left_side;
