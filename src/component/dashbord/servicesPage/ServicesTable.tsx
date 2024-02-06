import React from 'react';
import { Table, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const columns: ColumnsType<DataType> = [
  {
      title: 'ردیف',
      dataIndex: 'age',
    },
    
{
  title: 'نوع دسته بندی',
  dataIndex: 'name',
},

];

const columns2: ColumnsType<DataType> = [
    {
        title: 'ردیف',
        dataIndex: 'age',
      },
      
  {
    title: 'نوع خدمت',
    dataIndex: 'name',
  },
  {
    title: 'قیمت',
    dataIndex: 'address',
  },
];

const data2: DataType[] = [
  {
    key: '1',
    age: 1,
    name: 'کل صورت',
    address: '15.000.000ریال',
  },
  {
    key: '2',
    age: 2,
    name: 'کل صورت',
    address: '15.000.000ریال',
  },
  {
    key: '3',
    age: 3,
     name: 'کل صورت',
    address: '15.000.000ریال',
  },
  {
    key: '3',
    age: 3,
     name: 'کل صورت',
    address: '15.000.000ریال',
  },  {
    key: '3',
    age: 3,
     name: 'کل صورت',
    address: '15.000.000ریال',
  },  {
    key: '3',
    age: 3,
     name: 'کل صورت',
    address: '15.000.000ریال',
  }, 
];
const data: DataType[] = [
    {
      key: '1',
      age: 1,
      name: 'کل صورت',
      address: '15.000.000ریال',
    },
    {
      key: '2',
      age: 2,
      name: 'کل صورت',
      address: '15.000.000ریال',
    },
    {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },
    {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },  {
      key: '3',
      age: 3,
       name: 'کل صورت',
      address: '15.000.000ریال',
    },
  ];

const ServicesTable =  (props:any) => {
   console.log(props.state)
  
    return(
  <>
    {/* <Divider>Middle size table</Divider> */}
    {props.state === 1 && 
    <Table  columns={columns} pagination={false}
     dataSource={data} size="middle" />
    
    }
    {props.state === 2 && 
    <Table  columns={columns2} pagination={false}
     dataSource={data2} size="middle" />
    }
  </>
    )
}

export default ServicesTable;

