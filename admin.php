<?php
session_start();
error_reporting(0);
header('Access-Control-Allow-Origin: *');
header( 'Content-Type: text/html; charset=utf-8' ); 
    // Include active language

//handling multilanguage
include('php/inc/lang/lang.php'); 
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 " />
  <title> <?php getString('appname');?> </title>
  <link rel="stylesheet" href="js/jquery.mobile-1.4.4/simpleblue.css" />
  <link rel="stylesheet" href="js/jquery.mobile-1.4.4/jquery.mobile.icons-1.4.4.min.css" />
  <!--   <link rel="stylesheet" href="js/jquery.mobile-1.4.3/jquery.mobile-1.4.3.css" /> -->
  <link rel="stylesheet" href="js/jquery.mobile-1.4.4/jquery.mobile.structure-1.4.4.min.css" /> 
  <script type="text/javascript" src="js/datejs/date.js"></script>
  
  <!-- custom css -->
  <link rel="stylesheet" href="css/global.css" /> 
  <link rel="stylesheet" href="css/icons.css" /> 
  <script src="js/jquery/jquery-1.11.1.min.js"></script>
  <!-- <script src="js/jquery.mobile-1.4.3/jquery.mobile-1.4.3.min.js"></script> -->
  <script src="js/jquery.mobile-1.4.4/jquery.mobile-1.4.4.min.js"></script>
  <!-- custom js -->
  <!-- This is a resource bundle - Start-->
  <script>
  var resource = <?php echo json_encode($lang); ?>;
  </script>
  <!-- This is a resource bundle - End-->
  <script type="text/javascript" src="js/admin.js"></script>
  <script src="js/jquery.highlight-4.closure.js"></script>
  <link rel="stylesheet" href="css/font.css" />   

  <script id="panel-init">
  $(function() {
    $( "body>[data-role='panel']" ).panel();
  });
  </script>



</head>
<body>

  <!-- Main Page BEGIN -->	
  <div data-role="page" id="mainpage">
   <!-- panel content goes here -->
   <div data-role="panel" id="left-panel" data-theme="b" data-position-fixed="true" data-position="left" data-display="overlay" >
    <ul data-role="listview">
      <li data-role="list-divider"></li>
      <li data-icon="back"><a href="#demo-intro" data-rel="back" data-theme="b">Demo intro</a></li>
      <li data-role="list-divider"></li>
    </ul>
  </div>
  <!-- /panel -->


  <div data-role="header" data-position="fixed" data-tap-toggle="false" data-theme="a" >
    <a href="#left-panel" data-icon="edit" data-theme="b" >Menu</a>
    <h1>
     Admininstrator Panel   
   </h1>
 </div>
 <div role="main" class="ui-content">
  <div class="article">

    <ul data-role="listview" data-inset="true" id="adminPageList">
      <li data-role="fieldcontain">
        <h2>Global</h2>
      </li>
      <li data-id="userVerification"><a data-theme="b"><span class="entypo-code">User Verifications</span></a></li>

      <li data-role="divider"></li>
      <li data-role="fieldcontain">
        <h2>Manage Sermons</h2>
      </li>
      <li data-id="uploadsermon"><a id="uploadsermon" data-icon="check" data-iconpos="right"  ><span class="entypo-folder">Upload new sermon</span></a></li>
      <li data-id="editsermon"><a id="editsermon" data-icon="check" data-iconpos="right"  ><span class="entypo-folder">Edit/Delete a sermon</span></a></li>
      
    </ul>
  </div>
</div>
</div>
<!-- Main Page END -->

<!-- User Verification Page START -->
  <div data-role="page" id="userVerification">
    <div data-role="header" data-position="fixed" data-tap-toggle="false" > <h2><span ><?php getString('user_verification') ?></span></h2>
      <a data-rel="back" data-theme="b"><?php getString('back') ?></a>
    </div>
    <div data-role="content" >
  <div class="article">

    <ul data-role="listview" data-inset="true" id="userVerificationList">
    </ul>
  </div>
</div>
</div>

<!-- User Verification Page END -->

</body>
</html>