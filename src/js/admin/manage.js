import "@/css/style.css"
import {themeControl} from "@/js/component/header/header.js";

const root = document.documentElement
const adminForm = document.getElementById("admin-form")
const themeWrapper = document.getElementById("theme")

// toggle theme
themeControl.setTheme(themeWrapper, root);
themeWrapper.addEventListener("click", themeControl.changeThemeHandler.bind(null, root));
