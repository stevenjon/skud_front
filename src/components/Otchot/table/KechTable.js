import { Table } from 'antd';
import moment from 'moment';
import React from 'react'
const weeks = ["Якшанба","Душанба","Сешанба","Чоршанба","Пайшанба","Жума","Шанба"]

function timeConvert(n) {
  var num = Math.abs(n);
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  let a = ""
  if(rhours > 0) {
      a = rhours + "с "
  }
  if(rminutes != 0) {
      a = a+ rminutes + "мин"
  }
  return  a
  }
const KelmaganTable = ({record}) => {

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
            title: 'Келган вақти',
            render: (text)=> moment(text).format("HH:mm") 
        },
        {
          title: 'Кеч қолган вақти',
          render: (text)=> timeConvert(moment("09:01", "HH:mm").diff(moment(moment(text).format("HH:mm"), "HH:mm"), 'minute'))
      },
      ];
      
    return (
        <div style={{overflow:"auto", maxHeight:"400px"}}>
            <Table
                pagination={false} 
                dataSource={record.kelgan.filter(res=> {
                  let a = false
                 
                      const start = moment(moment(res).format("HH:mm"), 'HH:mm')
                      const endTime = moment('09:01', 'HH:mm');
                      if(!start.isBefore(endTime)) {
                          
                          a = true
 
                      }
                      return a
                    
             })} 
                columns={columns} 
            />           
        </div>
    )
}

export default KelmaganTable
