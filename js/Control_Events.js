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
    cargarLayout(categoriasYBuscador,BOTONERAIZQMENUNAV,uiBotonesCategoriasBuscador);
    cargarLayout(botonesAccesoUsuario,BOTONERAACCESO,uiBotonesAccesoUsuario);
}
function onclick_cargaIndex() {
    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);
}


function onclick_registrarUSuario() {

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

    // console.log(dato8.valor);
    // console.log(dato11.valor);
    console.log("caracteres:"+banner.length);
    $.post(
        CONEXIONES,
        data,
        function(data){
            if(data==true){
                // let str = data.replace("\/","/");
                // console.log(str);
                console.log(data);
                console.log("Usuario Registrado correctamente")
                // alert("Usuario Registrado correctamente");
            }else{
                console.log("El usuario no se ha podido registrar");
                // alert("El usuario no se ha podido registrar")

            }
        }
    );

}