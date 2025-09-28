function generateGrid() {
	let size = document.getElementById("size").value;
	let grid = document.getElementById("grid");

	// Clear old grid
	grid.innerHTML = "";

	// Set grid template based on input size
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	// Create divs
	for (let i = 0; i < size * size; i++) {
		let cell = document.createElement("div");
		cell.classList.add("cell");
		grid.appendChild(cell);
	}
}