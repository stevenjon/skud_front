import { Table } from 'antd';
import moment from 'moment';
import React from 'react'
const weeks = ["Якшанба","Душанба","Сешанба","Чоршанба","Пайшанба","Жума","Шанба"]
const KelmaganTable = ({record, izoh}) => {
      const columns = [
        {
          title: "№",
          render: (text, record, index) => index+1,
        },
        {
          title: 'Хафта куни',
          render: (text, record) => {
              return weeks[moment(text).day()]
          }
        },
        {
          title: 'Сана',
          render: (text)=> moment(text).format("DD.MM.YYYY")
        },
        {
            title: 'Изох',
            render: (text)=> {
                if(izoh.filter(iz => iz.time == text && iz.user_id == record.id).length > 0) {
                  return izoh.filter(iz => iz.time == text && iz.user_id == record.id)[0].izoh
                }else {
                  return ""
                }
            }
          },
      ];
      
    return (
        <div style={{overflow:"auto", maxHeight:"400px"}}>
            <Table
                pagination={false} 
                dataSource={record.kelmagan} 
                columns={columns} 
            />           
        </div>
    )
}

export default KelmaganTable
