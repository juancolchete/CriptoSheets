function createMenu() {
    SpreadsheetApp.getUi().createMenu("Crypto")
     .addItem("Get quotation", "getQuotation")
     .addToUi();
 }
 
 function getQuotation() {
   getCriptoCurrenciesQuotation();
 }
 