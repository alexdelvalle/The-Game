// Welcome Screen Fade Out on Start
$(document).ready(function () {
    var startButton = $('#startButton');
    var goHomeButton = $('.gohomebutton');
    var myWelcomePage = $('.welcome-page-full');
    var myGamePage = $('.game-page-full');

    startButton.click(function() {
        myWelcomePage.fadeOut(1000, gamePageInit);
        myGamePage.fadeIn(5000);

    goHomeButton.click(function() {
        $('#myLoseModal').modal('hide');
        $('#myWinModal').modal('hide');

        myGamePage.fadeOut(1000);
        myWelcomePage.fadeIn(1000);
    });
  });
});

function gamePageInit(){
  var canvas = document.querySelector('.my-game');
  canvas.width = window.innerWidth - 500;
  var ctx = canvas.getContext('2d');

  // Level Board Image
  var boardImage = new Image();
  boardImage.src = './images/board.jpeg';
  boardImage.onload = function () {
      myBoard.isLoaded = true;
  };

  // Level Board Object
  var myBoard = {
      x: 50,
      y: 160,
      isLoaded: true,
      image: boardImage,
      draw: function () {
          if (this.isLoaded) {
              ctx.drawImage(this.image, this.x, this.y, 241, 300);
          }
      }
  };

  // Hearts Life Bar
  var oneHeart = $('#heart1');
  var twoHeart = $('#heart2');
  var threeHeart = $('#heart3');
  var fourHeart = $('#heart4');
  var fiveHeart = $('#heart5');
  var sixHeart = $('#heart6');

  var heartsArray = [oneHeart, twoHeart, threeHeart, fourHeart, fiveHeart, sixHeart];
  var index = 0;
  var addHeart = false;

  // Remove a heart every 2 seconds
  // Stop removing heart if there are no more cups left OR if all hearts are removed
  var heartChanger = setInterval( function() {
      if (addHeart === true) {
          index = 0;
          addHeart = false;
        }
      if ( $('.hearts img.inactive').length >= 6 || cupCount === 50 ) {
          clearInterval(heartChanger);
      }
      heartsArray[index++ % heartsArray.length].removeClass('active').addClass('inactive');
  }, 2500);



  // Add a heart if 10 cups have been consumed
  var totalPoints = 0;
  function raiseHearts() {
      if (totalPoints >= 50) {
      $('.inactive').last().removeClass('inactive').addClass('active');
      totalPoints = 0;
      addHeart = true;
    }
  }

  // Win Game
  function winLoseGame() {
      if (cupCount > 0 && ($('.inactive').length === 6)) {
          $('#myLoseModal').modal('show');
      }
      if (cupCount === 0 && ($('.inactive').length < 6)) {
          clearInterval(heartChanger);
          $('#myWinModal').modal('show');
      }
  }



  // Girl Avatar Image
  var girlImage = new Image();
  girlImage.src = './images/hipstergirl.svg';
  girlImage.onload = function () {
        myGirl.isLoaded = true;
  };

  // Girl Avatar Object
  var myGirl = {
      x: 400,
      y: 370,
      isLoaded: false,
      image: girlImage,
      draw: function () {
          if (this.isLoaded) {
              ctx.drawImage(this.image, this.x, this.y, 100, 110);
          }
      }
  };

  // Coffee Mug Bullet
  var mugImage = new Image();
  mugImage.src = './images/finalmug.png';

  function Bullet (x, y, image, width, height, hasHit) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.width = width;
      this.height = height;
      this.hasHit = false;
  }

  Bullet.prototype.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, 22, 22);
  };

  var myBullets = [];

  // Coffee Projectiles
  var beanImage = new Image();
  beanImage.src = './images/coffeecup.png';

  function Beans (x, y, caffeinePts, isConsumed, image, isLoaded) {
      this.x = x;
      this.y = y;
      this.caffeinePts = 5;
      this.isConsumed = false;
      this.image = image;
      this.isLoaded = false;
  }

  Beans.prototype.draw = function () {
      ctx.drawImage(this.image, this.x, this.y, 16, 27);
  };

  var myBeansOne = [];
      for(i = 1; i <= 10; i++) {
          myBeansOne.push(new Beans (350 + (35 * i), 55, 5, false, beanImage, false));
      }

  var myBeansTwo = [];
      for(i = 1; i <= 10; i++) {
          myBeansTwo.push(new Beans (350 + (35 * i), 100, 5, false, beanImage, false));
      }

  var myBeansThree = [];
      for(i = 1; i <= 10; i++) {
          myBeansThree.push(new Beans (350 + (35 * i), 145, 5, false, beanImage, false));
      }

  var myBeansFour = [];
      for(i = 1; i <= 10; i++) {
          myBeansFour.push(new Beans (350 + (35 * i), 190, 5, false, beanImage, false));
      }

  var myBeansFive = [];
      for(i = 1; i <= 10; i++) {
          myBeansFive.push(new Beans (350 + (35 * i), 235, 5, false, beanImage, false));
      }

  var myBeansSix = [];
      for(i = 1; i <= 10; i++) {
          myBeansSix.push(new Beans (350 + (35 * i), 280, 5, false, beanImage, false));
      }

  var allBeans = [
      myBeansOne,
      myBeansTwo,
      myBeansThree,
      myBeansFour,
      myBeansFive,
      myBeansSix,
  ];

  // Bean array speeds must all be separate to not mix up the positive and negative values for the array draw functions below
  var ax = 1.4;
  var bx = 1;
  var cx = 0.8;
  var dx = 0.7;
  var ex = 0.5;
  var fx = 0.2;

  // count cups of coffee consumed
  var cupCount = 60;
  var cupText = $('#cupcount');
  cupText.empty();
  cupText.append(cupCount);

  // Draw Items
  function draw () {
    // clear the entire canvas to remove old items
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    winLoseGame();

    // draw coffee shop
    myBoard.draw();

    // draw bullets
    myBullets.forEach(function(oneBullet) {
            oneBullet.draw();
            oneBullet.y -= 3;
    });

    // draw avatar
    myGirl.draw();


    // draw Beans and check if consumed
    myBeansOne.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
              oneBean.draw();
        }
        if (oneBean.x <= 350 ) {
            oneBean.x = 700;
        }
        oneBean.x -= ax;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 16 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 27) {
                    oneBean.isConsumed = true;
                    cupCount--;
                    oneBean.y = NaN;
                    oneBullet.y = NaN;
                    cupText.empty();
                    cupText.append(cupCount);
                    totalPoints += oneBean.caffeinePts;
                    raiseHearts();
            }
        });
    });

    myBeansTwo.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
              oneBean.draw();
        }
        if (oneBean.x >= 700 ) {
            oneBean.x = 350;
        }
        oneBean.x += bx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 16 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 27) {
                    oneBean.isConsumed = true;
                    cupCount--;
                    oneBean.y = NaN;
                    oneBullet.y = NaN;
                    cupText.empty();
                    cupText.append(cupCount);
                    totalPoints += oneBean.caffeinePts;
                    raiseHearts();
            }
        });
    });

    myBeansThree.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
              oneBean.draw();
        }
        if (oneBean.x <= 350 ) {
            oneBean.x = 700;
        }
        oneBean.x -= cx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 16 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 27) {
                    oneBean.isConsumed = true;
                    cupCount--;
                    oneBean.y = NaN;
                    oneBullet.y = NaN;
                    cupText.empty();
                    cupText.append(cupCount);
                    totalPoints += oneBean.caffeinePts;
                    raiseHearts();
            }
        });
    });

    myBeansFour.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
              oneBean.draw();
        }
        if (oneBean.x >= 700 ) {
            oneBean.x = 350;
        }
        oneBean.x += dx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 16 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 27) {
                    oneBean.isConsumed = true;
                    cupCount--;
                    oneBean.y = NaN;
                    oneBullet.y = NaN;
                    cupText.empty();
                    cupText.append(cupCount);
                    totalPoints += oneBean.caffeinePts;
                    raiseHearts();
            }
        });
    });

    myBeansFive.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
              oneBean.draw();
        }
        if (oneBean.x <= 350 ) {
            oneBean.x = 700;
        }
        oneBean.x -= ex;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 16 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 27) {
                    oneBean.isConsumed = true;
                    cupCount--;
                    oneBean.y = NaN;
                    oneBullet.y = NaN;
                    cupText.empty();
                    cupText.append(cupCount);
                    totalPoints += oneBean.caffeinePts;
                    raiseHearts();
            }
        });
    });

    myBeansSix.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
              oneBean.draw();
        }
        if (oneBean.x >= 700 ) {
            oneBean.x = 350;
        }
        oneBean.x += fx;

        myBullets.forEach(function(oneBullet) {

            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 16 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 27) {
                    oneBean.isConsumed = true;
                    cupCount--;
                    oneBean.y = NaN;
                    oneBullet.y = NaN;
                    hasHit = false;
                    cupText.empty();
                    cupText.append(cupCount);
                    totalPoints += oneBean.caffeinePts;
                    raiseHearts();
            }
        });
    });

    requestAnimationFrame(draw);

  }

  requestAnimationFrame(draw);



  // Movement Controls
  $(document).ready(function () {
      $(document).keydown(function () {
          switch (event.keyCode) {
            case 37: // left arrow
                event.preventDefault();
                myGirl.x -= 30;
                break;

            case 39: // right arrow
                event.preventDefault();
                myGirl.x += 30;
                break;

            case 32: // spacebar
                event.preventDefault();
                var newBullet = new Bullet (myGirl.x + 37, myGirl.y, mugImage, 22, 22, false);
                myBullets.push(newBullet);
                break;

            case 38:
            case 40:
                event.preventDefault();
                break;
          } // switch
      }); // keydown
  }); // document ready
} // game initialization
