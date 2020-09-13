var product = {};
var comments = {};

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

document.getElementById("commentScore").addEventListener('change', function(){
    valoracion();
})

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

    /* "score": 3,
    "description": "Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas",
    "user": "juan_pedro",
    "dateTime": "2020-02-25 18:03:52"
    */
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")

        {
            comments = resultObj.data;

            /* var commentScoreJSON = document.getElementById("commentScore");
            var commentDescriptionJSON = document.getElementById("commentDescription");
            var commentUserJSON = document.getElementById("commentUser");
            var commentDateTimeJSON = document.getElementById("commentDateTime");

            commentScoreJSON.innerHTML = comments.score;
            commentDescriptionJSON.innerHTML = comments.description;
            commentUserJSON.innerHTML = comments.user;
            commentDateTimeJSON.innerHTML = comments.dateTime;
            */

            function valoracion() {
                var pts = '';
                totPts = comments[i].score;

                document.getElementById("commentPts").innerHTML = pts;
            }

            var comentarios = '';

            for (i = 0; i < comments.length; i++){ //Cuantos comments hay
                var pts = '';
                for (v = 1; v <= 5; v++){
                    if(v <= comments[i].score){
                        pts += `<span class="fa fa-star checked"></span>`; //Se agregan las estrellas
                    } else {
                        pts += `<span class="fa fa-star"></span>`; //Se sacan las estrellas

                    }
                    
                } 
            comentarios += `
            <div class="row text-center text-lg-left pt-2">
            <pre>
---------------------------------------------------------------------------------------------------------------------</pre></div>
            <div class="row text-center text-lg-left pt-2">
                <p><b>Valoración:</b><span id="commentPts"</span></p>
            </div>
            <div class="row text-center text-lg-left pt-2">
                <p><b>Usuario:</b> ` + comments[i].user + ` </b></p>
            </div>
                <b>Comentario:</b>
                <small><p> ` + comments[i].description + `</p></small>
            </div>

            `

            }
        document.getElementById("commentDescription").innerHTML = comentarios;

        } else {
            document.getElementById("commentDescription").innerHTML = "No se pueden leer los commentarios [Error404]";
        }
    });
});

