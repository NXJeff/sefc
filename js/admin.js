 //Global variable
var key = 'jeslyn';
var ip = '192.168.1.100:81/';

//DOM
$(document).on('pageinit','#index', function () { 
	checkLoggedIn();
	$('#searchResultPage').page({ domCache: true });
      /** 
    *	OnClick event on Buttons
    **/
    $('#loginbutton').unbind('click').bind('click', function (e) {
        var un = $('#adminUsernameInput').val();
        var pd = $('#adminPasswordInput').val();
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
		
		clearFields();
    });
	
	$('#indexPageHeaderButton').unbind('click').bind('click', function (e) {
        console.log(this.text);

        $('#logoutDialog').popup('open');
        
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
        //go back to login page
		$.mobile.changePage($(document.location.href = "#login"), 'fade');
    });
	
	/**
    * This is the button that user pressed 'Search By Reservation Code' at the first page.
    * This will search and return the search results
    */
    $('#searchByResCodeButton').unbind('click').bind('click', function (e) {
		var resCode = $('#resCodeInput').val();
        searchReservationsByResCode(resCode);
		clearFields();
    });
	
	/**
    * This is the button that user pressed 'Search By Username Code' at the first page.
    * This will search and return the search results
    */
    $('#searchByUsernameButton').unbind('click').bind('click', function (e) {
        var username = $('#usernameInput').val();
		searchReservationsByUsername(username);
		clearFields();
    });
	
	//Listener on the reservations list
    $('#searchResultList').delegate('li', 'vclick', function (e) {
        searchReservationsByResCode($(this).attr('data-id'));
    });


	$('#collectTicketButton').unbind('click').bind('click', function (e) {
		payAndCollectTicket(localStorage.resCode);
	});
	
	$('#cancelReservationButton').unbind('click').bind('click', function (e) {
		cancelReservation(localStorage.resCode);
	});

});




//--------------------------AJAX caller------------------------------------//

//--- Authentication ----
function login(un, pd) {
    var postdata = { "un": un, "pd": pd };
    $.ajax({
        url: '/php/admin_login.php',
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
                localStorage.aid = data.user_id;
                localStorage.firstname = data.fullname;
				$.mobile.changePage('#index', 'fade');
                console.log("LOGGED IN");
            }
        },
        error: function (request, status, error) {
            errorMessage("login", "There is some problem with the connection<br>");
        },
        data: { "req": $.jCryption.encrypt(JSON.stringify(postdata), key) }
    });
}

function cancelReservation(resCode) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'cancelReservation', "resCode": resCode};
	var response;

	$.ajax({
	    url: '../php/reservation.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var res = decrypt(response);

	        if (res == "CANCELLED") {
	            searchReservationsByResCode(resCode);
	            errorMessage("reservationDetailtopmsg", "Reservation: "+resCode+" is cancelled.");
	        } else if (res == "DENIED") {
                errorMessage("reservationDetailtopmsg", "Reservation is not allowed to cancel.");
	        }

	        hideLoading();

	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});

    return response;
}

function payAndCollectTicket(resCode) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'payAndCollectReservation', "resCode": resCode};
	var response;

	$.ajax({
	    url: '../php/reservation.php',
	    type: 'post',
	    dataType: 'text',
	    success: function (response) {
	        var res = decrypt(response);

	        if (res == "SUCCESS") {
                searchReservationsByResCode(resCode);
	            errorMessage("reservationDetailtopmsg", "Reservation: "+resCode+" is paid and collected.");
	        } else if (res == "DENIED") {
                errorMessage("reservationDetailtopmsg", "Reservation is not allowed to pay and collect.");
	        }

	        hideLoading();

	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});

    return response;
}

function searchReservationsByResCode(resCode) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
    localStorage.resCode = resCode;
	var postdata = { "req": 'getUserReservationDetail', "resCode": resCode};
	var response;

	$.ajax({
	    url: '../php/reservation.php',
	    type: 'post',
	    dataType: 'text', 
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        if (res.status == "ok") {

	            if (res.data == undefined) {
	                errorMessage('index', 'No Record found with given Reservation Code.');
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

function searchReservationsByUsername(username) {
    showLoading("Retrieving Data..", true);
	// retrieve all the 'latest' stand for announcement in database
	var postdata = { "req": 'getUserReservationsByUsername', "username": username};
	var response;

	$.ajax({
	    url: '../php/reservation.php',
	    type: 'post',
	    dataType: 'text', 
	    success: function (response) {
	        var dec = decrypt(response);
	        var res = JSON.parse(dec); //parse to array object

	        if (res.status == "ok") {

	            if (res.data == undefined) {
	                //products = null;
	            } else {
	                populateResultList(res.data);
	            }
	            console.log("getUserReservationsByUsername: " + res.data);
	            hideLoading();
	        }
	    },
	    data: { "req": encrypt(JSON.stringify(postdata)) }
	});
}

//Populating data to the forms

function populateResultList(reservations) {
	//Structure the code that going to insert to the announcement list
	var listCode = "";
	listCode += "<li data-role=\"list-divider\">All Reservations</li>" ;
	showLoading("Populating Data..", true);
	$('#searchResultList').empty();
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
	
	$('#searchResultList').append(listCode);
	$('#searchResultList').listview('refresh');
	$.mobile.changePage('#searchResultPage', 'fade');
	hideLoading();
}

function populateReservationSummary(data, productarray) {

    if(data != null) {
        $.each(data, function () {
			var product = productarray['0'];
			addContent('confirmResCode', this.res_code);
            addContent('confirmProductName', product['product_name']);
            addContent('confirmTicketDate', this.res_ticketdate);
            if(this.res_type == 'WOP') {
                addContent('confirmPaymentType', "Reserve Without Payment");
            } else {
                addContent('confirmPaymentType', "Debit / Credit Card");
            }

            if(this.res_status == 'unpaid') {
                addContent('confirmPaymentStatus', 'Unpaid');
            } else if(this.res_status == 'paid'){
                addContent('confirmPaymentStatus', 'Paid');
            } else if(this.res_status == 'cancelled') {
				addContent('confirmPaymentStatus', 'Cancelled');
			} else if(this.res_status=='expired') {
				addContent('confirmPaymentStatus', 'Expired');
			}
			
			if(this.res_status == 'unpaid' || this.res_status == 'paid') {
				if(this.res_collected == 'true') {
					addContent('confirmCollectStatus', 'Collected');
				} else if(this.res_collected == '') {
					addContent('confirmCollectStatus',"Waiting For Collection");
				} 
			} else {
			//clear the field
					addContent('confirmCollectStatus',"");
			}

            //If the reservation is unpaid or not collected yet, user or staff may have option to delete it
            // here, it will show or hide the delete button at the reservation Detail page
            if(this.res_status == 'unpaid' && this.res_collected != 'true') {
                document.getElementById('deleteButtonDiv').style.display = 'block';
            } else {
			//hide
				document.getElementById('deleteButtonDiv').style.display = 'none';
			}
			
			//If the reservation is paid/unpaid, staff will collect the money from (unpaid) customer, 
			//give them the ticket then press the 'Pay and Collect Ticket' button, the reservation then will 
			//closed as paid and collected
			if((this.res_status == 'unpaid' || this.res_status == 'paid')&& this.res_collected=='') {
				document.getElementById('collectTicketButtonDiv').style.display = 'block';
			} else {
				document.getElementById('collectTicketButtonDiv').style.display = 'none';
			}

			//Calculate the amount that need to pay and outstanding amount that need to settle for unpaid user
			var productAmountAdult = parseInt(product.product_amount_adult);
			var productAmountChild = parseInt(product.product_amount_child);
			var total=0;
			console.log(productAmountAdult + "|"+ productAmountChild);
			console.log(this.res_adult_no + "|"+ this.res_child_no);
			if (this.res_adult_no > 0) {
				
				total += this.res_adult_no * productAmountAdult;
            }
			
			if(this.res_child_no > 0 ) {
			total += this.res_child_no * productAmountChild;
			}
			
			var outstandingAmount;
			if(this.res_status=="paid") {
				outstandingAmount = 0;
			} else {
				outstandingAmount = total;
			}
		
			
			
            addContent('totalAmountPay', "RM " +total);
            addContent('totalOutstandingAmount', "RM " +outstandingAmount);
            //$('#confirmTransaction').listview('refresh');
	        $.mobile.changePage('#reservationDetail', 'fade');
            });
    }
}


//Other Methods

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
			
		case 'login':
            $('#logintopmsg').slideUp();
            $('#logintopmsg').empty();
            $('#logintopmsg').append(text);
            $('#logintopmsg').slideDown();
            hc = $('#logintopmsg');

            break;
		case 'searchResult':
            $('#searchResulttopmsg').slideUp();
            $('#searchResulttopmsg').empty();
            $('#searchResulttopmsg').append(text);
            $('#searchResulttopmsg').slideDown();
            hc = $('#searchResulttopmsg');

            break;	
			
		case 'reservationDetailtopmsg':
            $('#reservationDetailtopmsg').slideUp();
            $('#reservationDetailtopmsg').empty();
            $('#reservationDetailtopmsg').append(text);
            $('#reservationDetailtopmsg').slideDown();
            hc = $('#reservationDetailtopmsg');

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

/**
* This method check whether if the user already logged in, if yes, direct them to the user page.
*/
function checkLoggedIn() {

	if(localStorage.getItem('aid')==null) {
		//initUserPage();
		$.mobile.changePage('#login', 'fade');
	}
}

function clearFields() {
    $('#adminPasswordInput').val("");
	$('#resCodeInput').val("");
	$('#usernameInput').val("");
}