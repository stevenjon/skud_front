import moment from 'moment'
import React, { useEffect } from 'react'
const weeks = ["Якшанба","Душанба","Сешанба","Чоршанба","Пайшанба","Жума","Шанба"]
function ishFarqi(x) {
    if(x < 0) {
        return "+"+Math.abs(x)
    }else {
        return x
    }
}

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
const Xisobot = ({data, erta, ora, cursec, izoh}) => {
    let text = ""
    switch (ora) {
        case "today":
            text="Бугун"
            break;
            case "thisweek":
            text="Жорий хафтада"
            break;
            case "week":
                text="Ўтган хафтада"
                break;
                case "thismonth":
                    text="Жорий ойда"
                    break;
                    
                    case "month":
                        text="Ўтган ой"
                        break;

                        case "quarter":
                            text="Чорак давомида"
                            break;
                            case "year":
                                text="Йил мобайнида"
                                break;
    
        default:
            break;
    }
    let izohlar = izoh.filter(iz=> iz.izoh_turi == cursec)
    
    return (
        <div  style={{overflow:"auto"}} className='hisobot_hide'>
            {cursec == 3 ?  <><h2 style={{textAlign:"center"}}>{text} эрта кетган ходимлар тўғрисида маълумот</h2>
            <table id="table-to-xls" className="hisobot_table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Ф.И.Ш.</th>
                        <th>Лавозими</th>
                        <th>Ҳафта куни</th>
                        <th>Сана</th>
                        <th>Ишга келган</th>
                        <th>Ишдан кетган</th>
                        <th>Иш вақти (мин)</th>
                        <th>Ишлаган вақти (мин)</th>
                        <th>Иш вақтидан фарқи</th>
                        <th>Изох</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d,index)=> {
                         let ishVaqt = 0
                        return (
                            <>
                            <tr>
                                <td >{index + 1}</td>
                                <td >{d.fio}</td>
                                <td>{d.lavozim}</td>
                                {d.kelgan.length >0 ? <><td>{weeks[moment(d.kelgan[0].authDate).day()]}</td>
                                <td>{moment(d.kelgan[0].authDate).format("DD.MM.YYYY") }</td>
                                <td>{erta.filter(er=> er.authDate == d.kelgan[0].authDate && er.employeeID == d.id).length > 0 ? moment(erta.filter(er=> er.authDate == d.kelgan[0].authDate && er.employeeID == d.id)[0].authDateTime).format("HH:mm"): null}</td>
                                <td>{moment(d.kelgan[0].authDateTime).format("HH:mm") }</td>
                                <td>480</td>
                                <td>{Math.abs(moment("08:48", "HH:mm").diff(moment(moment(d.kelgan[0].authDateTime).format("HH:mm"), "HH:mm"), 'minute'))}</td>
                                <td>{ishFarqi(480 - Math.abs(moment("08:48", "HH:mm").diff(moment(moment(d.kelgan[0].authDateTime).format("HH:mm"), "HH:mm"), 'minute')))}</td>
                                <td>{izohlar.filter(iz=> iz.user_id == d.id && iz.time == d.kelgan[0].authDate).length > 0 ? izohlar.filter(iz=> iz.user_id == d.id && iz.time == d.kelgan[0].authDate)[0].izoh: null}</td></>:null}
                                
                            </tr>
                            {d.kelgan.map((k, index)=> {
                               
                                ishVaqt += Math.abs(moment("08:48", "HH:mm").diff(moment(moment(k.authDateTime).format("HH:mm"), "HH:mm"), 'minute'))
                                if(index > 0) {
                                    return (
                                        <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{weeks[moment(k.authDate).day()]}</td>
                                        <td>{moment(k.authDate).format("DD.MM.YYYY") }</td>
                                        <td>{erta.filter(er=> er.authDate == k.authDate && er.employeeID == d.id).length > 0 ? moment(erta.filter(er=> er.authDate == k.authDate && er.employeeID == d.id)[0].authDateTime).format("HH:mm"): null}</td>
                                        <td>{moment(k.authDateTime).format("HH:mm") }</td>
                                        <td>480</td>
                                        <td>{Math.abs(moment("08:48", "HH:mm").diff(moment(moment(k.authDateTime).format("HH:mm"), "HH:mm"), 'minute'))}</td>
                                        <td>{ishFarqi(480 - Math.abs(moment("08:48", "HH:mm").diff(moment(moment(k.authDateTime).format("HH:mm"), "HH:mm"), 'minute')))}</td>
                                        <td>{izohlar.filter(iz=> iz.user_id == d.id && iz.time == d.kelgan[0].authDate).length > 0 ? izohlar.filter(iz=> iz.user_id == d.id && iz.time == d.kelgan[0].authDate)[0].izoh: null}</td>
                                    </tr>  
                                    )
                                }else return null
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{d.kelgan.length} кун</td>
                                <td></td>
                                <td></td>
                                <td>{d.kelgan.length  * 480}</td>
                                <td>{ishVaqt}</td>
                                <td>{(d.kelgan.length  * 480) - ishVaqt}</td>
                                <td></td>
                            </tr>
                            </>
                        )
                    }
                         
                    )}
                    
                </tbody>

                <tfoot></tfoot>
            </table></>:null}



             {/* kelmaganlar */}

             {cursec == 1 ?  <><h2 style={{textAlign:"center"}}>{text} эрта кетган ходимлар тўғрисида маълумот</h2>
            <table id="table-to-xls" className="hisobot_table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Ф.И.Ш.</th>
                        <th>Лавозими</th>
                        <th>Ҳафта куни</th>
                        <th>Сана</th>
                        <th>Изох</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d,index)=> {
                         let ishVaqt = 0
                        return (
                            <>
                            <tr>
                                <td >{index + 1}</td>
                                <td >{d.fio}</td>
                                <td>{d.lavozim}</td>
                                <td>{weeks[moment(d.kelmagan[0]).day()]}</td>
                                <td>{moment(d.kelmagan[0]).format("DD.MM.YYYY") }</td>
                                <td>{izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(d.kelmagan[0]).format("YYYY-MM-DD")).length > 0 ? izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(d.kelmagan[0]).format("YYYY-MM-DD"))[0].izoh: null}</td>
                            </tr>
                            {d.kelmagan.map((k, index)=> {
                               
                                if(index > 0) {
                                    return (
                                        <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{weeks[moment(k).day()]}</td>
                                        <td>{moment(k).format("DD.MM.YYYY") }</td>
                                        <td>{izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(k).format("YYYY-MM-DD")).length > 0 ? izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(k).format("YYYY-MM-DD"))[0].izoh: null}</td>
                                    </tr>  
                                    )
                                }else return null
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{d.kelmagan.length} кун</td>
                                <td></td>
                            </tr>
                            </>
                        )
                    }
                         
                    )}
                    
                </tbody>

                <tfoot></tfoot>
            </table></>:null}




            {/* kech qolgan */}


            {cursec == 2 ?  <><h2 style={{textAlign:"center"}}>{text} эрта кетган ходимлар тўғрисида маълумот</h2>
            <table id="table-to-xls" className="hisobot_table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Ф.И.Ш.</th>
                        <th>Лавозими</th>
                        <th>Ҳафта куни</th>
                        <th>Сана</th>
                        <th>Келган вақти</th>
                        <th>Кеч қолган вақти</th>
                        <th>Изох</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d,index)=> {
                         let ishVaqt = 0
                        return (
                            <>
                            <tr>
                                <td >{index + 1}</td>
                                <td >{d.fio}</td>
                                <td>{d.lavozim}</td>
                                <td>{weeks[moment(d.kelgan[0]).day()]}</td>
                                <td>{moment(d.kelgan[0]).format("DD.MM.YYYY") }</td>
                                <td>{moment(d.kelgan[0]).format("HH:mm") }</td>
                                <td>{timeConvert(moment("09:01", "HH:mm").diff(moment(moment(d.kelgan[0]).format("HH:mm"), "HH:mm"), 'minute'))}</td>
                                <td>{izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(d.kelgan[0]).format("YYYY-MM-DD")).length > 0 ? izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(d.kelgan[0]).format("YYYY-MM-DD"))[0].izoh: null}</td>
                            </tr>
                            {d.kelgan.map((k, index)=> {
                                ishVaqt += Math.abs(moment("09:01", "HH:mm").diff(moment(moment(k).format("HH:mm"), "HH:mm"), 'minute'))                         
                                if(index > 0) {
                                    return (
                                        <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{weeks[moment(k).day()]}</td>
                                        <td>{moment(k).format("DD.MM.YYYY") }</td>
                                        <td>{moment(k).format("HH:mm") }</td>
                                        <td>{timeConvert(moment("09:01", "HH:mm").diff(moment(moment(k).format("HH:mm"), "HH:mm"), 'minute'))}</td>
                                        <td>{izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(k).format("YYYY-MM-DD")).length > 0 ? izohlar.filter(iz=> iz.user_id == d.id && iz.time == moment(k).format("YYYY-MM-DD"))[0].izoh: null}</td>
                                    </tr>  
                                    )
                                }else return null
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{d.kelgan.length} кун</td>
                                <td></td>
                                <td>{ishVaqt} мин</td>
                                <td></td>
                            </tr>
                            </>
                        )
                    }
                         
                    )}
                    
                </tbody>

                <tfoot></tfoot>
            </table></>:null}

            



        </div>
    )
}

export default Xisobot
