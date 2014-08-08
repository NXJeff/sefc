<?php

function __autoload($class_name) {
	include_once 'inc/' . $class_name . '.php';
}

//Get the db config file from global external source
	$file = '../conf/db.ini'; 
	session_start();
	require_once("../jcryption/jcryption.php");
	$jCryption = new jCryption();

    if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');




?>