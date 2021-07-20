/* 
Problem:
    Make a sketch app where the user can draw when hovering the mouse over it.
    Give the user the ability to change the resolution of the grid and clear
    what has been drawn.

Plan: 
    - User interface: The browser window.
    - Data inputs: Hovering the mouse over the sketching area to draw on it.
        How big the resolution of the sketching area the user wants it to be.
    - Desired outputs: The area where the user hover the mouse over change of
        color. The resolution of the sketching area change to what the user
        desires.
*/

const sketchArea = document.querySelector("#sketch-area");
let pixels = document.querySelectorAll(".pixel");;

const clearButton = document.querySelector("#clear-area");
const changeSizeButton = document.querySelector("#change-size");
const rainbowCheck = document.querySelector("#rainbow-mode");

rainbowCheck.addEventListener("change" , () => {
    pixels.forEach(pixel => {
        pixel.classList.remove("hovered", "red", "orange", "yellow", "green", "blue", "indigo")
    })
});

clearButton.addEventListener("click", () => {
    pixels.forEach(pixel => {
        pixel.classList.remove("hovered", "red", "orange", "yellow", "green", "blue", "indigo")
    })
})

changeSizeButton.addEventListener("click", () => {    
    let size = prompt("Change the size of the sketching area (min=8 max=100).", "16");
    let intSize = parseInt(size);

    if(intSize > 100 || intSize < 8) {
        return alert("Invalid size. Must be between 8 and 100.");
    }

    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.lastChild);
    }

    createGrid(intSize * intSize);

    sketchArea.style.gridTemplateColumns = `repeat(${intSize}, 1fr)`
    sketchArea.style.gridTemplateRows = `repeat(${intSize}, 1fr)`

    pixels = document.querySelectorAll(".pixel");
})

let numberOfHover = 0;

function createGrid(numberOfPixels) {
    for (let i = 0; i < numberOfPixels; i++) {   
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");        
        pixel.addEventListener("mouseover", () => {
            numberOfHover++;
            if (numberOfHover > 5) {numberOfHover = 0};
            if (rainbowCheck.checked) {
                if(pixel.classList.length > 1) {return}
                const colors = ["red", "orange", "yellow", "green", "blue", "indigo"];
                pixel.classList.add(colors[numberOfHover]);
            } else {pixel.classList.add("hovered")}
        });
        sketchArea.appendChild(pixel);
    }

    pixels = document.querySelectorAll(".pixel");
}

createGrid(256);