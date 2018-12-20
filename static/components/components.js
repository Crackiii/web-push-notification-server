/*--------------------------------- CUSTOM SELECT OPTIONS SCRIPT ------------------------------------*/
$(".def-select-wrap .def-selected-head").click(function(ev){
    ev.stopPropagation();
    var _me = $(this);
    var _thisParent = $(this).parent(), _delay = 0;

    if ($(_thisParent).find(".def-select-fill").hasClass("def-sel-fill-dark")) {
      fill = "#e8e8e8";
    }
    else if ($(_thisParent).find(".def-select-fill").hasClass("def-sel-fill-light")) {
      fill = "#ffffff";
    }

    $(_thisParent).find(".def-select-fill").css({height:"100%",background:fill});
    $(_thisParent).find(".def-select-opts").show(100).addClass("select-bounce");
    $(_thisParent).find(".csh-icon").toggleClass("csh-icon-rotate");
    $(_thisParent).find(".def-select-opts li").click(function() {
        $(_thisParent).find(".def-select-opts li").each(function(){
          $(this).removeClass("active");
        })
        $(this).addClass("active");
        $(_thisParent).find(".csh-text").text($(this).text());
        $(_thisParent).find(".csh-icon").removeClass("csh-icon-rotate");
        $(_me).removeClass("select-bounce");
    })
    $(document).click(function(e) {
        var event = e.target;
        if (event != "def-select-wrap") {
            $(_thisParent).find(".def-select-opts").hide(100);
            $(_thisParent).find(".csh-icon").removeClass("csh-icon-rotate");
            $(_me).removeClass("select-bounce");
            $(_thisParent).find(".def-select-fill").css({height:"0%"});
        }
    })
})


/*------------------------------------ CUSTOM RIPPLE EFFECT SCRIPT ---------------------------------------------*/

$(".wavers").on("click mousedown",function(e) {
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight = $(this).height(),
      x = e.pageX - posX - buttonWidth / 2,
      y = e.pageY - posY - buttonHeight / 2,
      background ,
      timing;

  $(".ripple").remove();
  $(this).prepend("<span class='ripple'></span>");

  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  if ($(this).hasClass("wavers-light")) {
     background = "rgba(255, 255, 255, 0.4)";
  } else if ($(this).hasClass("wavers-medium")) {
     background = "rgba(141, 141, 141, 0.2)";
  }else if ($(this).hasClass("wavers-dark")) {
     background = "rgba(141, 141, 141, 0.4)";
  }

  if (e.type == "mousedown") {
     timing = "rippleEffectLate";
  } else {
    timing = "rippleEffectQuick";
  }

  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px',
    background:background
  }).addClass(timing);

});

/*-----------------------------------------SLIDER EFFECT-----------------------------------------*/

$(".aps-navigation ul li").click(function(e){
     var whatTab = $(this).index(),
         howFar = 83.2 * whatTab;
      $(".slider").css({  left: howFar + "px" });
      $(this).parent().find("li").each(function(){
        $(this).removeClass("aps-nav-line-active")
      })
      $(this).addClass("aps-nav-line-active")
})

$(document).ready(function(){

  var _this = $(".header-sec.header-links-nav ul li"), whatTab, howFar;

  $(_this).on("click",function(e) {
      whatTab = $(this).index();
      howFar = $(this).width() * whatTab;
      $(_this).each(function(){
        $(this).removeClass("header-links-nav-active");
      })
      $(this).addClass("header-links-nav-active");
      $(".header-sec.header-links-nav ul li.slider").css({display:"block",left: howFar + "px" });
  })

  $(window).on("resize load",function(e){
    howFar = $(_this).width() * whatTab;
    $(".header-sec.header-links-nav ul li.slider").css({width:$(_this).width()+"px",left:howFar+"px"});
    if ($(this).width() < 768) {
       $("#site-search").attr("placeholder", "Search...");
    } else {
      $("#site-search").attr("placeholder",'Search "ANventory" for anything...')
    }

  })

  $(".header-sec.header-links-nav ul li.slider").css({width:$(_this).width()+"px"});

})




$(".def-tab-button").click(function(e){
     var whatTab = $(this).index(),
         howFar = 150 * whatTab,
         tabContent = $(".default-tabs .def-tab-content");

      if ($(this).hasClass("def-tab-btn-active")) {
        return;
      } else {
        $(this).parent().find(".def-tab-button").each(function(){
          $(this).removeClass("def-tab-btn-active");
        })
        $(this).addClass("def-tab-btn-active");
        $(".pointy-slider").css({  left: (howFar) + "px" });
        tabContent.each(function(){
          $(this).hide();
        });
        tabContent.eq(whatTab).show();
      }
})

/*------------------------------------------- CUSTOM INPUT ------------------------------------*/
window.addEventListener('load', () => {

  var h = 35, _this = $(".inp input,.inp textarea");

  $(_this).each(function(){
    $(this).attr("autocomplete","off");
    if ($(this).val().length > 0) {
      $(this).parent().find("label").css({ "margin-top":"-"+h+"px",padding:0,"font-size":"11px",color:"var(--site-info-color)" });
      $(this).parent().find(".inp-line").css({"width":"100%"});
      $(this).parent().find(".inp-fill").css({"height":"100%"});
    }
  })

});



  $(".inp input,.inp textarea").on("focus",function(e){
    var h = 0, _this = $(this);
    if (e.target.nodeName == "TEXTAREA") {
      h = 35;
    } else {
      h = 35;
    }
    $(this).parent().find("label").css({ "margin-top":"-"+h+"px",padding:0,"font-size":"11px",color:"var(--site-info-color)" });
    $(this).parent().find(".inp-line").css({"width":"100%"});
    $(this).parent().find(".inp-fill").css({"height":"100%"});
    $(this).parent().find(".inp-tinp-tcontrol").slideDown(300);
    $(".inp-tinp-tcontrol ul li a").on("click",function(ev){
      ev.preventDefault();
      if ($(this).hasClass("tinp-control-active")) {
        $(this).removeClass("tinp-control-active");
      } else {
        $(this).addClass("tinp-control-active");
      }
    })

  })

  $(".inp input,.inp textarea").on("blur",function(e){

    if (e.target.nodeName == "TEXTAREA") {
      h = 35;
    } else {
      h = 35;
    }
    if ($(this).val().length > 0) {
      $(this).parent().find("label").css({ "margin-top":"-"+h+"px",padding:0,"font-size":"11px",color:"var(--site-info-color)" })
      $(this).parent().find(".inp-line").css({"width":"100%"});
      $(this).parent().find(".inp-fill").css({"height":"100%"});
    } else {
      $(this).parent().find("label").css({ "margin-top":"0",padding:"10px 0","font-size":"inherit",color:"inherit" })
      $(this).parent().find(".inp-line").css({"width":"0%"});
      $(this).parent().find(".inp-fill").css({"height":"0%"});
      $(this).parent().find(".inp-tinp-tcontrol").slideUp(300);
    }
  })

/*------------------------------------------- SITE SEARCH ------------------------------------------*/
$("#site-search").on("input focus",function(e){
  var _this = $("#site-search");
  if ($(_this).val().length > 0) {
    $(".hs-suggestion-box").show();
    $(".hs-sugg-head-typed").text('"'+$(_this).val().toLowerCase().replace(/(!|@|#|&|=|\?|\(|\)|<|>|,|\.|:|;|'|"|''|""|-|_|\+|\*|\&|\^|\%|\$|\`|\~|\[|\]|\{|\})/g,'')+'"');
  } else {
    $(".hs-sugg-head-typed").text('""');
    $(".hs-suggestion-box").hide();
  }
  $(".hs-sugg-conents ul li a").click(function(){
    $(_this).val($(this).text().toLowerCase());
    $(".hs-suggestion-box").hide();
  })
  $(document).on("click",function(e){
    if (e.target == "input#site-search") {
      return;
    } else {
      $(".hs-suggestion-box").hide();
    }
  })
})

/*--------------------------------------------SITE TABLE SCRIPT---------------------------------*/

$(".hpls-ul1").on("click",function(e){

  $(".header-prof-links-table").fadeIn(300).css({display:"flex"});

  $(".header-prof-links-table").on("click",function(e){
    if (e.target.nodeName == "UL") {
      return;
    } else {
      $(".header-prof-links-table").fadeOut(300);
    }
  })

})

/*------------------------------------HEADER DROPDOWN SCRIPTS------------------------------------*/

$("li.dhls-primary-li").on("click",function(e){

  var _this = $(this);
  e.stopPropagation();
  if (e.currentTarget.classList.contains("dhls-primary-li-active")) {
    $(this).removeClass("dhls-primary-li-active");
    $(_this).find(".dhls-drop").fadeOut(100);
    return;
  } else {
    if ($(_this).find(".dhls-drop").length !== 0) {
      $(_this).parent().find(".dhls-primary-li").each(function(){
         $(this).removeClass("dhls-primary-li-active");
         $(this).find(".dhls-drop").fadeOut(100);
      })
      $(_this).addClass("dhls-primary-li-active");
      $(_this).find(".dhls-drop").fadeIn(100);
    }
  }

})
$(document).mouseup(function(e){
    var subject = $(".dhls-drop");
    if(e.target.id !== subject.attr('id'))
    {
       $(".dhls-primary-li").removeClass("dhls-primary-li-active");
       subject.fadeOut();
    }
});


/*

$("#jdw-inp1").on("keydown input",function(e){

  var e = document.querySelector(".jdw-inp1-data .jdwid-content");
  var t = $(this).val();

  if ($(this).val().length > 0) {
    $(".jdw-inp1-data").show();
    if ($(".jdwid-content").children().length > 0) {
      if ($(".jdwid-content").children().length == 1) {
        e.children[0].textContent = t;
      }
      if ($(".jdwid-content").children().length > 1) {
        console.log("Children length is greater than 1");
        if (e.keyCode == '13') {
          var a = [];
          a = this.value.split(",");
          $(".jdwid-content").empty();
          for (var i = 0; i < a.length-1; i++) {
             e.insertAdjacentHTML("beforeend","<li>"+a[i]+"</li>");
          }
        }
      }
    } else {
      $(".jdwid-content").empty();
      e.insertAdjacentHTML("beforeend","<li></li>");
    }
  } else {
    $(".jdw-inp1-data").hide();
  }




})

*/
