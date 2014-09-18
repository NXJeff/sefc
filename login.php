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
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<title> <?php echo $lang['appname'];?> </title>
	<link rel="stylesheet" href="js/jquery.mobile-1.4.3/jquery.mobile-1.4.3.min.css" />
	<link rel="stylesheet" href="css/global.css" /> 
	<script src="js/jquery/jquery-1.11.1.min.js"></script>
	<script src="js/jquery.mobile-1.4.3/jquery.mobile-1.4.3.min.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>



</head>
<body>
	
	<!-- Login Page BEGIN -->	
	<div data-role="page" id="login">

		<div data-role="header" >
			<h1><?php echo $lang['appname'];?> </h1>
		</div>
		<div id="logintopmsg" class="topmsg"></div>
		<div data-role="content" >
			<div style = "width: 100%; text-align: center">

			</div>

			<div>
				<form id="loginform" method="POST">

					<ul data-role="listview" data-inset="true" >
						<li style="text-align='center'">
							<h2><?php echo $lang['sign_in_label'];?> </h2>
						</li>
						<li>
							<h3><?php echo $lang['username'];?></h3>
							<input type="text" name="username" id="usernameInput" autofocus required />
							<h3><?php echo $lang['password'];?></h3>
							<input type="password" name="password" id="passwordInput"  required
							></li>
							<li class="ui-body ui-body-c" >
								<fieldset class="ui-grid-solo" >
									<div class="ui-block-a">
										<a id="loginbutton" type="submit" rel="external" data-role="button" href="index.php"  ><?php echo $lang['login'];?></a>
									</div>
								</fieldset>
							</li>

							<li>
								<h4> <?php echo $lang['register_label_long'];?> </h4>
							</li>
							<li class="ui-body ui-body-c" >
								<fieldset class="ui-grid-solo" >
									<div class="ui-block-a">
										<a data-role="button" href="#register" ><?php echo $lang['sign_up_now'];?></a>
									</div>
								</fieldset>
							</li>
						</ul>
					</form>
				</div>

			</div>
		</div>

		<!-- Login Page END -->

		<!-- Register Page BEGIN -->

		<div data-role="page" id="register">
			<div data-theme="a" data-role="header" data-position="fixed">
				<a data-rel="back" data-icon="back" data-iconpos="notext" data-shadow="false" data-iconshadow="false" data-theme="default"><?php echo $lang['back'];?></a>
				<h3>

				</h3>
			</div>

			<div id="regtopmsg" class="topmsg"></div>

			<div data-role="content">
				<form name="input" method="POST">
					<ul data-role="listview" data-inset="true" >
						<li style="text-align='center'">
							<h2> <?php echo $lang['sign_up_label'];?> </h2>
						</li>
						<li data-role="fieldcontain">
							<h3><?php echo $lang['username'];?></h3>
							<input name="Username" id="regun" value="" type="text" />


							<h3><?php echo $lang['password'];?></h3>
							<input name="Password" id="regpd" value="" type="password" />


							<h3><?php echo $lang['retype_password'];?></h3>
							<input name="Password" id="regpdrt" value="" type="password" />


							<h3><?php echo $lang['full_name'];?></h3>
							<input name="Full Name" id="regfn" value="" type="text" />

							<h3><?php echo $lang['email_addr'];?></h3>
							<input name="Email Address" id="regea" value="" type="email" />

							<h3><?php echo $lang['contact_no'];?></h3>
							<input name="Mobile No" id="regmn" placeholder="Optional" value="" type="tel" />

							<fieldset class="ui-grid-solo" >
								<div class="ui-block-a">
									<a id="registerButton" type="submit" href="#registerdone" data-role="button" data-icon="check" data-iconpos="right"  data-theme="b"><?php echo $lang['create_account'];?></a>
								</div>
							</fieldset>
						</ul>
					</form>
				</div>
			</div>	

			<!-- Register Page END -->

			<!-- Register Done Page-->
			<div data-role="page" id="registerdone">
				<div data-theme="a" data-role="header" data-position="fixed">
					<a id="homebutton" data-role="button" href="#login" data-icon="back" data-iconpos="notext" data-shadow="false" data-iconshadow="false" data-theme="default"><?php echo $lang['back'];?></a>
					<h3>
						<?php echo $lang['account_ready_msg'];?>
					</h3>
				</div>
				<div data-role="content" style="text-align: center">
					<h4><?php echo $lang['register_complete_msg'];?></h4>
				</div>
			</div>
			<!-- Register Done END -->
			
		</body>
		</html>
