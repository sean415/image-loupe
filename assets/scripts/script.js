(function() {

  var Magnifier = function(element) {
    this.element = element;
    this.lowResImage = element.querySelector('img');
    this.highResImage = this.createHighResImage(this.element.getAttribute('data-high-res-image'));
    this.loupe = this.createLoupe();

    this.element.appendChild(this.loupe);

    this.bindEvents();

  };

  Magnifier.prototype = {

    createHighResImage: function(imagesrc) {
      var image = new Image(),
          width, height,
          self = this;

      image.onload = function(e) {
        self.setMagnification(e.srcElement.width);
      };

      image.src = imagesrc;
      return image;
    },

    bindEvents: function() {
      var self = this;

      this.element.addEventListener('mousemove', function(e) {
        var x = e.clientX,
            y = e.clientY;

        self.setLoupePosition(x, y);
      });
    },

    createLoupe: function() {
      var element = document.createElement('div');
      element.classList.add('loupe');

      element.appendChild(this.highResImage);

      return element;

    },

    setLoupePosition: function(x, y) {
      // todo dont hardcode this
      var loupeWidth = 200,
          magnification = this.magnification,
          halfLoupeWidth = loupeWidth / 2;

      this.loupe.style.top = y - halfLoupeWidth + 'px';
      this.loupe.style.left = x - halfLoupeWidth + 'px';

      this.highResImage.style.top = -(magnification * y - (halfLoupeWidth)) + 'px';
      this.highResImage.style.left = -(magnification * x - (halfLoupeWidth)) + 'px';
    },


    setMagnification: function(highResImageWidth) {
      var lowResImageWidth = this.lowResImage.width;

      this.magnification = highResImageWidth / lowResImageWidth;

    }

  };

  var magnifier = new Magnifier(document.querySelector('[data-widget-name="magnifier"]'));

  window.magnifier = magnifier;

})();
