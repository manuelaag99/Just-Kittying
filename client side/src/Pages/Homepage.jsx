import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div>
            <Link to="/NewPost">
                <h2>Heres the main site</h2>
            </Link>
        </div>
    )
}

export default Homepage
