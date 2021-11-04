var lastFilledColum = 0;
function getCriptoCurrenciesQuotation() {
  let quantityOfTokensCoinMarketCap = parseInt(activeSpreadsheet.getSheetByName("variables").getRange(3,2).getValues());
  let tokensCoinMarketCap = getTokensId(2,quantityOfTokensCoinMarketCap);
  let lastColumn = activeSpreadsheet.getSheetByName("CriptoValue").getLastColumn();
  tokensCoinMarketCap = getTokensId(2,quantityOfTokensCoinMarketCap + 1);
  tokensPancakeSwap = getTokensId(quantityOfTokensCoinMarketCap + 2,lastColumn);

  getTokenQuotation(tokensCoinMarketCap,tokensPancakeSwap)

  console.log()
  
}
function getTokensId(start,end){
  
  tokensArray = [];
  for(i=start;i<=end;i++){
    tokensArray.push(activeSpreadsheet.getSheetByName("CriptoValue").getRange(2,i).getValues());
  }
  return tokensArray;
}
function getTokenInfo(){
  let lastColumn = activeSpreadsheet.getSheetByName("CriptoValue").getLastColumn();
  tokensArray = [];
  for(j=2;j<=lastColumn;j++){
    let criptoSymbol = activeSpreadsheet.getSheetByName("CriptoValue").getRange(1,j).getValues();
    let id = activeSpreadsheet.getSheetByName("CriptoValue").getRange(2,j).getValues();
    let quoutation = activeSpreadsheet.getSheetByName("CriptoValue").getRange(3,j).getValues();
    let quantity =  activeSpreadsheet.getSheetByName("CriptoValue").getRange(4,j).getValues();
    let value =  parseFloat(activeSpreadsheet.getSheetByName("CriptoValue").getRange(5,j).getValues());
    tokensArray.push({id,criptoSymbol,quoutation,quantity,value});
  }
  return tokensArray;
}
function getTokenQuotation(tokensCoinMarketCap,tokensPancakeSwap){
  getTokenQuotationCoinMarketCap(tokensCoinMarketCap);
  getTokenQuotationPancakeSwap(tokensPancakeSwap);
}
function getTokenQuotationCoinMarketCap(tokensCoinMarketCap){
  let url = config.urlBaseCMC+'/v1/cryptocurrency/quotes/latest?'
    + 'id='+tokensCoinMarketCap
  let options = {
     "method" : "get",
     "headers" : {
       "X-CMC_PRO_API_KEY" : config.apiKeyCMC
     }
  };
  
  let response = UrlFetchApp.fetch(url,options);
  responseJSON = JSON.parse(response);
  
  for (i=0; i < tokensCoinMarketCap.length;i++){
    activeSpreadsheet.getSheetByName("CriptoValue").getRange(3,i+2).setValue(responseJSON.data[tokensCoinMarketCap[i]].quote.USD.price);
    lastFilledColum = i+2;
  }
}
function getTokenQuotationPancakeSwap(tokensPancakeSwap){
  let url = '';
  let response = '';
  let responseJSON= '';
  for (i=0; i < tokensPancakeSwap.length;i++){
    url = 'https://api.pancakeswap.info/api/v2/tokens/'+tokensPancakeSwap[i];
    response = UrlFetchApp.fetch(url);
    responseJSON = JSON.parse(response);
    if(responseJSON.data.price != 0){
      activeSpreadsheet.getSheetByName("CriptoValue").getRange(3,lastFilledColum+1).setValue(responseJSON.data.price);
    }
  }
}