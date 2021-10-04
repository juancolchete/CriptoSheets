function moutRanking() {
    var lastRowItem = 0;
    var sumSeed = 0;
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var rowLightEnergy = activeSpreadsheet.getSheetByName("LightEnergy").getLastRow();
    var columnLightEnergy = activeSpreadsheet.getSheetByName("LightEnergy").getLastColumn();
    for(i=2;i<columnLightEnergy+1;i++){
      lastLightEnergy = activeSpreadsheet.getSheetByName("LightEnergy").getRange(rowLightEnergy,i).getValue();
      sumSeed = activeSpreadsheet.getSheetByName("SumSeeds").getRange(2,i-1).getValue();
      lastRowItem = lastLightEnergy + (sumSeed * 10000)
      activeSpreadsheet.getSheetByName("Ranking").getRange(2,i-1).setValue(lastRowItem);
    }
  }
  