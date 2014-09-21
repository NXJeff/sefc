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
  <link rel="stylesheet" href="js/jquery.mobile-1.4.3/simpleblue.css" />
  <link rel="stylesheet" href="js/jquery.mobile-1.4.3/jquery.mobile.icons.min.css" />
  <!--   <link rel="stylesheet" href="js/jquery.mobile-1.4.3/jquery.mobile-1.4.3.css" /> -->
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.3/jquery.mobile.structure-1.4.3.min.css" /> 
  <script type="text/javascript" src="js/datejs/date.js"></script>
  
  <!-- custom css -->
  <link rel="stylesheet" href="css/global.css" /> 
  <link rel="stylesheet" href="css/icons.css" /> 
  <script src="js/jquery/jquery-1.11.1.min.js"></script>
  <script src="js/jquery.mobile-1.4.3/jquery.mobile-1.4.3.min.js"></script>
  <!-- custom js -->
  <!-- This is a resource bundle - Start-->
  <script>
  var resource = <?php echo json_encode($lang); ?>;
  </script>
  <!-- This is a resource bundle - End-->
  <script type="text/javascript" src="js/player/audio.js"></script>
  <script type="text/javascript" src="js/index.js"></script>
  
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

  

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
    <a href="#left-panel" data-icon="edit" data-theme="b" ><?php getString('menu');?></a>
    <h1>
      <?php getString('sermonpage_title');?>
    </h1>
  </div>
  <div role="main" class="ui-content">
    <div class="article">

      <ul data-role="listview" data-inset="true" id="mainPageList">
        <li data-role="fieldcontain">
          <h2><?php getString('quick_search');?></h2>
        </li>
        <li data-id="byTitle"><a id="byTitle" data-theme="b"><span class="entypo-code"><?php getString('title');?></span></a></li>
        <li data-id="bySpeaker"><a id="bySpeaker" data-icon="check" data-iconpos="right"  data-theme="b"><span class="entypo-users"><?php getString('speaker');?></span></a></li>
        <li data-role="divider"></li>
        <li data-role="fieldcontain">
          <h2><?php getString('categories') ?></h2>
        </li>
        <li data-id="chinese"><a id="chinese" data-icon="check" data-iconpos="right"  ><span class="entypo-folder"><?php getString('chinese');?></span></a></li>
        <li data-id="english"><a id="english" data-icon="check" data-iconpos="right"  ><span class="entypo-folder"><?php getString('english');?></span></a></li>
        <li data-id="bilingual"><a id="bilingual" data-icon="check" data-iconpos="right"  ><span class="entypo-folder"><?php getString('bilingual');?></span></a></li>
        <li data-role="divider"></li>
        <li data-id="chineseSpeaker"><a data-id="chineseSpeaker" id="chineseSpeaker" href="#speakers" data-icon="check" data-iconpos="right"><span class="entypo-user"><?php getString('chinese_speaker');?></span></a></li>
        <li data-id="englishSpeaker"><a id="englishSpeaker" href="#speakers" data-icon="check" data-iconpos="right" ><span class="entypo-user"><?php getString('english_speaker');?></span></a></li>
        <li data-role="divider"></li>
        <li data-id="recent"><a><span class="entypo-list"><?php getString('recently_added');?></span></a></li>
        <li data-id="browseByMonth"><a><span class="entypo-database"><?php getString('browse_by_month');?></span></a></li>

      </ul>
    </div>
  </div>
</div>
<!-- Main Page END -->


<!-- Search Page BEGIN -->    
<div data-role="page" id="search">
 <div id="searchHeader" data-role="header" data-position="fixed">
  <a href="#mainpage" data-icon="back" data-theme="b"><?php getString('back');?></a>
  <h1>
   <?php getString('search');?>    
 </h1>
</div>
<div role="main" class="ui-content">

 <ul id="listview" data-role="listview" data-filter="true" data-listomatic="true"></ul>
 
</div>

</div>
<!-- Search Page END -->  

<!-- SpeakerList Page BEGIN -->    
<div data-role="page" id="speakers">
 <div  data-role="header" data-position="fixed">
  <a href="#mainpage" data-icon="back" data-theme="b" ><?php getString('back');?></a>
  <h1>
   <?php getString('speakers');?>    
 </h1>
</div>
<div role="main" class="ui-content">
  <form class="ui-filterable">
    <input id="filterBasic-input" data-type="search">
  </form>
  <ul data-role="listview" data-inset="true" data-filter="true" data-input="#filterBasic-input">
   <li data-role="list-divider" >A - Z</li>
   <li><a href="#speaker" id="chinese" data-icon="check" data-iconpos="right">Name A</a></li>
   <li><a id="english" data-icon="check" data-iconpos="right">Name B</a></li>
   <li><a id="bilingual" data-icon="check" data-iconpos="right">Name C</a></li>
 </ul>
</div>
</div>
<!-- SpeakerList Page END -->  


<!-- Speaker Detail Page BEGIN -->  
<div data-role="page" id="speaker">
 <div  data-role="header" data-position="fixed">
  <a href="#speakers" data-icon="back" data-theme="b" ><?php getString('back');?></a>
  <h1>
   <?php getString('speakers');?>    
 </h1>
</div>
<div role="main" class="ui-content">
  <ul data-role="listview" data-inset="true">
    <li>image</li>
    <li>Name: <div id="speakerName" class="list-value">Testing</div></li>
    <li><div id="speakerDescription" class="list-description" class="list-value">jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.</div></li>
    <li><a id="contactSpeaker" data-inline="true" data-role="button">Contact Information</a></li>
  </ul>

</div>
</div> 
<!-- Speaker Detail Page END -->

<!-- Recent Page START -->
<div data-role="page" id="recent">
  <div data-role="header" data-position="fixed" data-tap-toggle="false">
    <a data-rel="back" data-theme="b"><?php getString('back');?></a>
    <h1><?php getString('sermons');?></h1>
  </div>
  <div data-role="content">

    <ul id="recentlyAddedList" data-role="listview" data-inset="true">
    </ul>
  </div>
  <div class="audioPlayerFooter" data-role="footer" data-position="fixed" data-tap-toggle="false" style="background-color:rgba(233,233,233,0.7); ">



    <div class="centerwrapper">
      <a href="#player" data-transition="flip">
        <div class="footerTitle">
          <img src="images/music_file_icon.png" style="width: 40px; height: 40px;vertical-align:middle; float:left;"></img>

          <span style="color: #333333; font-size: 12px; ">Playing What's Goes Around Comes Aroundssssssssssssssssssssssssssssssss - Justin Timberlake</span>
        </div></a>
      </div>

    </div>
    <div data-role="popup" id="recentPlaylistPopupMenu" data-theme="a">
      <ul data-role="listview" data-inset="true" id="recentPlayListContextMenu" style="min-width:210px;">
        <li data-role="list-divider" ><?php getString('choose_an_action') ?></li>
        <li data-icon="false" data-id="detail"><a href="#"><?php getString('info') ?></a></li>
        <li data-icon="false" data-id="queue"><a href="#"><?php getString('add_to_playlist') ?></a></li>
        <li data-icon="false" data-id="playnow"><a href="#"><?php getString('play_now') ?></a></li>
      </ul>
    </div>
  </div>

  <!-- Recent Page END -->

  <!-- Browse By Month Page START -->
  <div data-role="page" id="browseByMonth">
    <div data-role="header" data-position="fixed" data-tap-toggle="false">
      <a data-rel="back" data-theme="b"><?php getString('back');?></a>
      <h1><?php getString('sermons');?></h1>
    </div>
    <div data-role="content">

      <div class="ui-field-contain">
        <label for="yearBrowseByMonth">Year:</label>
        <select id="yearBrowseByMonth" data-native-menu="false">
          <option value="0">Select One</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
            <option value="2014">2014</option>
          <option value="2015">2015</option>        </select>
      </div>

      <div class="ui-field-contain">
        <label for="monthBrowseByMonth">Month:</label>
        <select id="monthBrowseByMonth" data-native-menu="false">
          <option value="0">Select One</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <ul id="browseByMonthList" data-role="listview" data-inset="true">
      </ul>
    </div>

    <div data-role="popup" id="recentPlaylistPopupMenu" data-theme="a">
      <ul data-role="listview" data-inset="true" id="recentPlayListContextMenu" style="min-width:210px;">
        <li data-role="list-divider" ><?php getString('choose_an_action') ?></li>
        <li data-icon="false" data-id="detail"><a href="#"><?php getString('info') ?></a></li>
        <li data-icon="false" data-id="queue"><a href="#"><?php getString('add_to_playlist') ?></a></li>
        <li data-icon="false" data-id="playnow"><a href="#"><?php getString('play_now') ?></a></li>
      </ul>
    </div>
  </div>

  <!-- Browse By Month Page END -->

  <!-- Audio Detail Page START -->
  <div data-role="page" id="audiodetail">
    <div data-role="header" data-position="fixed" data-tap-toggle="false">
      <a data-rel="back" data-theme="b"><?php getString('back') ?></a>
      <h1><?php getString('sermons') ?></h1>
    </div>
    <div data-role="content">
      <div class="centerwrapper">
        <ul id="audiodetailUl" data-role="listview" data-inset="true">
          <li data-role="list-divider"></li>
          <li>
            <div class="ad-imageView">
              <span class="iconicfill-user ad-noImageIcon"></span>
            </div>
            <span class="iconicfill-user ad-author">周杰轮</span>
            <span class="iconicfill-document-alt-fill ad-title">测试</span>
            <span class="iconicfill-clock ad-duration">测试</span>



          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Audio Detail END -->


  <!-- Audio Player Page START -->
  <div data-role="page" id="player">
    <div data-role="header" data-position="fixed" data-tap-toggle="false" > <h2><span ><?php getString('playlist') ?></span></h2>
      <a data-rel="back" data-theme="b"><?php getString('back') ?></a>
    </div>
    <div data-role="content" >


      <ul data-role="listview" data-inset="true" id="playlist">
      </ul>
    </div>

    <div data-role="footer" data-position="fixed" data-tap-toggle="false" style="text-align: center; background-color:rgba(233,233,233,0.7);">

      <audio id="audioplayer" style="width: 80%; min-width:300px " controls ></audio><br>
      <h4><span id="rmusic" class="transparentBgText" style="color: #333333;">Testsetst</span></h4>
      <div style="grid-rows:500px (30px 60px);">

        <a id="btn-pre" class="ui-btn ui-mini"><span class="iconicfill-first playerButton" style="margin:auto; font-size:20px; line-height: 10px;padding-left: 1em;"></span></a>
        <a id="btn-next" class="ui-btn ui-mini"><span class="iconicfill-last playerButton" style="margin:auto; font-size:20px; line-height: 10px; padding-left: 1em;"></span></a>
        <a id="btn-loop" class="ui-btn ui-mini"><span class="iconicfill-loop-alt2 playerButton" style="margin:auto; font-size:20px; line-height: 10px; padding-left: 1em;"></span></a>
      </div>
    </div>

    <div data-role="popup" id="playlistPopupMenu" data-theme="a">
      <ul data-role="listview" data-inset="true" id="playlistContextMenu" style="min-width:210px;">
        <li data-role="list-divider" ><?php getString('choose_an_action') ?></li>
        <li data-icon="false" data-id="playlistPlay"><a href="#"><?php getString('play') ?></a></li>
        <li data-icon="false" data-id="playlistStopAll"><a href="#"><?php getString('stop_playing') ?></a></li>
        <li data-icon="false" data-id="playlistRemove"><a href="#"><?php getString('remove') ?></a></li>
        <li data-icon="false" data-id="playlistRemoveAll"><a href="#"><?php getString('remove_all') ?></a></li>
        <li data-icon="false" data-id="playlistDetail"><a href="#"><?php getString('go_to_detail_page') ?></a></li>
        <li data-icon="false" data-id="playlistReport"><a href="#"><?php getString('report') ?></a></li>
      </ul>
    </div>
  </div>
  <!-- Audio Player Page END -->



</div>
</body>
</html>