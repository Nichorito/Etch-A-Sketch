let sliderInput = document.querySelector("#sizeSlider").value;
console.log(sliderInput)
let cellsPerSide = 8;
let totalCells = cellsPerSide * cellsPerSide;
let gridContainer = document.querySelector("#gridContainer");

//Sets the amount of columns and rows in the grid equal to the number of cells per side
gridContainer.style.gridTemplateRows = `repeat(${cellsPerSide}, 1fr)`;
gridContainer.style.gridTemplateColumns = `repeat(${cellsPerSide}, 1fr)`;


let row = 1;
let column = 1;
for (let i = 1; i <= totalCells; i++) {
    //Create a new gridCell
    let gridCell = document.createElement("div");

    gridCell.classList.add("gridCell")

    column++;

    if (column == cellsPerSide) {
        row++;
        column = 1;
    }
    //Adds the cells to the gridCell class

    gridContainer.appendChild(gridCell);

}