/*!
 * CoderDojo Karlsruhe Theme
 * based on Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on load and scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}
$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

var MarkdownLoader = {

    converter: null, // lazy init

    load_md: function (selector, url, extras) {

        if(!MarkdownLoader.converter){
            MarkdownLoader.converter = new showdown.Converter({tables: true});
        }

        var $container = $(selector);
        $container.empty().append("Lade Inhalt. Bitte warten...");

        $.get(url).done(function (data) {

            // check if the markdown has a yaml/pandoc-style header
            if (data.indexOf && data.indexOf("---") === 0 && data.indexOf("---", 4) !== -1) { // starts with --- .... ---
                data = data.substr(data.indexOf("---", 4) + 3);
            }

            var html = MarkdownLoader.converter.makeHtml(data);
            if (extras) {
                $container.empty().append(extras).append(html);
            } else {
                $container.empty().append(html);
            }
            $container.find("table").addClass("markdown");

        }).fail(function (a, b) {
            $container.empty().append("Der Inhalt konnte nicht geladen werden :(");
            console.log(a, b)
        });
    }
};


// jQuery for page scrolling feature - requires jQuery Easing plugin
function scroll_to(target) {
    $('html, body').stop().animate({
        scrollTop: $(target).offset().top
    }, 1500, 'easeInOutExpo');
}

$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        var target = $anchor.attr('href');
        scroll_to(target);
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

$('.navbar-nav > li.dropdown.hidden-xs').hover(function () {
        $('ul.dropdown-menu', this).stop(true, true).slideDown('fast');
        $(this).addClass('open');
    },
    function () {
        $('ul.dropdown-menu', this).stop(true, true).slideUp('fast');
        $(this).removeClass('open');
    });