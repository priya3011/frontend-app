/**
 * Extract data from server responds for charts or tables
 */

export const doughnutChart = (data)=>{
    let chartData = [];
        if(JSON.stringify(data) !== '{}'){
            for(let i=0; i<data.user_balance.length; i++){
                chartData.push({
                    name: data.user_balance[i].investment_name,
                    y: data.user_balance[i].balance/* _cad */
                });
            }
        }
    return chartData;
}

/** Convert the date format coming from the server */
const convertDateInLineChart = (dateStr)=>{
    // console.log("dateStr", dateStr)
    const date = dateStr.slice(0,2);
    const month = dateStr.slice(3,5);
    const year = dateStr.slice(6);
    return year+"/"+month+"/"+date;
}

/** Use for sorting */
const compare = (property)=>{
    return (obj1,obj2)=>{
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
    }
}

export const lineChart = (data, interval)=>{

    console.log("linechart ",data)
    let chartData = [];
    const startMilliseconds = new Date().setHours(0,0,0,0) - interval*24*60*60*1000;
    if (!data) return [];
    // console.log("startMilliseconds: ", (Date.now()));
    
        if(JSON.stringify(data) !== '{}'){
            let balanceHistory = data.balance_history;
            for(let i=0; i<balanceHistory.length; i++){
                let obj = {
                    
                   
                    name: balanceHistory[i].investment_name,
                    data: []
                 };
                let accountHistory = balanceHistory[i].account_history
                console.log("lastMillisecond: ",Date.parse(convertDateInLineChart(balanceHistory[i].account_history[0].date)));
                for(let j=0; j<accountHistory.length; j++){
                    
                    let dateMilliseconds = Date.parse(convertDateInLineChart(accountHistory[j].date));
                    // if(dateMilliseconds >= startMilliseconds){
                    obj.data.push( {x:Date.parse(convertDateInLineChart(accountHistory[j].date)), y:accountHistory[j].account_balance/* _cad */} )
                    // }
                }
                obj.data.sort(compare('x'));
                chartData.push(obj);
            }
        }
        //console.log("Line-chart-data: ", chartData)
    return chartData;
}

export const lineChartSingleSeries = (investment_name, data, interval)=>{

    console.log("linechart ",data)
    let chartData = [];
    const startMilliseconds = new Date().setHours(0,0,0,0) - interval*24*60*60*1000;
    if (!data) return [];
    // console.log("startMilliseconds: ", (Date.now()));
    
        if(JSON.stringify(data) !== '{}'){
            let balanceHistory = data.balance_history;
            
                let obj = {
                    
                   
                    name: investment_name,
                    data: []
                 };
                
               
                for(let j=0; j<balanceHistory.length; j++){
                    
                    let dateMilliseconds = Date.parse(convertDateInLineChart(balanceHistory[j].date));
                    // if(dateMilliseconds >= startMilliseconds){
                    obj.data.push( {x:Date.parse(convertDateInLineChart(balanceHistory[j].date)), y:balanceHistory[j].account_balance/* _cad */} )
                    // }
                }
                obj.data.sort(compare('x'));
                chartData.push(obj);
        
        }
        //console.log("Line-chart-data: ", chartData)
    return chartData;
}

export const transactionTable = (data, search)=>{
    if(JSON.stringify(data) !== '{}'){
        const serverData = data.transaction_history;
        let tableData = [];
        if(search !== ''){
            tableData = serverData.filter((one)=>{
                return (
                    (new Date(one.time).toLocaleDateString().indexOf(search)) !== -1 ||
                    (one.description.toLowerCase().indexOf(search.toLowerCase())) !== -1 ||
                    (one.investment_name.toLowerCase().indexOf(search.toLowerCase())) !== -1 ||
                    one.amount === +search ||
                    one.account_balance === +search
                )
            });
            return tableData;
        }
        return serverData
    }
    return [];
}
