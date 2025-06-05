let currentSlide = 0;

function showSlide(index) {
    const slides = $(".slide");
    slides.hide();
    if (index < slides.length) {
        $(slides[index]).fadeIn(600);
    }
}

$("#messageState").on("change", (x) => {
    $(".message").removeClass("openNor").removeClass("closeNor");
    if ($("#messageState").is(":checked")) {
        $(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
        $(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
        $(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
        $(".next-container").fadeIn(2000);
    } else {
        $(".message").removeClass("no-anim").addClass("closeNor");
        $(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
        $(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
        $(".next-container").fadeOut();
    }
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    if ($(".message").hasClass("closeNor"))
        $(".message").addClass("closed");
    $(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    if (!$(".heart").hasClass("closeHer"))
        $(".heart").addClass("openedHer").addClass("beating");
    else
        $(".heart").addClass("no-anim").removeClass("beating");
    $(".heart").removeClass("openHer").removeClass("closeHer");
});

$("#nextButton").on("click", function () {
    $(".message").fadeOut(1000);
    $(".next-container").fadeOut(500);
    $(".slideshow").fadeIn(1000);
    currentSlide = 0;
    showSlide(currentSlide);

    // Optional auto-play
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 4000);
});
