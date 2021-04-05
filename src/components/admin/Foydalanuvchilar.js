import React, { useState, useEffect } from 'react'

import { Button } from 'antd'
import { Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css'
import BaseUrl from '../../BaseUrl'
import { Input, message } from 'antd'
import axios from 'axios'
import Foydalanuvchitable from './Foydalanuvchitable';
import Avatar from './Avatar';

const { Option } = Select;

function Foydalanuvchilar({}) {
  const [loading, setLoading] = useState(false)
  const [ids, setIds] = useState([])
  const [users, setUsers] = useState([])
  const [edit, setEdit] = useState(false)
  const [values, setValues] = useState({
      turi: "",
      id: "",
      fio: "",
      lavozim: "",
      rasm: "",
})
  const onChange = (e, props) => {
    console.log(e)
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

    const handleOk = async () =>    {
      setLoading(true);
      let cando = true
      let formData = new FormData();
      for (var key in values ) {
          if(values[key] == "") {
              console.log(key)
              cando = false
          }
       formData.append(key, values[key]);
   
      }
      if(cando) {
              try {
              let res = await axios({
                  method: 'post',
                  url: `${BaseUrl}usercreate`,
                  data: formData
              });
              if(res) {
              console.log(res)
              message.success('Muvaffaqiyatli saqlandi');
              fetchUsers()
              setLoading(false);
              setModal(false);
              setValues({
                turi: "",
                id: "",
                fio: "",
                lavozim: "",
                rasm: "",
                })
              }
              setEdit(false)
          } catch (error) {
          
            console.log(error) 
          }
      }else {
        message.warning("Bo'sh joylarni to'ldiring")
        setLoading(false)
      }    
    };

    const handleEdit = (record)=> {
        setValues({
          turi: record.bolim,
          id: record.id,
          lavozim: record.lavozim,
          fio: record.fio,
          rasm: record.rasm,
        })
        setEdit(true)
        setModal(true)
    }

  useEffect(()=> {
    fetchIds()
    fetchUsers()
  },[])

  const fetchIds = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${BaseUrl}getids`)
        if(res.status == 200) {
          setIds(res.data)
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
            <h3 style={{ color: 'white', margin: '0 auto' }}>Foydalanuvchilar ro'yxati</h3>
          </div>
          <div
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
             <Button onClick={()=> setModal(true)} type="primary" icon={<PlusCircleOutlined />}>
                Foydalanuvchi  qo'shish 
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
                  <Foydalanuvchitable edit={handleEdit} users={users}  loading={loading} fetchUsers={fetchUsers}></Foydalanuvchitable>
              </div>
            
          </div>
        </div >

        <Modal
          title= {edit ? "Foydalanuvchi ma'lumotlarini o'zgartirish": "Foydalanuvchi  qo'shish"} 
          centered    
          width={"80%"}
          footer={null}
          visible={modal}
          onCancel={() =>{
            setValues({
                  turi: "",
                  id: "",
                  fio: "",
                  lavozim: "",
                  rasm: "",
                })
                setEdit(false)
           setModal(false)}}
          footer={[   
          <Button danger type="primary" onClick={() =>{
            setValues({
                  turi: "",
                  id: "",
                  fio: "",
                  lavozim: "",
                  rasm: "",
                })
                setEdit(false)
           setModal(false)}}>
             Bekor qilish
           </Button>,
            <Button onClick={handleOk} loading={loading} type="primary">
              Saqlash
            </Button>,
            
          ]}
        >
             <div className='form_inputs'>
                    <div style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                    <div className='form_group'>
                        <p>Foydalanuvchi turi</p>
                      <Select value={values.turi} style={{ width: 120 }} onChange={(value)=> {
                          onChange(value, 'turi')
                          }}>
                        <Option value="1">Аппарат ҳодимлари</Option>
                        <Option value="2">Ёрдамчи персонал</Option>
                      </Select>
                    </div>
                       {!edit ? <div className='form_group'>
                            <p>ID</p>
                            <Select   showSearch onSearch={onSearch} value={values.id} style={{ width: 120 }} filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    } onChange={(value)=> {
                              onChange(value, 'id')
                              }}>
                                {ids.filter(id=> {
                                  let a = true
                                   for (let i = 0;  i < users.length; i++) {
                                      if(users[i].id == id.employeeID) {
                                        a =  false
                                    }
                                  }
                                  return a  
                                }).map(id=> <Option key={id.employeeID} value={id.employeeID}>{id.employeeID}</Option>)}
                          </Select>
                        </div>: null}
                        <div className='form_group'>
                            <p>F.I.O</p>
                            <Input value={values.fio}  name='fio' onChange={onChange}/>
                        </div>
                        <div className='form_group'>
                            <p>Lavozimi</p>
                            <Input  value={values.lavozim}  name='lavozim' onChange={onChange}/>
                        </div>
                        <div className='form_group'>
                              <p style={{visibility:"hidden"}}>Lavozimi</p>
                              <Avatar setValues={setValues} values={values} loading={loading}></Avatar>
                        </div>
                    </div>
                </div>
        </Modal>
        </>
      )

    
   
    
  
}

export default Foydalanuvchilar