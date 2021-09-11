function getCriptoCurrenciesQuotation() {
  var tokenId = "1,1027,1839,2010,3992,825,4687,7186,9377,11130,1958,11387"//variable with the criptocurrencies ids

  var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?'
    + 'id='+tokenId
  var options = {
     "method" : "get",
     "headers" : {
       "X-CMC_PRO_API_KEY" : "YOUR_API_KEY"//API key from coinmaketcap
     }
  };
  tokensArray = tokenId.split(",");
  var response = UrlFetchApp.fetch(url,options);
  responseJSON = JSON.parse(response)
  
  var criptoPrices = []
  for (i=0; i < tokensArray.length;i++){
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("YourSheetName").getRange(3,i+2).setValue(responseJSON.data[tokensArray[i]].quote.USD.price);
  }
}
