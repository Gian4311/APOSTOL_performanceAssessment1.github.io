import $ from "jquery"
import { ArrayUtils, CoordinateRef, NumberUtils, MapImage, CoordinateRefArray } from "ts-utils";
import { PhilippineRegion } from "./PhilippineRegion";
import { Coordinates } from "./Coordinates";
// import { Knife } from "./Flag";
import coordinateRefsData from "./philippineCoordinateRefs.json" assert { type: "json" };
import regionsData from "./philippineRegionsData.json" assert { type: "json" };

type coordinateRef = [ number, int ]
type coordinates = [ number, number ];
type slideData = {
    title: string,
    coordinates: coordinates,
    description?: string,
    img?: string
};

async function loadMap(): Promise< MapImage > {

    const map: MapImage = new MapImage( "assets/img/philippineMap.jpg", true, false );
    (
        [
            [ map.coordinateRefsX, coordinateRefsData.x as coordinateRef[] ],
            [ map.coordinateRefsY, coordinateRefsData.y as coordinateRef[] ]
        ] as [ CoordinateRefArray, coordinateRef[] ][]
    ).forEach( ( [ coordinateRefs, coordinateRefsData ] ) =>
        coordinateRefs.addCoordinateRefs( ...coordinateRefsData.map(
            ( [ coordinate, pixel ] ) => new CoordinateRef( coordinate, pixel )
        ) )
    );
    $( map ).attr( "id", "map" );
    await map.decode();
    $( "#mapContainer" ).prepend( map );
    return map;

}

function getRegions(): PhilippineRegion[] {

    return regionsData.philippineRegions.map( ( {
        id, name, alternateName, coordinates: [ x, y ], description, img
    } ) => new PhilippineRegion( id, name, alternateName, new Coordinates( x, y ), description, img ) );    

}

// async function loadKnives( map: MapImage, regions: PhilippineRegion[] ): Promise< Knife[] > {

//     const knives: Knife[] = regions.map( ( region, index ) => {

//         const knife: Knife = new Knife( map, region );
//         $( `#mapContainer` ).append( knife.html );
//         const
//             element: JQuery< HTMLElement > = $( `.knife#${ knife.region.id }` ),
//             [ x, y ] = knife.positions
//         ;
//         element
//             .attr( `index`, index )
//             .css( { top: y, left: x } )
//         ;
//         return knife;

//     } );
//     $( `.knife` ).on( {
//         mouseenter: async function( event ) {

//             console.log( $( this ).index() )
//             knives[ $( this ).index() ].animate( "enter", event );

//         },
//         mouseleave: async function( event ) {

//             knives[ $( this ).index() ].animate( "leave", event );

//         }
//     } );
//     return knives;

// }

// async function loadModals( knives: Knife[] ) {

//     $( `.modal` ).on( {
//         mouseenter: async function( event ) {

//             // knives[ $( this ).index() ].animate( "enter", event );

//         },
//         mouseleave: async function( event ) {

//             // knives[ $( this ).index() ].animate( "leave", event );

//         }
//     } );

// }

function getSlidesData(): slideData[] {

    return [];

}

function getOffset( slidesData: slideData[], index: index ) {

    return ( index / ( slidesData.length + 1 ) );

}

function getKeyframesMapContainer( map: MapImage, slidesData: slideData[] ): Keyframe[] {

    const
        getWidthPercentage = ( width: percentage ): string => `${ 100 * width }%`,
        getTop = ( width: percentage, y: number ): string =>
            `calc( 50vh - ${ 100 * width }vw * ${ y } / 2965 )`,
        getLeft = ( width: percentage, x: number ): string => `${ 50 - 100 * width * x / 2965 }%`,
        widthKeyframe1: percentage = 1,
        widthKeyframe2: percentage = 3,
        keyframesSlides: Keyframe[] = slidesData.reduce< Keyframe[] >( ( keyframes, {
            coordinates: [ x, y ]
        }, index ) => {

            [ x, y ] = map.pixelsOfCoordinates( x, y, false );
            const keyframesAdd: Keyframe[] = [
                {
                    width: getWidthPercentage( widthKeyframe1 ),
                    top: getTop( widthKeyframe1, y ),
                    left: getLeft( widthKeyframe1, x ),
                    offset: getOffset( slidesData, index + 0.5 )
                },
                {
                    width: getWidthPercentage( widthKeyframe2 ),
                    top: getTop( widthKeyframe2, y ),
                    left: getLeft( widthKeyframe2, x ),
                    offset: getOffset( slidesData, index + 1 )
                }
            ]
            keyframes.push( ...keyframesAdd );
            return keyframes;

        }, [] ),
        start: Keyframe = {
            width: `100%`,
            top: `0`,
            left: `0`,
            offset: 0
        },
        end: Keyframe = {
            width: `100%`,
            top: `0`,
            left: `0`,
            offset: 1
        }
    ;
    keyframesSlides.unshift( start );
    keyframesSlides.push( end );
    return keyframesSlides;

}

function getKeyframesInfoBox( map: MapImage, slidesData: slideData[] ): Keyframe[] {

    const
        { length } = slidesData,
        keyframesSlides: Keyframe[] = slidesData.reduce< Keyframe[] >( ( keyframes, {
            coordinates: [ x, y ]
        }, index ) => {

            [ x, y ] = map.pixelsOfCoordinates( x, y, false );
            const keyframesAdd: Keyframe[] = [
                {
                    scale: 0,
                    offset: getOffset( slidesData, index + 0.25 )
                },
                {
                    scale: 0,
                    offset: getOffset( slidesData, index + 0.9 )
                },
                {
                    scale: 1,
                    offset: getOffset( slidesData, index + 1 )
                }
            ]
            keyframes.push( ...keyframesAdd );
            return keyframes;

        }, [] ),
        start: Keyframe = {
            scale: 1,
            offset: 0
        },
        end1: Keyframe = {
            scale: 0,
            offset: getOffset( slidesData, length + 0.25 )
        },
        end2: Keyframe = {
            scale: 0,
            offset: getOffset( slidesData, length + 0.9 )
        },
        end3: Keyframe = {
            scale: 1,
            offset: 1
        }
    ;
    keyframesSlides.unshift( start );
    keyframesSlides.push( end1, end2, end3 );
    return keyframesSlides;

}

async function loadEventsHandlers() {

    const
        map: MapImage = await loadMap(),
        slidesData: slideData[] = getSlidesData(),
        keyframesMapContainer: Keyframe[] = getKeyframesMapContainer( map, slidesData ),
        keyframesInfoBox: Keyframe[] = getKeyframesInfoBox( map, slidesData ),
        options: KeyframeAnimationOptions = {
            // direction: "forward",
            duration: 0,
            fill: "forwards",
            iterations: 0,
            iterationStart: 0
        }
        // options: KeyframeAnimationOptions = {
        //     // direction: "alternate",
        //     duration: 5000,
        //     fill: "backwards",
        //     iterations: Infinity
        // }
    ;
    const
        scroller = $( `#scroller` ),
        length = slidesData.length,
        lengthSlides = slidesData.length + 2,
        heightScroller: percentage = 3
    ;
    scroller.css( `height`, `calc( 100vh * ${ lengthSlides } * ${ heightScroller } )` );
    let slideIndex: number = undefined as unknown as number;
    $( window ).on( "scroll", async () => {

        let offset: percentage = (
            lengthSlides * ( $( window ).scrollTop() ?? 0 )
            / ( ( $( "#scroller" ).innerHeight() ?? 1 ) * ( lengthSlides - 1 ) )
        );
        if( offset > 1 ) offset = 1;
        options.iterationStart = offset;
        document.getElementById( `mapContainer` )?.animate( keyframesMapContainer, options );
        document.getElementById( `infoBox` )?.animate( keyframesInfoBox, options );
        const index: index = Math.floor( offset * lengthSlides ) - 1;
        if( slideIndex != index ) {

            slideIndex = index;
            if( index < 0 ) {

                $( `#info` ).hide();
                $( `#header` ).show();
                $( `#header h1` ).text( `17 Regions of the Philippines` );
                $( `#header p` ).text( `Just keep scrolling down slowly.` );

            } else if( index >= length ) {

                $( `#info` ).hide();
                $( `#header` ).show();
                $( `#header h1` ).text( `End of Journey` );
                $( `#header p` ).text( `""` );

            } else {

                $( `#header` ).hide();
                $( `#info` ).css( `display`, `grid` );
                const
                    { title, coordinates: [ x, y ], description, img } = slidesData[ index ],
                    src: string = img == undefined ? `` : `assets/img/${ img }`
                ;
                $( `#info h1` ).text( title );
                $( `#coordinates` ).text( `${ y }° N, ${ x }° E` );
                $( `#description` ).text( description ?? `` );
                const newImg = new Image();
                newImg.src = src;
                await newImg.decode();
                $( `#regionImg img` ).replaceWith( newImg );

            }

        }

    } );

}

// async function loadContent() {

//     const map: MapImage = await loadMap();
//     const regions: PhilippineRegion[] = getRegions();
//     const knives: Knife[] = await loadKnives( map, regions );

// }

// $( async () => await loadEventsHandlers() );
// $( async () => await loadContent() );
