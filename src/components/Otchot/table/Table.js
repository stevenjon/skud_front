import React, { useEffect, useState } from 'react'
import { Tag, Space, Select } from 'antd';
import {Table} from "ant-table-extensions"
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import BaseUrl from '../../../BaseUrl';
import Moment from 'react-moment';
import { Option } from 'antd/lib/mentions';

function fromNow(time) {
    const d = new Date()
    // get total seconds between the times
    var delta = Math.abs(new Date() - new Date(time) ) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let express = ""
    if(days > 0) {
        express = days + "к"
    }
    if(hours > 0) {
        express = express + " "+hours+"с"
    }

    if(minutes > 0) {
        express = express + " "+minutes+"мин"
    }

    return express
     
}

function UmTable({data,loading, izoh}) {
  
    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'rasm',
            width: '15%',
            render: (text)=> {
                return  <Avatar size={50} src={BaseUrl+text} icon={<UserOutlined />} />
            }
          },
        {
          title: 'F.I.O',
          dataIndex: 'fio',
          key: 'fio',
        },
        {
          title: 'Lavozim',
          dataIndex: 'lavozim',
          key: 'lavozim',
          render: (text, record)=> {
              return(
                <div className="holat_card">
                  <div style={{color:"rgba(0,0,0,0.9)"}}>{text}</div>
                  <div className="sabab">Касал</div>
              </div>
              ) 
          }
        },
        {
          title: 'Holat',
          dataIndex: 'date',
          render: (text,record) => {
            console.log(text)
                return (<div className="holat_card" style={record.in ? {backgroundColor:"#1A98F2"}: {backgroundColor:"#F21A1A"}}>
                            <span style={{fontSize:"16px"}}>{record.in ? "Бинода":"Ташқарида"}</span><br></br>
                            <span style={{display:"flex", flexDirection:"column", lineHeight:"1"}}>
                                <b>{text ? fromNow(text): "номалум"}</b>
                                <span style={{fontSize:"11px"}}>
                                   {text ?  <Moment format="DD.MM.YYYY HH:mm">
                                         {text}
                                    </Moment>: null}
                                </span>
                            </span>
                    </div>)
          },
          width:"200px",
          sorter: (a, b) => a.in - b.in,
          sortDirections: ['descend', 'ascend'],
        },
        
      ];
    


      // const onChange = (value) => {
      //     setTartib(value)
      //     switch (value) {
      //       case '1':
      //         setData(info.sort((a,b)=> b.in - a.in))
      //         break;
          
      //       default:
      //         break;
      //     }
      // }
      return (
        <>
        {/* <div style={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
          <Select value={tartib}  style={{ width: 150 }} onChange={(value)=> {
                            onChange(value)
                            }}>
                          <Option value='0'>Тартибланг</Option>
                          <Option value="1">Аппарат ҳодимлари</Option>
                          <Option value="2">Ёрдамчи персонал</Option>
            </Select>
        </div> */}
        <Table 
            columns={columns} 
            dataSource={data}
            loading={loading}
            searchableProps={{ fuzzySearch: false, inputProps: {
                placeholder: "Ф.И.Ш бўйича қидириш",
                prefix: <SearchOutlined />,
              }, }} 
        />
        </>
      )
}


export default UmTable