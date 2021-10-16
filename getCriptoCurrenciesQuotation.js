function getCriptoCurrenciesQuotation() {
  tokensArray = getTokens();
  var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?'
    + 'id='+tokensArray
  var options = {
     "method" : "get",
     "headers" : {
       "X-CMC_PRO_API_KEY" : "YOUR_API_KEY"
     }
  };
  
  var response = UrlFetchApp.fetch(url,options);
  responseJSON = JSON.parse(response);
  
  for (i=0; i < tokensArray.length;i++){
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CriptoValue").getRange(3,i+2).setValue(responseJSON.data[tokensArray[i]].quote.USD.price);
  }
}
function getTokens(){
  var quantityOfTokens = parseInt(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("variables").getRange(3,2).getValues());
  tokensArray = [];
  for(i=2;i<=quantityOfTokens + 1;i++){
    tokensArray.push(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CriptoValue").getRange(2,i).getValues());
  }
  return tokensArray;
}
