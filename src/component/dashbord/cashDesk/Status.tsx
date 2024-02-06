import { GetAllEndofDay } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helper/toust";
import { Button, Table } from "antd";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const columns: any = [
  {
    title: "تاریخ",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "موجودی نقد سیستم ",
    dataIndex: "predictedCash",
    key: "predictedCash",
    render: (predictedCash: any) => {
      return (
        <span>
          <NumericFormat
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            value={predictedCash}
          />
        </span>
      );
    },
  },
  {
    title: "موجودی اعتباری سیستم",
    dataIndex: "predictedCredit",
    key: "predictedCredit",
    render: (predictedCredit: any) => {
      return (
        <span>
          <NumericFormat
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            value={predictedCredit}
          />
        </span>
      );
    },
  },
  {
    title: "موجودی اعتباری صندوق",
    dataIndex: "actualCredit",
    key: "actualCredit",
    render: (actualCredit: any) => {
      return (
        <span>
          <NumericFormat
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            value={actualCredit}
          />
        </span>
      );
    },
  },
  {
    title: "موجودی نقد صندوق",
    dataIndex: "actualCash",
    key: "actualCash",
    render: (actualCash: any) => {
      return (
        <span>
          <NumericFormat
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            value={actualCash}
          />
        </span>
      );
    },
  },
  {
    title: "اختلاف اعتباری ",
    dataIndex: "deficitCredit",
    key: "deficitCredit",
    render: (deficitCredit: any) => {
      const absoluteValue = Math.abs(deficitCredit);
      const textColor =
        deficitCredit < 0 ? "green" : deficitCredit > 0 ? "red" : "black";
      return (
        <span style={{ color: textColor }}>
          <NumericFormat
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            value={absoluteValue}
          />
        </span>
      );
    },
  },
  {
    title: "اختلاف نقدی ",
    dataIndex: "deficitCash",
    key: "deficitCash",
    render: (deficitCash: any) => {
      const absoluteValue = Math.abs(deficitCash);
      const textColor =
        deficitCash < 0 ? "green" : deficitCash > 0 ? "red" : "black";
      return (
        <span style={{ color: textColor }}>
          <NumericFormat
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            value={absoluteValue}
          />
        </span>
      );
    },
  },
];

const Status = (props: any) => {
  const [Data, setData]: any = useState([]);
  useEffect(() => {
    if (props.values === "") {
      GetAllEndofDay("", "")
        .then((Response) => {
          if (Response.data.isSuccess) {
            setData(Response.data.dataList);
          } else {
            notify("error", `${Response.data.message}`);
          }
        })
        .catch((error) => notify("erorr", `${t("error")}`));
    } else if (props.values.length === 1) {
      GetAllEndofDay(
        `${props.values[0].year}/${props.values[0].month.number}/${props.values[0].day}`,
        `${props.values[0].year}/${props.values[0].month.number}/${props.values[0].day}`
      )
        .then((Response) => {
          if (Response.data.isSuccess) {
            setData(Response.data.dataList);
          } else {
            notify("error", `${Response.data.message}`);
          }
        })
        .catch((error) => notify("erorr", `${t("error")}`));
    } else if (props.values.length === 2) {
      GetAllEndofDay(
        `${props.values[0].year}/${props.values[0].month.number}/${props.values[0].day}`,
        `${props.values[1].year}/${props.values[1].month.number}/${props.values[1].day}`
      )
        .then((Response) => {
          if (Response.data.isSuccess) {
            setData(Response.data.dataList);
          } else {
            notify("error", `${Response.data.message}`);
          }
        })
        .catch((error) => notify("erorr", `${t("error")}`));
    }
  }, [props.values]);
  const sumdeficitCredit = () => {
    let sum = 0;
    Data.map((item: any) => {
      sum = item.deficitCredit + sum;
    });
    const absoluteValue = Math.abs(sum);
    const textColor = sum < 0 ? "green" : sum > 0 ? "red" : "black";
    return (
      <span style={{ color: textColor }}>
        <NumericFormat
          displayType="text"
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          value={absoluteValue}
        />
      </span>
    );
  };
  const sumactualCash = () => {
    let sum = 0;
    Data.map((item: any) => {
      sum = item.deficitCash + sum;
    });
    const absoluteValue = Math.abs(sum);
    const textColor = sum < 0 ? "green" : sum > 0 ? "red" : "black";
    return (
      <span style={{ color: textColor }}>
        <NumericFormat
          displayType="text"
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          value={absoluteValue}
        />
      </span>
    );
  };
  const actualCash = () => {
    let sum = 0;
    Data.map((item: any) => {
      sum = item.actualCash + sum;
    });
    const absoluteValue = Math.abs(sum);
    // const textColor = sum > 0 ? "green" : sum < 0 ? "red" : "black";
    return (
      <span style={{ color: "black" }}>
        <NumericFormat
          displayType="text"
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          value={absoluteValue}
        />
      </span>
    );
  };
  const actualCredit = () => {
    let sum = 0;
    Data.map((item: any) => {
      sum = item.actualCredit + sum;
    });
    const absoluteValue = Math.abs(sum);
    // const textColor = sum > 0 ? "green" : sum < 0 ? "red" : "black";
    return (
      <span style={{ color: "black" }}>
        <NumericFormat
          displayType="text"
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          value={absoluteValue}
        />
      </span>
    );
  };
  const predictedCredit = () => {
    let sum = 0;
    Data.map((item: any) => {
      sum = item.predictedCredit + sum;
    });
    const absoluteValue = Math.abs(sum);
    // const textColor = sum > 0 ? "green" : sum < 0 ? "red" : "black";
    return (
      <span style={{ color: "black" }}>
        <NumericFormat
          displayType="text"
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          value={absoluteValue}
        />
      </span>
    );
  };
  const predictedCash = () => {
    let sum = 0;
    Data.map((item: any) => {
      sum = item.predictedCash + sum;
    });
    const absoluteValue = Math.abs(sum);
    // const textColor = sum > 0 ? "green" : sum < 0 ? "red" : "black";
    return (
      <span style={{ color: "black" }}>
        <NumericFormat
          displayType="text"
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          value={absoluteValue}
        />
      </span>
    );
  };

  return (
    <div className="px-10 pt-10 h-[75vh] flex flex-col justify-between items-center overflow-scroll">
      <Table
        pagination={false}
        className="text-sm"
        columns={columns}
        dataSource={Data}
        footer={() => (
          <div className="grid grid-cols-7 w-full">
            <div className="col-span-1">جمع</div>
            <div className=" pr-1 col-span-1">
              {/* <p>جمع اعتباری</p> */}
              <p>{predictedCash()}</p>
            </div>
            <div className=" pr-2 col-span-1">
              {/* <p>جمع اعتباری</p> */}
              <p>{predictedCredit()}</p>
            </div>
            <div className=" pr-2 col-span-1">
              {/* <p>جمع اعتباری</p> */}
              <p>{actualCredit()}</p>
            </div>
            <div className=" pr-4 col-span-1">
              {/* <p>جمع اعتباری</p> */}
              <p>{actualCash()}</p>
            </div>
            <div className=" pr-6 col-span-1">
              {/* <p>جمع اعتباری</p> */}
              <p>{sumdeficitCredit()}</p>
            </div>
            <div className=" pr-6 col-span-1">
              {/* <p>جمع نقدی</p> */}
              <p>{sumactualCash()}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Status;
