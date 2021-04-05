import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Search from 'antd/lib/input/Search';
import { Option } from 'antd/lib/mentions';
import React from 'react'
import square from '../../../Photos/square.png'
import xsquare from '../../../Photos/xsquare.png'
import check from '../../images/check.png'
import times from '../../images/times.png'

  
const Actions = ({data, setInfo, setTotal, setOrta, cursec}) => {

    const onSearch = (value)=> {
        if(value.length > 0) {
            setInfo(data.filter(d=> d.fio.toLowerCase().indexOf(value.toLowerCase()) !== -1))
            setTotal(1)
        }else {
            setInfo(data)
            setTotal(data.length)
        }
    }
    const tartiblash = (value)=> {
        if(value == "in") {
            setInfo(data.filter(d=> d.in))
            setOrta(data.filter(d=> d.in))
            
            setTotal(data.filter(d=> d.in).length)
        }else if(value == "out") {
            setInfo(data.filter(d=> !d.in))
            setOrta(data.filter(d=> !d.in))
            setTotal(data.filter(d=> !d.in).length)
        }else {
            setInfo(data)
            setOrta(data)
            setTotal(data.length)
        }
    }

    const onChange = (e) => {
        if (e.target.value == "") {
            setInfo(data)
            setTotal(data.length)
        }
    }
    return (
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>    
            <Search style={{width:"400px"}} placeholder="Ф.И.Ш бўйича қидириш" onChange={onChange} onSearch={onSearch} enterButton />
            </div>
            <div style={{display:"flex", alignItems:"flex-end"}}>
                <div>
                    {/* <h2 style={{margin:"0 10px 0 0 ", color:"#00A9D4", fontSize:"24px"}}>Ходимлар {cursec == 0 ? <><img src={square}></img> {data.filter(d=> d.in).length} та <span style={{color:"#F21A1A"}}><img src={xsquare}></img> {data.filter(d=> !d.in).length} та</span></>:<span style={{color:"#EF9A9A"}}>{data.length+" ta"}</span> }</h2> */}
                    <h2 style={{margin:"0 10px 0 0 ", color:"#00A9D4", fontSize:"20px"}}>Ходимлар &nbsp; {cursec == 0 ? <><img src={check}></img> {data.filter(d=> d.in).length} та <span style={{color:"#F21A1A"}}><img src={times}></img> {data.filter(d=> !d.in).length} та</span></>:<span style={{color:"#EF9A9A"}}>{data.length+" ta"}</span> }</h2>
                </div>
                {cursec == 0 ?<div style={{display:"flex", flexDirection:"column"}}>
                    <span style={{color:"#756F86", fontWeight:"500"}}>Тартиблаш</span>
                    <Select defaultValue="0" onChange={tartiblash}  style={{ width: 200 }}>
                        <Option value="0">Тартиблаш</Option>
                        <Option value="in">Бинода</Option>
                        <Option value="out">Ташқарида</Option>
                    </Select>
                </div>:null}
            </div>
        
        </div>
    )
}

export default Actions
