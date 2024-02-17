import $ from "jquery"
import { ArrayUtils, CoordinateRef, NumberUtils, MapImage } from "ts-utils";

type coordinateRef = [ number, int ]
type coordinates = [ number, number ];
type slideData = {
    title?: string,
    coordinates: coordinates
};

async function loadMap(): Promise< MapImage > {

    const
        map: MapImage = new MapImage( "assets/img/philippineMap.jpg", true, false ),
        coordinateRefsX: coordinateRef[] = [
            [ 116, -168 ],
            [ 118, 368 ],
            [ 120, 904 ],
            [ 122, 1441 ],
            [ 124, 1974 ],
            [ 126, 2514 ],
            [ 128, 3054 ]
        ],
        coordinateRefsY: coordinateRef[] = [
            [ 20, -36 ],
            [ 18, 509 ],
            [ 16, 1054 ],
            [ 14, 1608 ],
            [ 12, 2143 ],
            [ 10, 2674 ],
            [ 8, 3205 ],
            [ 6, 3731 ],
            [ 4, 4257 ]
        ],
        toArgs = ( coordinateRefs: [ number, int ][] ): CoordinateRef[] =>
            coordinateRefs.map( ( [ coordinate, pixel ] ) => new CoordinateRef( coordinate, pixel ) )
    ;
    map.coordinateRefsX.addCoordinateRefs( ...toArgs( coordinateRefsX ) );
    map.coordinateRefsY.addCoordinateRefs( ...toArgs( coordinateRefsY ) );
    $( map ).attr( "id", "map" );
    await map.decode();
    $( "#mapContainer" ).prepend( map );
    return map;

}

function getSlidesData(): slideData[] {

    return [
        {
            coordinates: [ 118, 14 ]
        },
        {
            coordinates: [ 120, 16 ]
        },
        {
            coordinates: [ 120, 12 ]
        },
        {
            coordinates: [ 122, 18 ]
        }
    ];

}

function getKeyframesMapContainer( map: MapImage, slidesData: slideData[] ): Keyframe[] {

    const
        getWidthPercentage = ( width: percentage ): string => `${ 100 * width }%`,
        getTop = ( width: percentage, y: number ): string =>
            `calc( 50vh - ${ 100 * width }vw * ${ y } / 2965 )`,
        getLeft = ( width: percentage, x: number ): string => `${ 50 - 100 * width * x / 2965 }%`,
        getOffset = ( index: number ): number => ( index / ( slidesData.length + 1 ) ),
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
                    offset: getOffset( index + 0.5 )
                },
                {
                    width: getWidthPercentage( widthKeyframe2 ),
                    top: getTop( widthKeyframe2, y ),
                    left: getLeft( widthKeyframe2, x ),
                    offset: getOffset( index + 1 )
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

$( async () => {

    const
        map: MapImage = await loadMap(),
        slidesData: slideData[] = getSlidesData(),
        keyframesMapContainer: Keyframe[] = getKeyframesMapContainer( map, slidesData ),
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
        length = slidesData.length + 2,
        heightScroller: percentage = 3
    ;
    scroller.css( `height`, `calc( 100vh * ${ length } * ${ heightScroller } )` );
    $( window ).on( "scroll", () => {

        let offset: percentage = (
            length * ( $( window ).scrollTop() ?? 0 )
            / ( ( $( "#scroller" ).innerHeight() ?? 1 ) * ( length - 1 ) )
        );
        if( offset > 1 ) offset = 1;
        options.iterationStart = offset;
        document.getElementById( `mapContainer` )?.animate( keyframesMapContainer, options );

    } );

} );
