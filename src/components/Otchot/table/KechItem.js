import moment from 'moment';
import React from 'react'
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
const KelmaganItem = ({text, ora, cursec}) => {
    return (
        <>
        {cursec == 2 ? <div className="holat_div" style={{backgroundColor:"#F21A1A",borderColor:"#F21A1A", height:"auto"}}>
                            <span style={{fontSize:"16px"}}>Кеч қолган</span><br></br>
                            <span style={{display:"flex", flexDirection:"column", lineHeight:"1"}}>
                                {ora == 'today' ?  <>
                                <b style={{marginTop:"15px"}}>{timeConvert(moment("09:01", "HH:mm").diff(moment(moment(text[0]).format("HH:mm"), "HH:mm"), 'minute'))}</b>
                                <span style={{fontSize:"12px"}}>
                                    {moment(text[0]).format("HH:mm")}
                                </span></>:<><b style={{ marginTop:"15px"}}>{text.filter(res=> {
                                     let a = true
                                    
                                         const start = moment(moment(res).format("HH:mm"), 'HH:mm')
                                         const endTime = moment('09:00', 'HH:mm');
                                         if(start.isBefore(endTime)) {
                                             
                                             a = false
                    
                                         }
                                         return a
                                       
                                }).length} марта</b>
                                </> }
                            </span>
                    </div>:null}

                   {cursec == 3 && text.length > 0 ? <div className="holat_div" style={ora == "today" ? {backgroundColor:"orange",borderColor:"orange"}: {backgroundColor:"#F21A1A",borderColor:"#F21A1A"}}>
                            <span style={{fontSize:"16px"}}>Эрта кетган</span><br></br>
                            <span style={{display:"flex", flexDirection:"column", lineHeight:"1"}}>
                                {ora == 'today' ?  <>
                                <b style={{marginTop:"15px"}}>{timeConvert(moment("18:00", "HH:mm").diff(moment(moment( text[0].authDateTime).format("HH:mm"), "HH:mm"), 'minute'))}</b>
                                <span style={{fontSize:"12px"}}>
                                    { moment(text[0].authDateTime).format("HH:mm")}
                                </span></>:<><b style={{marginTop:"15px"}}>{text ? text.length: null} марта</b> 
                                </> }
                            </span>
                    </div>:null} 
        
        
        </>
        
    )
}

export default KelmaganItem
