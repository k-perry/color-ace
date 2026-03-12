import React, { Component } from "react";
import PropTypes from "prop-types";
import { copyToClipboard } from "../utils";
import { Tooltip } from "react-tooltip";

export default class CSSColorsTable extends Component {
    static propTypes = {
        setColor: PropTypes.func.isRequired,
        colors: PropTypes.array.isRequired,
        onSort: PropTypes.func.isRequired,
    };

    state = {
        sortNameDir: -1,
        sortHexDir: -1,
        sortRGBDir: -1,
    };

    onClick = (e) => {
        const hexCell = e.target.parentNode.querySelector(".hex");
        if (hexCell !== null) {
            const hex = hexCell.innerText.trim();
            if (hex !== "") {
                this.props.setColor(hex, "hex");
            }
        }
    };

    onCopy = (e) => {
        let td = e.target.parentNode;
        if (td.nodeName.toLowerCase() !== "td") {
            td = td.parentNode;
        }
        const text = td.innerText.trim();
        copyToClipboard(text);
        e.stopPropagation();
    };

    onSortName = () => {
        this.props.onSort("name", this.state.sortNameDir);
        this.setState({ sortNameDir: -this.state.sortNameDir });
    };

    onSortHex = () => {
        this.props.onSort("hex", this.state.sortHexDir);
        this.setState({ sortHexDir: -this.state.sortHexDir });
    };

    onSortRGB = () => {
        this.props.onSort("rgb", this.state.sortRGBDir);
        this.setState({ sortRGBDir: -this.state.sortRGBDir });
    };

    mapColorsToRows = (color, index) => {
        return (
            <tr key={index} onClick={this.onClick}>
                <td>
                    {color.name}
                    <button
                        className="small-btn"
                        onClick={this.onCopy}
                        data-tip="Copy to clipboard"
                    >
                        <i className="fas fa-copy" />
                    </button>
                </td>
                <td style={{ backgroundColor: color.hex }} />
                <td className="hex">
                    {color.hex}
                    <button
                        className="small-btn"
                        onClick={this.onCopy}
                        data-tip="Copy to clipboard"
                    >
                        <i className="fas fa-copy" />
                    </button>
                </td>
                <td>
                    {color.rgb}
                    <button
                        className="small-btn"
                        onClick={this.onCopy}
                        data-tip="Copy to clipboard"
                    >
                        <i className="fas fa-copy" />
                    </button>
                </td>
            </tr>
        );
    };

    render() {
        const { colors } = this.props;
        return (
            <div
                style={{
                    overflow: "auto",
                    maxHeight: "calc(100vh - 8rem)",
                    width: "600px",
                }}
            >
                <table className="colors-table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th onClick={this.onSortName}>
                                CSS Color Name <i className="fas fa-sort" />
                            </th>
                            <th>Preview</th>
                            <th onClick={this.onSortHex}>
                                Hex <i className="fas fa-sort" />
                            </th>
                            <th onClick={this.onSortRGB}>
                                RGB <i className="fas fa-sort" />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="monospace">
                        {
                            <React.Fragment>
                                {colors.map(this.mapColorsToRows)}
                            </React.Fragment>
                        }
                    </tbody>
                </table>
                <Tooltip effect="solid" />
            </div>
        );
    }
}
