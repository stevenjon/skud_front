import moment from "moment";

const ErtaClass = (users,logs)=> {

    let maped = users.map(user => {
    const obj = {
        ...user,
        kelgan: [],
        kelmagan: []
    }

        if(logs.length > 0) {
           logs.forEach(log => {
                if(log.employeeID == user.id) {
                    obj.kelgan.push(log)
                }
           });
        }

        obj.kelgan = obj.kelgan.reduce((acc, current) => {
            const x = acc.find(item => item.authDate === current.authDate);
            if (!x && current.deviceSN == "DS-K1T671M20210203V030200ENE19196630") {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          
        obj.kelgan = obj.kelgan.filter(k => {
              if(moment(k.authTime, 'HH:mm').isBefore(moment('18:01', 'HH:mm')) && moment(k.authTime, 'HH:mm').isAfter(moment('09:00', 'HH:mm'))) {
                
                return true
              }else {
                return false
              }
        })
         
    return obj
    })


    maped = maped.filter(m=> m.kelgan.length > 0)
    return maped
}

export default ErtaClass