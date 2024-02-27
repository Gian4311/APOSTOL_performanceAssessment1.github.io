import $ from "jquery";
import { MapImage } from "ts-utils";
import { PhilippineRegion } from "./PhilippineRegion";

export class Flag {


    public constructor(
        public readonly map: MapImage,
        public readonly region: PhilippineRegion
    ) {}

    public get html(): string {

        return `<div class="flag"></div>`;

    }
    
    public get positions(): [ int, int ] {

        const { map, region: { coordinates: [ x, y ] } } = this;
        return map.pixelsOfCoordinates( x, y, false );

    }
}
