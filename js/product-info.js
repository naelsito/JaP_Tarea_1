var product = {};
var comments = {};



//muestro imagenes del producto seleccionado
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

            //tomo datos de ID y los guardo en variable
            var productNameJSON  = document.getElementById("productName");
            var productDescriptionJSON = document.getElementById("productDescription");
            var productCostJSON = document.getElementById("productCost");
            var productCurrencyJSON = document.getElementById("productCurrency");
            var productSoldCountJSON = document.getElementById("productSoldCount");
            var productCategoryJSON = document.getElementById("productCategory");

            
            //cambio las variables por datos del JSON
            productNameJSON.innerHTML = product.name;
            productDescriptionJSON.innerHTML = product.description;
            productCostJSON.innerHTML = product.cost;
            productCurrencyJSON.innerHTML = product.currency;
            productSoldCountJSON.innerHTML = product.soldCount;
            productCategoryJSON.innerHTML = product.category;

            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            //si hay productos relacionados
            if(product.relatedProducts.length > 0){
                //tomo todos los productos
                getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")

                {
                    
                    var allProducts = resultObj.data;

                    let htmlRelatedP = "";

                    var relatedProductsJSON = [];

                    relatedProductsJSON = product.relatedProducts;

                    relatedProductsJSON.forEach(i =>{ //recorro dado array de productos relacionados
                    
                    
                    //copio html en div dado cada elemento [i]
                    htmlRelatedP += `
                     <div class="col-lg-3 col-md-4 col-6">
                         <div class="d-block mb-4 h-100">
                            <img class="img-fluid img-thumbnail" src="` + allProducts[i].imgSrc + `" alt="">
                         </div>
                     </div>
                    `});
                    
                    //muestro los productos realcionados
                    document.getElementById('showProductosRelacionados').innerHTML = htmlRelatedP;

                

                }
                });       
            
        };
           
        }
    });

    /* "score": 3,
    "description": "Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas",
    "user": "juan_pedro",
    "dateTime": "2020-02-25 18:03:52"
    */
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")

        {
            comments = resultObj.data;

            /* Setear Valoracion a Comentario
            function valoracion() {
                alert("hola");
                var pts = '';
                totPts = comments[i].score;

                document.getElementById("commentScore").innerHTML = pts;
            }
            */
            var comentarios = '';
            //estrellas de valoración dadas por el JSON
            for (i = 0; i < comments.length; i++){ // Veo cuantos comments hay
                var estrellas = '';
                for (v = 1; v <= 5; v++){
                    if(v <= comments[i].score){
                        estrellas += `<span class="fa fa-star checked"></span>`; //Se agregan las estrellas
                    } else {
                        estrellas += `<span class="fa fa-star"></span>`; //Se sacan las estrellas

                    }
                    
                } 
            //muestro los datos del JSON
            comentarios += `
            <div class="row text-center text-lg-left pt-2">
            <pre>
---------------------------------------------------------------------------------------------------------------------</pre></div>
            <div class="row text-center text-lg-left pt-2">
                <p><b>Valoración:</b> ` + estrellas + `</p>
            </div>
            <div class="row text-center text-lg-left pt-2">
                <p><b>Usuario:</b> ` + comments[i].user + ` </b></p>
            </div>
                <b>Comentario:</b>
                <small><p> ` + comments[i].description + `</p></small>
            </div>

            `


            }
        //aplico el cambio dada la etiqueta HTML
        document.getElementById("commentDescription").innerHTML = comentarios;


        } else {
        //en caso de no leer el JSON status =/= ok
        document.getElementById("commentDescription").innerHTML = "No se pueden leer los commentarios [Error404]";
        }

    });
        
        

        
            
        
});

