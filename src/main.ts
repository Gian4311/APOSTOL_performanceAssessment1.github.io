import { CoordinateRef, CoordinateRefArray, MapImage } from "ts-utils";
import { PhilippineRegion } from "./PhilippineRegion";
import { Coordinates } from "./Coordinates";
import { Flag } from "./Flag";
import coordinateRefsData from "./philippineCoordinateRefs.json" assert { type: "json" };
import regionsData from "./philippineRegionsData.json" assert { type: "json" };
import $ from "jquery";

type coordinateRef = [ number, int ]
type coordinates = [ number, number ];

const philippineMap: MapImage = new MapImage( "assets/img/philippineMap.jpg", true, false );
const regions: PhilippineRegion[] = regionsData.philippineRegions.map( ( {
    id, name, alternateName, coordinates: [ x, y ], description, img
} ) => new PhilippineRegion( id, name, alternateName, new Coordinates( x, y ), description, img ) );

function addMouseInRemoveInfoBox( flag: JQuery< HTMLElement >, duration: int ) {

    $( `#filler` ).on( `mouseenter`, async function() {

        $( `#info, #filler` ).hide();
        addMouseOutZoomOut( flag, duration );
        $( this ).off( `mouseenter` );

    } );

}

function addMouseOutZoomOut( flag: JQuery< HTMLElement >, duration: int ) {

    flag.on( `mouseout`, async () => {

        await zoomOutMap( duration );

    } );

}

async function openInfoBox() {

    

}

async function loadFlags(): Promise< Flag[] > {

    const flags: Flag[] = regions.map( ( region, index ) => {

        const flag: Flag = new Flag( philippineMap, region );
        let [ x, y ] = flag.positions;
        const html = $( flag.html )
            .attr( `index`, index )
            .css( {
                top: `${ y / 4240 * 100 }%`,
                left: `${ x / 2965 * 100 }%`
            } )
            .on( {
                mouseenter: async () => {

                    await zoomInMap( x, y, 2, 750 );

                },
                click: async () => {

                    html.off( `mouseout` );
                    $( `#filler` ).show();
                    await zoomOutMap( 250 );
                    const
                        { name, alternateName, coordinates, description, img: src } = region,
                        img = new Image()
                    ;
                    img.src = src;
                    await img.decode();
                    $( `#regionImg img` ).remove();
                    $( `#regionImg` ).prepend( img );
                    $( `#info h1` ).text( `${ name }( ${ alternateName } )` );
                    $( `#info #coordinates` ).text( `${ coordinates.y }° N, ${ coordinates.x }° E` );
                    $( `#info #description` ).text( description );
                    $( `#info` ).css( `display`, `grid` );
                    $( html ).off( `mouseout` );
                    addMouseInRemoveInfoBox( html, 1000 );

                }
            } )
        ;
        addMouseOutZoomOut( html, 1500 );
        $( `#mapContainer` ).append( html );
        return flag;

    } );
    return flags;

}

async function loadMap(): Promise< MapImage > {

    (
        [
            [ philippineMap.coordinateRefsX, coordinateRefsData.x as coordinateRef[] ],
            [ philippineMap.coordinateRefsY, coordinateRefsData.y as coordinateRef[] ]
        ] as [ CoordinateRefArray, coordinateRef[] ][]
    ).forEach( ( [ coordinateRefs, coordinateRefsData ] ) =>
        coordinateRefs.addCoordinateRefs( ...coordinateRefsData.map(
            ( [ coordinate, pixel ] ) => new CoordinateRef( coordinate, pixel )
        ) )
    );
    $( philippineMap ).attr( "id", "map" );
    await philippineMap.decode();
    $( "#mapContainer" ).prepend( philippineMap );
    return philippineMap;

}

async function loadEvents(): Promise< void > {

    $( `#map` ).on( `mousemove`, event => {

        // console.log( event.pageX, event.pageY );

    } );

}

async function zoomInMap( x: int, y: int, scale: number, duration: int ) {

    document.getElementById( `mapContainer` )?.animate( [
        {
            width: `calc( 100% * ${ scale } )`,
            top: `calc( 50vh - 100vw * ${ y * scale } / 2965 + ${ window.scrollY }px )`,
            left: `calc( 50% - 100% * ${ x * scale } / 2965 )`
        }
    ], {
        fill: `forwards`,
        duration: duration
    } );
    await new Promise< void >( resolve => setTimeout( () => resolve(), duration ) );

}

async function zoomOutMap( duration: int ) {

    document.getElementById( `mapContainer` )?.animate( [
        {
            width: `100%`,
            top: 0,
            left: 0
        }
    ], {
        fill: `forwards`,
        duration: duration
    } );
    await new Promise< void >( resolve => setTimeout( () => resolve(), duration ) );

}

$( async () => {

    await loadMap();
    await loadEvents();
    await loadFlags();
    // await zoomMap( 0, 0, 1.5, 3000 );

} );
