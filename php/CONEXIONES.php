<?php
/**
 * Created by PhpStorm.
 * User: Epi
 * Date: 14/05/2017
 * Time: 21:02
 */
function guardarDibujo(){
    $conn = mysqli_connect("localhost","root","","cgplus");
    if(mysqli_connect_errno($conn)){
        return null;
    }else{
        $query = "SELECT * FROM images";
        $result = mysqli_query($conn,$query);
        if($result){
            mysqli_close($conn);
            return $result;
        }else{
            mysqli_close($conn);
            return false;
        }
    }
}

function crearUsuario(){
    $conn = mysqli_connect("localhost","root","","cgplus");
    if(mysqli_connect_errno($conn)){
        return null;
    }else{

        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, tags, userimg) VALUES ('usu1','usu1','usu1','usu1','usu1','usu1','usu1','usu1','usu1',0,0,'usu1')";

        $result = mysqli_query($conn,$query);

        if($result){
            mysqli_close($conn);
            return true;
        }else{
            mysqli_close($conn);
            return false;
        }
    }
}

//if(isset($_POST['metodo'])){
//    $metodo = $_POST['metodo'];
    $metodo = "crearUsuario";
    switch ($metodo){
        case "guardarDibujo" : return guardarDibujo();
        case "crearUsuario" :  return crearUsuario();
    }
//}