var sunMama = [], sunSap = [], smallPot = [], largePot = [], water = [], scareCrow = [] , monthlyProduction = 0, nftPlant = [],nftPlantCounter, nonNFTPlantCounter = 5, nftMTCounter, nonNFTMTCounter = 1;
sunMama = {"class" : "sMama" , "type": "non-nft Plant", "name" : "Sunflower Mama" ,"cost" : 200, "generatedLE" : 850, "daysToProduce" : 6};
sunSap = {"class" : "sSap" , "type": "non-nft Plant" , "name" : "Sunflower Sappling", "cost" : 200, "generatedLE" : 250, "daysToProduce" : 3};
smallPot = {"class" : "smPot" , "type": "tool" , "name" : "Small Pot", cost : 50, "quantity" : 1};
largePot = {"class" : "lgPot" , "type": "tool" , "name" : "Large Pot", cost : 100, "quantity" : 1};
water = {"class" : "water" , "type": "tool" , "name" : "Water", cost : 50, "quantity" : 100};
scareCrow = {"class" : "scCrow" , "type": "tool" , "name" : "Scare Crow", cost : 20, "quantity" : 20};
window.onload = function() {
    plantPreview(sunMama, "sMama");
    plantPreview(sunSap, "sSapling");
    pvuRefresh();
  };
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
    document.getElementById(divId).innerHTML =
    '<div class"'+ plant.class + '">'+
        '<div class = "plantName">Name : ' + plant.name + '</div>' +
        '<div class = "plantCost">Cost : ' + plant.cost + '</div>' +
        '<div class = "plantProduction">Generated LE : ' + plant.generatedLE + 'LE' + ' / ' + plant.daysToProduce + ' days'
    '</div>';
}
function nftPlantPreview(plant = [], divId){
    var  cur_nftType = "'"+plant.nft_type+"'";
    document.getElementById(divId).innerHTML +=
    '<div class"nft-plant">'+
        '<div class = "plantID">ID : ' + plant.plant_id + '</div>' +
        '<div class = "plantNFTtype">NFT Type : ' + plant.nft_type + '</div>' +
        '<div class = "plantProduction">Generated LE : ' + plant.generatedLE + 'LE' + ' / ' + plant.daysToProduce + ' days |</div>' +
        '<input type="submit" value="x" onclick="removePlant(' + plant.id + ', ' + cur_nftType +  ' )">'+
    '</div>';
    return;
}

function removePlant(nftPlantID,nft_type){
    console.log(nftPlantID , nft_type);
    if(nft_type == "mother tree"){
        nonNFTMTCounter += 1;
    }else{
        nonNFTPlantCounter += 1;
    }
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
    if(nftType == "Mother Tree"){
        nonNFTMTCounter -= 1;
        if(nonNFTMTCounter < 0){
            alert("sobra Mother tree");
            return;
        }
    }else{
        nonNFTPlantCounter -= 1;
        console.log(nonNFTPlantCounter);
        if(nonNFTPlantCounter < 0){
            alert("sobra Plant");
            return;
        }
    }
    nftPlantID = nftPlant.length;
    nftPlant = nftPlant.concat({"id" : nftPlantID, "plant_id" : plantID, "nft_type" : nftType, "plant_type" : plantType, "generatedLE" : generatedLE, "daysToProduce": daysToProduce});
    pvuRefresh();
}

function monthlyEarning(){
    if(nonNFTMTCounter > 0){
        leMonthlyProduction(sunMama);
    }else{
        for(let i = 0; i < nftPlant.length; i++){
            if(nftPlant[i].nft_type == "Mother Tree"){
                leMonthlyProduction(nftPlant[i]);
            }
        }
    }
        for(let i = nonNFTPlantCounter; i > 0; i--){
            leMonthlyProduction(sunSap);
        }
    for(let i = 0; i < nftPlant.length; i++){
        if(nftPlant[i].nft_type == "Plant"){
            leMonthlyProduction(nftPlant[i]);
        }
    }
}