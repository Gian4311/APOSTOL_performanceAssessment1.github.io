import { Coordinates } from "./Coordinates";

export class PhilippineRegion {

    public constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly alternateName: string,
        public readonly coordinates: Coordinates,
        public readonly description: string,
        public readonly img: string,
    ) {}

}
