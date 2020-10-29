// Reference:  https://stackoverflow.com/a/8027444
export function isValidHexColor(str) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(str);
}

// Returns 3-element array with red, green, and blue values for provided hex string
export function hexToRGB(hexString) {
    let redStr, greenStr, blueStr, redVal, greenVal, blueVal;
    // Remove the leading #, if necessary
    if (hexString[0] === "#") {
        hexString = hexString.substring(1);
    }
    if (hexString.length === 3) {
        // Special handling for shorthand hex values with 3 digits
        redStr = hexString.substring(0, 1);
        redStr += redStr;
        greenStr = hexString.substring(1, 2);
        greenStr += greenStr;
        blueStr = hexString.substring(2, 3);
        blueStr += blueStr;
    } else {
        redStr = hexString.substring(0, 2);
        greenStr = hexString.substring(2, 4);
        blueStr = hexString.substring(4, 6);
    }
    if (redStr === "") {
        redStr = "0";
    }
    if (greenStr === "") {
        greenStr = "0";
    }
    if (blueStr === "") {
        blueStr = "0";
    }
    redVal = parseInt(redStr, 16);
    greenVal = parseInt(greenStr, 16);
    blueVal = parseInt(blueStr, 16);
    return [redVal, greenVal, blueVal];
}

// Returns a hex string that corresponds to provided red, green, and blue values
export function rgbToHex(rgb) {
    let redHex = rgb[0].toString(16).toUpperCase();
    if (redHex.length === 1) {
        redHex = "0" + redHex;
    }
    let greenHex = rgb[1].toString(16).toUpperCase();
    if (greenHex.length === 1) {
        greenHex = "0" + greenHex;
    }
    let blueHex = rgb[2].toString(16).toUpperCase();
    if (blueHex.length === 1) {
        blueHex = "0" + blueHex;
    }
    return "#" + redHex + greenHex + blueHex;
}

// Converts an RGB color to HSL
export function rgbToHSL(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                return null;
        }
        h /= 6;
    }
    // HSL ranges for web:
    // Hue = 0 - 360 (degrees)
    // Saturation = 0 - 100 (percent)
    // Luminance = 0 - 100 (percent)
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Converts an HSL color value to RGB.
export function hslToRGB(hsl) {
    let h = hsl[0] / 360;
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Fixes any problems in RGB values.  Values < 0 are set to 0.  Values > 255 are set to 255.
// Returns an array: [red, green, blue]
export function fixRGB(rgb) {
    for (let i = 0; i < rgb.length; i++) {
        if (rgb[i] > 255) {
            rgb[i] = 255;
        } else if (rgb[i] < 0) {
            rgb[i] = 0;
        }
    }
    return rgb;
}

// Returns an array:  [hue, sat, lum]
export function fixHSL(hsl) {
    if (hsl[0] > 360) {
        hsl[0] = 360;
    } else if (hsl[0] < 0) {
        hsl[0] = 0;
    }
    if (hsl[1] > 100) {
        hsl[1] = 100;
    } else if (hsl[1] < 0) {
        hsl[1] = 0;
    }
    if (hsl[2] > 100) {
        hsl[2] = 100;
    } else if (hsl[2] < 0) {
        hsl[2] = 0;
    }
    return hsl;
}

// SOURCE:  https://stackoverflow.com/a/33928558
// Copies a string to the clipboard
export function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
    } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
    ) {
        let textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export function getRandomRGB() {
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
    ];
}
