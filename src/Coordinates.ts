export class Coordinates extends Array< number > implements ReadonlyArray< number > {

    public constructor( x: number, y: number ) {

        super( x, y );

    }

    public get x(): number {

        return this[ 0 ];

    }

    public get y(): number {

        return this[ 1 ];

    }

}
