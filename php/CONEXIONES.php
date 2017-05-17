<?php
/**
 * Created by PhpStorm.
 * User: Epi
 * Date: 14/05/2017
 * Time: 21:02
 */
class Prueba
{
    // Declaración de una propiedad
    function __construct(){

        $this->name = "John";
        $this->age = 30;
        $this->city = "New York";
    }
    public $var = 'un valor predeterminado';



}



//function guardarDibujo(){
//    $conn = mysqli_connect("localhost","root","","cgplus");
//    if(mysqli_connect_errno($conn)){
//        return null;
//    }else{
//        $query = "SELECT * FROM images";
//        $result = mysqli_query($conn,$query);
//        if($result){
//            mysqli_close($conn);
//            return $result;
//        }else{
//            mysqli_close($conn);
//            return false;
//        }
//    }
//}
//
function crearUsuario(){

    $userdatos = $_POST['datos'];

    $conn = mysqli_connect("localhost","root","","cgplus");
    if(mysqli_connect_errno($conn)){
        return utf8_encode("Imposible conectarse con la base de datos");
    }else{





        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg) VALUES ('".$userdatos['username']."','".$userdatos['pass']."','".$userdatos['email']."','".$userdatos['name']."','".$userdatos['surname']."','".$userdatos['city']."','".$userdatos['country']."','".$userdatos['banner']."',".$userdatos['likes'].",".$userdatos['views'].",'".$userdatos['userimg']."')";
//        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg) VALUES ('usu1','usu1','usu1','usu1','usu1','usu1','usu1','$bannerimg',0,0,'$userimg')";
//        return json_encode($query);

        $result = mysqli_query($conn,$query);

        if($result){
            mysqli_close($conn);

           return json_encode("Usuario insertado correctamente");
        }else{
            mysqli_close($conn);
            return  json_encode("No se ha podido crear el usuario");
        }
    }
}


if(isset($_POST['metodo'])) {
    $metodo = $_POST['metodo'];

    switch ($metodo) {
        case "guardarDibujo" :
            echo guardarDibujo();
        case "crearUsuario" :
            echo crearUsuario();
    }
}
?>