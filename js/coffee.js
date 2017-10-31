// Welcome Screen Fade Out on Start
$(document).ready(function () {
    var startButton = $('#startButton');
    var myWelcomePage = $('.welcome-page-full');
    var myGamePage = $('.game-page-full');

    startButton.click(function() {
        myWelcomePage.fadeOut(1000);
        myGamePage.fadeIn(5000);
    });
});

var canvas = document.querySelector('.my-game');
canvas.width = window.innerWidth - 30;
var ctx = canvas.getContext('2d');

// Level Background Image
var coffeeHouseImage = new Image();
coffeeHouseImage.src = './images/coffeehouse.png';
coffeeHouseImage.onload = function () {
    myCoffeeHouse.isLoaded = true;
};
// Level Background Object
var myCoffeeHouse = {
    x: 50,
    y: 170,
    isLoaded: true,
    image: coffeeHouseImage,
    draw: function () {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, 271, 315);
        }
    }
};


// Girl Avatar Image
var girlImage = new Image();
girlImage.src = './images/girl.png';
girlImage.onload = function () {
      myGirl.isLoaded = true;
};

// Girl Avatar Object
var myGirl = {
    x: 400,
    y: 435,
    isLoaded: false,
    image: girlImage,
    draw: function () {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, 40, 60);
        }
    }
};

// Coffee Objects

// function Beans (x, y, image, isLoaded) {
//     this.x = x;
//     this.y = y;
//     this.image = coffeeBean;
//     this.isLoaded = false;
// }

// Beans.prototype.draw = function () {
//     if (this.isLoaded) {
//       ctx.drawImage(this.image,)
//     }
// }

function draw () {
  // clear the entire canvas to remove old items
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  myCoffeeHouse.draw();
  myGirl.draw();
  // myBeans.draw();

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);


// Avatar Movement Controls
$(document).ready(function () {
    $(document).keydown(function () {
        switch (event.keyCode) {
          case 37: // left arrow
              myGirl.x -= 30;
              break;

          case 38: // up arrow
              myGirl.y -= 30;
              break;

          case 39: // right arrow
              myGirl.x += 30;
              break;

          case 40: // down arrow
              myGirl.y += 30;
              break;
        } // switch
    }); // keydown
}); // document ready
