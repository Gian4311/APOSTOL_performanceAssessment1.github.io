import { CoordinateRef, CoordinateRefArray, MapImage } from "ts-utils";
import { PhilippineRegion } from "./PhilippineRegion";
import { Coordinates } from "./Coordinates";
import coordinateRefsData from "./philippineCoordinateRefs.json" assert { type: "json" };
import regionsData from "./philippineRegionsData.json" assert { type: "json" };

type coordinateRefData = [ number, int ];

export class PhilippineMap extends MapImage {

    public constructor() {

        super( "assets/img/philippineMap.jpg", true, false );
        (
            [
                [ this.coordinateRefsX, coordinateRefsData.x as coordinateRefData[] ],
                [ this.coordinateRefsY, coordinateRefsData.y as coordinateRefData[] ]
            ] as [ CoordinateRefArray, coordinateRefData[] ][]
        ).forEach( ( [ coordinateRefs, coordinateRefsData ] ) =>
            coordinateRefs.addCoordinateRefs( ...coordinateRefsData.map(
                ( [ coordinate, pixel ] ) => new CoordinateRef( coordinate, pixel )
            ) )
        );
        $( this ).attr( `id`, `map` );

    }

    public async load(): Promise< this > {

        await this.decode();
        $( `#mapContainer` ).prepend( this );
        return this;

    }

}
