/* eslint-env browser */

const uiElements = {
    CANAVS : document.getElementById("brainstorming-canvas"),
    // Canvas-Tools
    BTN_RECT : document.querySelector(".tool.square"),
    BTN_CIRCLE : document.querySelector(".tool.circle"),
    BTN_ARROW : document.querySelector(".tool.arrow"),
    BTN_NOTE : document.querySelector(".tool.note"),
    BTN_TEXT: document.querySelector(".tool.text"),
    BTN_DRAW: document.querySelector(".tool.draw"),
    BTN_IMAGE : document.querySelector(".tool.image"),
    BTN_EXPORT : document.querySelector(".tool.export"),
    INPUT_STROKE : document.querySelector(".tooltip-slider"),
    INPUT_COLORS : document.getElementsByName("color"),
    CONTEXTMENU : document.getElementById("contextmenu"),
    IMAGE_UPLOAD : document.getElementById("image-upload"),
    TOOLTIP_DRAW : document.querySelector(".tooltip.draw"),
    TOOL_WITH_TOOLTIP : document.querySelector(".tool-with-tooltip"),
    STROKE_THICKNESS_VALUE : document.getElementById("thickness-value"),
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
    BTN_ADD_LITERATURE : document.getElementById("button-add-literature"),
    BTN_EXPORT_LITERATURE : document.getElementById("button-export-literature"),
    UL_LITERATURE_LIST : document.querySelector(".literature-list"),
    //Settings
    SETTINGS_INPUT_ROOMNAME : document.getElementById("rename-room"),
    SETTINGS_INPUT_USERNAME : document.getElementById("rename-username"),
    SETTINGS_BTN_DELETE_ROOM : document.querySelector(".button.delete-room"),
    SETTINGS_INVITELINK : document.querySelector(".settings.invite-link"),
    SETTINGS_COPY_TO_CLIPBOARD : document.getElementById("copy-link-settings"),
    //Users
    UL_USERLIST : document.querySelector(".user-list"),
    // Chat
    UL_MESSAGE_HISTORY : document.querySelector(".message-history"),
    INPUT_MESSAGE : document.getElementById("message-input"),
    BTN_SEND_MESSAGE : document.getElementById("send-message"),
    // Modal 
    MODAL_BACKGROUND : document.querySelector(".modal"),
    // Modalbox Start-Room
    MODAL_START_ROOM : document.querySelector(".modalbox.start-room"),
    MODAl_FORM_START_HOME : document.getElementById("form-start-home"),
    MODAL_FORM_USERNAME : document.getElementById("form-username"),
    MODAL_FORM_CREATEROOM : document.getElementById("form-create-room"),
    MODAL_FORM_JOINING_FAILED : document.getElementById("form-joining-failed"),
    MODAL_START_USERNAME_INPUT : document.getElementById("input-set-username"),
    MODAL_START_BUTTON_CREATE_ROOM : document.querySelector(".button.create-room"),
    MODAL_START_BUTTON_ENTER_ROOM : document.querySelector(".button.enter-room"),
    MODAL_LINK_CREATE_ROOM : document.querySelectorAll(".link-create-room"),
    MODAL_LINK_ENTER_ROOM : document.getElementById("link-enter-room"),
    MODAL_INVITELINK : document.querySelector(".modalbox.invite-link"),
    MODAL_COPY_TO_CLIPBOARD : document.getElementById("copy-link-modal"),
    // Modalbox Add-literature
    MODAL_ADD_LITERATURE : document.querySelector(".modalbox.add-literature"),
    MODAL_FORM_LITERATURE : document.getElementById("form-literature"),
    MODAL_LITERATURE_CLOSE : document.getElementById("close-literature"),
    MODAL_LITERATURE_TITLE_INPUT : document.getElementById("input-set-title"),
    MODAL_LITERATURE_AUTHOR_INPUT : document.getElementById("input-set-author"),
    MODAL_LITERATURE_YEAR_INPUT : document.getElementById("input-set-year"),
    MODAL_LITERATURE_URL_INPUT : document.getElementById("input-set-url"),
    MODAL_LITERATURE_PAGES_INPUT : document.getElementById("input-set-pages"),
    MODAL_LITERATURE_BUTTON_ADD_ENTRY : document.querySelector(".button.add-entry"),
    // Templates
    TEMPLATE_MESSAGE : document.getElementById("message-template"),
    TEMPLATE_LITERATURE : document.getElementById("literature-template"),
    TEMPALTE_USER : document.getElementById("user-template"),
};

export default uiElements;