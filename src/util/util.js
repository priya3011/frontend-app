export function formatAmount(amount){

  let strAmount = amount.toString();
  let [beforeDecimal, afterDecimal] = strAmount.split(".");
  // console.log(beforeDecimal, afterDecimal)

  let reverseBeforeDecimal = beforeDecimal.split("").reverse().join("")
  beforeDecimal = reverseBeforeDecimal.replace(/.{3}/g, '$& ,').split("").reverse().join("")

  afterDecimal = afterDecimal.replace(/.{4}/g, '$&, ')

  //
  // console.log(beforeDecimal)
  // console.log(afterDecimal)

  let formattedAmount = [beforeDecimal, afterDecimal].join(".")
  formattedAmount = formattedAmount.trim().replace(/(^,)|(,$)/g, "")
  return formattedAmount;
}
