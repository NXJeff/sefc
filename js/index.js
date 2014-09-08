
//Variables
var quickSearch = "title";
var more = true;

$(document).bind( "mobileinit", function () {
    
});



// //Prevent back navigation
// $(window).on("navigate", function (event, data) {
//   var direction = data.state.direction;
//   if (direction == 'back') {

//     $.mobile.changePage($(document.location.href = "#"+$.mobile.activePage.attr("id")), {transition: 'none'});
//     event.preventDefault();
// }
// if (direction == 'forward') {
//     // do something else
// }
// });

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
    console.log('test');
    $.mobile.page.prototype.options.contentTheme = "a";
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

            case 'recent':
            // init_iscroll('#recentlyAddedWrapper', 'recentAudio');
            populateRecentAudio(null,null,null,null,true); 
            $.mobile.changePage($(document.location.href = "#recent"), {transition: 'slide'});
            break;

            // case 'browseByMonth':
            // $.mobile.changePage($(document.location.href = "#player"), {transition: 'flip'});
            // break;
        }
    });

});

/**  Main Page END **/


/**  Recent Page START **/

$( document ).on( "pageinit", "#recent", function() {
    

});
/**  Recent Page END **/




/** Retriever function */
function populateRecentAudio(offset, itemperpage, orderBy, orderAs, init) {
    if(init) {
        $('#recentlyAddedList').html('');
    }

    if(document.getElementById("loading")!=null) {
        document.getElementById("loading").remove();
    }
    $('#recentlyAddedList').append('<li id="loading">Loading.. </li>');
    $('#recentlyAddedList').listview().listview('refresh');
    
    var orderBy = 'added_date';
    var orderAs = 'desc';
    var count;
    if(offset == 0) {
        more = true;
    }

    count = $("#recentlyAddedList li").length; 
    itemperpage = 10;
    offset = count -1;

    // console.log('more: ' +more);
    // console.log('offset: ' +offset);
    if(document.getElementById("loading")!=null) {
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

                if(offset == 0) {
                    $('#recentlyAddedList').html('');
                    $('#recentlyAddedList').append('<li data-role=\"list-divider\" style="text-align:center;"><span>Recent Released</span></li>');
                }

                if(document.getElementById("loading")!=null) {
                    document.getElementById("loading").remove();
                }

                if(audioList!=null && audioList.length > 0) {
                    $.each(audioList, function () {

                        console.log($(this));

                        $('#recentlyAddedList').append("<li data-icon='false' data-name='"+JSON.stringify(this)+"'><a href='#'><span class='li-numbering'> #" + ($("#recentlyAddedList li").length) + "</span><span class='li-added-date typicons-time'>" + friendlyDate(this.addedDate + "T00:00:00Z") + "</span><span class='iconicfill-document-alt-fill li-title'>" + this.title + "</span><span class='iconicfill-user li-author'>"+ this.speaker +"</span><span class='iconicfill-clock li-duration'>" + this.duration + "</span><div class='li-views-likes'><span class='li-views-likes-icons typicons-heart'>0</span><span class='li-views-likes-icons iconicstroke-play'>123123</span></div></a></li>");
                        more = true;

                    });

                    if(audioList.length !== 10) {
                        more =false;
                    }
                } else {   
                    $('#recentlyAddedList').append('<li stlye="text-align: center;">No Record Found.</li>');
                    more = false;
                }
                
                if(more) {
                    $('#recentlyAddedList').append('<li id="loading" data-id="loadmore" data-role=\"list-divider\" style="text-align:center;" data-theme="b" ><span>Load More</span></li>');
                } else {
                    count = $("#recentlyAddedList li").length; 
                    if(document.getElementById("endlist")!=null) {
                        document.getElementById("endlist").remove();
                    }
                    $('#recentlyAddedList').append("<li data-id=\"endlist\" data-role=\"list-divider\"><span>End Of List - "+count+" records </span></li>");
                }
                
                $('#recentlyAddedList').listview().listview('refresh');

                //trigger refresh on iscroll
                // refreshScroll(offset);   
            },
            data: { "reqID" : 'A1',  'offset': offset, 'itemperpage': itemperpage, 'orderBy': orderBy, 'orderAs': orderAs }
        });
} 
}

/**
*   option: 0 = initial load, 1 = refresh the list, 2 = request next page
*
*/
function lazyLoadHandler(option, offset, itemsperpage) {
    if(option == 0) {

        switch(functionId) {
            case 'recentAudio':
            populateRecentAudio(null,null,null,null,true); 
            break;
        }
        
    } else if (option == 1) {

        switch(functionId) {
            case 'recentAudio':
            populateRecentAudio(0);
            break;
        }
        
    } else if (option == 2) {

        switch(functionId) {
            case 'recentAudio':
            populateRecentAudio(offset, itemsperpage);
            break;
        } 
    }
}


/** convenient methods START */
//This is a convenient method to display custom loading message
function showLoading(msgText,textVisible, textonly) {
    $.mobile.loading('show', { text: msgText , textVisible: textVisible, textonly: textonly});
}

//Hide the loading
function hideLoading() {
    $.mobile.loading( "hide" );
}

//Get the Scroller UL ID by current wrapper
function getCurrentWrapperScrollerId() {
    return wrapperId + ' > #scroller > ul';
}

/** convenient methods END */

    // "description": null,
    // "uploadedUser": null,
    // "source": null,
    // "category": null,
    // "language": "CN",
    // "title": "\u4e0d\u8981\u5904\u5728\u5b89\u4e50\u533a",
    // "speaker": "\u9648\u6dfb\u8363\u7267\u5e08",
    // "duration": "57:09",
    // "addedDate": "2014-03-09",
    // "filesize": "27433414",
    // "playCount": "0",
    // "url": "messages\/chinese\/201408\/09-Mar-2014-Record-Sun-09-35-59.mp3"

    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }

    function friendlyDate(time){
        console.log(time);
        var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
        
        if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
            return  date.toDateString(); ;

        console.log(day_diff);
        
        return day_diff == 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
    }

            // If jQuery is included in the page, adds a jQuery plugin to handle it as well
            if ( typeof jQuery != "undefined" )
                jQuery.fn.prettyDate = function(){
                    return this.each(function(){
                        var date = prettyDate(this.title);
                        if ( date )
                            jQuery(this).text( date );
                    });
                };



