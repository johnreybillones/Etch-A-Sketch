document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const sizeInput = document.getElementById('size');
  const createBtn = document.getElementById('createBtn');

  let drawing = false;
  const currentColor = 'black';

  function paintCell(cell) {
    if (!cell || !cell.classList.contains('cell')) return;
    cell.style.backgroundColor = currentColor;
  }

  function paintAtEvent(e) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cell = el?.closest('.cell');
    if (cell && grid.contains(cell)) paintCell(cell);
  }

  createBtn.addEventListener('click', generateGrid);

  // Event delegation on grid
  grid.addEventListener('pointerdown', function (e) {
    if (e.pointerType == 'mouse' && e.button !== 0) return;
    drawing = true;
    paintAtEvent(e);
    e.preventDefault();
  });

  grid.addEventListener('pointermove', function (e) {
    if (!drawing) return;
    paintAtEvent(e);
  });

  window.addEventListener('pointerup', () => { drawing = false; });
  window.addEventListener('pointercancel', () => { drawing = false; });

    // --- TOUCH FALLBACK (if PointerEvent not supported) ---
  if (!window.PointerEvent) {
    grid.addEventListener('touchstart', (e) => {
    drawing = true;
    paintAtEvent(e.touches[0]); // first finger
    e.preventDefault();
    });

    grid.addEventListener('touchmove', (e) => {
      if (!drawing) return;
      paintAtEvent(e.touches[0]);
      e.preventDefault();
    });

    window.addEventListener('touchend', () => { drawing = false; });
    window.addEventListener('touchcancel', () => { drawing = false; });
	}

  function generateGrid() {
    const size = Number(sizeInput.value) || 0;
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      grid.appendChild(cell);
    }
  }

  // create an initial grid so you can test immediately
  generateGrid();
});
