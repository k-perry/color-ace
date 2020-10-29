import React, { Component } from "react";
import PropTypes from "prop-types";
import Tabs from "./Tabs";
import CSSColorsController from "./CSSColorsController";
import ColorPalette from "./ColorPalette";

export default class ColorSelector extends Component {
    static propTypes = {
        setColor: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className="card">
                <div className="card-title">Colors</div>
                <Tabs>
                    <div label="CSS Colors">
                        <div style={{ display: "flex" }}>
                            <CSSColorsController
                                setColor={this.props.setColor}
                            />
                        </div>
                    </div>
                    <div label="Custom Color">
                        <ColorPalette setColor={this.props.setColor} />
                    </div>
                </Tabs>
            </div>
        );
    }
}
