import React from "react";
import { Link } from "react-router-dom";
import "../css/PageNotFound.css"

export default function PageNotFound() {
  return (
    <body className="img404">
      <div>
        <Link to="/home">
          <button className="home404">BACK TO HOME</button>
        </Link>
      </div>
    </body>
  );
}
