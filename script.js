let sliderInput = document.querySelector("#sizeSlider");
let gridContainer = document.querySelector("#gridContainer");
let blackButton = document.querySelector("#blackButton");
let rainbowButton = document.querySelector("#rainbowButton");
let blueButton = document.querySelector("#blueButton");
let eraseButton = document.querySelector("#eraseButton");
let clearButton = document.querySelector("#clearButton");
let sizeText = document.querySelector("p");

let cellsPerSide = sliderInput.value;
let totalCells = cellsPerSide * cellsPerSide;
let colorType = 'black';
let storeColor = '';

//Sets the amount of columns and rows in the grid equal to the number of cells per side
//before creating the initial grid.  Stops it from being one giant cell on load
gridContainer.style.gridTemplateRows = `repeat(${cellsPerSide}, 1fr)`;
gridContainer.style.gridTemplateColumns = `repeat(${cellsPerSide}, 1fr)`;

CreateGrid(totalCells, cellsPerSide);


//Values are passed into the grid container mouseover event to determine how rgba changes
//Then the grid is wiped clean
blackButton.addEventListener('click', () => {
    console.log("The black button was clicked");
    colorType = 'black';

    //clearChildren(gridContainer);
    //CreateGrid(totalCells, cellsPerSide);

    /////// CSS EDITS ///////

    //Make black button highlighted
    blackButton.style.backgroundColor = "#393e41";
    blackButton.style.color = "whitesmoke"

    //Unhighlight all other colors
    rainbowButton.style.backgroundColor = "whitesmoke"
    rainbowButton.style.color = "black"

    blueButton.style.backgroundColor = "whitesmoke";
    blueButton.style.color = "black"

    eraseButton.style.backgroundColor = "whitesmoke";
    eraseButton.style.color = "black"
})

rainbowButton.addEventListener('click', () => {
    console.log("The rainbow button was clicked");

    //clearChildren(gridContainer);
    //CreateGrid(totalCells, cellsPerSide);
        
    colorType = 'rainbow'
    console.log("colorType is now: " + colorType);


    blackButton.style.backgroundColor = "whitesmoke"
    blackButton.style.color = "black";

    rainbowButton.style.backgroundColor = "#393e41";
    rainbowButton.style.color = "whitesmoke"

    blueButton.style.backgroundColor = "whitesmoke";
    blueButton.style.color = "black"

    eraseButton.style.backgroundColor = "whitesmoke";
    eraseButton.style.color = "black"
})

//Blue Button Logic
blueButton.addEventListener('click', () => {
    console.log("The blue button was clicked!");

    //clearChildren(gridContainer);
    //CreateGrid(totalCells, cellsPerSide);
        
    colorType = 'blue'
    console.log("colorType is now: " + colorType);

    //Update blue button style
    blueButton.style.backgroundColor = "rgb(116, 153, 255)";
    blueButton.style.color = "black"

    //Unhighlight all other colors
    blackButton.style.backgroundColor = "whitesmoke"
    blackButton.style.color = "black";

    rainbowButton.style.backgroundColor = "whitesmoke";
    rainbowButton.style.color = "black";

    eraseButton.style.backgroundColor = "whitesmoke";
    eraseButton.style.color = "black"
})

//Eraser Function
eraseButton.addEventListener('click', () => {
    console.log("The erase button was clicked");
    
        if (colorType != 'erase') {
            storeColor = colorType;

            colorType = 'erase';
            console.log("colorType is now: " + colorType);
            eraseButton.style.backgroundColor = "rgba(57, 62, 65, 1";
            eraseButton.style.color = "whitesmoke"
        }

        else {
            colorType = storeColor;
            eraseButton.style.backgroundColor = "whitesmoke";
            eraseButton.style.color = "black"
        }
})

//Clear Function
clearButton.addEventListener('click', () => {
    console.log("The board has been cleared!");

    clearChildren(gridContainer);
    CreateGrid(totalCells, cellsPerSide);
})

 // Add a mouseover event listener to the grid container then delegate to the target gridCell
gridContainer.addEventListener('mouseover', (event) => {

    if (event.target.classList.contains("gridCell")) {

        let currentColor = event.target.style.backgroundColor || getComputedStyle(event.target).backgroundColor;

        console.log("colorType is now: " + colorType);

        //Black color mode
        if (colorType == 'black') {
            // Extract the alpha value from the current color
            let alpha = parseFloat(currentColor.match(/(\d|\.)+/g)[3]);

            // Increase alpha by 0.1 (10%)
            alpha = Math.min(alpha + 0.1, 1); // Ensure alpha doesn't exceed 1

            // Update the background color with the new alpha value
            event.target.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
        }
        else if (colorType == 'rainbow'){
            
            //Rainbow color mode
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1)); //Math.random can only generate up to 1, it cannot equal 1.
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);

            //Update the background color to the new RGB
            event.target.style.backgroundColor = `rgb(${r},${g},${b})`;
        } 
        else if (colorType == 'blue'){
            // Extract the alpha value from the current color
            let alpha = parseFloat(currentColor.match(/(\d|\.)+/g)[3]);

            // Increase alpha by 0.1 (10%)
            alpha = Math.min(alpha + 0.1, 1); // Ensure alpha doesn't exceed 1

            // Update the background color with the new alpha value
            event.target.style.backgroundColor = `rgba(0, 0, 255, ${alpha})`;
        }
        else if (colorType == 'erase'){

            console.log("storeColor is; " + storeColor)
            if (event.backgroundColor == 'black' || event.backgroundColor == 'blue') {
                // Extract the alpha value from the current color
                let alpha = parseFloat(currentColor.match(/(\d|\.)+/g)[3]);
                let r = parseFloat(currentColor.match(/(\d|\.)+/g)[0]);
                let g = parseFloat(currentColor.match(/(\d|\.)+/g)[1]);
                let b = parseFloat(currentColor.match(/(\d|\.)+/g)[2]);

                // Decrease alpha by 0.1 (10%)
                alpha = Math.max(alpha - 0.1, 0); // Ensure alpha doesn't go below 0

                // Update the background color with the new alpha value
                event.target.style.backgroundColor = `rgba(${r},${g},${b}, ${r})`;
            }
            else {
                event.target.style.backgroundColor = 'rgba(215, 252, 212, 0)';
            }
        }

        console.log("You are currently over a cell");
        console.log("This cell's background color is now " + event.target.style.backgroundColor); 
    }
});

//Called whenever the slider input element is changed - Updates the grid
sliderInput.addEventListener("input", () => {
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

