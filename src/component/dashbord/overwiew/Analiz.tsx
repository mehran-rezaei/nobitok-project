import React, { useEffect, useState } from 'react';
import { Input, Space, Divider, Select, Checkbox } from 'antd';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import i18n from '@/i18next';
import { t } from 'i18next';
import { GetReportByDate, GetReportBySeasson, GetReportChart } from '@/Dataservice/Overview';
import { notify } from '@/helper/toust';
import { NumericFormat } from 'react-number-format';



const Analiz = (props:any) => {
    const { weekValues } = props;
  const Seasson = [
   { name : 'بهار'  , id : 1},
   { name : 'تابستان'  , id : 2},
   { name : 'پاییز'  ,   id : 3},
   { name : 'زمستان'  , id : 4}
  ]
 

  const [yearValues, setYearValues]: any = useState("");
  const [firstSeasson, setFirstSeasson] = useState<any>("");
  const [secondSeasson, setSecondSeasson] = useState<any>("");
  const [firstSeassonname, setFirstSeassonname] = useState<any>("");
  const [secondSeassonname, setSecondSeassonname] = useState<any>("");
  const [firstSeasonTotalIncome, setFirstSeasonTotalIncome] =  useState <any>(0)
  const [secondSeasonTotalIncome, setSecondSeasonTotalIncome] = useState<any>(0)
  const [Reports, setReports] = useState<any>({});
  const [chartData, setChartData] = useState<any>([]);
  const [checkBoxItem , setCheckBoxItem] = useState<any>({
    showincome : false,
    showappoyment : true,
    showservices : true
  })
  // const [chartDataIncomes, setChartDataIncomes] = useState<any>([]);
  // console.log(firstSeasonTotalIncome);
  // console.log(secondSeasonTotalIncome);
  // console.log(yearValues.year);
  // console.log(firstSeasson);
  // console.log(secondSeasson);
  // console.log(Reports);
  console.log(chartData);
  // console.log(chartDataIncomes);


  if(yearValues.year > 0 && firstSeasson > 0 && secondSeasson > 0){
    GetReportBySeasson(firstSeasson,secondSeasson,yearValues.year)
    .then(Response => {
      // console.log(Response); 
      setFirstSeasonTotalIncome(Response.data.data.firstSeasonTotalIncome)
      setSecondSeasonTotalIncome(Response.data.data.secondSeasonTotalIncome)
    })
  } else{
    // console.log('no');
  }
  

 const data = [
    {
      name:firstSeassonname,
      pv: firstSeasonTotalIncome,
      // uv : 1200,
      // amt: 2400,
    },
    {
      name: secondSeassonname,
      //  pv: 1200,
      uv: secondSeasonTotalIncome,
      // amt: 2400,
    },
  ];
  const onChangee1 = (value: string, label: any) => {
    console.log(`selected ${value}`);
    console.log(label.label);
    setFirstSeasson(value)
    setFirstSeassonname(label.label)
    }
    const onChangee2 = (value: string, label: any) => {
      console.log(`selected ${value}`);
      console.log(label.label);
      setSecondSeasson(value)
      setSecondSeassonname(label.label)
      }
      useEffect(() => {
        const getfun = async () => {
          if (weekValues === "") {
            const date = new DateObject({ calendar: persian, locale: persian_fa });
            GetReportByDate(
              `${date.year}/${date.month.number}/${date.day}`,
              `${date.year}/${date.month.number}/${date.day}`
            )
              .then((Response) => {
                console.log(Response)
                if (Response.data.isSuccess) {
                  setReports(Response.data.data)  
                }
              })
              .catch((error) => {
                console.log("11111111111111111");
                notify("error", `${t("error")}`);
              });
          } else if (weekValues.length === 2) {
            GetReportByDate(
              `${weekValues[0].year}/${weekValues[0].month.number}/${weekValues[0].day}`,
              `${weekValues[1].year}/${weekValues[1].month.number}/${weekValues[1].day}`
            )
              .then((Response) => {
                // console.log(Response)
                if (Response.data.isSuccess) {
                  setReports(Response.data.data)   
                }
              })
              .catch((error:any) => {
                console.log("11111111111111111");
                notify("error", `${t("error")}`);
              });
          }
        };
        getfun();
      }, [weekValues]);
      useEffect(() => {
        if(weekValues.length === 2){
          GetReportChart(
            `${weekValues[0].year}/${weekValues[0].month.number}/${weekValues[0].day}`,
            `${weekValues[1].year}/${weekValues[1].month.number}/${weekValues[1].day}`
          )
          .then(Response => {
            console.log(Response.data.data);
            setChartData(Response.data.data)
            // setChartDataIncomes(Response.data.data.incomes)
         if(checkBoxItem.showincome){
          setSeries([...series , series[0].data = Response.data.data.incomes])
         } else{
          setSeries([...series , series[0].data = ''])
         }  
            if(checkBoxItem.showappoyment){
              setSeries([...series , series[1].data = Response.data.data.appointments])
            }else{
              setSeries([...series , series[1].data = ''])

            }
            if(checkBoxItem.showservices){
              setSeries([...series , series[2].data = Response.data.data.services])
            }else{
              setSeries([...series , series[2].data = ''])
            }

          })
        }
      } , [weekValues,checkBoxItem])
      const [series , setSeries] =  useState<any>([
        {
          name: 'incomes',
          color : 'green',
          data : ''
        },
        {
          name: 'appointments',
          color : 'red',
          data: ''
        },
        {
          name: 'services',
          color : 'blue',
          data : ''
          // data: [
          //   { category: 's', value: 0 },
          //   { category: 'A', value: Math.random() * 10 },
          //   { category: 'B', value: Math.random() * 10 },
          //   { category: 'C', value: Math.random() * 10 },
          //   { category: 'E', value: Math.random() * 10 },
          //   { category: 'F', value: Math.random() * 10 },
          // ],
        },
      ])
   
  return (
    <div className=' '>
      <div className='pt-2 mr-8 h-fit py-2  shadow-lg rounded-xl mt-5 items-center pr-4 bg-[#F7F7F7]'>
        <div className=' flex  justify-between px-10  items-center'>
          <div className=''>
            <span className='block text-[16px] font-semibold text-center'>
              {Reports && Reports.appointmentQuentity }     
            </span>
            <span className='block text-[14px] font-normal'>تعداد نوبت ها </span>
          </div>
          <Divider type="vertical" style={{ borderWidth: 2, height: 60, borderColor: '#000000' }} />
          <div>
            <span className='block text-[16px] font-semibold text-center'>
            {Reports && Reports.canceledAppointmentQuentity }
            </span>
            <span className='block text-[14px]'>  کنسل شده </span>
          </div>
          <Divider type="vertical" style={{ borderWidth: 2, height: 60, borderColor: '#000000' }} />
          <div>
            <span className='block text-[16px] font-semibold text-center'>
              {Reports && Reports.completedAppoinmentQuentity}
            </span>
            <span className='block text-[14px]'>تمامی سرویس های انجام شده</span>
          </div>
          <Divider type="vertical" style={{ borderWidth: 2, height: 60, borderColor: '#000000' }} />
          <div>
            <span className='block text-[16px] font-semibold text-center'>
            {Reports && Reports.favoriteService !== null  && Reports.favoriteService }
            {Reports && Reports.favoriteService === null  && 
               <h3 className=' text-[14px] mb-2'>بدون سرویس</h3>}
            </span>
            <span className='block text-[14px]'> محبوب ترین سرویس </span>
          </div>
          <Divider type="vertical" style={{ borderWidth: 2, height: 60, borderColor: '#000000' }} />
          <div>
            <span className='block text-[16px] font-semibold text-center'>
            <NumericFormat
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  value={Reports && Reports.totalIncome}
                />
            {/* {Reports && Reports.totalIncome} */}
            </span>
            <span className='block text-[14px]'>  میزان درامد  </span>
          </div>

        </div>
      </div>
      <div dir='ltr' className='flex  mt-6  justify-between pr-10 '>
      <div className='bg-[#F2F2F2] flex items-end flex-col pb-3 pr-8 rounded-lg  '>
      <div dir='rtl' className='w-[96%] flex items-center  justify-between text-right pt-4 pb-2 mb-6  text-[18px] font-medium  border-b-2 border-[#C9C9C9]' 
      >چارت وضعیت
      <div className='flex gap-x-6'>
      <Checkbox
                 className="text-[11px] lg:text-[12px]"
                  checked={checkBoxItem.showincome}
                  onChange={() => {
                    setCheckBoxItem({ ...checkBoxItem ,showincome: !checkBoxItem.showincome })
                  }}
                >
                  {t("میزان درامد")}
                </Checkbox>
                <Checkbox
                 className="text-[11px] lg:text-[12px]"
                  checked={checkBoxItem.showservices}
                  onChange={() => {
                    setCheckBoxItem({ ...checkBoxItem ,showservices: !checkBoxItem.showservices })
                  }}
                >
                  {t("سرویس ها")}
                </Checkbox>
                <Checkbox
                 className="text-[11px] lg:text-[12px]"
                  checked={checkBoxItem.showappoyment}
                  onChange={() => {
                    setCheckBoxItem({ ...checkBoxItem ,showappoyment: !checkBoxItem.showappoyment })
                  }}
                >
                  {t("نوبت های دوره ای")}
                </Checkbox>
      </div>

      </div>
      <div className='flex '>
      <LineChart width={640} height={320}   >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis   type="category" dataKey='category' allowDuplicatedCategory={false} />
            <YAxis 
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("en-US", {
                          notation: "compact",
                          compactDisplay: "short",
                        }).format(value)
                      }
            dataKey="value" fontSize={13}/>
            {/* <Tooltip  cursor={false}  /> */}
            <Legend  />
            {series.map((s:any) => (
              <Line dataKey="value" 
                data={s.data} name={s.name} key={s.name} fill={s.color} stroke={s.color} />
            ))}
     
          </LineChart>
        <div dir='rtl' className='w-[25%] ml-10 text-[11px] font-medium text-right'>
            <h3 className='py-5 flex'>
            <img className='ml-2 ' src="../../../../images/Rectangle blue.png" alt="" /> 
               <span>سرویس ها</span>  
             </h3> 
             <h3 className='py-5 flex'>
             <img className='ml-2 ' src="../../../../images/Rectangle green.png" alt="" /> 
               <span> میزان درامد </span>  
             </h3> 
             <h3 className='py-5 flex'>
               <img className='ml-2 ' src="../../../../images/Rectangle pink.png" alt="" /> 
               <span>نوبت های دوره ای</span>  
             </h3> 
        </div>
      </div>

    </div>
   
        <div className='bg-[#F2F2F2] pb-2 pr-8 rounded-md'>
          <div className='pl-8 pt-4'>
            <h2 className='text-center text-sm font-semibold' >مقایسه میزان درامد</h2>
            <div  dir='rtl' className=' flex justify-start mt-2 mb-3 text-sm  selectyearover'>
            <DatePicker
            placeholder={`${t("انتخاب سال")}`}
              style={{width : '170px', height : '30px'}}
              className='  rounded-sm block'
                calendar={i18n.language == "fa" ? persian : undefined}
                locale={i18n.language == "fa" ? persian_fa : undefined}
                onlyYearPicker
                value={yearValues}
                onChange={(dateObject: any) => {
                  setYearValues(dateObject);
                }}
            />          
            </div>
            <div dir='rtl' className='flex justify-between mb-2'>
            <Select
                  className="
                  w-[150px] lg:w-[170px]   mt-1 lg:mt-0 "
                  placeholder={"بازه اول"}
                  optionFilterProp="children"
                  // value={firstSeasson}
                  onChange={onChangee1}
                  // onSearch={onSearch}

                  // size="small"
                  options={Seasson.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
                  <Select
                  className="w-[150px] lg:w-[170px]   mt-1 lg:mt-0 "
                  placeholder={`${t("بازه دوم")}`}
                  optionFilterProp="children"
                  // value={secondSeasson}
                  // onChange={()}
                  onChange={onChangee2}
                  // onSearch={onSearch()}

                  // size="small"
                  options={Seasson.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
            </div>
        

          </div>

          <BarChart
       
            width={470}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 10,
              bottom: 1,
            }}
            barGap={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis reversed={true} dataKey="name" fontSize={15} />
            <YAxis
             tickFormatter={(value) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
             type='number'  yAxisId="left" orientation="left" fontSize={10} stroke="#000" />
            <YAxis
             tickFormatter={(value) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
             type='number'  yAxisId="left" orientation="left" fontSize={10} stroke="#000" />
            <Tooltip formatter={(value) => value && value.toLocaleString()}  />
            <Legend />
            <Bar yAxisId="left" dataKey="pv" fill="#46F481" barSize={20} />
            <Bar yAxisId="left" dataKey="uv" fill="#ffcb73" barSize={20} />
            {/* <Bar yAxisId="left" dataKey="uv" fill="#FFCB7C" barSize={40}  /> */}
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Analiz;