const TableClass = (users,logs)=> {

                const maped = users.map(user => {
                const obj = {
                    ...user,
                    in: false,
                    date:false
                }

                if(logs.length > 0) {
                    logs.forEach(log => {
                        if(log.employeeID == user.id) {
                            obj.date = log.authDateTime
                           
                            if(log.deviceSN == 'DS-K1T671M20210203V030200ENE19196584'){
                                obj.in = true
                            }else {
                                obj.in = false
                            }
                        }
                    })
                }
                return obj
            })

            return maped
}

export default TableClass