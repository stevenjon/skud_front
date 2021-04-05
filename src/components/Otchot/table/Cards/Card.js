import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import Moment from 'react-moment';
import BaseUrl from '../../../../BaseUrl'
import KelmaganItem from '../KelmaganItem';
import KechItem from '../KechItem';

function fromNow(time) {
    const d = new Date()
    // get total seconds between the times
    var delta = Math.abs(new Date() - new Date(time) ) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let express = ""
    if(days > 0) {
        express = days + "к"
    }
    if(hours > 0) {
        express = express + " "+hours+"с"
    }

    if(minutes > 0) {
        express = express + " "+minutes+"мин"
    }

    return express
     
}
const Card = ({record, cursec, ora, click}) => {
    
    return (
        <div className="otchot_card" onClick={()=> {
                if(cursec !=0) {
                    click(record)
                }
            }}>
            <div className="card_img">
                <img style={{width:"71px", height:"89px", borderRadius:"4px"}} src={BaseUrl+record.rasm}></img>
            </div>
            <div className="card_name">
                <div style={{marginLeft:"20px", width:"210px"}} className="card_fio"> 
                    <h2 style={{margin:"0", fontSize:"18px", fontWeight:"bold", lineHeight:"1"}}>{record.fio}</h2>
                    
                    <div style={{display:"flex"}}>
                    <span style={{color:"#737171",margin:"5px 0 -5px 0", fontSize:"14px", fontWeight:"bold", lineHeight:"1"}}>{record.lavozim}</span>
                        {/* <div style={{backgroundColor:"#A5D9FF"}}>Касал</div> */}
                    </div>
                </div>
                
            </div>
            {cursec == 0 ?<div className="holat_div" style={record.in ? {backgroundColor:"#C2F3E1", borderColor:"#04BA77"}: {backgroundColor:"#FFEBEE", borderColor:"#EF9A9A"}}>
                            <span style={record.in ? {fontSize:"16px", color:"#04BA77"}: {fontSize:"16px", color:"#D32F2F"}}>{record.in ? "Бинода":"Ташқарида"}</span><br></br>
                            <span style={{display:"flex",marginTop:"20px", flexDirection:"column", lineHeight:"1"}}>
                                <b style={record.in ? {color:"#04BA77"}:{color:"#EF9A9A"}}>{ record.date  ? fromNow(record.date): "номалум"}</b>
                                <span style={record.in ? {fontSize:"12px", marginTop:"2px", color:"#04BA77"}: {fontSize:"12px", marginTop:"2px", color:"#EF9A9A"}}>
                                   {record.date ? <Moment format="DD.MM.YYYY HH:mm">
                                         {record.date}
                                    </Moment>: null}
                                </span>
                            </span>
            </div>: null}
            {cursec == 1 ? <KelmaganItem text={record.kelmagan}></KelmaganItem>: <KechItem text={record.kelgan} ora={ora} cursec={cursec}></KechItem>}


        </div>
    )
}

export default Card
