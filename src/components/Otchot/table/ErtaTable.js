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
              return weeks[moment(text.authDate).day()]
          }
        },
        {
          title: 'Сана',
          render: (text)=> moment(text.authDate).format("DD.MM.YYYY") 
        },
        {
            title: 'Кетган вақти',
            render: (text)=> moment(text.authDateTime).format("HH:mm") 
        },
        {
          title: 'Эрта кетган вақти',
          render: (text)=> timeConvert(moment("18:00", "HH:mm").diff(moment(moment(text.authDateTime).format("HH:mm"), "HH:mm"), 'minute'))
      },
      ];
      
    return (
        <div style={{overflow:"auto", maxHeight:"400px"}}>
            <Table
                pagination={false} 
                dataSource={record.kelgan} 
                columns={columns} 
            />           
        </div>
    )
}

export default KelmaganTable
