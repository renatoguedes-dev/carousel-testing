const leftArrow = document.querySelector(".left-arrow")
const rightArrow = document.querySelector(".right-arrow")
const slider = document.querySelector(".slider")
const testButton = document.querySelector(".test-button")
const photoCards = document.querySelectorAll(".photo-card")

leftArrow.addEventListener("click", moveLeft)
rightArrow.addEventListener("click", moveRight)
testButton.addEventListener("click", test)

let position = 0
let transformValue

function moveLeft() {
    if (position === 0) {
        position = photoCards.length - 1
    } else {
        position -= 1
    }

    updateTransformValue(position)
    slider.style.transform = `translateX(-${transformValue}%)`
}

function moveRight() {
    if (position === photoCards.length - 1) {
        position = 0
    } else {
        position += 1
    }

    updateTransformValue(position)
    slider.style.transform = `translateX(-${transformValue}%)`
    
}

function test() {
    updateTransformValue(position)
    const computedStyle = getComputedStyle(slider)
    const transformedValue = computedStyle.transform
    if (transformedValue.startsWith("matrix")) {
        // Extract the matrix values
        const matrixValues = transformedValue
            .match(/matrix\(([^)]+)\)/)[1]
            .split(", ")
        // The translation in the x-direction is the 5th value (index 4)
        const translateX = parseFloat(matrixValues[4])

        console.log("Translation in x-direction:", translateX)
    }
    console.log(position)
    console.log(transformValue)
}

function updateTransformValue(position) {
    for (let index = 0; index < photoCards.length; index++) {
        if (index === position) {
            transformValue = position
            if (transformValue !== 0) {
                transformValue = transformValue * 100
            }

            return
        }
    }
}

const intervalId = setInterval(moveRight, 5000);
