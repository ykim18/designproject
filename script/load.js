

$(function () {
    //-----jquery start
    $.ajax({
        url: 'data/one.xml',
        type: 'GET',
        dataType: 'xml',
        beforeSend: function () {},
        complete: function () {},
        success: function (one) {
            // var $storagePath = "https://storage.cloud.google.com/staging.designproject1-f2b81.appspot.com/";
            var $storagePath = "crops/";
            var $articleIdx = 0;
            var $figList = "";
            var $info;
            var $caption;

            var $bar;

            var $fig;
            var $figCap;

            var $mainThumb;
            var $aside = "<aside><span class='thumb'></span><span class='cart'></span></aside>";

            var $pageN = 1;
            var $cardPerPage = 10;

            $(one).find("article").each(function (index) {
                if( index < ($pageN-1) * $cardPerPage) {   
                    return;
                }
                else if(index < $pageN * $cardPerPage) { 
                    var $secBar = "";
                    var $figItem = "";
                    $articleIdx = $(this).index();
                    $figCap = $(this).find("caption").html();

                    // Thumbnail
                    var $thumbUrl = $storagePath + "" + $(this).find("url").eq(0).html();
                    $mainThumb = "<p class='img' style='background-image:url(" + $thumbUrl + ")'></p>";

                    // info
                    var $venue = "<span class='conf'>" + $(this).find("venue").html() + "</span>";
                    var $cite = "<span class='cite'><span></span>" + Math.round(Math.random() * 100 + 1) + "</span>";
                    var $down = "<span class='down'><span></span>" + Math.round(Math.random() * 100 + 1) + "</span>";
                    $info = "<div class='info'>" + $venue + $cite + $down + "</div>"

                    // doi
                    var $doi = $(this).find("doi").html();

                    // div.caption
                    var $title = "<h3>" + $(this).find("data>title").html() + "</h3>";
                    var $authors = "<ul class='authors'>" + $(this).find("authors").html() + "</ul>";
                    var $abstract = "<span class='abstract'>" + $(this).find("abstract").html() + "</span>";
                    var $figDes = "<p class='fig_des'><span>◄</span><span>" + $figCap + "</span></p>";
                    $caption = "<div class='caption'>" + $title + $authors + $abstract + $figDes + "</div>"

                    // sections 
                    // $(this).find("sections").find("section").each(function (i) {
                    //     var $length = Number($(this).find("word_count").html());
                    //     $paperLength += $length;
                    // });

                    $(this).find("sections").find("section").each(function (i) {
                        var $paperLength = 0;
                        $(this).parents("sections").find("word_count").each(function () {
                            $paperLength += Number($(this).html());
                        });
                        var $secLength = Math.ceil(Number($(this).find("word_count").html()) / $paperLength * 100) + "%";
                        var $secTitle = $(this).find("title").html();
                        $secBar += "<span id='" + $secTitle.replace(" ", "_") + "' style='width:" + $secLength + "'>" + $secTitle + "</span>"
                    });
                    $bar = "<div class='bar'>" + $secBar + "</div>";

                    // figures 
                    $(this).find("figure").each(function (i) {
                        $figId = $(this).find("id").html();
                        $figUrl = "'"+$storagePath + $(this).find("url").html() + "'";
                        $figItem += "<img src=" + $figUrl + ">";
                    });
                    $fig = "<div class='figures'>" + $figItem + "</div>";

                    // figure lists 
                    $figList += "<div class='card'><figure>" + $mainThumb + "<figcaption>" + $bar + $info + $caption + $fig + "</figcaption></figure>" + $aside + "</div>";
                    return;
                } else {
                    return false;
                    console.log(index);
                }
            });
            $("section#mainContainer").append($figList);

            //figures jquery

            $("p.img").on("mouseenter", function () {
                $(this).siblings("figcaption").find("div.figures").animate({
                    bottom: "12px"
                });
                $(this).siblings("figcaption").find("span.abstract").slideUp(150);
                $(this).siblings("figcaption").find("p.fig_des").delay(150).animate({
                    height: "62px"
                }, 150);
            });

            $("figure").on("mouseleave", function () {
                $(this).find("div.figures").animate({
                    bottom: "-100px"
                });
                $(this).find("span.abstract").slideDown(150);
                $(this).find("p.fig_des").css({
                    height: 0
                });
            });

            var imgSrc = "";
            var imgUrl = "";
            var figCap = "";

            $(".figures img").on("mouseenter", function () {
                imgSrc = $(this).attr('src');
                imgUrl = imgSrc.replace("crops/", "");
                figCap = $(one).find("url:contains(" + imgUrl + ")").siblings("caption").html();
                $(this).parents("figure").find("p.img").css("background-image", "url('" + imgSrc + "')");
                $(this).parents("figure").find("p.fig_des span:nth-of-type(2)").html(figCap);
            })


            //transition---------------
            var $scrollTop = 0;
            $("div.card").on("click", function () {
                $scrollTop = $(window).scrollTop();

                $("section.cover, section.main").delay(200).animate({
                    left: "-100%"
                }, 300);

                $("nav").animate({
                    top: "-100%"
                }, 300).delay(600).animate({
                    top: 0
                }, 300);

                $("section#detail").delay(600).animate({
                    left: "50%"
                }, 300);

                // var figUrl = "";
                console.log(imgUrl);
                var figType = JSON.parse(figureTypeJsonData)[imgUrl] + "";
                updateUserData(figType);
            });

            $("section#detail div.back").on("click", function () {
                $("section#detail").delay(200).animate({
                    left: "150%"
                }, 300);

                $("nav").animate({
                    top: "-100%"
                }, 300).delay(600).animate({
                    top: 0
                }, 300);
               
                $("section.cover, section.main").delay(600).animate({
                    left: 0
                }, 300);
                setTimeout(function(){
                    $("html, body").animate({
                        scrollTop: $scrollTop
                    },300);
                },1000)
                
            });


        },

        error: function () {
            alert('Fail');
        }
        //ajax end
    });

    //---jquery end
});


var uid = 100;
// uid = getParameterByName('uid');
var userData = new Array(0);
// const userDb = firebase.database().ref('/users/' + uid);

function userData (){
    var chart = 0;
    var diagram = 0;
    var formula = 0;
    var graphic = 0;
    var human = 0;
    var picture = 0;
    var table = 0;
    getfirebase();
}

function updateUserData(type) { 
    userData[0][type]++;

    firebase.database().ref('/users/' + uid + '/history/' ).set({
        chart : userData[0].chart ,
        diagram : userData[0].diagram  ,
        formula : userData[0].formula ,
        graphic : userData[0].graphic ,
        human : userData[0].human ,
        picture : userData[0].picture ,
        table : userData[0].table
    });
}

function getfirebase() {
    firebase.database().ref('/users/' + uid + '/history/chart').on('value', function(x){
        userData[0].chart = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/diagram').on('value', function(x){
        userData[0].diagram = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/formula').on('value', function(x){
        userData[0].formula = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/graphic').on('value', function(x){
        userData[0].graphic = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/human').on('value', function(x){
        userData[0].human = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/picture').on('value', function(x){
        userData[0].picture = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/table').on('value', function(x){
        userData[0].table = x.val();
    }); 
}

//새로 load 할때 -> 목록에서 현재까지의 preference 반영



var figureTypeJsonData = '{
    "2662155.2662246_crop_1.jpg": "graphic",
    "2662155.2662246_crop_2.jpg": "table",
    "2662155.2662246_crop_3.jpg": "human",
    "2662155.2662246_crop_4.jpg": "table",
    "2662155.2662246_crop_5.jpg": "table",
    "2662155.2662246_crop_6.jpg": "diagram",
    "2662155.2662246_crop_7.jpg": "human",
    "2662155.2662246_crop_8.jpg": "graphic",
    "2662155.2662246_crop_9.jpg": "human",
    "3173574.3173587_crop_1.jpg": "human",
    "3173574.3173587_crop_2.jpg": "picture",
    "3173574.3173616_crop_1.jpg": "formula",
    "3173574.3173616_crop_2.jpg": "formula",
    "3173574.3173616_crop_3.jpg": "picture",
    "3173574.3173616_crop_4.jpg": "chart",
    "3173574.3173616_crop_5.jpg": "graphic",
    "3173574.3173616_crop_6.jpg": "table",
    "3173574.3173616_crop_7.jpg": "chart",
    "3173574.3173616_crop_8.jpg": "diagram",
    "3173574.3173616_crop_9.jpg": "graphic",
    "3173574.3173616_crop_10.jpg": "table",
    "3173574.3173616_crop_11.jpg": "picture",
    "3173574.3173620_crop_1.jpg": "graphic",
    "3173574.3173620_crop_2.jpg": "human",
    "3173574.3173620_crop_3.jpg": "formula",
    "3173574.3173620_crop_4.jpg": "table",
    "3173574.3173620_crop_5.jpg": "chart",
    "3173574.3173628_crop_1.jpg": "table",
    "3173574.3173628_crop_2.jpg": "graphic",
    "3173574.3173628_crop_3.jpg": "formula",
    "3173574.3173628_crop_4.jpg": "table",
    "3173574.3173628_crop_5.jpg": "formula",
    "3173574.3173628_crop_6.jpg": "table",
    "3173574.3173628_crop_7.jpg": "table",
    "3173574.3173628_crop_8.jpg": "diagram",
    "3173574.3173628_crop_9.jpg": "diagram",
    "3173574.3173628_crop_10.jpg": "human",
    "3173574.3173638_crop_1.jpg": "chart",
    "3173574.3173638_crop_2.jpg": "table",
    "3173574.3173638_crop_3.jpg": "graphic",
    "3173574.3173638_crop_4.jpg": "picture",
    "3173574.3173638_crop_5.jpg": "diagram",
    "3173574.3173673_crop_1.jpg": "human",
    "3173574.3173673_crop_2.jpg": "human",
    "3173574.3173673_crop_3.jpg": "chart",
    "3173574.3173673_crop_4.jpg": "human",
    "3173574.3173673_crop_5.jpg": "chart",
    "3173574.3173673_crop_6.jpg": "formula",
    "3173574.3173673_crop_7.jpg": "graphic",
    "3173574.3173673_crop_8.jpg": "human",
    "3173574.3173702_crop_1.jpg": "picture",
    "3173574.3173702_crop_2.jpg": "chart",
    "3173574.3173702_crop_3.jpg": "table",
    "3173574.3173702_crop_4.jpg": "chart",
    "3173574.3173702_crop_5.jpg": "table",
    "3173574.3173702_crop_6.jpg": "table",
    "3173574.3173702_crop_7.jpg": "graphic",
    "3173574.3173702_crop_8.jpg": "formula",
    "3173574.3173702_crop_9.jpg": "table",
    "3173574.3173702_crop_10.jpg": "formula",
    "3173574.3173739_crop_1.jpg": "diagram",
    "3173574.3173739_crop_2.jpg": "table",
    "3173574.3173739_crop_3.jpg": "table",
    "3173574.3173739_crop_4.jpg": "human",
    "3173574.3173739_crop_5.jpg": "human",
    "3173574.3173759_crop_1.jpg": "formula",
    "3173574.3173759_crop_2.jpg": "chart",
    "3173574.3173759_crop_3.jpg": "table",
    "3173574.3173759_crop_4.jpg": "diagram",
    "3173574.3173759_crop_5.jpg": "human",
    "3173574.3173759_crop_6.jpg": "table",
    "3173574.3173759_crop_7.jpg": "picture",
    "3173574.3173759_crop_8.jpg": "human",
    "3173574.3173759_crop_9.jpg": "table",
    "3173574.3173759_crop_10.jpg": "picture",
    "3173574.3173759_crop_11.jpg": "formula",
    "3173574.3173759_crop_12.jpg": "human",
    "3173574.3173759_crop_13.jpg": "chart",
    "3173574.3173759_crop_14.jpg": "human",
    "3173574.3173759_crop_15.jpg": "picture",
    "3173574.3173759_crop_16.jpg": "formula",
    "3173574.3173759_crop_17.jpg": "human",
    "3173574.3173759_crop_18.jpg": "chart",
    "3173574.3173778_crop_1.jpg": "graphic",
    "3173574.3173778_crop_2.jpg": "table",
    "3173574.3173778_crop_3.jpg": "graphic",
    "3173574.3173792_crop_1.jpg": "human",
    "3173574.3173792_crop_2.jpg": "picture",
    "3173574.3173792_crop_3.jpg": "picture",
    "3173574.3173792_crop_4.jpg": "diagram",
    "3173574.3173792_crop_5.jpg": "graphic",
    "3173574.3173792_crop_6.jpg": "picture",
    "3173574.3173792_crop_7.jpg": "table",
    "3173574.3173792_crop_8.jpg": "chart",
    "3173574.3173792_crop_9.jpg": "chart",
    "3173574.3173792_crop_14.jpg": "chart",
    "3173574.3173793_crop_1.jpg": "picture",
    "3173574.3173793_crop_2.jpg": "graphic",
    "3173574.3173793_crop_3.jpg": "formula",
    "3173574.3173793_crop_4.jpg": "human",
    "3173574.3173793_crop_5.jpg": "human",
    "3173574.3173793_crop_6.jpg": "graphic",
    "3173574.3173793_crop_7.jpg": "chart",
    "3173574.3173793_crop_8.jpg": "picture",
    "3173574.3173793_crop_9.jpg": "table",
    "3173574.3173793_crop_10.jpg": "table",
    "3173574.3173793_crop_11.jpg": "diagram",
    "3173574.3173793_crop_12.jpg": "diagram",
    "3173574.3173793_crop_13.jpg": "chart",
    "3173574.3173793_crop_14.jpg": "picture",
    "3173574.3173793_crop_15.jpg": "chart",
    "3173574.3173863_crop_1.jpg": "diagram",
    "3173574.3173863_crop_2.jpg": "chart",
    "3173574.3173902_crop_1.jpg": "picture",
    "3173574.3173902_crop_2.jpg": "chart",
    "3173574.3173919_crop_1.jpg": "chart",
    "3173574.3173919_crop_2.jpg": "human",
    "3173574.3173919_crop_3.jpg": "chart",
    "3173574.3173919_crop_4.jpg": "graphic",
    "3173574.3173919_crop_5.jpg": "diagram",
    "3173574.3173937_crop_1.jpg": "chart",
    "3173574.3173937_crop_2.jpg": "diagram",
    "3173574.3173937_crop_3.jpg": "picture",
    "3173574.3173937_crop_4.jpg": "chart",
    "3173574.3173937_crop_5.jpg": "human",
    "3173574.3173937_crop_6.jpg": "human",
    "3173574.3173937_crop_7.jpg": "diagram",
    "3173574.3173937_crop_8.jpg": "graphic",
    "3173574.3173937_crop_9.jpg": "chart",
    "3173574.3173937_crop_10.jpg": "formula",
    "3173574.3173937_crop_11.jpg": "graphic",
    "3173574.3173937_crop_12.jpg": "human",
    "3173574.3173937_crop_13.jpg": "formula",
    "3173574.3173982_crop_1.jpg": "chart",
    "3173574.3173982_crop_2.jpg": "picture",
    "3173574.3173982_crop_3.jpg": "graphic",
    "3173574.3173982_crop_4.jpg": "picture",
    "3173574.3173982_crop_5.jpg": "diagram",
    "3173574.3174020_crop_1.jpg": "table",
    "3173574.3174020_crop_3.jpg": "graphic",
    "3173574.3174020_crop_4.jpg": "picture",
    "3173574.3174020_crop_5.jpg": "diagram",
    "3173574.3174020_crop_6.jpg": "chart",
    "3173574.3174020_crop_7.jpg": "picture",
    "3173574.3174020_crop_8.jpg": "picture",
    "3173574.3174020_crop_9.jpg": "human",
    "3173574.3174020_crop_10.jpg": "graphic",
    "3173574.3174020_crop_11.jpg": "picture",
    "3173574.3174020_crop_12.jpg": "picture",
    "3173574.3174020_crop_13.jpg": "table",
    "3173574.3174020_crop_14.jpg": "diagram",
    "3173574.3174020_crop_15.jpg": "formula",
    "3173574.3174020_crop_16.jpg": "human",
    "3173574.3174020_crop_17.jpg": "picture",
    "3173574.3174020_crop_18.jpg": "graphic",
    "3173574.3174039_crop_1.jpg": "chart",
    "3173574.3174039_crop_2.jpg": "picture",
    "3173574.3174039_crop_3.jpg": "diagram",
    "3173574.3174039_crop_4.jpg": "picture",
    "3173574.3174039_crop_5.jpg": "formula",
    "3173574.3174039_crop_6.jpg": "formula",
    "3173574.3174039_crop_7.jpg": "chart",
    "3173574.3174039_crop_8.jpg": "formula",
    "3173574.3174039_crop_9.jpg": "picture",
    "3173574.3174039_crop_10.jpg": "diagram",
    "3173574.3174039_crop_11.jpg": "formula",
    "3173574.3174057_crop_1.jpg": "picture",
    "3173574.3174057_crop_2.jpg": "diagram",
    "3173574.3174057_crop_3.jpg": "chart",
    "3173574.3174057_crop_4.jpg": "formula",
    "3173574.3174057_crop_5.jpg": "table",
    "3173574.3174057_crop_6.jpg": "formula",
    "3173574.3174057_crop_7.jpg": "formula",
    "3173574.3174057_crop_8.jpg": "picture",
    "3173574.3174088_crop_1.jpg": "diagram",
    "3173574.3174088_crop_2.jpg": "table",
    "3173574.3174151_crop_1.jpg": "picture",
    "3173574.3174151_crop_2.jpg": "picture",
    "3173574.3174151_crop_3.jpg": "formula",
    "3173574.3174151_crop_4.jpg": "picture",
    "3173574.3174151_crop_5.jpg": "diagram",
    "3173574.3174151_crop_6.jpg": "formula",
    "3173574.3174151_crop_7.jpg": "table",
    "3173574.3174151_crop_8.jpg": "formula",
    "3173574.3174151_crop_9.jpg": "formula",
    "3173574.3174151_crop_10.jpg": "formula",
    "3173574.3174151_crop_11.jpg": "picture",
    "3173574.3174221_crop_1.jpg": "picture",
    "3173574.3174221_crop_2.jpg": "diagram",
    "3173574.3174221_crop_3.jpg": "human",
    "3173574.3174221_crop_4.jpg": "diagram",
    "3173574.3174221_crop_5.jpg": "formula",
    "3173574.3174221_crop_6.jpg": "human",
    "3173574.3174221_crop_7.jpg": "chart",
    "3313831.3376195_crop_1.jpg": "graphic",
    "3313831.3376195_crop_2.jpg": "graphic",
    "3313831.3376195_crop_4.jpg": "formula",
    "3313831.3376195_crop_6.jpg": "diagram",
    "3313831.3376228_crop_3.jpg": "graphic",
    "3313831.3376228_crop_4.jpg": "diagram",
    "3313831.3376228_crop_6.jpg": "table",
    "3313831.3376243_crop_1.jpg": "formula",
    "3313831.3376243_crop_2.jpg": "table",
    "3313831.3376243_crop_3.jpg": "picture",
    "3313831.3376243_crop_4.jpg": "human",
    "3313831.3376243_crop_5.jpg": "human",
    "3313831.3376243_crop_6.jpg": "graphic",
    "3313831.3376243_crop_7.jpg": "human",
    "3313831.3376260_crop_1.jpg": "formula",
    "3313831.3376260_crop_2.jpg": "graphic",
    "3313831.3376260_crop_3.jpg": "graphic",
    "3313831.3376260_crop_4.jpg": "human",
    "3313831.3376260_crop_5.jpg": "formula",
    "3313831.3376265_crop_1.jpg": "table",
    "3313831.3376265_crop_2.jpg": "human",
    "3313831.3376265_crop_3.jpg": "formula",
    "3313831.3376265_crop_4.jpg": "graphic",
    "3313831.3376286_crop_1.jpg": "human",
    "3313831.3376286_crop_2.jpg": "human",
    "3313831.3376286_crop_3.jpg": "picture",
    "3313831.3376286_crop_4.jpg": "formula",
    "3313831.3376286_crop_5.jpg": "chart",
    "3313831.3376286_crop_6.jpg": "graphic",
    "3313831.3376286_crop_7.jpg": "formula",
    "3313831.3376286_crop_8.jpg": "human",
    "3313831.3376286_crop_9.jpg": "picture",
    "3313831.3376286_crop_10.jpg": "graphic",
    "3313831.3376286_crop_11.jpg": "formula",
    "3313831.3376358_crop_1.jpg": "human",
    "3313831.3376358_crop_2.jpg": "formula",
    "3313831.3376358_crop_3.jpg": "formula",
    "3313831.3376358_crop_4.jpg": "graphic",
    "3313831.3376358_crop_5.jpg": "diagram",
    "3313831.3376358_crop_6.jpg": "diagram",
    "3313831.3376358_crop_7.jpg": "chart",
    "3313831.3376358_crop_8.jpg": "human",
    "3313831.3376358_crop_9.jpg": "graphic",
    "3313831.3376358_crop_10.jpg": "graphic",
    "3313831.3376358_crop_11.jpg": "human",
    "3313831.3376358_crop_12.jpg": "human",
    "3313831.3376438_crop_1.jpg": "picture",
    "3313831.3376438_crop_2.jpg": "diagram",
    "3313831.3376438_crop_3.jpg": "picture",
    "3313831.3376438_crop_4.jpg": "picture",
    "3313831.3376438_crop_5.jpg": "diagram",
    "3313831.3376438_crop_6.jpg": "chart",
    "3313831.3376438_crop_7.jpg": "chart",
    "3313831.3376438_crop_8.jpg": "diagram",
    "3313831.3376438_crop_9.jpg": "table",
    "3313831.3376470_crop_1.jpg": "formula",
    "3313831.3376470_crop_2.jpg": "diagram",
    "3313831.3376470_crop_3.jpg": "formula",
    "3313831.3376470_crop_4.jpg": "chart",
    "3313831.3376470_crop_5.jpg": "graphic",
    "3313831.3376470_crop_6.jpg": "human",
    "3313831.3376470_crop_8.jpg": "chart",
    "3313831.3376470_crop_9.jpg": "table",
    "3313831.3376470_crop_10.jpg": "table",
    "3313831.3376470_crop_11.jpg": "formula",
    "3313831.3376481_crop_1.jpg": "diagram",
    "3313831.3376481_crop_2.jpg": "chart",
    "3313831.3376481_crop_3.jpg": "picture",
    "3313831.3376481_crop_4.jpg": "graphic",
    "3313831.3376481_crop_5.jpg": "picture",
    "3313831.3376523_crop_1.jpg": "chart",
    "3313831.3376523_crop_2.jpg": "chart",
    "3313831.3376523_crop_3.jpg": "diagram",
    "3313831.3376523_crop_4.jpg": "graphic",
    "3313831.3376523_crop_5.jpg": "picture",
    "3313831.3376523_crop_6.jpg": "human",
    "3313831.3376523_crop_7.jpg": "chart",
    "3313831.3376523_crop_8.jpg": "table",
    "3313831.3376523_crop_9.jpg": "human",
    "3313831.3376523_crop_10.jpg": "human",
    "3313831.3376523_crop_11.jpg": "graphic",
    "3313831.3376523_crop_12.jpg": "picture",
    "3313831.3376523_crop_13.jpg": "picture",
    "3313831.3376523_crop_14.jpg": "formula",
    "3313831.3376550_crop_1.jpg": "picture",
    "3313831.3376550_crop_2.jpg": "picture",
    "3313831.3376550_crop_3.jpg": "diagram",
    "3313831.3376550_crop_4.jpg": "graphic",
    "3313831.3376550_crop_5.jpg": "graphic",
    "3313831.3376550_crop_6.jpg": "graphic",
    "3313831.3376550_crop_7.jpg": "graphic",
    "3313831.3376550_crop_8.jpg": "table",
    "3313831.3376550_crop_9.jpg": "chart",
    "3313831.3376574_crop_1.jpg": "formula",
    "3313831.3376574_crop_2.jpg": "chart",
    "3313831.3376574_crop_3.jpg": "formula",
    "3313831.3376574_crop_4.jpg": "human",
    "3313831.3376574_crop_5.jpg": "table",
    "3313831.3376574_crop_6.jpg": "picture",
    "3313831.3376574_crop_7.jpg": "diagram",
    "3313831.3376582_crop_1.jpg": "picture",
    "3313831.3376582_crop_2.jpg": "human",
    "3313831.3376582_crop_3.jpg": "human",
    "3313831.3376582_crop_4.jpg": "diagram",
    "3313831.3376582_crop_5.jpg": "chart",
    "3313831.3376582_crop_6.jpg": "picture",
    "3313831.3376582_crop_7.jpg": "table",
    "3313831.3376582_crop_8.jpg": "human",
    "3313831.3376614_crop_1.jpg": "chart",
    "3313831.3376614_crop_2.jpg": "human",
    "3313831.3376614_crop_3.jpg": "formula",
    "3313831.3376614_crop_4.jpg": "human",
    "3313831.3376614_crop_5.jpg": "formula",
    "3313831.3376614_crop_6.jpg": "chart",
    "3313831.3376614_crop_7.jpg": "chart",
    "3313831.3376614_crop_8.jpg": "picture",
    "3313831.3376614_crop_9.jpg": "graphic",
    "3313831.3376614_crop_10.jpg": "graphic",
    "3313831.3376614_crop_11.jpg": "formula",
    "3313831.3376626_crop_1.jpg": "diagram",
    "3313831.3376626_crop_2.jpg": "table",
    "3313831.3376626_crop_3.jpg": "chart",
    "3313831.3376626_crop_4.jpg": "diagram",
    "3313831.3376626_crop_5.jpg": "chart",
    "3313831.3376626_crop_6.jpg": "picture",
    "3313831.3376626_crop_7.jpg": "diagram",
    "3313831.3376626_crop_8.jpg": "chart",
    "3313831.3376628_crop_1.jpg": "human",
    "3313831.3376628_crop_2.jpg": "graphic",
    "3313831.3376628_crop_3.jpg": "picture",
    "3313831.3376628_crop_4.jpg": "graphic",
    "3313831.3376628_crop_5.jpg": "picture",
    "3313831.3376628_crop_6.jpg": "picture",
    "3313831.3376628_crop_7.jpg": "table",
    "3313831.3376628_crop_8.jpg": "table",
    "3313831.3376628_crop_9.jpg": "diagram",
    "3313831.3376628_crop_10.jpg": "table",
    "3313831.3376628_crop_11.jpg": "picture",
    "3313831.3376639_crop_1.jpg": "picture",
    "3313831.3376639_crop_2.jpg": "human",
    "3313831.3376639_crop_3.jpg": "table",
    "3313831.3376639_crop_4.jpg": "formula",
    "3313831.3376639_crop_5.jpg": "table",
    "3313831.3376639_crop_6.jpg": "chart",
    "3313831.3376639_crop_7.jpg": "human",
    "3313831.3376642_crop_1.jpg": "formula",
    "3313831.3376642_crop_2.jpg": "formula",
    "3313831.3376642_crop_3.jpg": "chart",
    "3313831.3376642_crop_4.jpg": "picture",
    "3313831.3376642_crop_5.jpg": "diagram",
    "3313831.3376642_crop_6.jpg": "chart",
    "3313831.3376642_crop_7.jpg": "picture",
    "3313831.3376642_crop_8.jpg": "graphic",
    "3313831.3376642_crop_9.jpg": "formula",
    "3313831.3376642_crop_10.jpg": "picture",
    "3313831.3376652_crop_1.jpg": "chart",
    "3313831.3376652_crop_2.jpg": "chart",
    "3313831.3376652_crop_3.jpg": "diagram",
    "3313831.3376652_crop_4.jpg": "picture",
    "3313831.3376652_crop_5.jpg": "graphic",
    "3313831.3376652_crop_6.jpg": "diagram",
    "3313831.3376652_crop_7.jpg": "formula",
    "3313831.3376687_crop_1.jpg": "table",
    "3313831.3376687_crop_2.jpg": "diagram",
    "3313831.3376687_crop_3.jpg": "chart",
    "3313831.3376687_crop_4.jpg": "formula",
    "3313831.3376687_crop_5.jpg": "picture",
    "3313831.3376687_crop_6.jpg": "table",
    "3313831.3376687_crop_7.jpg": "human",
    "3313831.3376687_crop_8.jpg": "chart",
    "3313831.3376687_crop_9.jpg": "table",
    "3313831.3376687_crop_10.jpg": "picture",
    "3313831.3376698_crop_1.jpg": "graphic",
    "3313831.3376698_crop_2.jpg": "table",
    "3313831.3376698_crop_3.jpg": "diagram",
    "3313831.3376698_crop_4.jpg": "graphic",
    "3313831.3376698_crop_5.jpg": "graphic",
    "3313831.3376698_crop_6.jpg": "formula",
    "3313831.3376698_crop_7.jpg": "picture",
    "3313831.3376698_crop_8.jpg": "graphic",
    "3313831.3376698_crop_9.jpg": "picture",
    "3313831.3376698_crop_10.jpg": "chart",
    "3313831.3376698_crop_11.jpg": "diagram",
    "3313831.3376698_crop_12.jpg": "formula",
    "3313831.3376698_crop_13.jpg": "picture",
    "3313831.3376714_crop_1.jpg": "table",
    "3313831.3376714_crop_2.jpg": "formula",
    "3313831.3376714_crop_3.jpg": "picture",
    "3313831.3376714_crop_4.jpg": "graphic",
    "3313831.3376714_crop_5.jpg": "chart",
    "3313831.3376714_crop_6.jpg": "table",
    "3313831.3376714_crop_7.jpg": "graphic",
    "3313831.3376719_crop_1.jpg": "graphic",
    "3313831.3376719_crop_2.jpg": "graphic",
    "3313831.3376719_crop_3.jpg": "graphic",
    "3313831.3376719_crop_4.jpg": "graphic",
    "3313831.3376788_crop_1.jpg": "chart",
    "3313831.3376788_crop_2.jpg": "picture",
    "3313831.3376788_crop_3.jpg": "diagram",
    "3313831.3376788_crop_4.jpg": "diagram",
    "3313831.3376788_crop_5.jpg": "table",
    "3313831.3376788_crop_6.jpg": "picture",
    "3313831.3376788_crop_7.jpg": "diagram",
    "3313831.3376803_crop_1.jpg": "human",
    "3313831.3376803_crop_2.jpg": "formula",
    "3313831.3376803_crop_3.jpg": "diagram",
    "3313831.3376803_crop_4.jpg": "table",
    "3313831.3376803_crop_5.jpg": "table",
    "3313831.3376803_crop_6.jpg": "formula",
    "3313831.3376821_crop_1.jpg": "human",
    "3313831.3376821_crop_2.jpg": "formula",
    "3313831.3376821_crop_3.jpg": "graphic",
    "3313831.3376821_crop_4.jpg": "picture",
    "3313831.3376847_crop_1.jpg": "human",
    "3313831.3376847_crop_2.jpg": "chart",
    "3313831.3376847_crop_3.jpg": "picture",
    "3313831.3376847_crop_4.jpg": "chart",
    "3313831.3376847_crop_5.jpg": "graphic",
    "3313831.3376847_crop_6.jpg": "diagram",
    "3313831.3376847_crop_7.jpg": "formula",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_1.jpg": "formula",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_2.jpg": "chart",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_3.jpg": "table",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_4.jpg": "picture",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_5.jpg": "chart",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_6.jpg": "picture",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_7.jpg": "picture",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_8.jpg": "graphic",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_9.jpg": "table",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_10.jpg": "formula",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_11.jpg": "diagram",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_12.jpg": "chart",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_13.jpg": "table",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_14.jpg": "diagram",
    "360proto Making Interactive Virtual Reality & Augmented Reality Prototypes from Paper_crop_15.jpg": "picture",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_1.jpg": "chart",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_2.jpg": "graphic",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_3.jpg": "picture",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_4.jpg": "chart",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_5.jpg": "formula",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_6.jpg": "chart",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_7.jpg": "picture",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_8.jpg": "human",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_9.jpg": "chart",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_10.jpg": "graphic",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_11.jpg": "formula",
    "Adding Proprioceptive Feedback to Virtual Reality Experiences Using Galvanic Vestibular Stimulation_crop_12.jpg": "graphic",
    "Affinity Lens Data-Assisted Affinity Diagramming with Augmented Reality_crop_1.jpg": "graphic",
    "Affinity Lens Data-Assisted Affinity Diagramming with Augmented Reality_crop_2.jpg": "graphic",
    "Affinity Lens Data-Assisted Affinity Diagramming with Augmented Reality_crop_3.jpg": "diagram",
    "Affinity Lens Data-Assisted Affinity Diagramming with Augmented Reality_crop_4.jpg": "human",
    "Affinity Lens Data-Assisted Affinity Diagramming with Augmented Reality_crop_5.jpg": "chart",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_1.jpg": "diagram",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_2.jpg": "diagram",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_3.jpg": "diagram",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_4.jpg": "chart",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_5.jpg": "picture",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_6.jpg": "formula",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_7.jpg": "picture",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_8.jpg": "formula",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_9.jpg": "graphic",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_10.jpg": "formula",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_11.jpg": "chart",
    "Ambiotherm- Enhancing Sense of Presence in Virtual Reality by Simulating Real-World Environmental Conditions_crop_12.jpg": "chart",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_1.jpg": "chart",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_2.jpg": "picture",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_3.jpg": "graphic",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_4.jpg": "chart",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_5.jpg": "diagram",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_6.jpg": "table",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_7.jpg": "diagram",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_8.jpg": "picture",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_9.jpg": "graphic",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_10.jpg": "picture",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_11.jpg": "human",
    "Assessing the Accuracy of Point & Teleport Locomotion with Orientation Indication for Virtual Reality using Curved Trajectories_crop_12.jpg": "graphic",
    "Augmented Reality Views for Occluded Interaction_crop_1.jpg": "chart",
    "Augmented Reality Views for Occluded Interaction_crop_2.jpg": "chart",
    "Augmented Reality Views for Occluded Interaction_crop_3.jpg": "table",
    "Augmented Reality Views for Occluded Interaction_crop_4.jpg": "picture",
    "Augmented Reality Views for Occluded Interaction_crop_5.jpg": "graphic",
    "Augmented Reality Views for Occluded Interaction_crop_6.jpg": "picture",
    "Augmented Reality Views for Occluded Interaction_crop_7.jpg": "formula",
    "Augmented Reality Views for Occluded Interaction_crop_8.jpg": "chart",
    "Behind the Curtain of the Ultimate Empathy Machine On the Composition of Virtual Reality Nonfiction Experiences_crop_1.jpg": "diagram",
    "Behind the Curtain of the Ultimate Empathy Machine On the Composition of Virtual Reality Nonfiction Experiences_crop_2.jpg": "table",
    "Behind the Curtain of the Ultimate Empathy Machine On the Composition of Virtual Reality Nonfiction Experiences_crop_3.jpg": "chart",
    "Behind the Curtain of the Ultimate Empathy Machine On the Composition of Virtual Reality Nonfiction Experiences_crop_4.jpg": "chart",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_1.jpg": "picture",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_2.jpg": "table",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_3.jpg": "graphic",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_4.jpg": "table",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_5.jpg": "table",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_6.jpg": "graphic",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_7.jpg": "table",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_8.jpg": "human",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_9.jpg": "picture",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_10.jpg": "diagram",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_11.jpg": "chart",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_12.jpg": "graphic",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_13.jpg": "diagram",
    "Beyond The Force Using Quadcopters to Appropriate Objects and the Environment for Haptics in Virtual Reality_crop_14.jpg": "table",
    "Can Mobile Augmented Reality Stimulate a Honeypot_crop_1.jpg": "table",
    "Can Mobile Augmented Reality Stimulate a Honeypot_crop_2.jpg": "graphic",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_1.jpg": "picture",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_2.jpg": "table",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_3.jpg": "formula",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_4.jpg": "formula",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_5.jpg": "graphic",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_6.jpg": "diagram",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_7.jpg": "table",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_8.jpg": "diagram",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_9.jpg": "picture",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_10.jpg": "formula",
    "CarVR- Enabling In-Car Virtual Reality Entertainment_crop_11.jpg": "diagram",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_1.jpg": "human",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_2.jpg": "human",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_3.jpg": "chart",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_4.jpg": "diagram",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_5.jpg": "picture",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_6.jpg": "table",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_7.jpg": "table",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_8.jpg": "diagram",
    "Crossing-Based Selection with Virtual Reality Head-Mounted Displays_crop_9.jpg": "graphic",
    "Detecting Visuo-Haptic Mismatches in Virtual Reality using the Prediction Error Negativity of Event-Related Brain Potentials_crop_1.jpg": "table",
    "Detecting Visuo-Haptic Mismatches in Virtual Reality using the Prediction Error Negativity of Event-Related Brain Potentials_crop_2.jpg": "table",
    "Detecting Visuo-Haptic Mismatches in Virtual Reality using the Prediction Error Negativity of Event-Related Brain Potentials_crop_3.jpg": "picture",
    "Detecting Visuo-Haptic Mismatches in Virtual Reality using the Prediction Error Negativity of Event-Related Brain Potentials_crop_4.jpg": "picture",
    "Detecting Visuo-Haptic Mismatches in Virtual Reality using the Prediction Error Negativity of Event-Related Brain Potentials_crop_5.jpg": "picture",
    "Detecting Visuo-Haptic Mismatches in Virtual Reality using the Prediction Error Negativity of Event-Related Brain Potentials_crop_6.jpg": "graphic",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_1.jpg": "formula",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_2.jpg": "chart",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_3.jpg": "chart",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_4.jpg": "formula",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_5.jpg": "diagram",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_6.jpg": "table",
    "Effects of Sharing Physiological States of Players in Collaborative Virtual Reality Gameplay_crop_7.jpg": "formula",
    "Effects of Tactile Feedback on the Perception of Virtual Shapes on Non-Planar DisplayObjects _crop_1.jpg": "chart",
    "Effects of Tactile Feedback on the Perception of Virtual Shapes on Non-Planar DisplayObjects _crop_2.jpg": "formula",
    "Effects of Tactile Feedback on the Perception of Virtual Shapes on Non-Planar DisplayObjects _crop_3.jpg": "graphic",
    "Effects of Tactile Feedback on the Perception of Virtual Shapes on Non-Planar DisplayObjects _crop_4.jpg": "diagram",
    "Enhancing Texture Perception in Virtual Reality Using 3D-Printed Hair Structures_crop_1.jpg": "graphic",
    "Enhancing Texture Perception in Virtual Reality Using 3D-Printed Hair Structures_crop_2.jpg": "picture",
    "Enhancing Texture Perception in Virtual Reality Using 3D-Printed Hair Structures_crop_3.jpg": "diagram",
    "Enhancing Texture Perception in Virtual Reality Using 3D-Printed Hair Structures_crop_4.jpg": "graphic",
    "Enhancing Texture Perception in Virtual Reality Using 3D-Printed Hair Structures_crop_5.jpg": "graphic",
    "Enhancing Texture Perception in Virtual Reality Using 3D-Printed Hair Structures_crop_6.jpg": "graphic",
    "Examining and Enhancing the Illusory Touch Perception in Virtual Reality Using Non-Invasive Brain Stimulation_crop_1.jpg": "chart",
    "Examining and Enhancing the Illusory Touch Perception in Virtual Reality Using Non-Invasive Brain Stimulation_crop_2.jpg": "picture",
    "Examining and Enhancing the Illusory Touch Perception in Virtual Reality Using Non-Invasive Brain Stimulation_crop_3.jpg": "formula",
    "Examining and Enhancing the Illusory Touch Perception in Virtual Reality Using Non-Invasive Brain Stimulation_crop_4.jpg": "table",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_1.jpg": "diagram",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_2.jpg": "human",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_3.jpg": "human",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_4.jpg": "graphic",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_5.jpg": "graphic",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_6.jpg": "diagram",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_7.jpg": "graphic",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_8.jpg": "chart",
    "Experimental Analysis of Barehand Mid-air Mode-Switching Techniques in Virtual Reality_crop_9.jpg": "human",
    "Exploring Interaction Fidelity in Virtual Reality Object Manipulation and Whole-Body Movements_crop_1.jpg": "table",
    "Exploring Interaction Fidelity in Virtual Reality Object Manipulation and Whole-Body Movements_crop_2.jpg": "diagram",
    "Exploring Interaction Fidelity in Virtual Reality Object Manipulation and Whole-Body Movements_crop_3.jpg": "table",
    "Exploring Interaction Fidelity in Virtual Reality Object Manipulation and Whole-Body Movements_crop_4.jpg": "diagram",
    "Exploring Interaction Fidelity in Virtual Reality Object Manipulation and Whole-Body Movements_crop_5.jpg": "table",
    "Exploring Virtual Agents for Augmented Reality_crop_1.jpg": "human",
    "Exploring Virtual Agents for Augmented Reality_crop_2.jpg": "graphic",
    "Exploring Virtual Agents for Augmented Reality_crop_3.jpg": "chart",
    "Exploring Virtual Agents for Augmented Reality_crop_4.jpg": "graphic",
    "Exploring Virtual Agents for Augmented Reality_crop_5.jpg": "formula",
    "Exploring Virtual Agents for Augmented Reality_crop_6.jpg": "table",
    "Exploring Virtual Agents for Augmented Reality_crop_7.jpg": "graphic",
    "Extending the Body for Interaction with Reality_crop_1.jpg": "diagram",
    "Extending the Body for Interaction with Reality_crop_2.jpg": "graphic",
    "Extending the Body for Interaction with Reality_crop_3.jpg": "picture",
    "Extending the Body for Interaction with Reality_crop_4.jpg": "human",
    "Extending the Body for Interaction with Reality_crop_5.jpg": "formula",
    "Extending the Body for Interaction with Reality_crop_6.jpg": "diagram",
    "Extending the Body for Interaction with Reality_crop_7.jpg": "formula",
    "Extending the Body for Interaction with Reality_crop_8.jpg": "picture",
    "Extending the Body for Interaction with Reality_crop_9.jpg": "human",
    "Extending the Body for Interaction with Reality_crop_10.jpg": "diagram",
    "Extending the Body for Interaction with Reality_crop_11.jpg": "table",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_1.jpg": "graphic",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_2.jpg": "human",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_3.jpg": "graphic",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_4.jpg": "graphic",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_5.jpg": "chart",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_6.jpg": "formula",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_7.jpg": "chart",
    "FTVR in VR Evaluation of 3D Perception With a Simulated Volumetric Fish-Tank Virtual Reality Display_crop_8.jpg": "chart",
    "Handsfree Omnidirectional VR Navigation using Head Tilt_crop_1.jpg": "formula",
    "Handsfree Omnidirectional VR Navigation using Head Tilt_crop_2.jpg": "picture",
    "Handsfree Omnidirectional VR Navigation using Head Tilt_crop_3.jpg": "picture",
    "Handsfree Omnidirectional VR Navigation using Head Tilt_crop_4.jpg": "formula",
    "Handsfree Omnidirectional VR Navigation using Head Tilt_crop_5.jpg": "formula",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_1.jpg": "human",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_2.jpg": "diagram",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_3.jpg": "graphic",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_5.jpg": "table",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_7.jpg": "human",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_8.jpg": "formula",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_9.jpg": "chart",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_10.jpg": "diagram",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_11.jpg": "graphic",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_12.jpg": "formula",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_13.jpg": "formula",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_14.jpg": "graphic",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_15.jpg": "table",
    "HapticHead- A Spherical Vibrotactile Grid around the Head for 3D Guidance in Virtual and Augmented Reality _crop_16.jpg": "chart",
    "I Am The Passenger- How Visual Motion Cues Can Influence Sickness For In-Car VR_crop_1.jpg": "picture",
    "I Am The Passenger- How Visual Motion Cues Can Influence Sickness For In-Car VR_crop_2.jpg": "chart",
    "I Am The Passenger- How Visual Motion Cues Can Influence Sickness For In-Car VR_crop_3.jpg": "picture",
    "I Am The Passenger- How Visual Motion Cues Can Influence Sickness For In-Car VR_crop_4.jpg": "chart",
    "I Am The Passenger- How Visual Motion Cues Can Influence Sickness For In-Car VR_crop_5.jpg": "graphic",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_1.jpg": "formula",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_2.jpg": "human",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_3.jpg": "table",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_4.jpg": "human",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_5.jpg": "diagram",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_6.jpg": "chart",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_7.jpg": "picture",
    "Investigating Implicit Gender Bias and Embodiment of White Males in Virtual Reality with Full Body Visuomotor Synchrony_crop_8.jpg": "graphic",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_1.jpg": "table",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_2.jpg": "chart",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_3.jpg": "picture",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_4.jpg": "table",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_5.jpg": "graphic",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_6.jpg": "graphic",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_7.jpg": "formula",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_8.jpg": "chart",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_9.jpg": "chart",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_10.jpg": "graphic",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_11.jpg": "human",
    "Looking Inside the Wires- Understanding Museum Visitor Learning with an Augmented Circuit Exhibit _crop_12.jpg": "diagram",
    "MagicFace- Stepping into Character through an Augmented Reality Mirror_crop_1.jpg": "graphic",
    "MagicFace- Stepping into Character through an Augmented Reality Mirror_crop_2.jpg": "picture",
    "MagicFace- Stepping into Character through an Augmented Reality Mirror_crop_3.jpg": "chart",
    "MagicFace- Stepping into Character through an Augmented Reality Mirror_crop_5.jpg": "picture",
    "Measuring and Understanding Photo Sharing Experiences in Social Virtual Reality_crop_1.jpg": "formula",
    "Measuring and Understanding Photo Sharing Experiences in Social Virtual Reality_crop_2.jpg": "picture",
    "Measuring and Understanding Photo Sharing Experiences in Social Virtual Reality_crop_3.jpg": "diagram",
    "Measuring and Understanding Photo Sharing Experiences in Social Virtual Reality_crop_4.jpg": "diagram",
    "Measuring and Understanding Photo Sharing Experiences in Social Virtual Reality_crop_5.jpg": "human",
    "Measuring and Understanding Photo Sharing Experiences in Social Virtual Reality_crop_6.jpg": "formula",
    "Personalising the TV Experience using Augmented_crop_1.jpg": "table",
    "Personalising the TV Experience using Augmented_crop_2.jpg": "human",
    "Personalising the TV Experience using Augmented_crop_3.jpg": "human",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_1.jpg": "diagram",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_2.jpg": "table",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_3.jpg": "human",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_4.jpg": "chart",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_5.jpg": "chart",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_6.jpg": "formula",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_7.jpg": "chart",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_11.jpg": "chart",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_12.jpg": "picture",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_13.jpg": "graphic",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_14.jpg": "table",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_15.jpg": "picture",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_16.jpg": "graphic",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_17.jpg": "graphic",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_18.jpg": "formula",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_20.jpg": "chart",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_21.jpg": "table",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_22.jpg": "human",
    "Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation _crop_23.jpg": "table",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_1.jpg": "graphic",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_2.jpg": "chart",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_3.jpg": "human",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_4.jpg": "human",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_5.jpg": "picture",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_6.jpg": "human",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_7.jpg": "diagram",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_8.jpg": "table",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_9.jpg": "table",
    "Quantitative Measurement of Tool Embodiment for Virtual Reality Input Alternatives_crop_10.jpg": "formula",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_1.jpg": "picture",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_2.jpg": "graphic",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_3.jpg": "picture",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_4.jpg": "human",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_5.jpg": "human",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_6.jpg": "human",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_7.jpg": "diagram",
    "Retargeting Video Tutorials Showing Tools With Surface Contact to Augmented Reality_crop_8.jpg": "graphic",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_1.jpg": "formula",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_2.jpg": "diagram",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_3.jpg": "human",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_4.jpg": "chart",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_5.jpg": "table",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_6.jpg": "picture",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_7.jpg": "diagram",
    "ShareVR- Enabling Co-Located Experiences for Virtual Reality between HMD and Non-HMD Users_crop_8.jpg": "chart",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_1.jpg": "chart",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_2.jpg": "formula",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_3.jpg": "picture",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_4.jpg": "formula",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_5.jpg": "formula",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_6.jpg": "chart",
    "TabletInVR Exploring the Design Space for Using a Multi-Touch Tablet in Virtual Reality_crop_7.jpg": "human",
    "Teaching Language and Culture with a Virtual Reality Game_crop_1.jpg": "chart",
    "Teaching Language and Culture with a Virtual Reality Game_crop_2.jpg": "human",
    "Teaching Language and Culture with a Virtual Reality Game_crop_3.jpg": "graphic",
    "Teaching Language and Culture with a Virtual Reality Game_crop_4.jpg": "graphic",
    "Teaching Language and Culture with a Virtual Reality Game_crop_5.jpg": "diagram",
    "Teaching Language and Culture with a Virtual Reality Game_crop_7.jpg": "table",
    "Teaching Language and Culture with a Virtual Reality Game_crop_8.jpg": "table",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_1.jpg": "chart",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_2.jpg": "formula",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_3.jpg": "diagram",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_4.jpg": "graphic",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_5.jpg": "graphic",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_6.jpg": "diagram",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_7.jpg": "diagram",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_8.jpg": "picture",
    "The Geometry of Storytelling- Theatrical Use of Space for 360-degree Videos and Virtual Reality_crop_9.jpg": "formula",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_1.jpg": "human",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_2.jpg": "graphic",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_3.jpg": "human",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_4.jpg": "chart",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_5.jpg": "formula",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_6.jpg": "table",
    "The World-as-Support- Embodied Exploration, Understanding and Meaning-Making of the Augmented World _crop_7.jpg": "table",
    "ThermoVR- Exploring Integrated Thermal Haptic Feedback with Head Mounted Displays_crop_1.jpg": "human",
    "ThermoVR- Exploring Integrated Thermal Haptic Feedback with Head Mounted Displays_crop_2.jpg": "picture",
    "ThermoVR- Exploring Integrated Thermal Haptic Feedback with Head Mounted Displays_crop_3.jpg": "table",
    "ThermoVR- Exploring Integrated Thermal Haptic Feedback with Head Mounted Displays_crop_4.jpg": "diagram",
    "ThermoVR- Exploring Integrated Thermal Haptic Feedback with Head Mounted Displays_crop_5.jpg": "formula",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_1.jpg": "formula",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_2.jpg": "table",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_3.jpg": "picture",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_4.jpg": "diagram",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_5.jpg": "human",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_6.jpg": "table",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_7.jpg": "graphic",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_8.jpg": "chart",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_9.jpg": "diagram",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_10.jpg": "diagram",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_11.jpg": "human",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_12.jpg": "picture",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_13.jpg": "formula",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_14.jpg": "picture",
    "TORC A Virtual Reality Controller for In-Hand High-Dexterity Finger Interaction_crop_15.jpg": "diagram",
    "Using Presence Questionnaires in Virtual Reality_crop_1.jpg": "chart",
    "Using Presence Questionnaires in Virtual Reality_crop_2.jpg": "formula",
    "Using Presence Questionnaires in Virtual Reality_crop_3.jpg": "picture",
    "Using Presence Questionnaires in Virtual Reality_crop_4.jpg": "human",
    "Using Presence Questionnaires in Virtual Reality_crop_5.jpg": "formula",
    "Using Presence Questionnaires in Virtual Reality_crop_6.jpg": "graphic",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_1.jpg": "chart",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_2.jpg": "table",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_3.jpg": "picture",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_4.jpg": "formula",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_5.jpg": "graphic",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_6.jpg": "table",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_7.jpg": "human",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_8.jpg": "graphic",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_9.jpg": "formula",
    "VaiR- Simulating 3D Airflows in Virtual Reality_crop_10.jpg": "table",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_1.jpg": "human",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_2.jpg": "chart",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_3.jpg": "human",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_4.jpg": "diagram",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_5.jpg": "chart",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_6.jpg": "formula",
    "Vremiere- In-Headset Virtual Reality Video Editing_crop_7.jpg": "human",
    "VRRRRoom- Virtual Reality for Radiologists in the Reading Room_crop_1.jpg": "chart",
    "VRRRRoom- Virtual Reality for Radiologists in the Reading Room_crop_2.jpg": "formula",
    "VRRRRoom- Virtual Reality for Radiologists in the Reading Room_crop_3.jpg": "diagram",
    "VRRRRoom- Virtual Reality for Radiologists in the Reading Room_crop_4.jpg": "chart",
    "WatchThru- Expanding Smartwatch Displays with Mid-air Visuals and Wrist-worn Augmented Reality_crop_1.jpg": "human",
    "WatchThru- Expanding Smartwatch Displays with Mid-air Visuals and Wrist-worn Augmented Reality_crop_2.jpg": "formula",
    "WatchThru- Expanding Smartwatch Displays with Mid-air Visuals and Wrist-worn Augmented Reality_crop_3.jpg": "graphic",
    "WatchThru- Expanding Smartwatch Displays with Mid-air Visuals and Wrist-worn Augmented Reality_crop_4.jpg": "diagram",
    "What Can We Learn from Augmented Reality (AR) Benefits and Drawbacks of AR for Inquiry-based Learning of Physics_crop_1.jpg": "formula",
    "What Can We Learn from Augmented Reality (AR) Benefits and Drawbacks of AR for Inquiry-based Learning of Physics_crop_2.jpg": "formula",
    "What Can We Learn from Augmented Reality (AR) Benefits and Drawbacks of AR for Inquiry-based Learning of Physics_crop_3.jpg": "diagram",
    "What Can We Learn from Augmented Reality (AR) Benefits and Drawbacks of AR for Inquiry-based Learning of Physics_crop_4.jpg": "diagram",
    "What Can We Learn from Augmented Reality (AR) Benefits and Drawbacks of AR for Inquiry-based Learning of Physics_crop_6.jpg": "picture",
    "What\'s Happening at that Hip Evaluating an On-body Projection based Augmented Reality System for Physiotherapy Classroom_crop_1.jpg": "formula",
    "What\'s Happening at that Hip Evaluating an On-body Projection based Augmented Reality System for Physiotherapy Classroom_crop_2.jpg": "diagram",
    "What\'s Happening at that Hip Evaluating an On-body Projection based Augmented Reality System for Physiotherapy Classroom_crop_3.jpg": "formula",
    "What\'s Happening at that Hip Evaluating an On-body Projection based Augmented Reality System for Physiotherapy Classroom_crop_4.jpg": "human"
}';
