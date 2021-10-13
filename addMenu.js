function createMenu() {
  SpreadsheetApp.getUi().createMenu("Crypto")
   .addItem("Get quotation", "getQuotation")
   .addItem("Get wallet balance", "getBalance")
   .addToUi();
}

function getQuotation() {
 getCriptoCurrenciesQuotation();
}

function getBalance(){
 getWalletBalance()
}
