var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


/*
Datos JSON de Producto
"cost": 13500,
    "currency": "USD",
    "soldCount": 14,
    "category": "Autos",
    "images": [
        "img/prod1.jpg",
        "img/prod1_1.jpg",
        "img/prod1_2.jpg",
        "img/prod1_3.jpg",
        "img/prod1_4.jpg"
    ],
    "relatedProducts": [1, 3] 
*/

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            var productNameJSON  = document.getElementById("productName");
            var productDescriptionJSON = document.getElementById("productDescription");
            var productCostJSON = document.getElementById("productCost");
            var productCurrencyJSON = document.getElementById("productCurrency");
            var productSoldCountJSON = document.getElementById("productSoldCount");
            var productCategoryJSON = document.getElementById("productCategory");
        
            productNameJSON.innerHTML = product.name;
            productDescriptionJSON.innerHTML = product.description;
            productCostJSON.innerHTML = product.cost;
            productCurrencyJSON.innerHTML = product.currency;
            productSoldCountJSON.innerHTML = product.soldCount;
            productCategoryJSON.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});