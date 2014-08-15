
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


// $(document).on("pageinit", function(){
//     var serviceURL = "../php/services.php"; 
//     var getNumber = function() {
//         return $.ajax({
//             type: "post",
//             beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
//             complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
//             async: "true",
//             dataType: 'json',
//             url: serviceURL,
//             data: { listomatic: $.mobile.listomatic.prototype.getResults() },
//             success: function(data) {
//                 if (data && data.numbers) {
//                     var list = '';
//                     $.each(data.numbers, function(index, value) {
//                         list += '<li data-icon="false" data-filtertext="' + value.date + '">' +
//                                 '<div class="latestNumber">' +
//                                 '<span class="circle">' + value.number[1] + '</span>' +
//                                 '<span class="circle">' + value.number[2] + '</span>' +
//                                 '<span class="circle">' + value.number[3] + '</span>' +
//                                 '<span class="circle">' + value.number[4] + '</span>' +
//                                 '<span class="circle">' + value.number[5] + '</span>' +
//                                 '<span class="circle powerball">' + value.number[6] + '</span>' +
//                                 '</div>' +
//                                 '<p style="text-align:center;" class="latestNumberDate">' + value.date + '</p>' +
//                                 '</li>';
//                     }); // end each 
//                     $('#listview').append(list).listview("refresh");
//                 } // end if
//             } // end success
//         }); // end ajax
//     }
//     $.extend($.mobile.listomatic.prototype.options, {perPage: 2, btnLabel: 'Show Me More', refreshContent: 'daily'});
//     $.mobile.listomatic.prototype.registerAjaxCall(getNumber);
//     console.log("Tested");
// });


//Test for iscrollview
$(document).delegate("#search2", "pageinit", function(event){


    $(".iscroll-wrapper", this).bind({
        iscroll_onpulldown: function(event, data){
            //react to a pull-down as necessary here
            console.log("retrieving / refreshing.. ");
            //then call this to reset the pull-to-refresh controls:
            data.iscrollview.refresh();
        },

        iscroll_onpullup: function(event, data){
            //load more history
            console.log("loading more content..");
            //reset the pull-up-to-load-more controls
            data.iscrollview.refresh();
        },
        iscroll_onscrollend: function(event, data){
            if($(document).height() > $(window).height())
            {
                if($(window).scrollTop() == $(document).height() - $(window).height()){
                    console.log("The Bottom");
                }
            }
            
        }
    }




    );
});