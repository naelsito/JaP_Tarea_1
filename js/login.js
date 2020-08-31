 
 //log de invitado
        function checklogin(user, pass) {
        if(user.trim() === '' || pass.trim() === '') {
        alert('Completa los datos porfavor.');
        } else {
            
        localStorage.setItem('Name', user.trim());
        localStorage.setItem('Pass', pass.trim());
        location.href = 'login.html';
        }
        }
 



 // Script Google Sign In -->
        
 function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        
        
        var profile = googleUser.getBasicProfile();
        //tomo el token de Google
        var id_token = googleUser.getAuthResponse().id_token;
        console.log('ID Token: ' + id_token);
        //guardo los datos de Google en LocalStorage
        localStorage.setItem('Name', profile.getName());
        localStorage.setItem('Given Name', profile.getGivenName());
        localStorage.setItem('GoogleImg', profile.getImageUrl());
        localStorage.setItem('ID Token', id_token);

        //muestro en consola los datos del Usuario Google
        console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        
        
        location.href = 'login.html';
      
        
      }

      


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

