/////////////// ETCH A SKETCH /////////////////

This project is the second last step towards completing the foundations path on the Odin Project.

There are 3 main functions to be made in this project, which can each be broken down
into sub-functions.

    1. Create a 16x16 grid of square divs (will later be made adjustable so 
    javascript can be used)

        1a. This will be achieved using a "mother div", upon which all other divs
        will be appended as children using a javascript function that loops 16 times
        
        1b. There will likely have to be a function that determines which position on 
        the grid they are places, or a function to adjust their size,

    2. Create a hover effect so that the child divs darken every time the mouse 
    passes them

        2a. Will use a javascript function to either add a new class (CSS)
        or a javascript function to darken the color using .style
        (Likely will need object.onmouseover = () => {} )

    3. Add a popup (or slider) that allows the user to enter a number of squares
    per side for a new grid.  When changed the new grid must delete and a new grid
    must appear (Max = 100)

        3a. There will be a <button> with an onclick javascript event tied into

        
