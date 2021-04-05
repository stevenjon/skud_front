import moment from 'moment';
import React from 'react'

const KelmaganItem = ({text}) => {
    return (
        <div className="holat_div" style={moment(text[0]).isSame(moment().format("YYYY-MM-DD")) ? {backgroundColor:"orange", borderColor:"orange"}:{backgroundColor:"#F21A1A",borderColor:"#F21A1A", height:"auto"}}>
                            <span style={{fontSize:"16px"}}>{moment(text[0]).isSame(moment().format("YYYY-MM-DD")) ? "Номалум":"Келмаган"} </span><br></br>
                            <span style={{display:"flex", flexDirection:"column", lineHeight:"1", marginTop:"15px"}}>
                               {moment(text[0]).isSame(moment().format("YYYY-MM-DD")) ?  "":<b>{text.length}кун</b>}
                                <span style={{fontSize:"12px"}}>
                                    {/* {text.map(t=> moment(t).format("DD.MM.YYYY")).join(", ")} */}
                                </span>
                            </span>
                    </div>
    )
}

export default KelmaganItem
