/**
 * Created by Epi on 16/05/2017.
 */
function onclick_cargarFormularioRegistro() {
    let cuerpoBase = document.getElementById("cuerpoBase");
        cargarLayout(cuerpoBase,FORMULARIOREGISTRO,uiFormularioRegistro);

}
function onclick_cargarFormularioInicioSesion() {
    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,FORMULARIOLOGIN,uiFormularioLogin);
}
function onload_main() {
    let categoriasYBuscador = document.getElementById("CategoriasYBuscadorBotonera");
    let botonesAccesoUsuario = document.getElementById("botonesAccesoUsuario");
    let cuerpoBase = document.getElementById("cuerpoBase");

    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);

    // cargarLayout(cuerpoBase,FORMULARIOREGISTRO,uiFormularioRegistro);
    cargarLayout(categoriasYBuscador,BOTONERAIZQMENUNAV,uiBotonesCategoriasBuscador);
    console.log("cargando botones")

    if(sessionStorage.getItem("userIniciado")){
        console.log("Iniciado");
        cargarLayout(botonesAccesoUsuario,BOTONERAACCESOINICIADO,uiBotonesAccesoUsuarioIniciado);

    }else{
        console.log("No iniciado")
        cargarLayout(botonesAccesoUsuario,BOTONERAACCESO,uiBotonesAccesoUsuario);

    }
}
function onclick_cargaIndex() {

    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);

    // $('body').css('cursor', 'progress');
}


function onclick_registrarUSuario() {

    // $('body').css('cursor', 'progress');
    let dato1  = $("#username").val();
    let dato2  = $("#pass1").val();
    let dato4  = $("#name").val();
    let dato5  = $("#surname").val();
    let dato3  = $("#email").val();
    let dato6  = $("#city").val();
    let dato7  = $("#country").val();

    let dato8 = banner;
    let dato9 = 0;
    let dato10 = 0;
    let dato11 = userimg;

    let campos = { username : dato1,pass : dato2,email: dato3, name:dato4, surname:dato5,city:dato6,country:dato7,banner:dato8,likes:dato9,views:dato10,userimg:dato11};

    let data = {metodo : 'crearUsuario',datos : campos};

    console.log(dato8);
    // console.log(dato11.valor);
    // console.log("caracteres:"+banner.length);
    let resultpeti =false;
    let peticion = $.post(
                        CONEXIONES,
                        data,
                        function(data){
                            $('body').css('cursor', 'initial');
                            try{
                                let resultado = JSON.parse(data);
                                console.log(data);
                                if(resultado == "0" || resultado == 0){
                                    alert("El usuario ya existe");
                                }else{
                                    if(resultado == "true"){
                                        resultpeti = true
                                    }else{
                                        alert("No se ha podido registrar el usuario en estos momentos.");
                                    }
                                }
                            }catch (e){
                                alert("Imagen demasiado grande!");
                            }


                        })
    .done(function () {
        if(resultpeti){
            alert("Usuario registrado correctamente");
        }
    });

}
function onclick_iniciarSesion() {
    let username = $('#username').val();
    let pass = $('#pass1').val();
    let data = {metodo:"iniciarSesion",user:username,pass:pass};
    $.post(
        CONEXIONES,
        data,
        function (data) {
            let user = JSON.parse(data);
            if(user.username!=null){
                console.log(user)
                sessionStorage.setItem("userIniciado",data);
                onload_main();

            }else{
                alert("Datos incorrectos")
            }
    })

}
function onclick_cargaConfiguracionUsuario() {
    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,CONFIGURADORUSUARIO,uiConfiguracionUsuario)
}