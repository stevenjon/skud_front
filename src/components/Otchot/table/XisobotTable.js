import React, { useEffect, useState } from 'react'
import { Tag, Space, Select } from 'antd';
import {Table} from "ant-table-extensions"
import { InstagramOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import BaseUrl from '../../../BaseUrl';
import Moment from 'react-moment';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import XisobotClass from './XisobotClass';
import KelmaganItem from './KelmaganItem';
import KechItem from './KechItem';
import Modal from 'antd/lib/modal/Modal';
import KelmaganTable from './KelmaganTable';
import KechTable from './KechTable';
import ErtaTable from './ErtaTable'
import ErtaClass from './ErtaClass'
import moment from 'moment';


function UmTable({users, ora,cursec, topmenu, izoh}) {
    const [logsbydate, setLogsbydate] = useState([])
    const [loading, setLoading] = useState(false)
    const [currec, setCurrec] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(()=> {
        if(cursec == 3) {
          fetchErtabydate()
        }else {
          fetchLogsbydate(ora)
        }
        
    }, [ora,cursec, topmenu])
    const fetchLogsbydate =async (date) => {
        setLoading(true)            

        const formData = new FormData()
        formData.append("date", date);
        try {
          const res = await axios.post(`${BaseUrl}getlogsbydate`, formData)
          if(res.status == 200) {
            let info = []

            if(cursec == 1) {
                info = XisobotClass(users,res.data, ora).filter(res => res.kelmagan.length > 0) 
            }

            if(cursec == 2) {
                if(ora != "today") {
                    info = XisobotClass(users,res.data, ora).filter(res => {
                    let a = false
                    for (let i = 0; i < res.kelgan.length; i++) {
                        const start = moment(moment(res.kelgan[i]).format("HH:mm"), 'HH:mm')
                        const endTime = moment('09:00', 'HH:mm');
                        if(!start.isBefore(endTime)) {
                            
                          a = true
                        }
                        }
                        return a
                    })
                }else {
                    info = XisobotClass(users,res.data, ora).filter(res => {
                        let a = false
                        for (let i = 0; i < res.kelgan.length; i++) {
                            
                            if(moment(res.kelgan[i]).format("YYYY-MM-DD").isSame(moment().format("YYYY-MM-DD"))) {
                                
                                a = true
                            }
                            }
                            return a
                        })

                     
                }
               
            }

            
            info = info.map(info => {
                const obj = {
                  bolim: info.bolim,
                  fio: info.fio,
                  id: info.id,
                  lavozim:info.lavozim,
                  rasm: info.rasm,
                  kelmagan: info.kelmagan
                }
                let yangikelgan = []
                // remove duplicates
                // tranfrom datetime into date
                const dategaogir = info.kelgan.map(d=> moment(d).format("MM-DD-YYYY"))
                const uniqset = new  Set(dategaogir)
                const arraygaogir = [...uniqset]

                for (let i = 0; i < arraygaogir.length; i++) {
                  yangikelgan.push(info.kelgan[dategaogir.indexOf(arraygaogir[i])])
                }

                obj.kelgan = yangikelgan

                return obj
            })
            setLogsbydate(info)
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
              
              setLogsbydate(ErtaClass(users, res.data))
              setLoading(false)
        }
      } catch (error) {
        
      }
    }


    const onClickRow = (record) => {
        return {
            onClick: ()=> {
                setCurrec(record)
                setIsModalVisible(true)
            }
        }
    }

    const onCancel = () => {
        setIsModalVisible(false)
    }
    console.log(logsbydate)
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
        },
        cursec == 1 ?  {
            title: 'Holat',
            dataIndex: 'kelmagan',
            render: (text) => <KelmaganItem text={text}></KelmaganItem>,
            width:"200px",
            sorter: (a, b) => a.kelmagan.length - b.kelmagan.length,
            sortDirections: ['descend', 'ascend'],
          }:{
            title: 'Holat',
            dataIndex: 'kelgan',
            render: (text) => <KechItem text={text} ora={ora} cursec={cursec}></KechItem>,
            width:"200px",
            sorter: (a, b) => a.kelgan.length - b.kelgan.length,
            sortDirections: ['descend', 'ascend'],
          },
       
      ];
      let a = ""
      if(cursec == 1) {
          a = "келмаган"
      }else if (cursec == 2) {
        a = "кеч қолган"
      }else if(cursec == 3) {
        a = "ерта кетган"
      }
      return (
        <>
       
        <Table 
            columns={columns} 
            dataSource={logsbydate}
            loading={loading}
            onRow={onClickRow}
            
            searchableProps={{ fuzzySearch: false, inputProps: {
                placeholder: "Ф.И.Ш бўйича қидириш",
                prefix: <SearchOutlined />,
              }, }} 
        />
        <Modal 
        centered
        title={currec ? currec.lavozim + " "+ currec.fio + "нинг "+a+" кунлари ": null} 
        visible={isModalVisible} 
        onCancel={onCancel}
        footer={null}
        >
        {cursec == 1 ? <KelmaganTable record={currec} izoh={izoh}></KelmaganTable>: null}
        {cursec == 2 ? <KechTable record={currec}></KechTable>: null}
        {cursec == 3 ? <ErtaTable record={currec}></ErtaTable>: null}
      </Modal>
      
        </>
      )
}


export default UmTable