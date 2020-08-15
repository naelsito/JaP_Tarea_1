//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function checklogin(user, pass) {
	if(user.trim() === "" || pass.trim() === "") {
		alert("Completa los datos porfavor.");
	} else {
		location.href = "login.html";
	}
}
