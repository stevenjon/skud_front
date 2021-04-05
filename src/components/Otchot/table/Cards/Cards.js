import { Pagination, Spin } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import Actions from '../Actions'
import KelmaganTable from '../KelmaganTable'
import KechTable from '../KechTable'
import ErtaTable from '../ErtaTable'
import Card from './Card'

const Cards = ({data, loading, izoh, cursec, ora}) => {
    const [info, setInfo] = useState([])
    const [orta, setOrta]= useState([])
    const [total, setTotal] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currec, setCurrec] = useState({})
    useEffect(()=> {
        if(data.length > 0) {
            let a = []
            let end = 20
            if(data.length > end) {

            }else {
                end = data.length
            }
        for (let i = 0; i < end; i++) {
            a.push(data[i])
        }
        
        setInfo(a)
        setOrta(data)
        setTotal(data.length)
        }else {
            setInfo([])
            setOrta([])
            setTotal([])
        }
        
    }, [data])
    const paginate = (page)=> {
        const start = (page - 1) * 20
        let end = start + 20
        if(end > total) {
            end = total
        }
        let a = []
        for (let i = start; i < end; i++) {
            a.push(orta[i])
        }
        setInfo(a)
    }   

    let a = ""
    if(cursec == 1) {
        a = "келмаган"
    }else if (cursec == 2) {
      a = "кеч қолган"
    }else if(cursec == 3) {
      a = "эрта кетган"
    }
    const onCancel = () => {
        setIsModalVisible(false)
    }
    const handleClick = (d)=> {
        console.log("sads")
        setCurrec(d)
        setIsModalVisible(true)
    }
    return (
        <>  
        <Actions data={data} setInfo={setInfo} setTotal={setTotal} setOrta={setOrta} cursec={cursec}></Actions>
        <Spin spinning={loading}>
        <div className="otchot_cards">
            {info.length > 0 ?  info.map(d=> <Card key={d.id} click={handleClick} cursec={cursec} ora={ora} record={d}></Card>): null}         
        </div>
        </Spin>
        <div style={{marginTop:"25px",display:"flex",justifyContent:"center", width:"100%"}}>
            <Pagination showSizeChanger={false} onChange={paginate} pageSize="20" defaultCurrent={1} total={total} />
        </div>

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

export default Cards
