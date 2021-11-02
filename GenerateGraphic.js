function generateGraphic() {
    mountGraphic();
  }
  
  function mountGraphic(){
    graphicData = getGraphicData()
    graphicData.forEach((element, index)=>{
      activeSpreadsheet.getSheetByName("Graphic").getRange(1,index+1).setValue(element.criptoSymbol);
      activeSpreadsheet.getSheetByName("Graphic").getRange(2,index+1).setValue(element.value);
      activeSpreadsheet.getSheetByName("Graphic").getRange(3,index+1).setValue(element.porcentage);
    })
  }
  
  function getGraphicData(){
    var graphicData = getTokenInfo();
    graphicData = getSumGraphicData(graphicData);
    graphicData = calculatePercentage(graphicData)
    graphicData = orderGraphicData(graphicData);
    return graphicData;
  }
  
  
  function getSumGraphicData(graphicData){
    graphicData.sum = 0;
    graphicData.forEach((element)=>{
      graphicData.sum += element.value;
    })
    return graphicData;
  }
  
  function calculatePercentage(graphicData){
    graphicData.forEach((element,index)=>{
      graphicData[index].porcentage = element.value/graphicData.sum;
    })
    return graphicData;
  }
  
  function orderGraphicData(graphicData){
    return graphicData.sort((a, b) => (a.value < b.value) ? 1 : -1);
  }