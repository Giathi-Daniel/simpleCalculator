window.addEventListener("DOMContentLoaded", () => {
    // STATE
    let isMuted = false;
    let isSynced = false;
  
    // select the relevant DOM elements
    const calculator = document.querySelector(".calculator");
    const screen = document.querySelector(".screen .inner");
    const numbers = document.querySelectorAll(".numbers button");
    const functions = document.querySelectorAll(".functions button");
    const elementary = document.querySelectorAll(".elementary button");
  
    // set the initial state of the calculator
    let currentNum = "0";
    let previousNum = null;
    let operator = null;
  
    // update the screen with the current number
    function updateScreen() {
      let result = "";
      for (let i = 0; i < currentNum.length; i++) {
        const char = currentNum.charAt(i);
        if (char === ".") {
          result += `<span><span class="dot">${char}</span></span>`;
        } else {
          result += `<span>${char}</span>`;
        }
      }
      screen.innerHTML = result;
  
      if (isSynced) {
        let value = currentNum.endsWith(".") ? currentNum + "0" : currentNum;
        calculator.style.setProperty("--base-hue", value);
        calculator.querySelectorAll('button').map(btn => {
        btn.style.setProperty("--base-hue", value);
          
        })
      }
    }
  
    // reset the calculator to its initial state
    function resetCalculator() {
      currentNum = "0";
      previousNum = null;
      operator = null;
      updateScreen();
    }
  
    // Delete the last character
    function deleteLastChar() {
      let screenText = screen.textContent;
      screenText = screenText.slice(0, -1); // remove last character
      screen.textContent = screenText;
    }
  
    // handle number button clicks
    function handleNumberClick(event) {
      const num = event.target.dataset.value;
  
      // if the current number is 0, replace it with the new number
      if (currentNum === "0") {
        currentNum = num;
      } else {
        currentNum += num;
      }
  
      updateScreen();
    }
  
    // handle function button clicks
    function handleFunctionClick(event) {
      const value = event.target.dataset.value;
      let memory = 0; // initialize memory variable to 0
      switch (value) {
        case "ON/AC":
          resetCalculator();
          break;
        case "GT":
          // remove the last digit from the current number
          currentNum = currentNum.slice(0, -1);
          updateScreen();
          break;
        case "MRC":
          // recall memory value and display it on screen
          screen.textContent = memory;
          break;
        case "M+":
          // add screen value to memory
          memory += Number(screen.textContent);
          break;
        case "M-":
          // subtract screen value from memory
          memory -= Number(screen.textContent);
          break;
        case "▶":
          deleteLastChar();
          break;
        default:
          operator = value;
          previousNum = currentNum;
          currentNum = "0";
          updateScreen();
      }
    }
  
    // handle elementary button clicks
    function handleElementaryClick(event) {
      const value = event.target.dataset.value;
  
      switch (value) {
        case "+":
        case "-":
        case "÷":
        case "✕":
          operator = value;
          previousNum = currentNum;
          currentNum = "0";
          updateScreen();
          break;
        case "=":
          // perform the calculation
          let result;
          switch (operator) {
            case "+":
              result = parseFloat(previousNum) + parseFloat(currentNum);
              break;
            case "-":
              result = parseFloat(previousNum) - parseFloat(currentNum);
              break;
            case "÷":
              result = parseFloat(previousNum) / parseFloat(currentNum);
              break;
            case "✕":
              result = parseFloat(previousNum) * parseFloat(currentNum);
              break;
            default:
              return;
          }
  
          // update the current number with the result
          currentNum = result.toString();
          previousNum = null;
          operator = null;
          updateScreen();
          break;
      }
    }
  
    // add event listeners to the number buttons
    numbers.forEach((number) => {
      number.addEventListener("click", handleNumberClick);
    });
  
    // add event listeners to the function buttons
    functions.forEach((func) => {
      func.addEventListener("click", handleFunctionClick);
    });
  
    // add event listeners to the elementary buttons
    elementary.forEach((elem) => {
      elem.addEventListener("click", handleElementaryClick);
    });
  
    calculator.style.setProperty("--base-hue", calculator.dataset.hue || "44");
  
    const audio = new Audio(
      "https://assets.codepen.io/64/CMPTKey_Apple-magic-mouse-simple-clic-_ID-1742_LS+%28mp3cut.net%29.mp3"
    );
    const buttons = document.querySelectorAll(".calculator button");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        audio.play();
      });
    });
  
    function toggleSound(el) {
      isMuted = !isMuted;
      audio.muted = isMuted;
  
      if (!isMuted) {
        return (el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-volume-x"><path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" /></svg>`);
      }
      return (el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-volume-2"><path d="M11 5 6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`);
    }
  
    function toggleHueSync(el) {
      isSynced = !isSynced;
  
      if (isSynced) {
        el.innerHTML = `Hue/result sync ✓`;
      } else {
        el.innerHTML = `Hue/result sync ⛌`;
      }
    }
  
    const soundButton = document.querySelector(".sound-button");
    soundButton.addEventListener("click", () => toggleSound(soundButton));
  
    const hueButton = document.querySelector(".hue-sync");
    hueButton.addEventListener("click", () => toggleHueSync(hueButton));
  
    const hueInput = document.querySelector("#hue-input");
    hueInput.addEventListener("input", (e) =>
      calculator.style.setProperty("--base-hue", e.target.value)
    );
    const lightnessInput = document.querySelector("#lightness-input");
    lightnessInput.addEventListener("input", (e) =>
      calculator.style.setProperty("--base-lightness", e.target.value)
    );
  });
  