import { Checkbox } from "antd";

function Right_checkBoxs(props: any) {
  const { setdata, data, editform } = props;
  console.log(data.daccutane);

  return (
    <>
      <div className="sec1 flex h-full w-[30%] gap-7 py-3 justify-evenly items-center flex-col">
        <div className="flex w-[90%] justify-start gap-3">
          <p>مصرف هر نوع دارو :</p>
          <Checkbox
            disabled={editform}
            onChange={(e) => {
              setdata({ ...data, drugConsume: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>فشار خون :</p>
          <Checkbox
            disabled={editform}
            onChange={(e) => {
              setdata({ ...data, bloodPressure: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>بیماری های تیروئیدی :</p>
          <Checkbox
            disabled={editform}
            checked={data.thyroidDisease}
            onChange={(e) => {
              setdata({ ...data, thyroidDisease: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>مصرف سیگار یا الکل :</p>
          <Checkbox
            disabled={editform}
            checked={data.smokingOrAlcoholConsumption}
            onChange={(e) => {
              setdata({
                ...data,
                smokingOrAlcoholConsumption: e.target.checked,
              });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>مصرف آکوتان</p>
          <Checkbox
            disabled={editform}
            checked={data.accutane}
            onChange={(e) => {
              setdata({ ...data, accutane: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>مصرف راکوتان</p>
          <Checkbox
            disabled={editform}
            checked={data.roaccutane}
            onChange={(e) => {
              setdata({ ...data, roaccutane: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>مصرف داکوتان</p>
          <Checkbox
            disabled={editform}
            checked={data.daccutane}
            onChange={(e) => {
              setdata({ ...data, daccutane: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>بیماری قلبی و عروقی :</p>
          <Checkbox
            disabled={editform}
            checked={data.cardiovascularDisease}
            onChange={(e) => {
              setdata({
                ...data,
                cardiovascularDisease: e.target.checked,
              });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>بارداری :</p>
          <Checkbox
            disabled={editform}
            checked={data.pregnancy}
            onChange={(e) => {
              setdata({ ...data, pregnancy: e.target.checked });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>دیابت :</p>
          <Checkbox
            disabled={editform}
            checked={data.diabetes}
            onChange={(e) => {
              setdata({ ...data, diabetes: e.target.checked });
            }}
          ></Checkbox>
        </div>
      </div>
    </>
  );
}

export default Right_checkBoxs;
