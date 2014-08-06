/**
 * This js disabled native menu and use jquery mobile menu style.
 */

$(document).bind('mobileinit',function(){
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});