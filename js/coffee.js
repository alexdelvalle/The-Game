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

  // Coffee Mug Bullet


  // Coffee Projectiles
  var beanImage = new Image();
  beanImage.src = './images/bean1.png';

  function Beans (x, y, caffeinePts, isConsumed, image, isLoaded) {
      this.x = x;
      this.y = y;
      this.caffeinePts = 5;
      this.isConsumed = false;
      this.image = image;
      this.isLoaded = false;
  }

  Beans.prototype.draw = function () {
      // if (this.isLoaded) {
          ctx.drawImage(this.image, this.x, this.y, 15, 20);
      // }
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

  var allOddBeans = [
      myBeansOne,
      myBeansThree,
      myBeansFive,
  ];

  var allEvenBeans = [
      myBeansTwo,
      myBeansFour,
      myBeansSix,
  ];

  // must all be separate to not mix up the positive and negative values for the array draw functions below
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

    myCoffeeHouse.draw();
    myGirl.draw();

    myBeansOne.forEach(function(oneBean) {
        oneBean.draw();

        if (oneBean.x < 430) {
            ax = -ax;
        }
        if (oneBean.x > canvas.width - 230) {
            ax = -ax;
        }
        oneBean.x -= ax;
    });

    myBeansTwo.forEach(function(oneBean) {
        oneBean.draw();

        if (oneBean.x > canvas.width - 230) {
            bx = -bx;
        }
        if (oneBean.x < 430) {
            bx = -bx;
        }
        oneBean.x += bx;
    });

    myBeansThree.forEach(function(oneBean) {
        oneBean.draw();

        if (oneBean.x < 430) {
            cx = -cx;
        }
        if (oneBean.x > canvas.width - 230) {
            cx = -cx;
        }
        oneBean.x -= cx;
    });

    myBeansFour.forEach(function(oneBean) {
        oneBean.draw();

        if (oneBean.x > canvas.width - 230) {
            dx = -dx;
        }
        if (oneBean.x < 430) {
            dx = -dx;
        }
        oneBean.x += dx;
    });

    myBeansFive.forEach(function(oneBean) {
        oneBean.draw();

        if (oneBean.x < 430) {
            ex = -ex;
        }
        if (oneBean.x > canvas.width - 230) {
            ex = -ex;
        }
        oneBean.x -= ex;
    });

    myBeansSix.forEach(function(oneBean) {
        oneBean.draw();

        if (oneBean.x > canvas.width - 230) {
            fx = -fx;
        }
        if (oneBean.x < 430) {
            fx = -fx;
        }
        oneBean.x += fx;
    });

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

            case 39: // right arrow
                myGirl.x += 30;
                break;

            // case 32: // spacebar
            //     mugBullet.y += 30;
            //     break;
          } // switch
      }); // keydown
  }); // document ready
} // game initialization
