function createMenu() {
  SpreadsheetApp.getUi().createMenu("Crypto")
   .addItem("Get quotation", "getQuotation")
   .addItem("Get wallet balance ", "getBalance")
   .addItem("Get graphic ", "getGraphic")
   .addToUi();
}

function getQuotation() {
 getCriptoCurrenciesQuotation();
}

function getBalance(){
 getWalletBalance()
}
function getGraphic(){
 generateGraphic()
}