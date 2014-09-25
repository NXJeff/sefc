
//Variables
var quickSearch = "title"; //used to differentiate selection of quick search
var browseByLang;
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
        var htmlId = "#autocomplete"; //Main #id used by this function
        
        if ( value && value.length > 0 ) {

            $.ajax({
                url: "php/services.php",
                type: 'post',
                dataType: "text",
                success: function (response) {
                    var res = JSON.parse(response); //parse to array object
                    if(res!=null && res.length > 0) {
                        $.each( res, function ( i, val ) {
                            html += "<li data-icon='false' data-name='"+JSON.stringify(this)+"'><a href='#'><span class='li-numbering'> #" + ($(htmlId + ' li').length) + "</span><span class='li-added-date typicons-time'>" + friendlyDate(this.addedDate + "T00:00:00Z") + "</span><span class='iconicfill-document-alt-fill li-title'>" + this.title + "</span><span class='iconicfill-user li-author'>"+ this.speaker +"</span><span class='iconicfill-clock li-duration'>" + this.duration + "</span><span class='entypo-floppy li-filesize'>" + getFileSizeString(this.filesize) + "</span><div class='li-views-likes'><span class='li-views-likes-icons typicons-heart'>0</span><span class='li-views-likes-icons iconicstroke-play'>"+ this.playCount +"</span></div></a></li>";
                        });
                        $ul.html( html );
                        $ul.listview( "refresh" );
                        $ul.trigger( "updatelayout");
                        $ul.highlight($input.val());

                    } 
                    
                },
                data: { "reqID" : 'S1',  'offset': null, 'itemperpage': null, 'orderBy': null, 'orderAs': null, 'keyword': $input.val()  }


            });
}
});

$('#autocomplete').delegate('li', 'click', function (e) {
                    //Data ID
                    var dataid = $(this).attr('data-id');
                    console.log(dataid);

                    if(dataid=='loadmore') {
                        populateByLanguage();
                    } else {

                        selectedIndex = $(this).index();
                        selectedIndexData = $(this).attr('data-name');
                        $('#autocompletePopUpMenu').popup().popup("open", {transition: 'pop'});
                        // addToPlayList(JSON.parse($(this).attr('data-name')));
                    }
                });

$('#autocompletePopUpMenu').delegate('li', 'click', function (e) {
    var dataid = $(this).attr('data-id');
    console.log($(this).attr('data-name'));

    console.log(dataid);

    switch(dataid) {
        case 'playnow':
        addToPlayList(JSON.parse(selectedIndexData), true);
        break;
        case 'queue':
        addToPlayList(JSON.parse(selectedIndexData), false);
        break;
        case 'detail':
        removeAll();
        break;
    }
    $('#autocompletePopUpMenu').popup().popup("close");
});


});


/**  Quick Search Page END **/


/**  Main Page START **/
$( document ).on( "pageinit", "#mainpage", function() {
    console.log('test');
    // $.mobile.page.prototype.options.contentTheme = "a";
    //Button Listeners
    /** 
    *   OnClick event on Buttons
    **/

    $('#mainPageList').delegate('li', 'click', function (e) {

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
            $.mobile.changePage($(document.location.href = "#search"), {transition: 'pop'});
            break;

            case 'bySpeaker':
            quickSearch = "speaker";
            $('input[data-type="search"]').val("");
            $( "#autocomplete" ).empty();
            $("#searchHeader").children('h1').text('Search By Speaker');
            $.mobile.changePage($(document.location.href = "#search"), {transition: 'pop'});
            break;

            case 'recent':
            // init_iscroll('#recentlyAddedWrapper', 'recentAudio');
            populateRecentAudio(null,null,null,null,true); 
            $.mobile.changePage($(document.location.href = "#recent"), {transition: 'slide'});
            break;

            case 'browseByMonth':
            $.mobile.changePage($(document.location.href = "#browseByMonth"), {transition: 'slide'});
            break;

            case 'chinese':
            browseByLang = "CN";
            populateByLanguage(true);
            $.mobile.changePage($(document.location.href = "#browseByLanguage"), {transition: 'slide'});
            break;

            case 'english':
            browseByLang = "EN";
            populateByLanguage(true);
            $.mobile.changePage($(document.location.href = "#browseByLanguage"), {transition: 'slide'});
            break;

            case 'bilingual':
            browseByLang = "BI";
            populateByLanguage(true);
            $.mobile.changePage($(document.location.href = "#browseByLanguage"), {transition: 'slide'});
            break;


            // case 'browseByMonth':
            // $.mobile.changePage($(document.location.href = "#player"), {transition: 'flip'});
            // break;
        }
    });

});

/**  Main Page END **/


/**  Browse By Month Page START **/

$( document ).on( "pageinit", "#browseByMonth", function() {

    $('#yearBrowseByMonth').bind('change', function(e) {
            //debugger;
            console.log($(this).val()); 

            if($(this).val()!='0' && $('#monthBrowseByMonth').val()!='0') {
                populateBrowseByMonthList($(this).val(),$('#monthBrowseByMonth').val(), true);
            }
        });

    $('#monthBrowseByMonth').bind('change', function(e) {
            //debugger;
            console.log($(this).val()); 
            if($(this).val()!='0' && $('#yearBrowseByMonth').val()!='0') {
                populateBrowseByMonthList($('#yearBrowseByMonth').val(),$(this).val(), true);
            }
        });


    $('#browseByMonthList').delegate('li', 'click', function (e) {
                    //Data ID
                    var dataid = $(this).attr('data-id');
                    console.log(dataid);

                    if(dataid=='loadmore') {
                        populateBrowseByMonthList();
                    } else {

                        selectedIndex = $(this).index();
                        selectedIndexData = $(this).attr('data-name');
                        $('#browseByMonthPopupMenu').popup().popup("open", {transition: 'pop'});
                        // addToPlayList(JSON.parse($(this).attr('data-name')));
                    }
                });
    
    $('#browseByMonthPopupMenu').delegate('li', 'click', function (e) {
        var dataid = $(this).attr('data-id');
        console.log($(this).attr('data-name'));

        console.log(dataid);

        switch(dataid) {
            case 'playnow':
            alert('clicked playnow');
            addToPlayList(JSON.parse(selectedIndexData), true);
            break;
            case 'queue':
            alert('clicked queue');
                    // removeFromList(selectedIndex);
                    addToPlayList(JSON.parse(selectedIndexData), false);
                    break;
                    case 'detail':
                    alert('clicked detail');
                    removeAll();
                    break;
                }
                $('#recentPlaylistPopupMenu').popup().popup("close");
            });

});



/**   Browse By Month Page END **/


/**  Browse By Language Page START **/

$( document ).on( "pageinit", "#browseByLanguage", function() {

    $('#browseByLanguageList').delegate('li', 'click', function (e) {
                    //Data ID
                    var dataid = $(this).attr('data-id');
                    console.log(dataid);

                    if(dataid=='loadmore') {
                        populateByLanguage();
                    } else {

                        selectedIndex = $(this).index();
                        selectedIndexData = $(this).attr('data-name');
                        $('#browseByLanguagePopupMenu').popup().popup("open", {transition: 'pop'});
                        // addToPlayList(JSON.parse($(this).attr('data-name')));
                    }
                });
    
    $('#browseByLanguagePopupMenu').delegate('li', 'click', function (e) {
        var dataid = $(this).attr('data-id');
        console.log($(this).attr('data-name'));

        console.log(dataid);

        switch(dataid) {
            case 'playnow':
            addToPlayList(JSON.parse(selectedIndexData), true);
            break;
            case 'queue':
            addToPlayList(JSON.parse(selectedIndexData), false);
            break;
            case 'detail':
            removeAll();
            break;
        }
        $('#browseByLanguagePopupMenu').popup().popup("close");
    });

});



/**   Browse By Month Page END **/




/** Retriever function */
function populateRecentAudio(offset, itemperpage, orderBy, orderAs, init) {
    var htmlId = "#recentlyAddedList"; //Main #id used by this function

    if(init) {
        $(htmlId).html('');
    }

    if(document.getElementById("loading")!=null) {
        document.getElementById("loading").remove();
    }
    $(htmlId).append('<li id="loading">Loading.. </li>');
    $(htmlId).listview().listview('refresh');
    
    var orderBy = 'added_date';
    var orderAs = 'desc';
    if(offset == 0) {
        more = true;
    }

    var count = $(htmlId + " .li-numbering").length;; 
    itemperpage = 10;
    offset = count;

    // console.log('more: ' +more);
    // console.log('offset: ' +offset);
    if(document.getElementById("loading")!=null) {
        $.ajax({
            url: 'php/services.php',
            type: 'post',
            dataType: 'text',
            success: function (response) {

            var res = JSON.parse(response); //parse to array object

            var audioList = null;

            if(res == undefined ) {
                audioList = null;
            } else {                
                audioList = res;   
            }

            if(offset == 0) {
                $(htmlId).html('');
                $(htmlId).append('<li data-role=\"list-divider\" style="text-align:center;"><span>Recent Released</span></li>');
            }

            if(document.getElementById("loading")!=null) {
                document.getElementById("loading").remove();
            }

            if(audioList!=null && audioList.length > 0) {
                $.each(audioList, function () {

                    $(htmlId).append("<li data-icon='false' data-name='"+JSON.stringify(this)+"'><a href='#'><span class='li-numbering'> #" + ($("#recentlyAddedList li").length) + "</span><span class='li-added-date typicons-time'>" + friendlyDate(this.addedDate + "T00:00:00Z") + "</span><span class='iconicfill-document-alt-fill li-title'>" + this.title + "</span><span class='iconicfill-user li-author'>"+ this.speaker +"</span><span class='iconicfill-clock li-duration'>" + this.duration + "</span><span class='entypo-floppy li-filesize'>" + getFileSizeString(this.filesize) + "</span><div class='li-views-likes'><span class='li-views-likes-icons typicons-heart'>0</span><span class='li-views-likes-icons iconicstroke-play'>"+ this.playCount +"</span></div></a></li>");
                    more = true;

                });

                if(audioList.length !== 10) {
                    more =false;
                }
            } else {   
                $(htmlId).append('<li stlye="text-align: center;">No Record Found.</li>');
                more = false;
            }

            if(more) {
                $(htmlId).append('<li id="loading" data-id="loadmore" data-role=\"list-divider\" style="text-align:center;" data-theme="b" ><span>Load More</span></li>');
            } else {
                count = $(htmlId + " .li-numbering").length;
                if(document.getElementById("endlist")!=null) {
                    document.getElementById("endlist").remove();
                }
                $(htmlId).append("<li data-id=\"endlist\" data-role=\"list-divider\"><span>End Of List - "+count+" records </span></li>");
            }

            $(htmlId).listview().listview('refresh');

                //trigger refresh on iscroll
                // refreshScroll(offset);   
            },
            data: { "reqID" : 'A1',  'offset': offset, 'itemperpage': itemperpage, 'orderBy': orderBy, 'orderAs': orderAs }
        });
} 
}


function populateBrowseByMonthList(year, month, init) {

    var htmlId = '#browseByMonthList'; //Main #listId used by this function

    if(init) {
        $(htmlId).html('');
    }

    if(document.getElementById("loading")!=null) {
        document.getElementById("loading").remove();
    }
    $(htmlId).append('<li id="loading">Loading.. </li>');
    $(htmlId).listview().listview('refresh');
    
    var orderBy = 'added_date';
    var orderAs = 'desc';
    var startDate = new Date(year+"-"+month+"-01");
    var endDate = new Date(year+"-"+month+"-01");
    endDate = endDate.add(1).month();
    // endDate.setMonth(endDate.getMonth + 1);
    var count;
    // if(offset == 0) {
    //     more = true;
    // }

    count = $(htmlId + " .li-numbering").length; 
    itemperpage = 10;
    offset = count;

    console.log('more: ' +more);
    console.log('offset: ' +offset);
    if(document.getElementById("loading")!=null) {
        $.ajax({
            url: 'php/services.php',
            type: 'post',
            dataType: 'text',
            success: function (response) {
            // var dec = decrypt(response);
            var res = JSON.parse(response); //parse to array object

            var audioList = null;

            if(res == undefined ) {
                audioList = null;
            } else {                

                audioList = res;   
            }

            if(offset == 0) {
                $(htmlId).html('');
                $(htmlId).append("<li data-role='list-divider' style='text-align:center;'><span>" + startDate.toString("MMMM yyyy") + "</span></li>");
            }

            if(document.getElementById("loading")!=null) {
                document.getElementById("loading").remove();
            }

            if(audioList!=null && audioList.length > 0) {
                $.each(audioList, function () {

                    console.log($(this));

                    $(htmlId).append("<li data-icon='false' data-name='"+JSON.stringify(this)+"'><a href='#'><span class='li-numbering'> #" + ($(htmlId + ' li').length) + "</span><span class='li-added-date typicons-time'>" + friendlyDate(this.addedDate + "T00:00:00Z") + "</span><span class='iconicfill-document-alt-fill li-title'>" + this.title + "</span><span class='iconicfill-user li-author'>"+ this.speaker +"</span><span class='iconicfill-clock li-duration'>" + this.duration + "</span><span class='entypo-floppy li-filesize'>" + getFileSizeString(this.filesize) + "</span><div class='li-views-likes'><span class='li-views-likes-icons typicons-heart'>0</span><span class='li-views-likes-icons iconicstroke-play'>"+ this.playCount +"</span></div></a></li>");
                    more = true;

                });

                if(audioList.length !== 10) {
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
            data: { "reqID" : 'A2',  'offset': null, 'itemperpage': null, 'orderBy': orderBy, 'orderAs': orderAs, 'startDate': startDate.toString("yyyy-MM-dd"), 'endDate': endDate.toString("yyyy-MM-dd")}
        });
} 
}

function populateByLanguage(init) {

    var htmlId = '#browseByLanguageList'; //Main #listId used by this function

    if(init) {
        $(htmlId).html('');
    }

    if(document.getElementById("loading")!=null) {
        document.getElementById("loading").remove();
    }
    $(htmlId).append('<li id="loading">Loading.. </li>');
    $(htmlId).listview().listview('refresh');
    
    var orderBy = 'added_date';
    var orderAs = 'desc';
    var listDividerTitle;
    //divider title
    if(browseByLang == 'CN') {
        listDividerTitle = "Chinese Sermons";
    } else if (browseByLang == "EN") {
        listDividerTitle = "English Sermons";
    } else if (browseByLang == "BI") {
        listDividerTitle = "Bi-lingual Sermons";
    }

    var count = $(htmlId + " .li-numbering").length; 
    itemperpage = 10;
    offset = count;

    console.log('more: ' +more);
    console.log('offset: ' +offset);
    if(document.getElementById("loading")!=null) {
        $.ajax({
            url: 'php/services.php',
            type: 'post',
            dataType: 'text',
            success: function (response) {
            // var dec = decrypt(response);
            var res = JSON.parse(response); //parse to array object

            var audioList = null;

            if(res == undefined ) {
                audioList = null;
            } else {                
                audioList = res;   
            }

            if(offset == 0) {
                $(htmlId).html('');
                $(htmlId).append('<li data-role=\"list-divider\" style="text-align:center;"><span>'+listDividerTitle+'</span></li>');
            }

            if(document.getElementById("loading")!=null) {
                document.getElementById("loading").remove();
            }

            if(audioList!=null && audioList.length > 0) {
                $.each(audioList, function () {

                    console.log($(this));

                    $(htmlId).append("<li data-icon='false' data-name='"+JSON.stringify(this)+"'><a href='#'><span class='li-numbering'> #" + ($(htmlId + ' li').length) + "</span><span class='li-added-date typicons-time'>" + friendlyDate(this.addedDate + "T00:00:00Z") + "</span><span class='iconicfill-document-alt-fill li-title'>" + this.title + "</span><span class='iconicfill-user li-author'>"+ this.speaker +"</span><span class='iconicfill-clock li-duration'>" + this.duration + "</span><span class='entypo-floppy li-filesize'>" + getFileSizeString(this.filesize) + "</span><div class='li-views-likes'><span class='li-views-likes-icons typicons-heart'>0</span><span class='li-views-likes-icons iconicstroke-play'>"+ this.playCount +"</span></div></a></li>");
                    more = true;

                });

                if(audioList.length !== 10) {
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
            data: { "reqID" : 'A3',  'offset': offset, 'itemperpage': itemperpage, 'orderBy': orderBy, 'orderAs': orderAs, 'lang': browseByLang}
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

                function getFileSizeString(bytes) {
                    return getFileSizeString(bytes, 'MB');
                }

                function getFileSizeString(bytes, si) {
                    var thresh = si ? 1000 : 1024;
                    if(bytes < thresh) return bytes + ' B';
                    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KB','MB','GiB','TiB','PiB','EiB','ZiB','YiB'];
                    var u = -1;
                    do {
                        bytes /= thresh;
                        ++u;
                    } while(bytes >= thresh);
                    return bytes.toFixed(1)+' '+units[u];
                };


