
//Variables
var quickSearch = "title";




//Prevent back navigation
$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {

    $.mobile.changePage($(document.location.href = "#"+$.mobile.activePage.attr("id")), {transition: 'none'});
    event.preventDefault();
}
if (direction == 'forward') {
    // do something else
}
});

/**  Quick Search Page START **/
$( document ).on( "pageinit", "#search", function() {
    $( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
        $input = $( data.input ),
        value = $input.val(),
        html = "";
        $ul.html( "" );
        if ( value && value.length > 0 ) {
            console.log("quickSearch: " + quickSearch);
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview( "refresh" );
            $.ajax({
                url: "http://gd.geobytes.com/AutoCompleteCity",
                dataType: "jsonp",
                crossDomain: true,
                data: {
                    q: $input.val()
                }
            })
            .then( function ( response ) {
                $.each( response, function ( i, val ) {
                    html += "<li>" + val + "</li>";
                });
                $ul.html( html );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
            });
        }
    });
});
/**  Quick Search Page END **/


/**  Main Page START **/
$( document ).on( "pageinit", "#mainpage", function() {


    //Button Listeners
    /** 
    *   OnClick event on Buttons
    **/
    // $('#byTitle').unbind('click').bind('click', function (e) {

    // });

// $('#bySpeaker').unbind('click').bind('click', function (e) {
//     quickSearch = "speaker";
//     $('input[data-type="search"]').val("");
//     $( "#autocomplete" ).empty();
//     $("#searchHeader").children('h1').text('Search By Speaker');
//     $.mobile.changePage($(document.location.href = "#search"), {transition: 'slideup'});
// });


$('#mainPageList').delegate('li', 'vclick', function (e) {

//        localStorage.setItem('selectedProduct', $(this).attr('data-id'));
console.log($(this).attr('data-id'));

        //Data ID
        var dataid = $(this).attr('data-id');

        switch(dataid) {
            case 'byTitle':
            quickSearch = "title";
            $('input[data-type="search"]').val("");
            $( "#autocomplete" ).empty();
            $("#searchHeader").children('h1').text('Search By Title');
            $.mobile.changePage($(document.location.href = "#search"), {transition: 'slideup'});
            break;

            case 'bySpeaker':
            quickSearch = "speaker";
            $('input[data-type="search"]').val("");
            $( "#autocomplete" ).empty();
            $("#searchHeader").children('h1').text('Search By Speaker');
            $.mobile.changePage($(document.location.href = "#search"), {transition: 'slideup'});
            break;

            case 'browseByMonth':


        }
        //retrieveAndPopulateProductDetail($(this).attr('data-id'));
    });

});

/**  Main Page END **/


$( document ).on( "pageinit", "#search2", function() {
    console.log("onload");
    init_iscroll('#wrapper');
});

$( document ).on( "pageinit", "#search3", function() {

    console.log("onload");
    init_iscroll('#search3wrapper');

    $('#search2back').unbind('click').bind('click', function (e) {
        console.log("onload");
        init_iscroll('#wrapper');
    });

    
});

$( document ).on( "pageinit", "#audioListPage", function() {
    console.log("audioListPage IN");
    init_iscroll('#audioListWrapper');

    
});



/** Retriever function */
function populateAudioList() {
    var listCode = "";
    showLoading("Retrieving Data..", true);
    // retrieve all the 'ann' stand for announcement in database
    // var postdata = { "posttype": 'ann'}; 
    
    $.ajax({
        url: 'php/services.php',
        type: 'post',
        dataType: 'text',
        success: function (response) {
            // var dec = decrypt(response);
            var res = JSON.parse(response); //parse to array object

            var audioList = null;
            // if (res.status == "ok") {

                if(res == undefined ) {
                    audioList = null;
                } else {                
                    // var data = new Array();
                    // data = res.data;
                    audioList = res;   
                }
                
                // $('#audioList').empty();
                if(audioList!=null && audioList.length > 0) {
                    $.each(audioList, function () {

                //Set the divider if the divide for the type is not added
                //Group all the post by its type
                // if(tempPost != postTitle) {
                //     listCode += "<li data-role=\"list-divider\">" + postTitle + "</li>" ;
                //     tempPost = postTitle;
                // }

                listCode += "<li data-name='"+this.title+"' data-id='"+this.title+"'><h3 style = \"text-shadow: 0px 0px #ffffff; white-space: normal;\">"+ this.title + ' - ' +this.speaker+"</h3></li>" ;
            });
                } else {    
                    listCode = "<li data-role=\"list-divider\">Anouncements</li><li data-icon=\"false\"><a href=\"#\"><h2>No Result</h2><p><strong></strong></p></a></li>";
                }

                $('#audioList').append(listCode);
                $('#audioList').listview('refresh');
                hideLoading();
            // } 
        },
        // data: { "req" : encrypt(JSON.stringify(postdata)) }
    });
}





/** convenient methods START */
//This is a convenient method to display custom loading message
function showLoading(msgText,textVisible) {
    $.mobile.loading('show', { text: msgText , textVisible: textVisible, theme: "b"});
}

//Hide the loading
function hideLoading() {
    $.mobile.loading( "hide" );
}


/** convenient methods END */
