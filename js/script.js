var sunMama = [], sunSap = [], smallPot = [], largePot = [], water = [], scareCrow = [] , monthlyProduction = 0, nftPlant = [],nftPlantCounter, nonNFTPlantCounter = 0, nonNFTCounter = 0, nonNFTMotherTreeCounter = 0;
sunMama = {"plant_id" : 0 , "plantClass" : "'sMama'" , "type": "'nonNFT'", "name" : "'Sunflower Mama'" ,"cost" : 200, "generatedLE" : 850, "daysToProduce" : 6};
sunSap = {"plant_id" : 0 , "plantClass" : "'sSapling'" , "type": "'nonNFT'" , "name" : "'Sunflower Sappling'", "cost" : 200, "generatedLE" : 250, "daysToProduce" : 3};
smallPot = {"class" : "smPot" , "type": "tool" , "name" : "Small Pot", cost : 50, "quantity" : 1};
largePot = {"class" : "lgPot" , "type": "tool" , "name" : "Large Pot", cost : 100, "quantity" : 1};
water = {"class" : "water" , "type": "tool" , "name" : "Water", cost : 50, "quantity" : 100};
scareCrow = {"class" : "scCrow" , "type": "tool" , "name" : "Scare Crow", cost : 20, "quantity" : 20};
window.onload = function() {
    plantPreview(sunMama, "sMama");
    plantPreview(sunSap, "sSapling");
    pvuRefresh();
  };
// Get the modal
var modal = document.getElementById("donatepopup");

// Get the button that opens the modal
var btn = document.getElementById("btnDonate");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("donateclosebtn")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function pvuRefresh(){
    
    monthlyProduction = 0;
    monthlyEarning();
    document.getElementById("showNFT").innerHTML = "";
    for(let i = 0; i < nftPlant.length; i++){
        nftPlantPreview(nftPlant[i], "showNFT");
    }
    console.log("nft: " + nftPlant);
}

function plantPreview(plant = [], divId){
    console.log(plant);
    document.getElementById(divId).innerHTML =
    '<div id"'+ plant.plantClass + '">'+
        '<div class = "plantName">Name : ' + plant.name + '</div>' +
        '<div class = "plantCost">Cost : ' + plant.cost + '</div>' +
        '<div class = "plantProduction">Generated LE : ' + plant.generatedLE + 'LE' + ' / ' + plant.daysToProduce + ' days' +
        '<div class = "addPlant"><input type="submit" value="Add Plant" onclick="addPlant('+ plant.plantClass +',' + plant.name +',' + plant.type + ',' + plant.generatedLE + ',' + plant.daysToProduce +')"></div>' +
    '</div>';
}

function addPlant(plantclass, name, type, generatedLE, daysToProduce){
    console.log(plantclass);
    nonNFTCounter += 1;
    if(plantclass == "sMama"){
        nonNFTMotherTreeCounter += 1;
    }else{
        nonNFTPlantCounter += 1;
    }
    console.log(nonNFTPlantCounter + "," + nonNFTMotherTreeCounter)
    document.getElementById("shownonNFT").innerHTML +=
    '<div class="nftPlant" id="nonNFT' + nonNFTCounter + '">'+
        '<div class = "plantID">ID : ' + name + '</div>' +
        '<div class = "plantNFTtype">NFT Type : ' + type + '</div>' +
        '<div class = "plantProduction">Generated LE : ' + generatedLE + 'LE' + ' / ' + daysToProduce + ' days |</div>' +
        '<input type="submit" value="x" onclick="removenonNFTPlant(' + nonNFTCounter + ' )">'+
    '</div>';
    pvuRefresh();
    return;
}

function removenonNFTPlant(nonNFTCounter){
    var plantDiv = "nonNFT" + nonNFTCounter;
    console.log(plantDiv);
    document.getElementById(plantDiv).outerHTML ="";
}

function nftPlantPreview(plant = [], divId){
    var  cur_nftType = "'"+plant.nft_type+"'";
    document.getElementById(divId).innerHTML +=
    '<div class="nftPlant">'+
        '<div class = "plantID">ID : ' + plant.plant_id + '</div>' +
        '<div class = "plantNFTtype">NFT Type : ' + plant.nft_type + '</div>' +
        '<div class = "plantProduction">Generated LE : ' + plant.generatedLE + 'LE' + ' / ' + plant.daysToProduce + ' days |</div>' +
        '<input type="submit" value="x" onclick="removePlant(' + plant.id + ', ' + cur_nftType +  ' )">'+
    '</div>';
    return;
}

function removePlant(nftPlantID,nft_type){
    console.log(nftPlantID , nft_type);
    nftPlant.splice(nftPlantID, 1);
    pvuRefresh();
}

function leMonthlyProduction(plant = []){
     monthlyProduction = monthlyProduction + ((plant.generatedLE / plant.daysToProduce) * 30);
     console.log(monthlyProduction);
     document.getElementById("monthlyEarning").innerHTML = '<div>MONTHLY LE : '+ (monthlyProduction + 3000) + '</div>';
}

function addNFT(plantID, nftType, plantType, generatedLE, daysToProduce){
    if(plantID == "" || nftType == "" || plantType == "" || generatedLE == "" || daysToProduce == "" ){
        return;
    }
    nftPlantID = nftPlant.length;
    nftPlant = nftPlant.concat({"id" : nftPlantID, "plant_id" : plantID, "nft_type" : nftType, "type" : plantType, "generatedLE" : generatedLE, "daysToProduce": daysToProduce});
    pvuRefresh();
}

function monthlyEarning(){
    for(let i = 0; i < nftPlant.length; i++){
            leMonthlyProduction(nftPlant[i]);
    }
    for(let i = 0; i < nonNFTPlantCounter; i++){
        leMonthlyProduction(sunSap);
    }
    for(let i = 0; i < nonNFTMotherTreeCounter; i++){
        leMonthlyProduction(sunMama);
    }
}