import { Checkbox } from "antd";

function Left_checkBox(props: any) {
  const { data, setdata, editform } = props;
  return (
    <>
      <div className="sec1 flex h-full w-[30%] gap-7 py-3 justify-evenly items-center flex-col">
        <div className="flex w-[90%] justify-start gap-3">
          <p>شیردهی :</p>
          <Checkbox
            disabled={editform}
            checked={data.breastFeeding}
            onChange={(e) => {
              setdata({ ...data, breastFeeding: e.target.checked });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>زخم های بدشکل :</p>
          <Checkbox
            disabled={editform}
            checked={data.deformedWounds}
            onChange={(e) => {
              setdata({ ...data, deformedWounds: e.target.checked });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>تبخال :</p>
          <Checkbox
            disabled={editform}
            checked={data.herpes}
            onChange={(e) => {
              setdata({ ...data, herpes: e.target.checked });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>رادیوتراپی :</p>
          <Checkbox
            disabled={editform}
            checked={data.radioTherapy}
            onChange={(e) => {
              setdata({ ...data, radioTherapy: e.target.checked });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>حساسیت دارویی :</p>
          <Checkbox
            disabled={editform}
            checked={data.medicalAllergy}
            onChange={(e) => {
              setdata({ ...data, medicalAllergy: e.target.checked });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>بیماری های عصبی - عضلانی : </p>
          <Checkbox
            disabled={editform}
            checked={data.neuropsychiatricDiseases}
            onChange={(e) => {
              setdata({
                ...data,
                neuropsychiatricDiseases: e.target.checked,
              });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>HIV :</p>
          <Checkbox
            disabled={editform}
            checked={data.hiv}
            onChange={(e) => {
              setdata({
                ...data,
                hiv: e.target.checked,
              });
            }}
          ></Checkbox>
        </div>
        <div className="flex w-[90%] justify-start gap-3">
          <p>تاتو :</p>
          <Checkbox
            disabled={editform}
            checked={data.tatto}
            onChange={(e) => {
              setdata({
                ...data,
                tatto: e.target.checked,
              });
            }}
          ></Checkbox>
        </div>

        <div className="flex w-[90%] justify-start gap-3">
          <p>هپاتیت :</p>
          <Checkbox
            disabled={editform}
            checked={data.hepatitis}
            onChange={(e) => {
              setdata({
                ...data,
                hepatitis: e.target.value,
              });
            }}
          ></Checkbox>
        </div>
      </div>
    </>
  );
}

export default Left_checkBox;
