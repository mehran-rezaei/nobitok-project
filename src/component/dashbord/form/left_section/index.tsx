import { Button } from "antd";

function Left_section(props: any) {
  const { editform, setdata, data } = props;
  return (
    <>
      <div className=" sec1 flex flex-col gap-7 items-center justify-evenly  h-full w-[40%]">
        <div className="w-[200px] h-[200px] border-dashed border-2 border-black flex justify-center items-center">
          <Button className="bg-[#3A4EFF]" type="primary">
            اضافه کردن عکس
          </Button>
        </div>
        <textarea
          disabled={editform}
          value={data.shockDuringInjection}
          onChange={(e) => {
            setdata({ ...data, shockDuringInjection: e.target.value });
          }}
          id="message"
          rows={4}
          className=" resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="سابقه حساسیت و شوک در تزریقات قبلی :"
        ></textarea>
        <textarea
          disabled={editform}
          value={data.presenceOfMetalPlates}
          onChange={(e) => {
            setdata({ ...data, presenceOfMetalPlates: e.target.value });
          }}
          id="message"
          rows={4}
          className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="وجود صفحات فلزی در بدن : "
        ></textarea>
      </div>
    </>
  );
}

export default Left_section;
