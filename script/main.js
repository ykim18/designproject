$(function () {
    //-----jquery start------
    $("aside span").on("click", function () {
        $(this).toggleClass("active");
    })
    $(".tags li").on("click", function () {
        $(this).toggleClass("active")
    })
    $(".results li").on("click", function () {
        $(this).addClass("active");
        $(".results li").not($(this)).removeClass("active")
    })

    $("p.next").on("click", function () {
       $("div.list_top").find("img:first-of-type").appendTo($("div.list_top"))
       $("div.list_bottom").find("img:first-of-type").appendTo($("div.list_bottom"))
    })
    $("p.prev").on("click", function () {
        $("div.list_top").find("img:last-of-type").prependTo($("div.list_top"))
        $("div.list_bottom").find("img:last-of-type").prependTo($("div.list_bottom"))
    })
// $("section#mainContainer").hide();
// $("section.cover").hide();

$("div.bar_container").width($("div.column").outerHeight()).height($("div.column").outerWidth());

$("section.main").css({
    top: $("section.cover").outerHeight()
});

$("article.selected_fig").hide();
    //-----jquery end--------
});