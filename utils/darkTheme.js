const root = document.querySelector(":root");
const themeBtn = document.querySelector(".theme_toogle_btn");

themeBtn.addEventListener("click", function () {
    const darkTheme = themeBtn.classList.toggle("dark");
    const darkStatus = document.getElementById("dark_status");
    if (darkTheme) {
      darkStatus.innerText = "Dark Mode: On";
      root.style.setProperty("--theme-transition", "2s");
      root.style.setProperty("--body-image", `url('assets/moon4.gif')`);
      root.style.setProperty(
        "--newTask-background",
        `url('assets/notepad-black3.png')`
      );
      root.style.setProperty("--primary-color", "#1E1E1E");
      root.style.setProperty(
        "--add-button-background",
        "linear-gradient(to right, #04131f, #020303, #246174)"
      );
      root.style.setProperty("--secondary-color", "#3B3B3B");
      root.style.setProperty("--input-border-bottom", "1px solid white");
      root.style.setProperty("--text-color", "#EAEAEA");
      root.style.setProperty("--placeholder-color", "white");
      root.style.setProperty("--new_task-header", "white");
      root.style.setProperty("--date-input-background", "transparent")
      root.style.setProperty("--dropdown-background-color", "transparent")
      root.style.setProperty("--dropdown-border", "1px solid white")
      root.style.setProperty("--theme-btn", `url('assets/Light-theme-btn.svg')`);
      root.style.setProperty("--theme_toogle-background", 'none')
    } else {
      darkStatus.innerText = "Dark Mode: Off";
      root.style.setProperty("transition", "1s");
      root.style.setProperty("--body-image", `url('/assets/cork-borad2.jpg')`);
      root.style.setProperty(
        "--newTask-background",
        `url('assets/notepad7.jpg')`
      );
      root.style.setProperty(
        "--add-button-background",
        "linear-gradient(to right, #33a3ff, #0675cf, #4cd5ff)"
      );
      root.style.setProperty("--primary-color", "white");
      root.style.setProperty("--secondary-color", "#1E1E1E");
      root.style.setProperty("--dropdown-background-color", "white")
      root.style.setProperty("--dropdown-border", "none")
      root.style.setProperty("--input-border-bottom", "1px solid #999");
      root.style.setProperty("--theme_toogle-background", 'floralwhite')
      root.style.setProperty("--new_task-header", "#d96b6b");
      root.style.setProperty("--text-color", "black");
      root.style.setProperty("--placeholder-color", "black");
      root.style.setProperty("--theme-btn", `url('assets/Dark-theme-btn.svg')`);
    }
  });