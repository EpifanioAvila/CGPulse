/**
 * Created by Epi on 14/05/2017.
 */

function uiBotonesAccesoUsuario() {

    $("#btn-registrarse").on("click",onclick_cargarFormularioRegistro);
    $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);

}
function uiBotonesCategoriasBuscador() {

    $("#logo").on("click",onclick_cargaIndex);
}
function uiCuerpoBase() {

}
function uiFormularioRegistro() {

    // $("#btn-registro").on("click",onclick_registrarUSuario);

    let boton = document.getElementById("btn-registro");
    boton.onclick = function () {
        console.log("gunca")
        let imagen = document.getElementById("banner").files;
        console.log(imagen[0].name);
        console.log(imagen[1].name);
    }
}
function uiFormularioLogin() {

    $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);
}