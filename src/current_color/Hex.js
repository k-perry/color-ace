import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { isValidHexColor } from "../utils";

export default class Hex extends Component {
    static propTypes = {
        hex: PropTypes.string.isRequired,
        isHexValid: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        onCopy: PropTypes.func.isRequired,
        onPaste: PropTypes.func.isRequired,
    };

    state = {
        pasteDisabled: true,
        clipboardText: null,
    };

    componentDidMount() {
        setInterval(this.clipboardMonitor, 300);
    }

    clipboardMonitor = () => {
        if (navigator.clipboard) {
            navigator.clipboard
                .readText()
                .then((clipText) => {
                    if (isValidHexColor(clipText)) {
                        this.setState({
                            pasteDisabled: false,
                            clipboardText: clipText,
                        });
                    } else {
                        this.setState({
                            pasteDisabled: true,
                            clipboardText: null,
                        });
                    }
                })
                .catch((err) => {
                    // Unable to read clipboard when browser doesn't have focus
                    // this.setState({ pasteDisabled: true, clipboardText: null });
                });
        }
    };

    render() {
        return (
            <div style={{ margin: "0.5rem 0.5rem 0 0.5rem" }}>
                <b>Hex:&nbsp;</b>
                <input
                    className="monospace"
                    type="text"
                    name="hex"
                    maxLength="7"
                    value={this.props.hex}
                    onChange={this.props.onChange}
                    style={{
                        width: "75px",
                        margin: "0 0.1rem",
                        backgroundColor: this.props.isHexValid
                            ? "white"
                            : "#FF8080",
                    }}
                />
                {this.props.isHexValid ? (
                    <i
                        className="fas fa-check-circle"
                        style={{ color: "limegreen" }}
                    />
                ) : (
                    <i
                        className="fas fa-times-circle"
                        style={{ color: "red" }}
                    />
                )}

                <button
                    className="normal-btn"
                    onClick={this.props.onCopy}
                    data-tip={"Copy '" + this.props.hex + "' to clipboard"}
                >
                    <i className="fas fa-copy" />
                </button>
                <button
                    className="normal-btn"
                    onClick={() => this.props.onPaste(this.state.clipboardText)}
                    disabled={this.state.pasteDisabled}
                    data-tip={
                        "Paste '" +
                        this.state.clipboardText +
                        "' from clipboard"
                    }
                >
                    <i className="fas fa-arrow-left" />
                    &nbsp;
                    <span className="monospace" style={{ fontSize: "0.8rem" }}>
                        {this.state.clipboardText}
                    </span>
                </button>
                <ReactTooltip effect="solid" />
            </div>
        );
    }
}
