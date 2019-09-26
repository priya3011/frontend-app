export function formatAmount(amount, isCAD=false){

  if(!amount) return "-";

  let dp = isCAD? 2 : 8;

  let strAmount = parseFloat(amount).toFixed(dp);
  let [beforeDecimal, afterDecimal] = strAmount.split(".");
  // console.log(beforeDecimal, afterDecimal)

  let reverseBeforeDecimal = beforeDecimal.split("").reverse().join("")
  beforeDecimal = reverseBeforeDecimal.replace(/.{3}/g, '$& ,').split("").reverse().join("")

  if(!afterDecimal)
    afterDecimal = ''
  else
    afterDecimal = afterDecimal.replace(/.{4}/g, '$&, ')

  //
  // console.log(beforeDecimal)
  // console.log(afterDecimal)

  let formattedAmount = [beforeDecimal, afterDecimal].join(".")
  formattedAmount = formattedAmount.trim().replace(/(^,)|(,$)/g, "")
  return formattedAmount.trim();
}

export function filterRow(row, headers, query){
  let i = 0
  let tableHeaders = headers

  for (i; i< tableHeaders.length; i++){
      let key = tableHeaders[i]
      
      if (key == "time"){
          if (new Date(row[key]).toLocaleDateString().includes(query.toLowerCase())) {
              return true
          }
       }

      // if (key == "amount_cad"){
      //     let amount = '$' + formatAmount((+row[key]).toFixed(2),true)
      //     amount = amount.replace(/\s/g, ''); //remove spaces
      //     if (String(amount).includes(query.toLowerCase())){
      //         return true
      //     }
      // }

      if (key == "amount"){
          let amount = formatAmount(+row[key])
          console.log("AMOUNT:" + amount)
          console.log("MATCH:" + query)
          amount = amount.replace(/\s/g, ''); //remove spaces
          if (String(amount).includes(query.toLowerCase()) ||
          String(row[key]).includes(query.toLowerCase()))
          {
              return true
          }
      }

      // if (String(row[key]).toLowerCase().includes(query.toLowerCase())){
      //     return true
      // }
       
  }
  return false
}
