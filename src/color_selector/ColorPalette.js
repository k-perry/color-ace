import React, { Component } from "react";
import PropTypes from "prop-types";
import { rgbToHex } from "../utils";

export default class ColorPalette extends Component {
    static propTypes = {
        setColor: PropTypes.func.isRequired,
    };

    state = {
        canvas: null,
        ctx: null,
        currentHex: null,
        currentRGB: null,
    };

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.setState({ canvas: canvas });
        this.setState({ ctx: ctx });
        this.resizeColorPalette(canvas);
        this.drawColorPalette(canvas, ctx);
    }

    resizeColorPalette(canvas) {
        canvas.width = canvas.parentNode.offsetWidth;
        canvas.height = canvas.parentNode.offsetHeight;
    }

    drawColorPalette(canvas, ctx) {
        // Create color gradient
        const colorGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        colorGradient.addColorStop(0, "rgb(255, 0, 0)");
        colorGradient.addColorStop(0.167, "rgb(255, 0, 255)");
        colorGradient.addColorStop(0.333, "rgb(0, 0, 255)");
        colorGradient.addColorStop(0.5, "rgb(0, 255, 255)");
        colorGradient.addColorStop(0.667, "rgb(0, 255, 0)");
        colorGradient.addColorStop(0.833, "rgb(255, 255, 0)");
        colorGradient.addColorStop(1, "rgb(255, 0, 0)");
        // Apply color gradient to canvas
        ctx.fillStyle = colorGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create semi-transparent gradient (white -> trans. -> black)
        const transGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        transGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        transGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        transGradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        transGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        // Apply gradient to canvas
        ctx.fillStyle = transGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Takes a mouse event and returns RGB color array of the underlying pixel
    getPixelColor(e) {
        const bounds = e.target.getBoundingClientRect();
        const x = Math.round(e.clientX - bounds.left);
        const y = Math.round(e.clientY - bounds.top);
        const pixelData = this.state.ctx.getImageData(x, y, 1, 1).data;
        return [pixelData[0], pixelData[1], pixelData[2]];
    }

    onCanvasMouseMove = (event) => {
        const rgb = this.getPixelColor(event);
        this.setState({ currentRGB: rgb });
        const hex = rgbToHex(rgb);
        this.setState({ currentHex: hex });
    };

    onCanvasMouseLeave = (event) => {
        this.setState({ currentHex: null });
        this.setState({ currentRGB: null });
    };

    onCanvasClick = (event) => {
        // Only change color on left click.
        // Left click type is 'click'.  Right click type is 'contextmenu'.
        if (event.type === "click") {
            const rgb = this.getPixelColor(event);
            this.props.setColor(rgb, "rgb");
        }
    };

    render() {
        return (
            <div>
                <div style={{ width: "100%", height: "400px" }}>
                    <canvas
                        ref="canvas"
                        style={{ cursor: "crosshair" }}
                        onMouseMove={this.onCanvasMouseMove}
                        onMouseLeave={this.onCanvasMouseLeave}
                        onClick={this.onCanvasClick}
                    />
                </div>
                <div style={{ height: "2.5rem" }}>
                    <table
                        className="center monospace"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tbody>
                            <tr style={{ border: "0", cursor: "default" }}>
                                <td
                                    style={{
                                        backgroundColor: this.state.currentHex,
                                        width: "25%",
                                    }}
                                />
                                <td style={{ width: "32%" }}>
                                    {this.state.currentHex
                                        ? this.state.currentHex
                                        : null}
                                </td>
                                <td style={{ width: "43%" }}>
                                    {this.state.currentRGB ? (
                                        <React.Fragment>
                                            rgb({this.state.currentRGB[0]},
                                            {this.state.currentRGB[1]},
                                            {this.state.currentRGB[2]})
                                        </React.Fragment>
                                    ) : null}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
