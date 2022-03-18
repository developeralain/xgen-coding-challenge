
let new_dict_array = [];
window.products.forEach(function(dictionary) {
    if (dictionary['prod_name'].includes('Top ') &&
        parseInt(dictionary['is_in_stock']) > 0){
            
            new_dict_array.push(dictionary);
            
        }
})
var mainContainer = document.getElementById("XgenElement");
var product_obj = new_dict_array[0];
let templateKeyArray = [];
let keyArray = [];
var rawDiv = window.htmlTemplate;
let rawArray = [rawDiv, rawDiv, rawDiv, rawDiv];
    
//Generates 2 arrays, one mapping to template and the other to the product, each of which contain a list of extant product keys present in current template
//both arrays only contain keys/strings that exist in the current window.htmlTemplate configuration
//each arrays' elements correspond to the other by index value (0 - 0, 1 - 1), such that can have one 
//array represent values we wish to replace and the other values we wish to substitute for 
for(const key in product_obj){
    if (rawDiv.includes(key)){
    var curley1 = "{{";
    var curley2 = "}}";
    var templateKey = curley1.concat(key, curley2);
    templateKeyArray.push(templateKey);//contains only product {{key}} values that exist in current template
    keyArray.push(key);//contains only product key values that map to current template {{key}} values
    }
}   
 
//generates an array of modified htmlTemplate divs, one for each product, with product values substituted 
//in for placeholder values
function generateDivArray(){
    for (i=0; i < 4 ; i++){
        
        var rawHTMLDiv = rawDiv;
        var product = new_dict_array[i];
        
        for (j=0; j < keyArray.length; j++){
            rawHTMLDiv = rawHTMLDiv.replaceAll(templateKeyArray[j], product[keyArray[j]]);
        }
        rawArray[i] = rawHTMLDiv; 
    }
    return rawArray;
    
}

//calls method to generate div array and stores in variable
divArray = generateDivArray();

//uses div array to populate HTML page 
for (const index in divArray){
    innerDiv = divArray[index];

    mainContainer.innerHTML += innerDiv;
}


