import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SavedColors extends Component {
    static propTypes = {
        colors: PropTypes.array.isRequired,
        onDelete: PropTypes.func.isRequired,
        setColor: PropTypes.func.isRequired,
    };

    onDelete = (e) => {
        let tr = e.target.parentNode.parentNode;
        if (tr.nodeName.toLowerCase() !== "tr") {
            tr = tr.parentNode;
        }
        const rowIndex = tr.rowIndex - 1;
        this.props.onDelete(rowIndex);
        e.stopPropagation();
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

    mapRow = (color, index) => {
        return (
            <tr key={index} onClick={this.onClick}>
                <td
                    style={{ backgroundColor: color.hex }}
                    data-tip="Color Preview"
                />
                <td className="hex">{color.hex}</td>
                <td>
                    rgb({color.rgb[0]},{color.rgb[1]},{color.rgb[2]})
                </td>
                <td style={{ textAlign: "right" }}>
                    <button className="small-btn" onClick={this.onDelete}>
                        <i className="fas fa-trash" />
                    </button>
                </td>
            </tr>
        );
    };

    render() {
        return (
            <div className="card">
                <div className="card-title">Saved Colors</div>
                <div
                    style={{
                        maxHeight: "calc(100vh - 490px)",
                        overflow: "auto",
                    }}
                >
                    <table
                        className="colors-table"
                        style={{ width: "100%", height: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Hex</th>
                                <th>RGB</th>
                                <th style={{ textAlign: "right" }}>
                                    <i className="fas fa-trash" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="monospace">
                            {this.props.colors !== undefined ? (
                                <React.Fragment>
                                    {this.props.colors.map(this.mapRow)}
                                </React.Fragment>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
