import React from "react";
import "./styling/noMatch.css";

function NoMatch() {
  return (
    <div id="noMatch-page">
        <h1 className="text-center">404 Page Not Found</h1>
        <h1 className="text-center">
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
            </span>
        </h1>
    </div>
  );
}

export default NoMatch;
