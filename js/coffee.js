// Welcome Screen Fade Out on Start
$(document).ready(function () {
    var startButton = $('#startButton');
    var myWelcomePage = $('.welcome-page-full');
    var myGamePage = $('.game-page-full');

    startButton.click(function() {
        myWelcomePage.fadeOut(1000, gamePageInit);
        myGamePage.fadeIn(5000);
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

  // Coffee Mug Bullet
  var mugImage = new Image();
  mugImage.src = './images/blackmug.png';

  function Bullet (x, y, image, width, height, hits) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.width = width;
      this.height = height;
      this.captures = hits;
  }

  Bullet.prototype.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, 15, 15);
  };

  var myBullets = [];

  // Coffee Projectiles
  var beanImage = new Image();
  beanImage.src = './images/cup.png';

  function Beans (x, y, caffeinePts, isConsumed, image, isLoaded) {
      this.x = x;
      this.y = y;
      this.caffeinePts = 5;
      this.isConsumed = false;
      this.image = image;
      this.isLoaded = false;
  }

  Beans.prototype.draw = function () {
      ctx.drawImage(this.image, this.x, this.y, 15, 20);
  };

  var myBeansOne = [];
      for(i = 1; i <= 12; i++) {
          myBeansOne.push(new Beans (400 + (50 * i), 120, 5, false, beanImage, false, 0.7));
      }

  var myBeansTwo = [];
      for(i = 1; i <= 12; i++) {
          myBeansTwo.push(new Beans (400 + (50 * i), 165, 5, false, beanImage, false));
      }

  var myBeansThree = [];
      for(i = 1; i <= 12; i++) {
          myBeansThree.push(new Beans (400 + (50 * i), 210, 5, false, beanImage, false));
      }

  var myBeansFour = [];
      for(i = 1; i <= 12; i++) {
          myBeansFour.push(new Beans (400 + (50 * i), 255, 5, false, beanImage, false));
      }

  var myBeansFive = [];
      for(i = 1; i <= 12; i++) {
          myBeansFive.push(new Beans (400 + (50 * i), 300, 5, false, beanImage, false));
      }

  var myBeansSix = [];
      for(i = 1; i <= 12; i++) {
          myBeansSix.push(new Beans (400 + (50 * i), 345, 5, false, beanImage, false));
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
  var ax = 0.8;
  var bx = 0.8;
  var cx = 0.8;
  var dx = 0.8;
  var ex = 0.8;
  var fx = 0.8;


  // Draw Items
  function draw () {
    // clear the entire canvas to remove old items
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        if (oneBean.x < 430) {
            ax = -ax;
        }

        if (oneBean.x > canvas.width - 520) {
            ax = -ax;
        }
        oneBean.x -= ax;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 10 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 15) {
                    oneBean.isConsumed = true;
            }
        });
    });

    myBeansTwo.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
            oneBean.draw();
        }

        if (oneBean.x > canvas.width - 520) {
            bx = -bx;
        }
        if (oneBean.x < 430) {
            bx = -bx;
        }
        oneBean.x += bx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 10 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 15) {
                    oneBean.isConsumed = true;
            }
        });
    });

    myBeansThree.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
            oneBean.draw();
        }

        if (oneBean.x < 430) {
            cx = -cx;
        }
        if (oneBean.x > canvas.width - 520) {
            cx = -cx;
        }
        oneBean.x -= cx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 10 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 15) {
                oneBean.isConsumed = true;
            }
        });
    });

    myBeansFour.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
            oneBean.draw();
        }

        if (oneBean.x > canvas.width - 520) {
            dx = -dx;
        }
        if (oneBean.x < 430) {
            dx = -dx;
        }
        oneBean.x += dx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 10 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 15) {
                oneBean.isConsumed = true;
            }
        });
    });

    myBeansFive.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
            oneBean.draw();
        }

        if (oneBean.x < 430) {
            ex = -ex;
        }
        if (oneBean.x > canvas.width - 520) {
            ex = -ex;
        }
        oneBean.x -= ex;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 10 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 15) {
                oneBean.isConsumed = true;
            }
        });
    });

    myBeansSix.forEach(function(oneBean) {
        if (oneBean.isConsumed === false) {
            oneBean.draw();
        }

        if (oneBean.x > canvas.width - 1020) {
            fx = -fx;
        }
        if (oneBean.x < 430) {
            fx = -fx;
        }
        oneBean.x += fx;

        myBullets.forEach(function(oneBullet) {
            if (oneBean.x < oneBullet.x &&
                oneBullet.x < oneBean.x + 10 &&
                oneBean.y < oneBullet.y &&
                oneBullet.y < oneBean.y + 15) {
                oneBean.isConsumed = true;
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
                var newBullet = new Bullet (myGirl.x + 17, myGirl.y, mugImage, 10, 10, 0);
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
