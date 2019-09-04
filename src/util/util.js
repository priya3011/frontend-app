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
