/* eslint-env browser */

const uiElements = {
    CANAVS : document.getElementById("brainstorming-canvas"),
    COPY_TO_CLIPBOARD : document.querySelector(".fa-copy"),
    // Canvas-Tools
    BTN_RECT : document.querySelector(".tool.square"),
    BTN_ARROW : document.querySelector(".tool.arrow"),
    BTN_TEXT: document.querySelector(".tool.text"),
    BTN_DRAW: document.querySelector(".tool.draw"),
    BTN_IMAGE : document.querySelector(".tool.image"),
    BTN_EXPORT : document.querySelector(".tool.export"),
    INPUT_COLORS : document.getElementsByName("color"),
    CONTEXTMENU : document.getElementById("contextmenu"),
    IMAGE_UPLOAD : document.getElementById("image-upload"),
    // Main-Menu
    MAIN_MENU_NAV_SETTINGS : document.querySelector(".nav_main_item.settings"),
    MAIN_MENU_NAV_LITERATURE : document.querySelector(".nav_main_item.literature"),
    MAIN_MENU_NAV_USERS : document.querySelector(".nav_main_item.users"),
    MAIN_MENU_NAV_CHAT : document.querySelector(".nav_main_item.chat"),
    MAIN_MENU_CONTENTBOX : document.querySelector(".nav_main_contentbox"),
    MAIN_MENU_SECTION_SETTINGS : document.querySelector(".menu_section.settings"),
    MAIN_MENU_SECTION_LITERATURE : document.querySelector(".menu_section.literature"),
    MAIN_MENU_SECTION_USERS : document.querySelector(".menu_section.users"),
    MAIN_MENU_SECTION_CHAT : document.querySelector(".menu_section.chat"),
    // Modal 
    MODAL_BACKGROUND : document.querySelector(".modal"),
    // Modalbox Start-Room
    MODAL_START_ROOM : document.querySelector(".modalbox start-room"),
    MODAL_FORM_USERNAME : document.getElementById("form-username"),
    MODAL_FORM_CREATEROOM : document.getElementById("form-create-room"),
    MODAL_START_USERNAME_INPUT : document.getElementById("input-set-username"),
    MODAL_START_BUTTON_CREATE_ROOM : document.querySelector(".button.create-room"),
    MODAL_START_BUTTON_ENTER_ROOM : document.querySelector(".button.enter-room"),
    MODAL_LINK_CREATE_ROOM : document.getElementById("link-create-room"),
    MODAL_LINK_ENTER_ROOM : document.getElementById("link-enter-room"),
    MODAL_INVITELINK : document.querySelector(".invite-link"),
};

export default uiElements;