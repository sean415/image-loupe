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
        var elementOffset = self.element.getBoundingClientRect(),
            elementOffsetX = elementOffset.left,
            elementOffsetY = elementOffset.top,
            x = e.clientX - elementOffsetX,
            y = e.clientY - elementOffsetY;

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
      // TODO(sean) don't hardcode loupeWidth or borderWidth
      var loupeWidth = 200,
          borderWidth = 10,
          magnification = this.magnification,
          halfLoupeWidth = loupeWidth / 2;

      this.loupe.style.top = y - halfLoupeWidth - 10 + 'px';
      this.loupe.style.left = x - halfLoupeWidth - 10 + 'px';

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
