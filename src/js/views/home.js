import React from "react";
// import "../../styles/home.css";
import { Character } from "../component/Character.jsx";
import { Planets } from "../component/Planets.jsx";
import { StarShips } from "../component/StarShips.jsx";
import { Vehicles } from "../component/Vehicles.jsx";

export const Home = () => (
    <div className="text-center mt-5">
        <div className="mt-4">
            <Character />
        </div>
        <div className="mt-5">
            <Planets />
        </div>
        <div className="mt-5">
            <Vehicles />
        </div>
        <div className="mt-5">
            <StarShips />
        </div>
    </div>
);
