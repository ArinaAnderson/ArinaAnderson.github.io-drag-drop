'use strict';

var box_params = {
  BORDER_WIDTH: 2
};
var photo = document.querySelector('.trip-photo');
var photoBoxes = document.querySelectorAll('.trip-photo-box');
var photoBoxesArr = Array.prototype.slice.call(photoBoxes);
var originalBox = document.querySelector('.trip-photo-box--fill');
var activeBox;
var filteredBoxes;


function checkBoxCoords(mouseX, mouseY, box) {
  if ((mouseY >= box.offsetTop && mouseY < (box.offsetTop + box.offsetHeight)) && (mouseX >= box.offsetLeft &&
      mouseX < (box.offsetLeft + box.offsetWidth))) {
    return true;
  }
  return false;


  // return (mouseY >= box.offsetTop && mouseY < box.offsetTop + box.offsetHeight) && (mouseX >= box.offsetLeft &&
     // mouseX < box.offsetLeft + box.offsetWidth);
}

function photoMouseDownHandler(evt) {
  var initilaCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  activeBox = originalBox;

  function photoMoveHandler(moveEvt) {
    var shiftCoords = {
      x: initilaCoords.x - moveEvt.clientX,
      y: initilaCoords.y - moveEvt.clientY
    };
    
    photo.style.left = (photo.offsetLeft - shiftCoords.x) + 'px';
    photo.style.top = (photo.offsetTop - shiftCoords.y) + 'px';

    initilaCoords.x = moveEvt.clientX;
    initilaCoords.y = moveEvt.clientY;

    filteredBoxes = photoBoxesArr.filter(function (box) {
      return (moveEvt.clientY >= box.offsetTop && moveEvt.clientY < box.offsetTop + box.offsetHeight) && (moveEvt.clientX >= box.offsetLeft &&
        moveEvt.clientX < box.offsetLeft + box.offsetWidth);
    });

    if (filteredBoxes.length > 0) {
      activeBox.classList.remove('trip-photo-box--hover');
      activeBox = filteredBoxes[0];
      activeBox.classList.add('trip-photo-box--hover');
    }
  }

  function photoMouseUpHandler(upEvt) {
    upEvt.preventDefault();

    originalBox = activeBox;
    photo.style.left = (originalBox.offsetLeft + 2) + 'px';
    photo.style.top = (originalBox.offsetTop + 2) + 'px';

    document.removeEventListener('mousemove', photoMoveHandler);
    document.removeEventListener('mouseup', photoMouseUpHandler);
  }

  document.addEventListener('mousemove', photoMoveHandler);
  document.addEventListener('mouseup', photoMouseUpHandler);
}

photo.addEventListener('mousedown', photoMouseDownHandler);
