function getEarnings() {
    mountEarnings();
  }
  function mountEarnings() {
    let earnings = getGraphicData();
    earnings.forEach((element, index)=>{
      activeSpreadsheet.getSheetByName("earnings").getRange(1,index+2).setValue(element.criptoSymbol);
      activeSpreadsheet.getSheetByName("earnings").getRange(2,index+2).setValue(element.quantity);
      activeSpreadsheet.getSheetByName("earnings").getRange(6,index+2).setValue(element.value);
    })
  }