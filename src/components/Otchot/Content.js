import React, { useEffect, useState} from 'react'
import axios from 'axios';
import M from 'moment'
import Moment from 'react-moment'
import { Button, Select } from 'antd';
import Table from './table/Table';
import BaseUrl from '../../BaseUrl';
import TableClass from './table/TableClass';
import XisobotTable from './table/XisobotTable'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Cards from './table/Cards/Cards';
import XisobotClass from './table/XisobotClass';
import moment from 'moment';
import ErtaClass from './table/ErtaClass';
import Hisobot from '../Otchot/Xisobot'
import Aparat_img from '../images/aparat.png'
import Barcha_img from '../images/barcha.png'
import Kech_img from '../images/kech.png'
import Kelmagan_img from '../images/kelmagan.png'
import Erta_img from '../images/erta.png'
function getWithExpiry() {
	const itemStr = localStorage.getItem("sdate")
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem("sdate")
		return null
	}
	return item.value
}
const { Option } = Select;

const Content = () => {
    const savedDate = getWithExpiry()



    const [users, setUsers] = useState([])
    const [logs, setLogs] = useState([])
    const [data,setData]= useState([])
  
    const [loading, setLoading] = useState(false)
    const [izoh,setIzoh] = useState([])
    const [erta,setErta] = useState([])
    const [ora, setOra] = useState("today")
    const [cursec, setCursec] = useState(0)
    const [curoral, oralSecs] = useState(0)
    const [topmenu, setTopmenu] = useState(1)
    const [X, setX] = useState(false)
    const [date1, setDate1] = useState(savedDate ? savedDate: M().subtract(1, 'days').format("yyyy-MM-DD"))
    const [aparat, setAparat]= useState({
      date: null,
      string: null
    })

    useEffect(() => {
        fetchUsers()
        fetchLogs()
        fetchSana()
        fetchIzohlar()
    }, [topmenu])
    
    const fetchUsers = async () => {
        setLoading(true)
        try {
          const res = await axios.get(`${BaseUrl}getusers?id=${topmenu}`)
          if(res.status == 200) {
            setUsers(res.data)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
        }
    }
    const fetchSana = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${BaseUrl}getaparat`)
  
        if(res.status == 200) {
          setLoading(false)
          setAparat({
              date: moment(res.data[0].sana),
              string: res.data[0].sana,
          })
          
        }
        
      } catch (error) {
      
      }
  }

    const fetchLogs =async () => {
        setLoading(true)
        try {
          const res = await axios.get(`${BaseUrl}getlogs`)
          if(res.status == 200) {
            setLogs(res.data)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
        }
    }

    const fetchIzohlar =async () => {
        setLoading(true)
        try {
          const res = await axios.get(`${BaseUrl}getizoh`)
          if(res.status == 200) {
            setIzoh(res.data)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
        }
    }
    
    useEffect(()=> {
      if(cursec == 3) {
        fetchErtabydate()
      }else {
        fetchLogsbydate(ora)
      }
      
  }, [ora,cursec])
  const fetchLogsbydate =async (date) => {
      setLoading(true)            

      const formData = new FormData()
      formData.append("date", date);
      try {
        const res = await axios.post(`${BaseUrl}getlogsbydate`, formData)
        if(res.status == 200) {
          let jogs = []
          if(cursec == 2) {
            
              jogs = res.data.reduce((acc, current) => {
                const x = acc.find(item => item.authDate === current.authDate && item.employeeID === current.employeeID);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []);

              jogs = jogs.filter(d=> {
                let a = true
                                    
                const start = moment(moment(d.authDateTime).format("HH:mm"), 'HH:mm')
                const endTime = moment('09:01', 'HH:mm');
                if(start.isBefore(endTime)) {
                    
                    a = false

                }
                return a
              
              })
          
          }else {
            jogs = res.data
          }

          let info = []

          if(cursec == 1) {
              info = XisobotClass(users,jogs, ora, aparat.string).filter(d=> d.kelmagan.length > 0) 
              
          }
          if(cursec == 2) {
              info = XisobotClass(users,jogs, ora, aparat.string).filter(d=> d.kelgan.length > 0)
              console.log(info)
          }

          
          
         
          setData(info)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
  }


  const fetchErtabydate = async ()=>  {
    setLoading(true)            
    const formData = new FormData()
    formData.append("date", ora);
    try {
      const res = await axios.post(`${BaseUrl}getertabydate`, formData)
   
      if(res.status == 200) {
           
            let jogs = []
            let ertajogs = res.data.sort((a,b)=> new Date(a.authDateTime) - new Date(b.authDateTime))
            ertajogs = ertajogs.reduce((acc, current) => {
              const x = acc.find(item => item.authDate === current.authDate && item.employeeID === current.employeeID);
              if (!x && current.deviceSN == "DS-K1T671M20210203V030200ENE19196584") {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            setErta(ertajogs) 
    
            jogs = res.data.reduce((acc, current) => {
              const x = acc.find(item => item.authDate === current.authDate && item.employeeID === current.employeeID);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            
            jogs = jogs.filter(j=> j.deviceSN == "DS-K1T671M20210203V030200ENE19196630")
            
            setData(ErtaClass(users, res.data.sort((a,b)=> new Date(b.authDateTime) - new Date(a.authDateTime))))
            setLoading(false)
      }
    } catch (error) {
      
    }
  }

  const hide = ()=> {
      setTimeout(()=> {
        setX(false)
      },500)
  }
    return (
        <div className='cont' style={{
            margin: "0px auto",
            padding: "15px 30px",
            maxWidth: "1900px"  
        }}>
            <div className="top-menu">
                <div className="top_btns" style={{display:"flex", boxSizing:"border-box",}}>
                    <div className={topmenu == 1 ? "top_btn btn_clicked": "top_btn"}><button onClick={()=> {
                        setTopmenu(1)
                        setCursec(0)
            }} className={topmenu == 1 ? "ot_btn m-0 " : "ot_btn m-0 no-bg"}>
              <img src={Aparat_img}></img>
              Аппарат ҳодимлари</button></div>
                    <div className={topmenu == 2 ? "top_btn btn_clicked": "top_btn"}><button onClick={()=> {
                        setTopmenu(2)
                        setCursec(0)
                        
                        }} className={topmenu == 2 ? "ot_btn m-0 ": "ot_btn m-0 no-bg"}>Ёрдамчи персонал </button></div>
                   
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end"}}>
                    <div style={cursec !=0 ? {display: "flex", flexDirection:"column"}: {display: "flex", flexDirection:"column", display:"none"}}>
                    <span style={{color:"#756F86", fontWeight:"500"}}>Ҳисобот даври</span>
                   <Select onChange={(value)=> setOra(value)}  value={ora} style={{ width: 200 }}>
                        <Option value="today">Бугун</Option>
                        <Option value="thisweek">Жорий ҳафта</Option>
                        <Option value="week">Охирги ҳафта</Option>
                        <Option value="thismonth">Жорий ой</Option>
                        <Option value="month">Ўтган ой</Option>
                        <Option value="quarter">Охирги чорак</Option>
                        <Option value="year">Йил мобайнида</Option>
                    </Select>
                    </div>
                </div>
               
            </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <div className="ot_btns">
                <button onClick={()=>setCursec(0)} className={cursec == 0 ? "ot_btn b4 btn_tan": "ot_btn b4"}><img src={Barcha_img}></img>Барча ҳодимлар</button>
                <button onClick={()=>setCursec(1)} className={cursec == 1 ? "ot_btn b1 btn_tan": "ot_btn b1"}><img src={Kelmagan_img}></img>Келмаганлар</button>
                <button onClick={()=>setCursec(2)} className={cursec == 2 ? "ot_btn b2 btn_tan": "ot_btn b2"}><img src={Kech_img}></img>Кеч қолганлар</button>
                <button onClick={()=>setCursec(3)} className={cursec == 3 ? "ot_btn b3 btn_tan": "ot_btn b3"}><img src={Erta_img}></img>Эрта кетган</button>
            </div>
            {cursec != 0 ? <div onClick={()=> setX(true)} style={{marginTop:"20px"}}>
            <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="ant-btn ant-btn-primary"
                    table="table-to-xls"
                    filename="Хисобот"
                    onClick={hide}
                    sheet="tablexls"
                    buttonText="Хисобот олиш"/>
            </div>:null}
            </div>
      
       
            <center>
                
                {cursec ==0 ? <h3 style={{maxWidth:"500px", color:"#656565"}}>Вилоят ҳокимлигининг аппарат ҳодимлари меҳнат интизоми
ҳодимлар ҳолати</h3>:null}
{cursec ==1 ? <h3 style={{maxWidth:"500px", color:"#656565"}}>Вилоят ҳокимлигининг аппарат ҳодимлари меҳнат интизоми
Ишга келмаган ҳодимлар</h3>:null}
{cursec ==2 ? <h3 style={{maxWidth:"500px", color:"#656565"}}>Вилоят ҳокимлигининг аппарат ҳодимлари меҳнат интизоми
Ишга кеч қолган ҳодимлар</h3>:null}
            </center>
            
           
            

                    {/* {cursec == 0 ? <Table data={TableClass(users, logs)} loading={loading} izoh={izoh}></Table>: null}
                    {cursec !=0  ? <XisobotTable users={users} ora={ora} cursec={cursec} topmenu={topmenu} izoh={izoh}></XisobotTable>: null} */}
                {cursec == 0 ? <Cards data={TableClass(users, logs)} loading={loading} izoh={izoh} cursec={cursec} ora={ora}></Cards>:null}
                {cursec != 0 && cursec !=4 ? <Cards data={data} loading={loading} izoh={izoh} cursec={cursec} ora={ora}></Cards>:null}
                {cursec != 0 ? <Hisobot data={data} izoh={izoh} cursec={cursec} ora={ora} erta={erta}></Hisobot>: null}
        
        </div>
    )
}

export default Content
