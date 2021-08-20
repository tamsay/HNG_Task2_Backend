/*=========================================================================
        Preloader
=========================================================================*/
$(window).load(function () {
  "use strict";
  $(".preloader-outer").delay(350).fadeOut("slow");
});

$(function () {
  "use strict";
  /*=========================================================================
            One Page Nav
    =========================================================================*/
  $(".navigation").onePageNav({
    currentClass: "current",
    changeHash: false,
    scrollSpeed: 700,
    scrollThreshold: 0.5,
    easing: "easeInOutCubic",
  });

  /*=========================================================================
            Portfolio filter
    =========================================================================*/
  if ($("#works .item-outer").length > 0) {
    var filterizd = $("#works .item-outer").filterizr();
  }
  $(".control ul li").on("click", function () {
    $(this).parent().find("li.active").removeClass("active");
    $(this).addClass("active");
  });

  /*=========================================================================
            Hamburger Menu & Mobile Push menu
    =========================================================================*/
  $(".hamburger-menu, .main-nav ul li a").on("click", function () {
    $(".header").toggleClass("pushed");
    $(".main-content").toggleClass("main-pushed");
    $(".bar").toggleClass("animate");
  });

  /*=========================================================================
            Backstretch Background Slider
    =========================================================================*/
  $("#welcome").backstretch(
    [
      "http://placehold.it/1200x768",
      "http://placehold.it/1200x768",
      // "assets/images/your_pic.jpg"
    ],
    { duration: 5000, fade: 400 }
  );

  /*=========================================================================
            Welcome & Header Height
    =========================================================================*/
  $("#welcome").css({ height: $(window).height() + "px" });
  $(".header").css({ height: $(window).height() + "px" });

  /*=========================================================================
            Magnific Popup Functions
    =========================================================================*/
  $(".work-image").magnificPopup({
    type: "image",
  });

  $(".work-video").magnificPopup({
    type: "iframe",
    iframe: {
      markup:
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        "</div>",

      patterns: {
        youtube: {
          index: "youtube.com/",

          id: "v=",

          src: "http://www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed",
        },
      },

      srcAction: "iframe_src",
    },
  });
});

/*=========================================================================
        Handle Form Submission
=========================================================================*/
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector("#submit");
const inputName = document.querySelector("#InputName");
const inputPhone = document.querySelector("#InputPhone");
const inputSubject = document.querySelector("#InputSubject");
const inputMessage = document.querySelector("#InputMessage");
const inputEmail = document.querySelector("#InputEmail");
const loader = document.querySelector("#loader");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loader.classList.remove("hide");
  loader.classList.add("show");
  const name = inputName.value;
  const phoneNumber = inputPhone.value;
  const email = inputEmail.value;
  const subject = inputSubject.value;
  const message = inputMessage.value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phoneNumber,
      email,
      subject,
      message,
    }),
  };
  fetch("/contact-me/", options)
    .then((resp) => resp.json())
    .then((data) => {
      loader.classList.remove("show");
      loader.classList.add("hide");
      if (data.status === "success") {
        alert("Message Sent Successfully");
        contactForm.reset();
      } else {
        alert("Sending Failed, Please Try Again");
      }
    });
});
