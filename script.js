window.addEventListener("DOMContentLoaded", () => {
    // STATE
    let isMuted = false;
    let isSynced = false;

    // SELECT THE RELEVANT DOM ELEMENTS
    const calculator = document.querySelector(".calculator");
    const screen  = document.querySelector(".screen .inner");
    const numbers = document.querySelectorAll(".numbers button");
    const functions = document.querySelectorAll(".functions button");
    const elementary = document.querySelectorAll(".elementary button");

    // Initial state of the calculator
    let currentNum = "0";
    let previousNum = null;
    let operator = null;

    // screen update with current number
    function updateScreen() {
        let result = "";
        for (let i = 0; i < currentNum.length; i++) {
            const char = currentNum.charAt(i);
        }
    }
})