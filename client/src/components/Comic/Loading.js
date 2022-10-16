import React from "react"
import "./Loading.css"
import loadingGif from "./loadingGif.gif"

const Loading = (props) => {
    return (
        <div className="loading-container">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img alt="" src={loadingGif} width={200} height={200}/>
                <p className="loading-text">Loading initial sequence...</p>
            </div>
        </div>
    )
}

export default Loading