const setAttributes = (el, object) => {
  for (let key in object) {
    el.setAttribute(key, object[key]);
  }
};

function backgroundDropDown() {
  const darkStatus = document.getElementById("dark_status");
  let dropdown = document.querySelector(".dropdown.backgrounds");
  let options = dropdown.querySelector(".dropdown-menu.backgrounds");
  let optionItems = options.querySelectorAll("li");
  const dropDownContainer = document.querySelector("#backgroundsDropDown");
  let selectButton = dropDownContainer.querySelector("#DropDownB");
  
  const chooseOption = (option) => {
    backgroundSelected = option.getAttribute("data-value");
  };
  optionItems.forEach(function (option, i) {
    option.addEventListener("click", function () {
      chooseOption(option);
      selectButton.innerHTML = option.innerHTML;
      root.style.setProperty(
        "--body-image",
        `url('assets/${backgroundSelected}.jpg')`
      );
      root.style.setProperty(
        "--newTask-background",
        `url('assets/notepad7.jpg')`
      );
      root.style.setProperty("--primary-color", "white");
      root.style.setProperty("--secondary-color", "#1E1E1E");
      root.style.setProperty("--input-border-bottom", "1px solid #999");
      root.style.setProperty("--theme_toogle-background", 'floralwhite')
      root.style.setProperty("--new_task-header", "#d96b6b");
      root.style.setProperty("--text-color", "black");
      root.style.setProperty("--placeholder-color", "black");
      root.style.setProperty("--theme-btn", `url('assets/Dark-theme-btn.svg')`);
      darkStatus.innerText = 'Dark Mode: Off'
    });
  });
  return backgroundSelected;
}
