 //Global variable
var key = 'jeslyn';
var ipaddress = "http://192.168.1.100:81/";
var announcements = null;
var latestUpdateList = null;
var products;
var tempPost;
var tempProductCategory;
var validation = 0;

//DOM
$(document).on('pageinit', '#index', function () {
    initPages();
    checkLoggedIn();
	//preload pages
	$('#login').page({ domCache: true });
	$('#register').page({ domCache: true });
	$('#lastUpdate').page({ domCache: true });
	$('#announcement').page({ domCache: true });
	$('#allProducts').page({ domCache: true });
	$('#productDetail').page({ domCache: true });
	$('#purchaseTicketPage').page({ domCache: true });
	$('#confirmTransaction').page({ domCache: true });
	$('#reservationDetail').page({ domCache: true });
	$('#history').page({ domCache: true });
	
    /**
    *
    * Unit Test
    *
    **/

    //---------------Register Listeners on the components------------------------


    /** 
    *	OnClick event on Buttons
    **/
    $('#loginbutton').unbind('click').bind('click', function (e) {
        var un = $('#usernameInput').val();
        var pd = $('#passwordInput').val();
        var valid = true;
        var msg = "";

        if (!un) {
            valid = false;
            msg += "Enter your username<br>";
        } else if (!pd) {
            valid = false;
            msg += "Password must longer than 6 characters<br>";
        }

        if (valid) {
            login(un, pd);
        } else {
            errorMessage("login", msg);
        }
    });


    $('#indexPageHeaderButton').unbind('click').bind('click', function (e) {
        console.log(this.text);

        if (this.text.match('Login')) {
            $.mobile.changePage($(document.location.href = "#login"), 'slide');
        } else {
            $('#logoutDialog').popup('open');
        }
    });

    /**
    * This is the button that user pressed 'yes' at the logout dialog.
    * This will clear all the session cache and logout the user.
    */
    $('#confirmLogoutBtn').unbind('click').bind('click', function (e) {
        console.log(this.text);
        //Clear cache on both localStorage and localStorage
        localStorage.clear();
        localStorage.clear();
        //Put it back visitor mode
        initAnonymousPage();
    });

    /** 
    *	OnClick event on Submit Buton
    **/
    $('#registerButton').unbind('click').bind('click', function (e) {

        //Get value from the textfield
        var regpd = $('#regpd').val(), regun = $('#regun').val(), regpdrt = $('#regpdrt').val(), regfn = $('#regfn').val(), regmn = $('#regmn').val(), regea = $('#regea').val();

        //RegEx Pattern for email validation
        //var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        var msg = "";
        var valid = true;

        //Validate before proceed to submit the data
        if (!regpd || !regun || !regpdrt || !regfn || !regmn || !regea) {
            msg += "Please fill in all the required fields<br>";
            errorMessage("reg", msg);
        } else {

            //Validate Email Format
            if (!isValidEmailAddress(regea)) {
                msg += "Your email address format is invalid<br>";
                valid = false;
            }

            //Validate the passwords are the same
            if (!isPasswordMatch(regpd, regpdrt)) {
                msg += "Your passwords do not match<br>";
                valid = false;
            }

            //If pass all the validations, proceed to submit data
            if (valid === true) {
                registerUser(regun, regpd, regfn, regmn, regea);
            } else {
                errorMessage("reg", msg);
            }
        }
    });

    //Listener on the products list
    $('#productsList').delegate('li', 'vclick', function (e) {

        localStorage.setItem('selectedProduct', $(this).attr('data-id'));
        retrieveAndPopulateProductDetail($(this).attr('data-id'));
    });


    //Listener on the post list
    $('#latestUpdateList').delegate('li', 'vclick', function (e) {
        retrieveAndPopulatePostDetail($(this).attr('data-id'));
    });

    //Listener on the reservations list
    $('#reservationList').delegate('li', 'vclick', function (e) {
        getUserReservationDetail($(this).attr('data-id'));
    });


    /*
    * Every change on the fields will trigger ticketStatusChecker()
    */

    $('#submitPurchase').unbind('click').bind('click', function (e) {
        if (validation != 2) {
            $('#statusChecker').slideUp('fast', function () {
                $('#statusChecker').slideDown('fast');
            });
        } else {
            var confirmCode = "";
            //Populate information to confirmation transaction page
            var adultquantity = parseInt(localStorage.adultquantity);
            var childquantity = parseInt(localStorage.childquantity);
            var totalAdult = 0;
            var totalChild = 0;
            addContent('confirmProductName', localStorage.productName);
            if (adultquantity > 0) {
                totalAdult = adultquantity * parseInt(localStorage.productAmountAdult);
                addContent('adultTotalPrice', adultquantity + " x RM " + parseInt(localStorage.productAmountAdult) + " = RM" + totalAdult);
            } else {
                addContent('adultTotalPrice', "0 x RM " + parseInt(localStorage.productAmountAdult) + " = RM 0");
            }
            if (childquantity > 0) {
                totalChild = childquantity * parseInt(localStorage.productAmountChild);
                addContent('childTotalPrice', childquantity + " x RM " + parseInt(localStorage.productAmountChild) + " = RM" + totalChild);
            } else {
                addContent('childTotalPrice', "0 x RM " + parseInt(localStorage.productAmountChild) + " = RM 0");
            }

            addContent('TotalPrice', "RM " + (totalAdult + totalChild));


            //addContent('confirmButtonDiv',"<a id=\"confirmPurchase\" data-role=\"button\" data-icon=\"check\" data-iconpos=\"right\"  data-theme=\"b\">"+buttonText+"</a>");

            //$("#confirmPurchase .ui-btn-text").text(buttonText);

            //$('#confirmTransaction-ul').listview('refresh');
            $.mobile.changePage($(document.location.href = "#confirmTransaction"), 'slide');

            //submit
            //localStorage.selectedProduct = 4;
            //localStorage.uid = 1;
            //remark = "";
            //submitReservation(localStorage.selectedProduct, localStorage.uid, localStorage.ticketdate, localStorage.adultquantity, localStorage.childquantity, remark, localStorage.selectedPaymentMethod);
        }


    });


    $('#confirmPurchase').unbind('click').bind('click', function (e) {

        console.log("confirmPurchase clicked");


        //Direct user to the payment page if user uses Debit or Credit cards
        //Reserve for user directly if user are using Reserve Without Payment
        if (localStorage.selectedPaymentMethod == "WOP") {
            submitReservation(localStorage.selectedProduct, localStorage.uid, localStorage.ticketdate, localStorage.adultquantity, localStorage.childquantity, "", localStorage.selectedPaymentMethod);
        } else {
            //proceed to payment page
            $.mobile.changePage($(document.location.href = "#paymentsimulation"), 'slide');
        }

    });


    $('#grabTicketButton').unbind('click').bind('click', function (e) {

        console.log("Test");

        if (localStorage.uid == null) {
            console.log("uid null");
            localStorage.lastPage = 'productDetail';
            $.mobile.changePage($(document.location.href = "#login"), 'slide');
        } else {
            console.log("uid");
            //if logged in then direct user to purchase ticket page
            $.mobile.changePage($(document.location.href = "#purchaseTicketPage"), 'slide');
        }
    });


    //Payment Simulation success button, will submit the reservation
    $('#paymentSuccess').unbind('click').bind('click', function (e) {
        submitReservation(localStorage.selectedProduct, localStorage.uid, localStorage.ticketdate, localStorage.adultquantity, localStorage.childquantity, "", localStorage.selectedPaymentMethod);
    });

    //Payment Simulation failure button, will reject the reservation
    $('#paymentFailure').unbind('click').bind('click', function (e) {
        $.mobile.changePage($(document.location.href = "#confirmTransaction"), 'slide');
        errorMessage("confirmTransactiontopmsg", "Payment Transaction is failed. Please try again.");
    });

    //Cancel Reservation Button, used by user to cancel the unpaid reservation
    $('#cancelReservationButton').unbind('click').bind('click', function (e) {
        cancelReservation(localStorage.resCode);
    });


    //Slider on stop event
    $('#sliderChild, #sliderAdult').on('slidestop', function () {
        ticketStatusChecker();
    });
    //Date picker on change event
    $('#ticketDate, #paymentMethod').on('change', function () {
        ticketStatusChecker();
    });
    
    //PLUGIN
    //Date Picker plugin
    $('.nativedatepicker').focus(function(event) {
        var currentField = $(this);
        var myNewDate = Date.parse(currentField.val()) || new Date();
        console.log(myNewDate);
        if(typeof myNewDate === "number"){ myNewDate = new Date (myNewDate); }
        // Same handling for iPhone and Android
        window.plugins.datePicker.show({
            date : myNewDate,
            mode : 'date', // date or time or blank for both
            allowOldDates : true
        }, function(returnDate) {
            var newDate = new Date(returnDate);
            currentField.val(newDate.toString("dd/MMM/yyyy"));
            
            // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
            currentField.blur();
            ticketStatusChecker();
        });
    });

   


});

//--------------------------- Populate Data Into Form-------------------------------//

function populateAnnouncements() {
	//Structure the code that going to insert to the announcement list
	var listCode = "";
	showLoading("Populating Data..", true);
	$('#announcementList').empty();
	if(announcements!=null && announcements.length > 0) {
		$.each(announcements, function () {
            	var postId = this.post_id;
        		var postTitle = this.post_title;
				var postDesc = this.post_desc;
				var postContent = this.post_content;
				var post_img = this.post_img;
				
				//Set the divider if the divide for the type is not added
				//Group all the post by its type
				if(tempPost != postTitle) {
					listCode += "<li data-role=\"list-divider\">" + postTitle + "</li>" ;
					tempPost = postTitle;
				}

                listCode += "<li data-theme='c' data-name='"+postId+"' data-id='"+postId+"'><h3 style = \"text-shadow: 0px 0px #ffffff; white-space: normal;\">"+postDesc+"</h3></li>" ;
            });
	} else {	
            listCode = "<li data-role=\"list-divider\">Anouncements</li><li data-icon=\"false\"><a href=\"#\"><h2>No Result</h2><p><strong></strong></p></a></li>";
	}
	
	$('#announcementList').append(listCode);
	$('#announcementList').listview('refresh');
	hideLoading();
}

function populateLatestUpdates() {
	//Structure the code that going to insert to the announcement list
	var listCode = "";
	showLoading("Populating Data..", true);
	$('#latestUpdateList').empty();
	if(latestUpdates!=null && latestUpdates.length > 0) {
	listCode += "<li data-role=\"list-divider\">Latest Updates from us</li>" ;
		$.each(latestUpdates, function () {
            	var postId = this.post_id;
        		var postTitle = this.post_title;
				var postDesc = this.post_desc;
				var postContent = this.post_content;
				var post_img = this.post_img;
				
				//Set the divider if the divide for the type is not added
				//Group all the post by its type
                listCode += "<li data-theme='c' data-name='"+postId+"' data-id='"+postId+"'><a href=\"#postDetail\"><img width=\"80\" src=\""+ipaddress+post_img+"\"/><h3 style = \"text-shadow: 0px 0px #ffffff;white-space: normal;\">"+postTitle+"</h3><p>"+postDesc+"</p></a></li>" ;
            });
	} else {	
            listCode = "<li data-role=\"list-divider\">Latest Updates</li><li data-icon=\"false\"><a href=\"#\"><h2>No Result</h2><p><strong></strong></p></a></li>";
	}
	
	$('#latestUpdateList').append(listCode);	
	$('#latestUpdateList').listview('refresh');
	hideLoading();
}

function populateProductsList() {
	//Structure the code that going to insert to the announcement list
	var listCode = "";
	showLoading("Populating Data..", true);
	$('#productsList').empty();
	if(products!=null && products.length > 0) {
		$.each(products, function () {
            	var productId = this.product_id;
        		var productName = this.product_name;
				var productCategory = this.product_category;
				var productAmountAdult = this.product_amount_adult;
				var productAmountChild = this.product_amount_child;
				
				//Set the divider if the divide for the type is not added
				//Group all the post by its type
				if(tempProductCategory != productCategory) {
					listCode += "<li data-role=\"list-divider\">" + productCategory + "</li>" ;
					tempProductCategory = productCategory;
				}
                listCode += "<li data-theme='c' data-name='"+productId+"' data-id='"+productId+"'><a href='#productDetail'><h2 style = \"text-shadow: 0px 0px #ffffff;white-space: normal;\">"+productName+"</h2><p>Adult Ticket: RM "+productAmountAdult+" Child Ticket: RM "+productAmountChild+"</p> </a></li>" ;
            });
	} else {	
            listCode = "<li data-role=\"list-divider\">Products</li><li data-icon=\"false\"><a href=\"#\"><h2>No Result</h2><p><strong></strong></p></a></li>";
	}
	
	$('#productsList').append(listCode);
	$('#productsList').listview('refresh');
	hideLoading();
}

function populateReservationsList(reservations) {
	//Structure the code that going to insert to the announcement list
	var listCode = "";
	listCode += "<li data-role=\"list-divider\">All Reservations</li>" ;
	showLoading("Populating Data..", true);
	$('#reservationList').empty();
	if(reservations!=null && reservations.length > 0) {
	    $.each(reservations, function () {
	        var resId = this.res_id
	        var resCode = this.res_code;
	        var resProductId = this.res_product_id;
	        var resTicketDate = this.res_ticketdate;
	        var resAdultNo = this.res_adult_no;
	        var resChildNo = this.res_child_no;
	        var resStatus = this.res_status;
	        var resType = this.res_type;
	        var resCollected = this.res_collected;
	        var collected = "";
	        var color = "black";
	        if (resCollected == 'true') {
	            collected = "COLLECTED";
	        } else if (resStatus == 'paid' || resStatus == 'unpaid') {
	            color = "#FF0040";
	        }

	        listCode += "<li data-theme='c' data-name='" + resCode + "' data-id='" + resCode + "'><a href='#'><h2 style = \"text-shadow: 0px 0px #ffffff;white-space: normal; color:#0B4C5F\">" + resCode + "</h2><p>Product ID: " + resProductId + " <font color=\"#00BFFF\">Ticket Date: " + resTicketDate + "</font> <font color=\"" + color + "\">Status: " + resStatus + " " + collected + " </font></p></a></li>";
	    });
	} else {	
            listCode = "<li data-role=\"list-divider\">All Reservations</li><li data-icon=\"false\"><a href=\"#\"><h2>No Result</h2><p><strong></strong></p></a></li>";
	}
	
	$('#reservationList').append(listCode);
	$('#reservationList').listview('refresh');
	hideLoading();
}

function populateReservationSummary(data, product) {

    if(data != null) {
        $.each(data, function () {

			addContent('confirmResCode', this.res_code);
            addContent('reservationDetailProductName', product['0']['product_name']);
            addContent('confirmTicketDate', this.res_ticketdate);
            if(this.res_type == 'WOP') {
                addContent('confirmPaymentType', "Reserve Without Payment");
            } else {
                addContent('confirmPaymentType', "Debit / Credit Card");
            }

            if(this.res_status == 'unpaid') {
                addContent('confirmPaymentStatus', 'Unpaid');
            } else {
                addContent('confirmPaymentStatus', 'Paid');
            }

            if(this.res_collected == 'true') {
                addContent('confirmCollectStatus', 'Collected');
            } else {
                addContent('confirmCollectStatus',"Waiting For Collection");
            }

            //If the reservation is unpaid or collected, user may have option to delete it
            // here, it will show or hide the delete button at the reservation Detail page
            if(this.res_status == 'unpaid' && this.res_collected != 'true') {
                document.getElementById('deleteButtonDiv').style.display = 'block';
            }


            addContent('confirmAdultQuantity', this.res_adult_no);
            addContent('confirmChildQuantity', this.res_child_no);
            //$('#confirmTransaction').listview('refresh');
	        $.mobile.changePage('#reservationDetail', 'slide');
            });
    }
}




//Methods
function errorMessage(page,text) {
    var hc;
    switch(page) {
		case 'index':
            $('#indextopmsg').slideUp();
            $('#indextopmsg').empty();
            $('#indextopmsg').append(text);
            $('#indextopmsg').slideDown();
            hc = $('#indextopmsg');

            break;
        case 'reg':
            $('#regtopmsg').slideUp();
            $('#regtopmsg').empty();
            $('#regtopmsg').append(text);
            $('#regtopmsg').slideDown();
            hc = $('#regtopmsg');

            break;

        case 'login':
            $('#logintopmsg').slideUp();
            $('#logintopmsg').empty();
            $('#logintopmsg').append(text);
            $('#logintopmsg').slideDown();
            hc = $('#logintopmsg');
            break;
			
		case 'productdetailtopmsg':
			$('#productdetailtopmsg').slideUp();
            $('#productdetailtopmsg').empty();
            $('#productdetailtopmsg').append(text);
            $('#productdetailtopmsg').slideDown();
            hc = $('#productdetailtopmsg');
            break;
			
		case 'postdetailtopmsg':
			$('#postdetailtopmsg').slideUp();
            $('#postdetailtopmsg').empty();
            $('#postdetailtopmsg').append(text);
            $('#postdetailtopmsg').slideDown();
            hc = $('#postdetailtopmsg');
            break;
			
		case 'reservationDetailtopmsg': 
			$('#reservationDetailtopmsg').slideUp();
            $('#reservationDetailtopmsg').empty();
            $('#reservationDetailtopmsg').append(text);
            $('#reservationDetailtopmsg').slideDown();
            hc = $('#reservationDetailtopmsg');
            break;
			
		case 'reservationListtopmsg': 
			$('#reservationListtopmsg').slideUp();
            $('#reservationListtopmsg').empty();
            $('#reservationListtopmsg').append(text);
            $('#reservationListtopmsg').slideDown();
            hc = $('#reservationListtopmsg');
            break;	

        case 'confirmTransactiontopmsg': 
			$('#confirmTransactiontopmsg').slideUp();
            $('#confirmTransactiontopmsg').empty();
            $('#confirmTransactiontopmsg').append(text);
            $('#confirmTransactiontopmsg').slideDown();
            hc = $('#confirmTransactiontopmsg');
            break;
            
			
			
    } 
    timeout = setTimeout(function(){
           hc.slideUp('slow')         
        }, 4000)
};

/**
* This is a convenient method, it encrypt a given string with jCryption and return the encrypted text
**/
function encrypt(x) {
	return $.jCryption.encrypt(x, key);
}
/**
* This is a convenient method, it decrypt a given encrypted string with jCryption and return the decrypted text
**/
function decrypt(x) {
	return $.jCryption.decrypt(x, key);
}

/**
* This is a method to validate the email address if the format is valid or not.
**/
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

/**
* This is a method to validate whether the two passwords are the same.
**/
function isPasswordMatch(pd1, pd2) {
    return pd1.match(pd2);
}

//Hide the loading
function hideLoading() {
    $.mobile.loading( "hide" );
}

//This is a convenient method to display custom loading message
function showLoading(msgText,textVisible) {
    $.mobile.loading('show', { text: msgText , textVisible: textVisible, theme: "b"});
}
//This is a convenient method to add html content to given divName
function addContent(divName, content) {
     document.getElementById(divName).innerHTML = content;
}

function initPages() {
	errorMessage("index","Retrieving Data.. Please wait for a moment..");
	retrieveAnnouncement();
	retrieveLatestUpdates();
	retrieveProducts();
}

function initAnonymousPage(){
	$('#indexPageHeaderButton .ui-btn-text').text("Login");
    addContent('mainMenuList',"<li><a data-prefetch=\"true\" href=\"#announcement\" data-transition=\"slide\">Announcements</a></li><li><a data-prefetch=\"true\" href=\"#latestUpdate\" data-transition=\"slide\">What\'s NEW</a></li><li><a data-prefetch=\"true\" href=\"#allProducts\" data-transition=\"slide\">Get Tickets</a></li>")
    $('#mainMenuList').listview('refresh');
}

function initUserPage() {
	$('#indexPageHeaderButton .ui-btn-text').text("Logout");
    addContent('mainMenuList', "<li><a data-prefetch=\"true\" href=\"#history\" data-transition=\"slide\">My Reservation</a></li><li><a data-prefetch=\"true\" href=\"#announcement\" data-transition=\"slide\">Announcements</a></li><li><a data-prefetch=\"true\" href=\"#latestUpdate\" data-transition=\"slide\">What\'s NEW</a></li><li><a data-prefetch=\"true\" href=\"#allProducts\" data-transition=\"slide\">Get Tickets</a></li>");
	$('#mainMenuList').listview('refresh');
	getUserReservations(localStorage.uid);
	
}


/**
* This method check whether if the user already logged in, if yes, direct them to the user page.
*/
function checkLoggedIn() {
	console.log(localStorage.getItem('uid'));
	if(localStorage.getItem('uid')!=null) {
		initUserPage();
	}
}

/**
* This method will return user to the previous page.
*/

function gotoPreviousPage() {
    if(localStorage.lastPage == null) {
        $.mobile.changePage('#index', 'slide');
    } else {
       $.mobile.changePage('#' + localStorage.lastPage, 'slide');
    }
}

//------------Validation-------------------------- 

function ticketStatusChecker() {

    //set validation to false
    validation = 1;
    localStorage.childquantity = $('#childQuantity').val();
    localStorage.adultquantity = $('#adultQuantity').val();
   
    if($('#ticketDate').val()!="") {
     	console.log("value:" +$('#ticketDate').val());
    	var ticketDate = new Date($('#ticketDate').val());
    	localStorage.ticketdate = DateConvertor(ticketDate);
    } else {
    	localStorage.ticketdate="";
    }
    localStorage.selectedPaymentMethod = $('#paymentMethod').val();
     
    addContent('statusChecker', "<img src=\""+ipaddress+"/images/loader.gif\"/>");
    var availableCDC = '0';
    var availableWOP = '0';
    
    var total = parseInt(localStorage.childquantity)  + parseInt(localStorage.adultquantity);
    var valid = true;
    var msg = '';
	console.log(total);

    //Total cannot be 0
    if(total == '0') {
        msg += "Please slide at least one ticket on child or adult.<br>";
        valid = false;
    }

    //Total cannot be more than 10
    if(total > 10) {
        msg += "Maximum tickets for each transaction is 10.<br>";
        valid = false;
    }
	
	var currentDate = new Date().setHours(0, 0, 0, 0);

    if(localStorage.ticketdate==null || localStorage.ticketdate=='') {
        msg += "Please select a valid date.<br>";
        valid = false;
    } else if(new Date(Date.parse(localStorage.ticketdate)).setHours(0, 0, 0, 0) < currentDate ) {
		msg += "You can only select today or date greater than today.<br>";
        valid = false;
	
	} else {
        if(valid) {
            //addContent('statusChecker', "Connecting to server..");
			switch (localStorage.selectedPaymentMethod) {
				case 'CDC':
					checkAvailableNumOfCDC(localStorage.ticketdate, total);
					break;
				case 'WOP':
					checkAvailableNumOfWOP(localStorage.ticketdate, total);
					break;
			}
            
            //var test = setInterval(function () {}, 3000);
            
        }       
    }

    if(!valid) {
        addContent('statusChecker', "<font color=\"FE2E64\">" + msg + "</font>");
    }
	
	
	
	
	
}

function validateAvailbleCDC(availableCDC, required, ticketdate) {
		var msg="";
		var valid = true;
		if (required > availableCDC) {
			 msg += "Sorry, the ticket of " + ticketdate + " is already fully booked. Try another date?<br>";
			 valid = false;
		}

        if(valid) {
            color = '#0B6138';
            //set validation to true
            validation = 2;
        } else {
            color = '#FE2E64';
        }

		msg += "<font color=\""+color+"\">Available Ticket(s): " + availableCDC + " <br>Required Ticket(s): " + required + "</font>";
		addContent('statusChecker', msg);
}

function validateAvailableWOP(availableWOP, required, ticketdate) {
		var msg="";
		var valid=true;
		var color;
		if (required > availableWOP) {
             msg = "Sorry, the quota of Pay While Collect reservation of " + ticketdate + " is finished. Try with credit/debit card?<br>";
             valid = false;
        }

        if(valid) {
            color = '#0B6138';
            //set validation to true
            validation = 2;
        } else {
            color = '#FE2E64';
        }

        msg += "<font color=\""+color+"\">Available Ticket(s): " + availableWOP + " <br>Required Ticket(s): " + required + "</font>";
		addContent('statusChecker', msg);
}


//--------------------------AJAX caller------------------------------------//

//--- Authentication ----
function login(un, pd) {
    var postdata = { "un": un, "pd": pd };
    $.ajax({
        url: ipaddress+'php/user_login.php',
        type: 'post',
        dataType: 'text',
        success: function (response) {
        var dec = $.jCryption.decrypt(response, key);
        res = jQuery.parseJSON(dec); //parse to array object

         if (res.status == "Invalid username or password") {
              errorMessage("login", "Invalid combination of username and password<br>");
         } else {
                        var data = res.data[0];
                        localStorage.un = data.username;
                        localStorage.uid = data.user_id;
                        localStorage.firstname = data.fullname;
                        //initialize user page
						clearAllFields();
                        initUserPage();
                        //direct user back to the previous page.
                        gotoPreviousPage();
                    }
                },
                error: function (request, status, error) {
                    errorMessage("login", "There is some problem with the connection<br>");
                },
                data: { "req": $.jCryption.encrypt(JSON.stringify(postdata), key) }
            });
}

function registerUser(regun, regpd, regfn, regmn, regea) {
    var postdata = { "regun": regun, "regpd": regpd, "regfn": regfn, "regmn": regmn, "regea": regea };
                $.ajax({
                    url: ipaddress+'php/user_registration.php',
                    type: 'post',
                    dataType: 'text',
                    success: function (data) {
                        if (data == "SUCCESS") {
							clearAllFields();
                            $.mobile.changePage($(document.location.href = "#registerdone"), 'slide');
                        } else if (data == "EMPTY") {
                            errorMessage("reg", "Please fill in all the required fields.");
                        } else if (data == "DUPLICATED") {
                            errorMessage("reg", "Username is in use. Try other?");
                        }
                    },
                    data: { "req": $.jCryption.encrypt(JSON.stringify(postdata), key) }
                });
}

//----Retrieve Information----//


/**
*Get the annoucements
*/
function retrieveAnnouncement() {
	showLoading("Retrieving Data..", true);
	// retrieve all the 'ann' stand for announcement in database
	var postdata = { "posttype": 'ann'}; 
	
	$.ajax({
        url: ipaddress+'php/posts_get.php',
        type: 'post',
        dataType: 'text',
        success: function (response) {
        	var dec = decrypt(response);
			var res = JSON.parse(dec); //parse to array object
			
            if (res.status == "ok") {

            	if(res.data == undefined ) {
            		announcements = null;
            	} else {           		
            		var data = new Array();
					data = res.data;
            		announcements = data;	
            	}
                
                populateAnnouncements();
                hideLoading();
            } 
        },
        data: { "req" : encrypt(JSON.stringify(postdata)) }
    });
}


/**
*Get the latest Updates
*/
function retrieveLatestUpdates() {
	showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "posttype": 'latest'}; 
	
	$.ajax({
        url: ipaddress+'php/posts_get.php',
        type: 'post',
        dataType: 'text',
        success: function (response) {
        	var dec = decrypt(response);
			var res = JSON.parse(dec); //parse to array object
			
            if (res.status == "ok") {

            	if(res.data == undefined ) {
            		latestUpdates = null;
            	} else {           		
            		var data = new Array();
					data = res.data;
            		latestUpdates = data;	
            	}
                
                populateLatestUpdates();
                hideLoading();
            } 
        },
        data: { "req" : encrypt(JSON.stringify(postdata)) }
    });
}

/**
*Get all the products
*/
function retrieveProducts() {
	showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "product": 'all'}; 
	
	$.ajax({
        url: ipaddress+'php/products_get.php',
        type: 'post',
        dataType: 'text',
        success: function (response) {
        	var dec = decrypt(response);
			var res = JSON.parse(dec); //parse to array object
			
            if (res.status == "ok") {

            	if(res.data == undefined ) {
            		products = null;
            	} else {           		
            		var data = new Array();
					data = res.data;
            		products = data;	
            	}
                
                populateProductsList();
                hideLoading();
            } 
        },
        data: { "req" : encrypt(JSON.stringify(postdata)) }
    });
}

/**
*Get and populate the selected product
*/
function retrieveAndPopulateProductDetail(productId) {
	errorMessage('productdetailtopmsg', "Retrieving Data..");
	$.mobile.loading('show');
	var postdata = { "product": productId};

	$.ajax({
	    url: ipaddress+'php/products_get.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object
	        var listCode = "";
	        var confirmCode = "";
	        if (res.status == "ok") {

	            if (res.data == undefined) {
	                products = null;
	            } else {
	                $.each(res.data, function () {
	                    localStorage.productId = this.product_id;
	                    localStorage.productName = this.product_name;
	                    localStorage.productAmountAdult = this.product_amount_adult;
	                    localStorage.productAmountChild = this.product_amount_child;
                        //Populate information to productDetail page
                        addContent('productDetailProduct', "Product: " + localStorage.productName );
                        addContent('productDetailAmountAdult', "Adult: RM" + localStorage.productAmountAdult );
                        addContent('productDetailAmountChild', "Child: RM" +localStorage.productAmountChild );
	                  
	                    //Populate information to Purchase Ticket Page
	                    addContent('purchaseTicketProduct', "Product: " + localStorage.productName);
	                    addContent('purchaseTicketAdultPrice', "Adult: RM" + localStorage.productAmountAdult);
	                    addContent('purchaseTicketChildPrice', "Child: RM" + localStorage.productAmountChild);
	                });

	                $('#productDetail-ul').listview('refresh');
	                $.mobile.changePage('#productdetail', 'slide');
	            }


	        }
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});
}

/**
*Get and populate the detail of selected announcement 
*/
function retrieveAndPopulatePostDetail(postId) {
	errorMessage('postdetailtopmsg', "Retrieving Data..");
	$.mobile.loading('show');
	var postdata = { "posttype": postId};

	$.ajax({
	    url: ipaddress+'php/posts_get.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        if (res.status == "ok") {

	            if (res.data == undefined) {
	                products = null;
	            } else {
	                $.each(res.data, function () {
	                    var postId = this.post_id;
	                    var postTitle = this.post_title;
	                    var postDesc = this.post_desc;
	                    var postContent = this.post_content;
	                    var postImg = this.post_img;

	                    //Add content to post detail page
	                    addContent('postBlockA', postTitle);
	                    addContent('postBlockB', postDesc);
	                    addContent('postBlockC', "<a href=\"#popupPostImg\" data-transition=\"pop\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\"><img src=\"" + ipaddress+postContent + "\"></img></a>");
	                    addContent('popupPostImg', "<a href=\"#\" data-rel=\"back\" data-role=\"button\" data-theme=\"a\" " +
                        "data-icon=\"delete\" data-iconpos=\"notext\" class=\"ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a\" " +
                        " data-corners=\"true\" data-shadow=\"true\" data-iconshadow=\"true\" data-wrapperels=\"span\" title=\"Close\">" +
                        "<span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Close</span>" +
                        "<span class=\"ui-icon ui-icon-delete ui-icon-shadow\">&nbsp;</span></span></a>" +
                        "<iframe src=" + ipaddress+postContent + " style=\"min-width:600px; min-height: 600px\" ></iframe>");
	                    //"<img src=\""+postContent+"\"  alt=\""+postTitle+"\">");

	                });
	                $.mobile.changePage('#postdetail', 'slide');
	            }
	        }
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});
}



//----Reservation AJAX-------//
function checkAvailableNumOfWOP(ticketDate, requiredTickets) {
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'checkAvailableNumOfWOP', "ticketDate": ticketDate};
	var response;

	$.ajax({
	    url: ipaddress+'php/reservation.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        validateAvailableWOP(res, requiredTickets, ticketDate);
           
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});

    
}

function checkAvailableNumOfCDC(ticketDate, requiredTickets) {

	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'checkAvailableNumOfCDC', "ticketDate": ticketDate};
	var response;

	$.ajax({
	    url: ipaddress+'php/reservation.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        console.log("checkAvailableNumOfCDC: " + res);
 
            validateAvailbleCDC(res, requiredTickets, ticketDate);
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});

    
}

function getUserReservations() {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'getUserReservations', "userId": localStorage.uid};
	var response;

	$.ajax({
	    url: ipaddress+'php/reservation.php',
	    type: 'post',
	    dataType: 'text', 
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        if (res.status == "ok") {

	            if (res.data == undefined) {
	                //products = null;
	            } else {
	                populateReservationsList(res.data);
	            }
	            console.log("getUserReservations: " + res.data);
	            hideLoading();
	        }
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});
}

function getUserReservationDetail(resCode) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
    localStorage.resCode = resCode;
	var postdata = { "req": 'getUserReservationDetail', "resCode": resCode};
	var response;

	$.ajax({
	    url: ipaddress+'php/reservation.php',
	    type: 'post',
	    dataType: 'text', 
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        if (res.status == "ok") {

	            if (res.data == undefined) {
	                //products = null;
	            } else {
	                populateReservationSummary(res.data, res.product);
	            }
	            console.log("getUserReservationDetail: " + res.data);
	            hideLoading();
	        }
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});
}

function cancelReservation(resCode) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'cancelReservation', "resCode": resCode};
	var response;

	$.ajax({
	    url: ipaddress+'php/reservation.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var res = decrypt(response);

	        if (res == "CANCELLED") {
	            getUserReservations();
                $.mobile.changePage('#history', 'slide');
	            errorMessage("reservationListtopmsg", "Reservation: "+resCode+" is cancelled.");
	        } else if (res == "DENIED") {
                errorMessage("reservationDetailtopmsg", "Reservation is not allowed to cancel.");
	        }

	        hideLoading();

	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});

    return response;
}

function submitReservation(productId, userId, ticketDate, adultNo, childNo, remark, type) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'createReservation', "productId": productId, "userId": userId , "ticketDate": ticketDate, "adultNo": adultNo, "childNo": childNo, "remark": remark, "paymentMethod": type};
	var response;

	$.ajax({
	    url: ipaddress+'php/reservation.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object
	        console.log(res);
			if(res.status == 'SUCCESS') {
				clearTicketPage();
                getUserReservations();
				populateReservationSummary(res.data, res.product);
			} else if(res.status == 'DENIED') {
			console.log('DENIED HERE');
				errorMessage("confirmTransactiontopmsg", "Your maximum of creating reservation without payment is reached, please use Debit/Credit Cards.");
			}
	        hideLoading();
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});

    return response;
}

function clearAllFields() {
//Login
	$('#usernameInput').val("");
    $('#passwordInput').val("");
//register 
	 $('#regpd').val(""); 
	 $('#regun').val(""); 
	 $('#regpdrt').val(""); 
	 $('#regfn').val(""); 
	 $('#regmn').val(""); 
	 $('#regea').val("");
}

function clearTicketPage() {
	//puchase ticket page
	 addContent("purchaseTicketProduct","");
	 addContent("purchaseTicketAdultPrice","");
	 addContent("purchaseTicketChildPrice","");
	 $('#childQuantity').val("0");
	 //$( "#adultQuantity" ).rangeslider();
	 $('#adultQuantity').val("0");
	 $('#ticketDate').val(null);
	 addContent("statusChecker","");
	 $('purchaseticketpagelist').listview('refresh');	
}

function DateConvertor(d)
{
    var year, month, day;
    year = String(d.getFullYear());
    month = String(d.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(d.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}


