import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        /* Colors */
        --color-blue: #0D6EFD;
        --color-orange: #FD7E14;
        --color-yellow: #FFC107;
        --color-green: #1AA179;
        --color-green-darker: #146C43;
        --color-red: #DC3545;
        --color-red-darker: #B02A37;
        --color-black: #152536;
        --color-gray: #ADB5BD;
        
        /* Pixels */
        --px-xxxl: 36px;
        --px-xxl: 32px;
        --px-xl: 24px;
        --px-l: 20px;
        --px-m: 16px;
        --px-s: 12px;
        --px-xs: 10px;
        --px-xxs: 8px;
        --px-xxxs: 6px;

        /* Others */
        scroll-behavior: smooth;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }
    
    .shadow {
        box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32), 0px 3px 5px rgba(176, 190, 197, 0.32);
    }
    
    a {
        text-decoration: none;
    }
    
    .mobility-marker-pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        z-index: -10;
        background: #c30b82;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -15px 0 0 -15px;
    }

    /* to draw white circle */
    .mobility-marker-pin::after {
        content: "";
        width: 24px;
        height: 24px;
        margin: 3px 0 0 3px;
        background: #fff;
        position: absolute;
        border-radius: 50%;
    }

    .mobility-marker-text {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 31%;
    }

    .tracing-marker-pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        z-index: -10;
        background: #c30b82;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -15px 0 0 -15px;
    }

    /* to draw white circle */
    .tracing-marker-pin::after {
        content: "";
        width: 24px;
        height: 24px;
        margin: 3px 0 0 3px;
        background: #fff;
        position: absolute;
        border-radius: 50%;
    }

    .tracing-marker-text {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 31%;
    }

    .tracing-surrounding-pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        z-index: -10;
        background: #c30b82;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -15px 0 0 -15px;
    }

    .default-header {
        color: var(--color-blue) !important; 
        font-weight: 800 !important; 
        font-size: 1.2em !important; 
        margin-bottom: 2em !important;
    }

    #root {
        overflow: scroll !important;
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
    }

    #root::-webkit-scrollbar {
        display: none !important;
    }

    .leaflet-bottom, .leaflet-right {
        position: absolute !important;
        bottom: calc(18vh + 200px) !important;
        right: var(--px-l) !important;
    }

`;

export default GlobalStyle;
