import moment from "moment";

const XisobotClass = (users,logs, ora, sana)=> {
    const maped = users.map(user => {
    const obj = {
        ...user,
        kelmagan: [],
        kelgan: []
    }

        if(logs.length > 0) {
            let start;
            switch (ora) {
                case "today":
                    start = moment() 
                    break;
                case "thisweek":
                 
                    start = moment().subtract(0, "weeks").startOf("week");
                   
                    if(start.isAfter(moment(sana).subtract(1, "days"))) {
                        
                    }else {
                       start = moment(sana)
                    }
                    break;
                case "week":
                        start = moment().subtract(1, "weeks").startOf("week");
                        if(start.isAfter(moment(sana).subtract(1, "days"))) {
                        
                        }else {
                           start = moment(sana)
                        }
                        break;
                        case "thismonth":
                            start = moment().subtract(0, "months").startOf("month");
                            if(start.isAfter(moment(sana).subtract(1, "days"))) {
                        
                            }else {
                               start = moment(sana)
                            }
                            break;
                            case "month":
                    start = moment().subtract(1, "months").startOf("month");
                    if(start.isAfter(moment(sana).subtract(1, "days"))) {
                        
                    }else {
                       start = moment(sana)
                    }
                    break;
                    case "quarter":
                    start = moment().subtract(3, "months").startOf("months");
                    if(start.isAfter(moment(sana).subtract(1, "days"))) {
                        
                    }else {
                       start = moment(sana)
                    }
                    break;

                    case "year":
                        start = moment().subtract(0, "years").startOf("year");
                        if(start.isAfter(moment(sana).subtract(1, "days"))) {
                        
                        }else {
                           start = moment(sana)
                        }
                        break;       
                default:
                    break;
            }
            var end = moment();
            const dates = []
            var loop = new Date(start);
            while(loop <= end){
                if(ora !="today") {
                    if((moment(loop).format("YYYY-MM-DD") != moment().format("YYYY-MM-DD"))) {
                        dates.push(moment(loop).format("YYYY-MM-DD")) 
                    }
                }else {
                    dates.push(moment(loop).format("YYYY-MM-DD")) 
                }
 
                
                     
                var newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }
    
            logs.forEach(log => {
                if(dates.includes(log.authDate) && user.id == log.employeeID) {
                    obj.kelgan.push(log.authDate)  
                }   
            })
           
            obj.kelmagan = dates.filter(d=> {
                let a = true
                for (let  i= 0;  i < obj.kelgan.length; i++) {
                    if(obj.kelgan[i] == d) {
                        a = false
                    }       
                }
                return a
            })
            obj.kelgan = []
            logs.forEach(log => {
                if(dates.includes(log.authDate) && user.id == log.employeeID) {
                    obj.kelgan.push(log.authDateTime)  
                }   
            })
        }
       
        
    return obj
})
return maped
}

export default XisobotClass