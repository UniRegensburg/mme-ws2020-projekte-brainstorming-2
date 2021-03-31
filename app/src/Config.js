/* eslint-disable no-magic-numbers */
/* eslint-env browser */

const Config = {

    KEY_RIGHT_MOUSEBUTTON : 3,
    
    IMAGESCALE_IMPORT : 0.5,

    MAX_ZOOM : 20,
    MIN_ZOOM : 0.01,
    FACTOR_ZOOM_SPEED : 0.95,

    OBJECT_DEFAULT_WIDTH : 100,
    OBJECT_DEFAULT_HEIGHT : 100,
    OBJECT_DEFAULT_RADIUS : 100,
    OBJECT_DEFAULT_X : 200,
    OBJECT_DEFAULT_Y : 200,
    OBJECT_DEFAULT_LINE_COORDS: [250, 125, 250, 175 ],

    MAX_USER_COLORS: 8,

    MAX_FILESIZE_IMAGE : 51200,
    ALERT_MAX_FILESIZE: "The selected File is too Big, please select a file less than 50 kb",

    DEFAULT_CLIENT_URL : "http://localhost:8080/",
    DEAFULT_SERVER_URL : "http://localhost:8000",

};

export default Config;