import React from 'react';
import { Character } from '../component/Character.jsx';
import { Planets } from '../component/Planets.jsx';
import { Starships} from '../component/Starships.jsx';
import { Vehicles } from '../component/Vehicles.jsx';

export const Home = ({ onFavoriteToggle, favorites }) => (
    <div className="text-center mt-5">
        <div className="mt-4">
            <Character onFavoriteToggle={onFavoriteToggle} favorites={favorites} />
        </div>
        <div className="mt-5">
            <Planets />
        </div>
        <div className="mt-5">
            <Vehicles />
        </div>
        <div className="mt-5">
            <Starships />
        </div>
    </div>
);
