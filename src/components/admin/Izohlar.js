import React, { useState, useEffect } from 'react'

import { Button, DatePicker } from 'antd'
import { Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css'
import BaseUrl from '../../BaseUrl'
import { Input, message } from 'antd'
import axios from 'axios'
import IzohTable from './IzohlarTable';
import Avatar from './Avatar';
import moment from 'moment';

const { Option } = Select;

function Foydalanuvchilar({}) {
  const [loading, setLoading] = useState(false)
  const [izoh, setIzoh] = useState([])
  const [users, setUsers] = useState([])
  const [values, setValues] = useState({
      user_id: "",
      time: "",
      mom: null,
      izoh: "",
      izoh_turi: ""
    })
  const onChange = (e, props) => {
      if(props) {
        setValues({
          ...values,
          [props]: e,
          sec: "0"
        })
        
        if(props == "sec") {
          setValues({
            ...values,
            sec: e,
          })
        }
      }else {
        setValues({
        ...values,
        [e.target.name]: e.target.value
      })
      }
    }

    const dateChange = (date, dateString)=> {
        setValues({
            ...values,
            time: dateString,
            mom: date
        })
    }

    const handleOk = async () =>    {
      setLoading(true);
      let cando = true
      let formData = new FormData();
      for (var key in values ) {
          if(values[key] == "") {
              cando = false
          }
       formData.append(key, values[key]);
   
      }
      if(cando) {
              try {
              let res = await axios({
                  method: 'post',
                  url: `${BaseUrl}izohcreate`,
                  data: formData
              });
              if(res) {
       
              message.success('Muvaffaqiyatli saqlandi');
              fetchIzohlar()
              setLoading(false);
              setModal(false);
              setValues({
                user_id: "",
                time: "",
                mom:null,
                izoh: "",
                izoh_turi:""
                })
              }
          } catch (error) {
            console.log(error) 
          }
      }else {
        message.warning("Bo'sh joylarni to'ldiring")
        setLoading(false)
      }    
    };

  useEffect(()=> {
    fetchIzohlar()
    fetchUsers()
  },[])

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

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BaseUrl}getusers`)
      if(res.status == 200) {
        setUsers(res.data)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
}


  function onSearch(val) {
    
  }



  const [modal, setModal]= useState(false)
      return (
        <>
        <div className="ex_container">
          <div className="ex_nav">
            <h3 style={{ color: 'white', margin: '0 auto' }}>Izohlar ro'yxati</h3>
          </div>
          <div
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
             <Button onClick={()=> setModal(true)} type="primary" icon={<PlusCircleOutlined />}>
                Izoh  qo'shish 
            </Button>
            <div
              style={{
                width: '150px',
                height: '30px',
                float: 'right',
              }}
            >
            </div>
              

              <div style={{marginTop:"10px"}}> 
                  <IzohTable users={users} izoh={izoh}  loading={loading} fetchIzohlar={fetchIzohlar}></IzohTable>
              </div>
            
          </div>
        </div >

        <Modal
          title="Izoh qoldirish"
          centered    
          width={"80%"}
          footer={null}
          visible={modal}
          onCancel={() =>{
            setValues({
                user_id: "",
                time: "",
                mom:null,
                izoh: "",
                izoh_turi:""
                })
           setModal(false)}}
          footer={[   
          <Button danger type="primary" onClick={() =>{
            setValues({
                user_id: "",
                time: "",
                mom:null,
                izoh: "",
                izoh_turi:""
                })
           setModal(false)}}>
             Bekor qilish
           </Button>,
            <Button onClick={handleOk} loading={loading} type="primary">
              Qo'shish
            </Button>,
            
          ]}
        >
             <div className='form_inputs'>
                    <div style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                    <div className='form_group'>
                        <p>Foydalanuvchi F.I.O</p>
                      <Select value={values.user_id} showSearch onSearch={onSearch} filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    } style={{ width: 200 }} onChange={(value)=> {
                          onChange(value, 'user_id')
                          }}>
                        {users.map(user=> <Option key={user.id} value={user.id}>{user.fio}</Option>)}
                      </Select>
                    </div>
                    <div className='form_group'>
                        <p>Izoh turi</p>
                      <Select value={values.izoh_turi} style={{ width: 200 }} onChange={(value)=> {
                          onChange(value, 'izoh_turi')
                          }}>
                        <Option value="1">Келмагани учун</Option>
                        <Option value="2">Кеч қолганлиги учун</Option>
                        <Option value="3">Эрта кетгани учун</Option>
                      </Select>
                    </div>
                       
                        <div className='form_group'>
                            <p>Sana</p>
                            <DatePicker value={values.mom} onChange={dateChange} />
                        </div>
                        <div className='form_group'>
                            <p>Izoh</p>
                            <Input  value={values.izoh}  name='izoh' onChange={onChange}/>
                        </div>
                    </div>
                </div>
        </Modal>
        </>
      )

    
   
    
  
}

export default Foydalanuvchilar