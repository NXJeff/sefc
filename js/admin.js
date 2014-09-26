
//Variables
$(document).bind( "mobileinit", function () {

});


/**  Main Page START **/
$( document ).on( "pageinit", "#mainpage", function() {
	console.log('test');
    // $.mobile.page.prototype.options.contentTheme = "a";
    //Button Listeners
    /** 
    *   OnClick event on Buttons
    **/

    $('#adminPageList').delegate('li', 'click', function (e) {

    	console.log($(this).attr('data-id'));

        //Data ID
        var dataid = $(this).attr('data-id');

        switch(dataid) {
        	case 'userVerification':
        	populateUserToVerify(true); 
        	$.mobile.changePage($(document.location.href = "#userVerification"), {transition: 'slide'});
        	break;

        	case 'uploadsermon':
        	$.mobile.changePage($(document.location.href = "#browseByMonth"), {transition: 'slide'});
        	break;

        	case 'editsermon':
        	$.mobile.changePage($(document.location.href = "#browseByMonth"), {transition: 'slide'});
        	break;



        }
    });

});

/**  Main Page END **/


/** Retrieving methods **/
function populateUserToVerify(init) {
    var htmlId = "#userVerificationList"; //Main #id used by this function

    if(init) {
    	$(htmlId).html('');
    	$(htmlId).listview().listview('refresh');
    }

    if(document.getElementById("loading")!=null) {
    	document.getElementById("loading").remove();
    }
    $(htmlId).append('<li id="loading">Loading.. </li>');
    $(htmlId).listview().listview('refresh');
    
    var orderBy = 'name';
    var orderAs = 'asc';

    var count = $(htmlId + " .li-numbering").length; 
    itemperpage = null;
    offset = count;

    if(document.getElementById("loading")!=null) {
    	$.ajax({
    		url: 'php/services.php',
    		type: 'post',
    		dataType: 'text',
    		success: function (response) {
            // var dec = decrypt(response);
            var res = JSON.parse(response); //parse to array object

            var dataList = null;

            if(res == undefined ) {
            	dataList = null;
            } else {                
            	dataList = res;   
            }

            if(offset == 0) {
            	$(htmlId).html('');
            	$(htmlId).append('<li data-role=\"list-divider\" style="text-align:center;"><span>Pending Verification Users</span></li>');
            }

            if(document.getElementById("loading")!=null) {
            	document.getElementById("loading").remove();
            }

            if(dataList!=null && dataList.length > 0) {
            	$.each(dataList, function () {

            		console.log($(this));

            		$(htmlId).append("<li data-icon='false' data-name='"+this.login+"' data-filtertext='" + this.login + "'><a href='#'><span class=\"li-numbering\"></span><span class='iconicfill-user li-author'>"+ this.login +"</span> </a></li><input type='button' data-inline='true' value='Input'>");
            		more = true;

            	});

            	if(dataList.length !== 10) {
            		more =false;
            	}
            } else {   
            	$(htmlId).append('<li stlye="text-align: center;">No Record Found.</li>');
            	more = false;
            }

            if(more) {
            	$(htmlId).append('<li id="loading" data-id="loadmore" data-role=\"list-divider\" style="text-align:center;" data-theme="b" ><span>Load More</span></li>');
            } else {
                    count = $(htmlId + " .li-numbering").length; //substract the list divider
                    if(document.getElementById("endlist")!=null) {
                    	document.getElementById("endlist").remove();
                    }
                    $(htmlId).append("<li data-id=\"endlist\" data-role=\"list-divider\"><span>End Of List - "+count+" records </span></li>");
                }
                
                $(htmlId).listview().listview('refresh');
            },
            data: { "reqID" : 'UP'}
        });
} 
};

