import React, { Component } from "react";
import "./App.css";
import CurrentColor from "./current_color/CurrentColor";
import SavedColors from "./saved_colors/SavedColors";
import ColorSelector from "./color_selector/ColorSelector";

class App extends Component {
    state = {
        savedColors: [],
    };

    componentDidMount() {
        // Restore current color and saved colors from local storage
        this.loadCurrentColorFromStorage();
        this.loadSavedColorsFromStorage();
    }

    // Returns the hex value of the last current color from localStorage, if it exists.
    loadCurrentColorFromStorage() {
        let currColor = localStorage.getItem("currentColor");
        if (currColor === null) {
            currColor = "#000000";
        }
        this.setColor(currColor, "hex");
    }

    loadSavedColorsFromStorage() {
        const savedColors = JSON.parse(localStorage.getItem("savedColors"));
        if (savedColors !== null) {
            this.setState({ savedColors: savedColors });
        }
    }

    // Wrapper around CurrentColor.setColor()
    setColor = (color, type) => {
        this.currentColor.setColor(color, type);
    };

    onSaveColor = (color) => {
        this.setState(
            { savedColors: [...this.state.savedColors, color] },
            () => {
                localStorage.setItem(
                    "savedColors",
                    JSON.stringify(this.state.savedColors)
                );
            }
        );
    };

    onDeleteColor = (rowIndex) => {
        const savedColorsCopy = [...this.state.savedColors]; // Copy array
        savedColorsCopy.splice(rowIndex, 1); // Delete item
        // Update state and use the callback to delte the item from local storage
        this.setState({ savedColors: savedColorsCopy }, () => {
            localStorage.setItem(
                "savedColors",
                JSON.stringify(this.state.savedColors)
            );
        });
    };

    render() {
        return (
            <div className="App">
                {/* Left column */}
                <div
                    style={{
                        float: "left",
                        width: "fit-content",
                        padding: "1rem",
                    }}
                >
                    <CurrentColor
                        ref={(child) => (this.currentColor = child)}
                        onSave={this.onSaveColor}
                    />
                    <br />
                    <SavedColors
                        colors={this.state.savedColors}
                        onDelete={this.onDeleteColor}
                        setColor={this.setColor}
                    />
                </div>
                {/* Right column */}
                <div
                    style={{
                        float: "left",
                        minWidth: "570px",
                        padding: "1rem",
                    }}
                >
                    <ColorSelector setColor={this.setColor} />
                </div>
            </div>
        );
    }
}

export default App;
