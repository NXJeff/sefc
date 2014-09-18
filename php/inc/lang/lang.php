<?php
  //Language that we supported
$available_langs = array('en','chs');


  // Set our default language session
$_SESSION['lang'] = 'en';   

if(isset($_GET['lang']) && $_GET['lang'] != ''){ 
    // check if the language is one we support
	if(in_array($_GET['lang'], $available_langs))
	{       
      $_SESSION['lang'] = $_GET['lang']; // Set session
  }
}

  // Include active language
include('php/inc/lang/lang.'.$_SESSION['lang'].'.php');
?>