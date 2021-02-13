const COLOR_DIGITS = '0123456789ABCDEF';
let hoverInterval;

const generateColor = () => {
  let color = '#';

  for (let i = 0; i < 6; i++) {
    let position = Math.floor(Math.random() * COLOR_DIGITS.length);
    color += COLOR_DIGITS[position];
  }

  return color;
};

const drawContainer = (containerSize, childSize, numberOfChildren) => {
  let mainSquare = document.getElementById('mainSquare');
  mainSquare.style.width = `${containerSize}px`;
  mainSquare.style.height = `${containerSize}px`;

  let maxSquaresPerRow = Math.floor(containerSize / childSize);
  let maxSquares = maxSquaresPerRow * maxSquaresPerRow;

  /* If the maximum number of squares is greater than the numberOfChildren passed in the function,
     use the numberOfChildren */
  if (maxSquares > numberOfChildren) {
    maxSquares = numberOfChildren;
  }

  setHelperText(numberOfChildren, maxSquares);

  for (let i = 0; i < maxSquares; i++) {
    let childSquare = drawChildSquare(childSize);
    mainSquare.append(childSquare);
  }
};

const drawChildSquare = (childSize) => {
  let childSquare = document.createElement('div');

  childSquare.style.width = `${childSize}px`;
  childSquare.style.height = `${childSize}px`;
  childSquare.style.backgroundColor = generateColor();
  childSquare.className = 'childSquare';

  childSquare.addEventListener("mouseover", event => {
    updateBackgroundColor(event.target);
    initializeHoverTimeout(event.target);
  });

  childSquare.addEventListener("mouseout", event => {
    resetTimeout();
  });

  return childSquare;
};

const setHelperText = (numberOfChildren, maxSquares) => {
  let helperEl = document.getElementById('helperText');

  if (numberOfChildren > maxSquares) {
    document.querySelector('#helperText .rendered').innerHTML = maxSquares;
    document.querySelector('#helperText .total').innerHTML = numberOfChildren;
    helperEl.style.display = 'block';
  } else {
    helperEl.style.display = 'none';
  }
};

const hideSquare = (el) => {
  el.style.visibility = 'hidden';
};

const updateBackgroundColor = (el) => {
  el.style.backgroundColor = generateColor();
};

const initializeHoverTimeout = (el) => {
  if (hoverInterval) clearTimeout(hoverInterval);
  hoverInterval = setTimeout(() => {
    hideSquare(el);
  }, 2000);
};

const resetTimeout = () => {
  clearTimeout(hoverInterval);
  hoverInterval = null;
};

document.addEventListener("DOMContentLoaded", function(event) {
  drawContainer(400, 90, 30);
});

