function getWalletBalance() {
    tokensArray = getTokensId();
    module = 'account';
    action = 'tokenbalance';
    tag = 'latest';
    apiKey = 'YOUR_API_KEY';
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var lastColumn = activeSpreadsheet.getSheetByName("CriptoAmount").getLastColumn();
    var lastRow = activeSpreadsheet.getSheetByName("CriptoAmount").getLastRow();
    quantityOfAddress = activeSpreadsheet.getSheetByName("variables").getRange(1,2).getValue();
    startPoint = activeSpreadsheet.getSheetByName("variables").getRange(2,2).getValue();
  
    for(j=1;j<=quantityOfAddress;j++){
      address = activeSpreadsheet.getSheetByName("CriptoAmount").getRange(j+startPoint,1).getValue();
      for(i=2;i<=lastColumn;i++)
      {
        tokenAddress = activeSpreadsheet.getSheetByName("CriptoAmount").getRange(1,i).getValue();
        if(tokenAddress != 'BNB' && tokenAddress != '0x5373fde83045baa55620478048389e504edad339' && tokenAddress != 'NA'){
          var url = `https://api.bscscan.com/api?module=${module}&action=${action}&contractaddress=${tokenAddress}&address=${address}&tag=${tag}&apikey=${apiKey}`
          var response = UrlFetchApp.fetch(url);
          responseJSON = JSON.parse(response);
          activeSpreadsheet.getSheetByName("CriptoAmount").getRange(j+startPoint,i).setValue(parseInt(responseJSON.result) / 10 ** 18);
        }else if(tokenAddress == 'BNB'){
          var url = `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=${apiKey}`
          var response = UrlFetchApp.fetch(url);
          responseJSON = JSON.parse(response);
          activeSpreadsheet.getSheetByName("CriptoAmount").getRange(j+startPoint,i).setValue(parseInt(responseJSON.result) / 10 ** 18);
        }else if(tokenAddress == '0x5373fde83045baa55620478048389e504edad339'){
          var url = `https://api.bscscan.com/api?module=${module}&action=${action}&contractaddress=${tokenAddress}&address=${address}&tag=${tag}&apikey=${apiKey}`
          var response = UrlFetchApp.fetch(url);
          responseJSON = JSON.parse(response);
          activeSpreadsheet.getSheetByName("CriptoAmount").getRange(j+startPoint,i).setValue(parseInt(responseJSON.result) / 10 ** 9);
        }else if(tokenAddress == 'NA'){
           activeSpreadsheet.getSheetByName("CriptoAmount").getRange(j+startPoint,i).setValue(0);
        }
      }
    }
  }
  