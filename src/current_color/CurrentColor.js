import React, { Component } from "react";
import PropTypes from "prop-types";
import Hex from "./Hex";
import RGB from "./RGB";
import HSL from "./HSL";
import AdjustLuminance from "./AdjustLuminance";
import ColorPreview from "./ColorPreview";
import * as Utils from "../utils";
import ReactTooltip from "react-tooltip";

export default class extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
    };

    state = {
        hex: "#000000",
        isHexValid: true,
        red: 0,
        green: 0,
        blue: 0,
        hue: 0,
        sat: 0,
        lum: 0,
    };

    onHexChange = (e) => {
        const hex = e.target.value.toUpperCase();
        if (Utils.isValidHexColor(hex)) {
            this.setColor(hex, "hex");
        } else {
            this.setState({ hex: hex });
            this.setState({ isHexValid: false });
        }
    };

    onHexCopy = () => {
        Utils.copyToClipboard(this.state.hex);
    };

    onHexPaste = (hex) => {
        this.setColor(hex, "hex");
    };

    onRGBChange = (e) => {
        const val = Number(e.target.value);
        const name = e.target.name;
        this.setState({ [name]: val }, () => {
            const rgb = Utils.fixRGB([
                this.state.red,
                this.state.green,
                this.state.blue,
            ]);
            this.setColor(rgb, "rgb");
        });
    };

    onRGBCopy = () => {
        const rgb = `rgb(${this.state.red}, ${this.state.green}, ${
            this.state.blue
        })`;
        Utils.copyToClipboard(rgb);
    };

    onHSLChange = (e) => {
        const val = Number(e.target.value);
        const name = e.target.name;
        this.setState({ [name]: val }, () => {
            const hsl = Utils.fixHSL([
                this.state.hue,
                this.state.sat,
                this.state.lum,
            ]);
            this.setColor(hsl, "hsl");
        });
    };

    onHSLCopy = () => {
        const hsl = `hsl(${this.state.hue}, ${this.state.sat}%, ${
            this.state.lum
        }%)`;
        Utils.copyToClipboard(hsl);
    };

    onSave = () => {
        const newColor = {
            hex: this.state.hex,
            rgb: [this.state.red, this.state.green, this.state.blue],
        };
        this.props.onSave(newColor);
    };

    onRandom = () => {
        this.setColor(Utils.getRandomRGB(), "rgb");
    };

    adjustLum = (amount) => {
        amount = Number(amount);
        let lum = this.state.lum + amount;
        if (lum > 100) {
            lum = 100;
        } else if (lum < 0) {
            lum = 0;
        }
        this.setColor([this.state.hue, this.state.sat, lum], "hsl");
    };

    setColor(color, colorType) {
        let rgb, hex, hsl;
        switch (colorType) {
            case "hex":
                hex = color;
                rgb = Utils.hexToRGB(color);
                hsl = Utils.rgbToHSL(rgb);
                break;
            case "rgb":
                rgb = color;
                hex = Utils.rgbToHex(color);
                hsl = Utils.rgbToHSL(color);
                break;
            case "hsl":
                hsl = color;
                rgb = Utils.hslToRGB(color);
                hex = Utils.rgbToHex(rgb);
                break;
            default:
                break;
        }
        this.setState({ hex: hex });
        this.setState({ red: rgb[0] });
        this.setState({ green: rgb[1] });
        this.setState({ blue: rgb[2] });
        this.setState({ hue: hsl[0] });
        this.setState({ sat: hsl[1] });
        this.setState({ lum: hsl[2] });
        this.setState({ isHexValid: true });
        // Save the current color to local storage
        this.saveCurrentColorToStorage(hex);
    }

    saveCurrentColorToStorage(hex) {
        localStorage.setItem("currentColor", hex);
    }

    render() {
        return (
            <div className="card">
                <div className="card-title">Current Color</div>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ width: "290px" }}>
                        <Hex
                            hex={this.state.hex}
                            isHexValid={this.state.isHexValid}
                            onChange={this.onHexChange}
                            onCopy={this.onHexCopy}
                            onPaste={this.onHexPaste}
                        />
                        <RGB
                            red={this.state.red}
                            green={this.state.green}
                            blue={this.state.blue}
                            onChange={this.onRGBChange}
                            onCopy={this.onRGBCopy}
                        />
                        <HSL
                            hue={this.state.hue}
                            sat={this.state.sat}
                            lum={this.state.lum}
                            onChange={this.onHSLChange}
                            onCopy={this.onHSLCopy}
                        />
                        <ColorPreview
                            color={this.state.hex}
                            shouldUpdate={this.state.isHexValid}
                        />
                        <div className="center" style={{ margin: "0.75rem" }}>
                            {/* Save Button */}
                            <button
                                className="normal-btn"
                                style={{ padding: "0.4rem", fontSize: "1rem" }}
                                onClick={this.onSave}
                                data-tip="Save current color"
                            >
                                <i className="fas fa-save" /> Save
                            </button>
                        </div>
                    </div>
                    <div className="sidebar">
                        <AdjustLuminance
                            caption="DARKEN"
                            buttonCaptions={["5%", "10%", "25%"]}
                            buttonAmounts={[-5, -10, -25]}
                            buttonTooltips={[
                                "Darken current color by 5%",
                                "Darken current color by 10%",
                                "Darken current color by 25%",
                            ]}
                            onClick={this.adjustLum}
                        />
                        <hr />
                        <AdjustLuminance
                            caption="LIGHTEN"
                            buttonCaptions={["5%", "10%", "25%"]}
                            buttonAmounts={[5, 10, 25]}
                            buttonTooltips={[
                                "Lighten current color by 5%",
                                "Lighten current color by 10%",
                                "Lighten current color by 25%",
                            ]}
                            onClick={this.adjustLum}
                        />
                        <hr />
                        {/* Random Button */}
                        <div
                            className="center"
                            style={{ padding: "0.75rem 0.1rem" }}
                            data-tip="Generate a random color"
                        >
                            <button
                                className="normal-btn"
                                // style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                                onClick={this.onRandom}
                            >
                                Random
                            </button>
                        </div>
                    </div>
                </div>
                <ReactTooltip effect="solid" />
            </div>
        );
    }
}
