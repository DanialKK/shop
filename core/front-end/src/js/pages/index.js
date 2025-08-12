import {scrollBoxHandler} from "@/js/component/scroll-box/scroll-box.js"
import {openFAQ} from "@/js/component/open-faq/open-faq.js";

export function init () {
    const childrenTeam = document.querySelectorAll("[data-scroll-box-wrapper-team] > div")
    const btnTeam = document.querySelectorAll("[data-scroll-btn-team]");
    const childrenFeature = document.querySelectorAll("[data-scroll-box-wrapper-feature] > div")
    const btnFeature = document.querySelectorAll("[data-scroll-btn-feature]");
    const childrenClients = document.querySelectorAll("[data-scroll-box-wrapper-clients] > div");
    const btnClients = document.querySelectorAll("[data-scroll-btn-clients]");

// scroll box
    scrollBoxHandler(childrenTeam, btnTeam, "team");
    scrollBoxHandler(childrenFeature, btnFeature, "feature");
    scrollBoxHandler(childrenClients, btnClients, "clients");

// toggle FAQ
    openFAQ();
}