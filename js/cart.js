var cart=[]; //array de arti

//funcion muestra carrito
function mostrar(){
  
    var table="";
    var shipp=0;
        for (i=0; i<cart.length;i++){
     
      let article = cart[i];
      let subTotal = parseInt(article.unitCost)*parseInt(article.count);
          shipp+= subTotal;
      //tabla del carrito
      table+=`<tr><td><img src="${article.src}" width=60></td>`;
      table+=`<td><input type="number" id="cant${i}" value=${article.count} onChange="modCount(${i})"></td>`;
      table+=`<td>${article.name}</td>`;
      table+=`<td>${article.currency} $${article.unitCost} </td>`;
      table+=`<td>${subTotal}</td>`;
      table+=`</tr>`;
    }
    document.getElementById('cart').innerHTML= table;
    document.getElementById('subtotal').innerHTML= shipp;
    
  
  	//envio y calculo de porcentajes
    var envioShip = document.getElementsByName('envioType');
     let xcientoShip = 0;
       for (let p = 0; p < envioShip.length; p++){
         if (envioShip[p].checked) {
           xcientoShip =  envioShip[p].value;

           }                                                                                                                                                                       
         }
        let costoShip= (shipp * xcientoShip) /100;
       document.getElementById('envio').innerHTML= costoShip;

       let Total = shipp + costoShip;
      document.getElementById('total').innerHTML= Total;

      }
     


      function modCount(indexPos){ 
    cart[indexPos].count= document.getElementById('cant'+indexPos).value;
    mostrar();
  }
    

     
    
 document.addEventListener("DOMContentLoaded", function(e){
       getJSONData(CART_INFO_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            cart = resultObj.data.articles;//guardo la colección artí en cart
            
    

        mostrar();

        }
        });
       });