
import React, { useState, useEffect } from 'react'
import { DatePicker, message, Popconfirm, Popover, Spin } from 'antd'
import M from 'moment'
import Moment from 'react-moment'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Result, Button } from 'antd'
import Logout from './icons/Logout.svg'
import Drawer from './Drawer'
import topBar from './icons/topbar_icon.svg'
import Izohlar from './Izohlar'
import SideBar from '../admin/SideBar'
import Foydalanuvchilar from './Foydalanuvchilar'
import { CheckCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import axios from 'axios'
import BaseUrl from '../../BaseUrl'


const Admin = () => {
  const [aparat, setAparat]= useState({
    date: null,
    string: null
  })
  const [loading, setLoading] = useState(false)
  const [clock, setClock] = useState()
  useEffect(() => {
   
    setClock(M().format('H:mm'))
    fetchSana()
    setInterval(() => {
      setClock(M().format('H:mm'))
    }, 1000)
  }, [])

  const onChange = (date, dateStirng) => {
      setAparat({
        date:date,
        string:dateStirng
      })
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
  const handleAparat = async ()=> {
      if(aparat.string) {
          const formData = new FormData()
          formData.append("sana", aparat.string)
          try {
            let res = await axios({
              method: 'post',
              url: `${BaseUrl}aparatcreate`,
              data: formData
            })

            if(res) {
              
              message.success('Muvaffaqiyatli saqlandi');

            }
          } catch (error) {
            
          }
      }
  }
  return (
    <Router>
      <div>
        <div className="top_bar">
          <div style={{display:"flex", alignItems:"center"}}>
          <Spin spinning={loading}><Popover content="Aparat ish boshlagan sana"><DatePicker value={aparat.date} placeholder="Aparat sanasi" onChange={onChange}/></Popover></Spin>
                <div onClick={handleAparat} style={{marginLeft:"10px", color:"white", fontSize:"20px", cursor:"pointer"}}><CheckCircleFilled /></div>
            </div>
          <div className="top_bar_items">
           
            <div className="clock" style={{ textAlign: 'center', marginRight:"15px"}}>
              <h2 style={{ margin: '0', marginBottom: '2px', color: '#fff' }}>
                {clock}
              </h2>

              <p style={{ marginTop: '0', color: '#fff', fontSize: '12px' }}>
                <Moment format="MM.DD.YYYY"></Moment>
              </p>
            </div>
            <Popconfirm
              title="Saytni tark etasizmi!"
              okText="Ha"
              cancelText="Yo'q"
              onConfirm={() => {
                window.localStorage.removeItem('vil_id')
                window.localStorage.removeItem('user')
                window.localStorage.removeItem("muassasa_id")
                // logOut()
                window.location.href = '/'
              }}
            >
              <h3
                style={{ color: 'white', cursor: 'pointer', marginTop: '7px' }}
              >
                <img
                  src={Logout}
                  alt="logout"
                  style={{
                    margin: '5px',
                    color: 'white',
                    fontSize: '50px',
                  }}
                />{' '}
                Chiqish
              </h3>
            </Popconfirm>
          </div>
        </div>
        <div className="main_container">
          <SideBar></SideBar>
          <Drawer></Drawer>
          <Switch>
            <Route exact path="/">
              <Foydalanuvchilar></Foydalanuvchilar>
            </Route>
            <Route exact path="/izohlar">
              <Izohlar></Izohlar>
            </Route>
            <Route>
              <Result
                style={{ margin: '0 auto' }}
                status="404"
                title="404"
                subTitle="Kechirasiz, siz izlayotgan sahifa topilmadi!"
                extra={
                  <Link to="/">
                    <Button type="primary">Uyga qaytish</Button>
                  </Link>
                }
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default Admin
