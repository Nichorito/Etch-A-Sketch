let sliderInput = document.querySelector("#sizeSlider");
let gridContainer = document.querySelector("#gridContainer");
let cellsPerSide = sliderInput.value;
let totalCells = cellsPerSide * cellsPerSide;
let sizeText = document.querySelector("p");

//Sets the amount of columns and rows in the grid equal to the number of cells per side
//before creating the initial grid.  Stops it from being one giant cell on load
gridContainer.style.gridTemplateRows = `repeat(${cellsPerSide}, 1fr)`;
gridContainer.style.gridTemplateColumns = `repeat(${cellsPerSide}, 1fr)`;

CreateGrid(totalCells, cellsPerSide);


 // Add a mouseover event listener to the grid container then delegate to the target gridCell
gridContainer.addEventListener('mouseover', (event) => {

    if (event.target.classList.contains("gridCell")) {

        let currentColor = event.target.style.backgroundColor || getComputedStyle(event.target).backgroundColor;

        // Extract the alpha value from the current color
        let alpha = parseFloat(currentColor.match(/(\d|\.)+/g)[3]);

        // Increase alpha by 0.1 (10%)
        alpha = Math.min(alpha + 0.1, 1); // Ensure alpha doesn't exceed 1

        // Update the background color with the new alpha value
        event.target.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;

        console.log("You are currently over a cell");
        console.log("This cell's background color is now " + event.target.style.backgroundColor); 
    }
});

//Called whenever the slider input element is changed - Updates the grid
sliderInput.addEventListener("input", function () {
    cellsPerSide = sliderInput.value;
    totalCells = cellsPerSide * cellsPerSide;
    sizeText.textContent = cellsPerSide + " x " + cellsPerSide;

    //Sets the amount of columns and rows in the grid equal to the number of cells per side
    gridContainer.style.gridTemplateRows = `repeat(${cellsPerSide}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cellsPerSide}, 1fr)`;

    //Debug Log
    console.log("Slider Input = " + sliderInput.value);
    console.log("There are: " + totalCells + "cells");

    clearChildren(gridContainer);

    //Updates grid 
    CreateGrid(totalCells, cellsPerSide);
});


//Creates the initial grid and is called to update every time the slider is adjusted
function CreateGrid(totalCells, cellsPerSide) {
    let row = 1;
    let column = 1;
    for (let i = 1; i <= totalCells; i++) {

        //Create a new gridCell
        let gridCell = document.createElement("div");

        //gridCell.id = `gridCell${i}`;
        gridCell.classList.add("gridCell");

        column++;

        if (column == cellsPerSide) {
            row++;
            column = 1;
        }
        //Adds the cells to the gridCell class

        gridContainer.appendChild(gridCell);
    }
    console.log("Grid updated to: " + cellsPerSide + " cells per side.\n");
}

//Removes all child divs from the gridContainer to prevent bloating 
function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

