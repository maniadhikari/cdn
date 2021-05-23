(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container    = document.getElementById('js-container'),
        canvas       = document.getElementById('js-canvas'),
        canvasWidth  = canvas.width,
        canvasHeight = canvas.height,
        ctx          = canvas.getContext('2d'),
        image        = new Image(),
        brush        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image.src = 'data:image/png;base64,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';
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      // Show the form when Image is loaded.
      document.querySelectorAll('.form')[0].style.visibility = 'visible';
    };
    brush.src = 'data:image/png;base64,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';
    
    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('touchstart', handleMouseDown, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('touchmove', handleMouseMove, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('touchend', handleMouseUp, false);
    
    function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    
    function angleBetween(point1, point2) {
      return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }
    
    // Only test every `stride` pixel. `stride`x faster,
    // but might lead to inaccuracy
    function getFilledInPixels(stride) {
      if (!stride || stride < 1) { stride = 1; }
      
      var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
          pdata    = pixels.data,
          l        = pdata.length,
          total    = (l / stride),
          count    = 0;
      
      // Iterate over all pixels
      for(var i = count = 0; i < l; i += stride) {
        if (parseInt(pdata[i]) === 0) {
          count++;
        }
      }
      
      return Math.round((count / total) * 100);
    }
    
    function getMouse(e, canvas) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas.offsetParent !== undefined) {
        do {
          offsetX += canvas.offsetLeft;
          offsetY += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 40) {
        canvas.parentNode.removeChild(canvas);
        //$('.cntext').addClass('cntxt_visible');
        $('.body').addClass('result');
        $('.scratch_legen').addClass('hide');
        setTimeout(function(){
          //$('.chatter').addClass('active');
          $('.fin-body').addClass('active');
          setTimeout(function(){
            $('.fin-heading-title').addClass('hide');
          }, 1000);
        }, 2000);
        $('#confetti_btn')[0].click();  
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(brush, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();
