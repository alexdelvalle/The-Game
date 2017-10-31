$(document).ready(function () {
    var startButton = $('#startButton');
    var myWelcomePage = $('.welcome-page-full');

    startButton.click(function() {
        myWelcomePage.fadeOut(1000);
    });

});



//     function toggleWelcome() {
//
//     var myWelcomePage = $('.welcome-page-full');
//     var pageDisplaySetting = $(myWelcomePage.style.display);
//     var startButton = $('#startButton');
//
//
//         if (pageDisplaySetting === 'block') {
//             myWelcomePage.style.display = 'none';
//         }
//         else {
//             myWelcomePage.style.display = 'block';
//         }
//       }
// });
