<?php   

/** 
 *	Please follow the convention as below
 *	$<type>['<full sentense with underscore as space with all lower case alphabet only >'] = '<display text>';
 */
error_reporting(0);

//ENGLISH
//GLOBAL variables 
$lang['appname']  = 'SEFC Main';

$lang['back']  = 'Back';
$lang['next']  = 'Next';
$lang['loading']  = 'Loading';
$lang['load_more']  = 'Load More';
$lang['search']  = 'Search';
$lang['menu']  = 'Menu';

//Sermon main page
$lang['sermonpage_title'] = 'SEFC Sermons';
$lang['sermons'] = 'Sermons';
$lang['quick_search'] = 'Quick Search';
$lang['title'] = 'Title';
$lang['speaker'] = 'Speaker';
$lang['speakers'] = 'Speakers';
$lang['categories'] = 'Categories';
$lang['chinese'] = 'Chinese';
$lang['english'] = 'English';
$lang['bilingual'] = 'Bilingual';
$lang['chinese_speaker'] = 'Chinese Speaker';
$lang['english_speaker'] = 'English Speaker';
$lang['recently_added'] = 'Recently Added';
$lang['browse_by_month'] = 'Browse By Month';

//Player page
$lang['choose_an_action']  = 'Choose An Action';
$lang['info']  = 'Info';
$lang['add_to_playlist']  = 'Add To Playlist';
$lang['play_now']  = 'Play Now';
$lang['playlist'] = 'Playlist';
$lang['play'] = 'Play';
$lang['stop_playing'] = 'Stop Playing';
$lang['remove'] = 'Remove';
$lang['remove_all'] = 'Remove All';
$lang['go_to_detail_page'] = 'Go To Detail Page';
$lang['report'] = 'Report';

//For Login and Registration
$lang['username']  = 'Username';
$lang['password']  = 'Password';
$lang['retype_password']  = 'Retype Password';
$lang['email_addr']  = 'Email Address';
$lang['full_name']  = 'Full Name';
$lang['contact_no']  = 'Contact Number';
$lang['login']  = 'Login';
$lang['create_account']  = 'Create Account';

$lang['sign_in_label']  = 'Sign in to your SEFC Account';
$lang['sign_up_label']  = 'Sign up for a SEFC account';
$lang['register_label_long']  = 'Need a SEFC account?';
$lang['sign_up_now']  = 'Sign Up Now';
$lang['account_ready_msg']  = 'Your account is now ready.';
$lang['register_complete_msg']  = 'Your registration is now completed, you can now login by hitting back button at the top.';

$lang['label']      = 'Value for this label';
$lang['firstname']  = 'First Name';
$lang['lastname']   = 'Last Name';
$lang['phone']      = 'Phone';       
  // ETC


function getString($id) {
	global $lang;
	if(isset($lang[$id]) && $lang[$id]!= '') {
		print $lang[$id];
	} else {
		print $id;	
	}
}



?>