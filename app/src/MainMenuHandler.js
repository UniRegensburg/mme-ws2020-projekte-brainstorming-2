/* eslint-env browser */

import uiElements from "./uiElements.js";

class MainMenuHandler {

    setListener(){
        this.setNavListeners();
        this.selectedNavItem = uiElements.MAIN_MENU_NAV_SETTINGS;
    }

    setNavListeners(){
        uiElements.MAIN_MENU_NAV_SETTINGS.addEventListener("click", () => {
            this.selectedNavItem.classList.remove("selected_nav");
            this.selectedNavItem = uiElements.MAIN_MENU_NAV_SETTINGS;
            this.selectedNavItem.classList.add("selected_nav");
            uiElements.MAIN_MENU_SECTION_CHAT.style = "display: none";
            uiElements.MAIN_MENU_SECTION_USERS.style = "display: none";
            uiElements.MAIN_MENU_SECTION_LITERATURE.style = "display: none";
            uiElements.MAIN_MENU_SECTION_SETTINGS.style = "display: flex";
        });
        uiElements.MAIN_MENU_NAV_LITERATURE.addEventListener("click", () => {
            this.selectedNavItem.classList.remove("selected_nav");
            this.selectedNavItem = uiElements.MAIN_MENU_NAV_LITERATURE;
            this.selectedNavItem.classList.add("selected_nav");
            uiElements.MAIN_MENU_SECTION_CHAT.style = "display: none";
            uiElements.MAIN_MENU_SECTION_USERS.style = "display: none";
            uiElements.MAIN_MENU_SECTION_LITERATURE.style = "display: flex";
            uiElements.MAIN_MENU_SECTION_SETTINGS.style = "display: none";
        });
        uiElements.MAIN_MENU_NAV_USERS.addEventListener("click", () => {
            this.selectedNavItem.classList.remove("selected_nav");
            this.selectedNavItem = uiElements.MAIN_MENU_NAV_USERS;
            this.selectedNavItem.classList.add("selected_nav");
            uiElements.MAIN_MENU_SECTION_CHAT.style = "display: none";
            uiElements.MAIN_MENU_SECTION_USERS.style = "display: flex";
            uiElements.MAIN_MENU_SECTION_LITERATURE.style = "display: none";
            uiElements.MAIN_MENU_SECTION_SETTINGS.style = "display: none";
        });
        uiElements.MAIN_MENU_NAV_CHAT.addEventListener("click", () => {
            this.selectedNavItem.classList.remove("selected_nav");
            this.selectedNavItem = uiElements.MAIN_MENU_NAV_CHAT;
            this.selectedNavItem.classList.add("selected_nav");
            uiElements.MAIN_MENU_SECTION_CHAT.style = "display: flex";
            uiElements.MAIN_MENU_SECTION_USERS.style = "display: none";
            uiElements.MAIN_MENU_SECTION_LITERATURE.style = "display: none";
            uiElements.MAIN_MENU_SECTION_SETTINGS.style = "display: none";
        });
    }

}

export default MainMenuHandler;