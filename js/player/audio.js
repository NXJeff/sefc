var Player;
$(function() {
    console.log("initialising audio player..")

    Player = {
        // 歌曲路径
        // path : 'http://sefc.uhostall.com/',
        // path : 'http://192.168.1.102:81/sefc/content/',
        path : 'http://192.168.137.1:81/sefc/content/',

        // 歌曲数据
        data : new Array(),

        // 当前播放歌曲的 索引
        currentIndex : -1,
        selectedIndex : -1,
        selectedIndexData : null,

        //  播放器元素jquery对象
        $audio : $('audio'),

        // 歌曲列表
        $mList : $('#playlist'),

        //正在播放的歌曲
        $rmusic : $('#rmusic'),

        // 初始化 数据
        init : function() {

            // 数据一般来自服务器端,通过ajax 加载数据,这里是模拟
            Player.data = [];

            // 一般用模板引擎,把数据 与 模板 转换为 视图,来显示,这里是模拟
            // var mhtml = '';
            // var len = Player.data.length;
            // for (var i = 0; i < len; i++) {
            //     mhtml += '<li><a index="' + i + '">' + Player.data[i] + '</a></li>';
            // }
            // Player.$mList.html(mhtml);
        },

        // 就绪
        ready : function() {
            // 控制

            Player.audio = Player.$audio.get(0);
            //update display name
            // $('#ctrl-area').on('click', 'button', function() {
            //     Player.$rmusic.html(Player.data[Player.currentIndex]);
            // });

            // 播放
            $('#btn-play').click(function() {
                Player.audio.play();
                if (Player.currentIndex == -1) {
                    $('#btn-next').click();
                }
            });

            // 暂停
            $('#btn-pause').click(function() {
                Player.audio.pause();
            });

            // 下一曲
            $('#btn-next').click(function() {
                if (Player.currentIndex == -1) {
                    Player.currentIndex = 0;
                } else if (Player.currentIndex == (Player.data.length - 1)) {
                    Player.currentIndex = 0;
                } else {
                    Player.currentIndex++;
                }
                console.log("Player.currentIndex : " + Player.currentIndex);
                // Player.$rmusic.html(Player.data[Player.currentIndex]);
                // Player.audio.src = Player.path + Player.data[Player.currentIndex];
                // Player.audio.play();

                playByMe(Player.currentIndex);
            });

            // 上一曲
            $('#btn-pre').click(function() {
                if (Player.currentIndex == -1) {
                    Player.currentIndex = 0;
                } else if (Player.currentIndex == 0) {
                    Player.currentIndex = (Player.data.length - 1);
                } else {
                    Player.currentIndex--;
                }
                // Player.$rmusic.html(Player.data[Player.currentIndex]);
                // Player.audio.src = Player.path + Player.data[Player.currentIndex];
                // Player.audio.play();
                playByMe(Player.currentIndex);
            });

            // 单曲循环
            $('#btn-loop').click(function() {
                console.log("Player.currentIndex :", Player.currentIndex);
                Player.audio.onended = function() {
                    Player.audio.load();
                    Player.audio.play();
                };
            });

            // 顺序播放
            $('#btn-order').click(function() {
                console.log("Player.currentIndex :", Player.currentIndex);
                Player.audio.onended = function() {
                    $('#btn-next').click();
                };
            });

            // 随机播放
            $('#btn-random').click(function() {
                Player.audio.onended = function() {
                    var i = parseInt((Player.data.length - 1) * Math.random());
                    playByMe(i);
                };
            });

            // 播放指定歌曲
            function playByMe(i) {
                console.log("index:", i);
                console.log("playByME DATA: " + Player.data[i]);
                Player.audio.src = Player.path + Player.data[i].url;
                Player.audio.play();
                Player.currentIndex = i;
                Player.$rmusic.html(Player.data[Player.currentIndex].title + ' - ' + Player.data[Player.currentIndex].speaker );

                $('#playlist li a').removeClass('entypo-right-dir');

                $('#playlist li:eq('+ i +') a').addClass('entypo-right-dir');
                $('#playlist').listview().listview('refresh');
            }

            // 歌曲被点击
            $('#playlist').undelegate('li', 'vclick').delegate('li', 'vclick', function (e) {
                selectedIndex = $(this).index();
                $('#playlistPopupMenu').popup().popup("open", {transition: 'slideup'});
            });

            /**  Recent Page START **/
            $('#recentlyAddedList').undelegate('li', 'vclick').delegate('li', 'vclick', function (e) {
                    //Data ID
                    var dataid = $(this).attr('data-id');
                    // console.log(dataid);
                    // console.log($(this).attr('data-name'));
                    if(dataid=='loadmore') {
                        populateRecentAudio();
                    } else {

                        selectedIndex = $(this).index();
                        selectedIndexData = $(this).attr('data-name');
                        $('#recentPlaylistPopupMenu').popup().popup("open", {transition: 'slideup'});
                        // addToPlayList(JSON.parse($(this).attr('data-name')));
                    }
                });

            //recent list 
            $('#recentPlayListContextMenu').undelegate('li', 'vclick').delegate('li', 'vclick', function (e) {
                var dataid = $(this).attr('data-id');
                console.log($(this).attr('data-name'));

                console.log(dataid);

                switch(dataid) {
                    case 'playnow':
                    addToPlayList(JSON.parse(selectedIndexData), true);
                    break;
                    case 'queue':
                    // removeFromList(selectedIndex);
                    addToPlayList(JSON.parse(selectedIndexData), false);
                    break;
                    case 'detail':
                    removeAll();
                    break;
                }
                $('#recentPlaylistPopupMenu').popup().popup("close");
            });
            /**  Recent Page END **/

            //Playlist in audio player
            $('#playlistContextMenu').undelegate('li', 'vclick').delegate('li', 'vclick', function (e) {
                var dataid = $(this).attr('data-id');

                console.log(dataid);
                switch(dataid) {
                    case 'playlistPlay':
                    playByMe(selectedIndex);
                    break;
                    case 'playlistStopAll' :
                    Player.audio.pause();
                    Player.audio.currentTime = 0;
                    break;
                    case 'playlistRemove':
                    removeFromList(selectedIndex);
                    break;
                    case 'playlistRemoveAll':
                    removeAll();
                    break;
                    case 'playlistDetail':
                    case 'playlistReport':
                    break;
                }
                $('#playlistPopupMenu').popup().popup("close");
            });


            

            // $('#playlist').undelegate('li', 'taphold').delegate('li', 'taphold', function (e) {
            //     selectedIndex = $(this).index();
            //     $('#playlistPopupMenu').popup().popup("open", {transition: 'slideup'});
            // });
}
};

Player.init();
Player.ready();

});

function addToPlayList(data, playnow) {
    hideEmptyList();
    console.log(JSON.stringify(data));
    Player.data.push(data);

 // Player.$mList.append("<li data-name='"+data+"' data-id='"+data.title+"'><span><a href='#''>" + ($("#playlist li").length + 1) + '. ' + data.title + ' - ' +data.speaker+"</a></span></li>");
 var trackNumber = $("#playlist li").length + 1;
 var index = trackNumber -1;
 Player.$mList.append('<li data-icon="false" index='+index+' data-name='+data+'><a href="#" >' + trackNumber + '. ' + data.title +' - ' + data.speaker + '</a></li>');
 Player.$mList.listview().listview('refresh');

//  if(Player.data.length == 1) {
//     $('#btn-next').click(); 
// }

if(playnow) {
    Player.currentIndex = Player.data.length - 2; 
    $('#btn-next').click(); 
}
}

function removeFromList(index) {

    $("#playlist li").eq(index).remove();
    Player.data.splice(index, 1);
    var count = 1; 
    var position = 0;
    $("#playlist").html('');
    $.each(Player.data, function () {

        $("#playlist").append('<li data-icon="false" index='+position+' data-name='+$(this).attr('data-name')+'><a href="#" >' + count + '. ' + $(this)[position].title +' - ' + $(this)[position].speaker + '</a></li>');
        count++;
    });

    showEmptyList();

    $("#playlist").listview().listview('refresh');
}

function removeAll() {

    $("#playlist").html('');
    Player.data = new Array();

    $("#playlist").listview().listview('refresh');
    showEmptyList();

}
function showEmptyList() {
    if($("#playlist li").length == 0) {
        $("#playlist").html('');
        $("#playlist").append('<li data-icon="false" data-role="list-divider" id="emptyList">Playlist is empty.</a></li>');
        $("#playlist").listview().listview('refresh');
    }
}

function hideEmptyList() {
    if(document.getElementById("emptyList")!=null) {
        document.getElementById("emptyList").remove();
    }
}

function showFooterPlayer() {



    $("[id^=audioPlayerFooter]").empty().append(infoFooter);
}

