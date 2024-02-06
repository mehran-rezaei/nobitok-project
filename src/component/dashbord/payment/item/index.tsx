import i18n from "@/i18next";
import { ListItem } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { NumericFormat } from "react-number-format";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function Item({ item, deleteitem, updateList }: any) {
  const [editing, setEditing]: any = useState(false);
  const [editPrice, setEditprice]: any = useState(item.paidAmount);
  const [date, setdate]: any = useState(item.date);
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = async (id: number) => {
    let res = await updateList(id, editPrice, item.paidAmount, date);
    if (res) {
      setEditing(false);
    }
  };
  return (
    <>
      {editing ? (
        <ListItem>
          <div className="w-full p-3 flex overflow-hidden border-black border-[2px] rounded-xl ">
            <div className=" flex justify-center items-center h-full">
              <NumericFormat
                displayType="input"
                className={`
            w-full px-2 h-full flex justify-start bg-blue-gray-50 rounded-md border-none`}
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                value={editPrice}
                onValueChange={(values) => {
                  const { value, floatValue } = values;
                  setEditprice(floatValue);
                }}
              />
            </div>
            <div className="flex items-center gap-3 ">
              <DatePicker
                inputClass="custom-input"
                value={date}
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                calendarPosition="bottom-right"
                onChange={(dateObject: any) => {
                  setdate(
                    `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`
                  );
                }}
              />
            </div>
            <div className="w-[30%]  flex justify-center items-center  h-full">
              {item.paymentType === "1" ? "پرداخت نقد" : "پرداخت کارت"}
            </div>
            <div className="text-white w-[20%]  flex justify-center gap-4 items-center h-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
                onClick={() => handleSaveClick(item.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-black"
                onClick={() => {
                  setEditing(false);
                  setEditprice(item.paidAmount);
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
        </ListItem>
      ) : (
        <ListItem>
          <div className="w-full p-3 flex overflow-hidden border-black border-[2px] rounded-xl ">
            <div className="w-[50%] flex justify-center items-center h-full">
              <NumericFormat
                displayType="text"
                className={`
          w-full px-2 h-full flex justify-start rounded-md border-none`}
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                value={item.paidAmount}
              />
              <div className="flex items-center gap-3 ">
                <DatePicker
                  inputClass="custom-input"
                  value={date}
                  disabled
                  calendar={i18n.language == "fa" ? persian : undefined}
                  locale={i18n.language == "fa" ? persian_fa : undefined}
                  calendarPosition="bottom-right"
                  onChange={(dateObject: any) => {
                    setdate(
                      `${dateObject.year}/${dateObject.month.number}/${dateObject.day}`
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-[30%] paymentType flex justify-center items-center  h-full">
              {item.paymentType === "1" ? "پرداخت نقد" : "پرداخت کارت"}
            </div>
            <div className="text-white w-[20%]  flex justify-center gap-4 items-center h-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
                onClick={handleEditClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
                onClick={() => deleteitem(item)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        </ListItem>
      )}
    </>
  );
}

export default Item;
