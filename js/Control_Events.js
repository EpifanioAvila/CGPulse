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
    // console.log("hola");
    // console.log(dato8);
    // console.log("Creando usuario")
    // console.log(dato8);

    // console.log('imprime banner');
    // console.log(banner);

    // debugger;
    // debugger;
    // console.log(dato11[0].name);
    // let bannerruta = dato11[0].name;
    let campos = { username : dato1,pass : dato2,email: dato3, name:dato4, surname:dato5,city:dato6,country:dato7,banner:dato8,likes:dato9,views:dato10,userimg:dato11};
    // campos = [dato1,dato2,dato3,dato4,dato5,dato6,dato7,dato8.name,dato9,dato10,dato11.name];

    let data = {metodo : 'crearUsuario',datos : campos};

    // console.log(dato8.valor);
    // console.log(dato11.valor);

    // $("#").val();
    $.post(
        CONEXIONES,
        data,
        function(data){
            console.log(data)
        }
    );

}