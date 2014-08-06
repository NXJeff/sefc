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

//DOM
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


$( document ).on( "pageinit", "#mainpage", function() {


    //Button Listeners
    /** 
    *   OnClick event on Buttons
    **/
    $('#byTitle').unbind('click').bind('click', function (e) {
        quickSearch = "title";
        $('input[data-type="search"]').val("");
        $( "#autocomplete" ).empty();
        $("#searchHeader").children('h1').text('Search By Title');
        $.mobile.changePage($(document.location.href = "#search"), {transition: 'slideup'});
    });

    $('#bySpeaker').unbind('click').bind('click', function (e) {
        quickSearch = "speaker";
        $('input[data-type="search"]').val("");
        $( "#autocomplete" ).empty();
        $("#searchHeader").children('h1').text('Search By Speaker');
        $.mobile.changePage($(document.location.href = "#search"), {transition: 'slideup'});
    });


});


