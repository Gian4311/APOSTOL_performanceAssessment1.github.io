import $ from "jquery"
import { ArrayUtils, CoordinateRef, NumberUtils, MapImage } from "ts-utils";

type coordinateRef = [ number, int ]
type coordinates = [ number, number ];
type slideData = {
    title: string,
    coordinates: coordinates,
    description?: string,
    img?: string
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
            title: `National Capital Region (NCR)`,
            coordinates: [ 121.0223, 14.6091 ],
            description: `Also known as Metropolitan Manila, is the country’s political, economic, and educational center. The smallest region in the Philippines, it is the most densely populated region which is home to over 13 million Filipinos.`,
            img: "ncr.webp"
        },
        {
            title: `Cordillera Administrative Region (CAR)`,
            coordinates: [ 121.1719, 17.3513 ],
            description: `Is composed of six provinces—Abra, Apayao, Benguet, Ifugao, Kalinga, and Mountain Province; and two cities—Baguio City and Tabuk in Kalinga Province.`,
            img: `car.jpg`
        },
        {
            title: `Ilocos Region (Region I)`,
            coordinates: [ 120.6200, 16.0832 ],
            description: `Is composed of four provinces—Ilocos Norte, Ilocos Sur, La Union and Pangasinan; and of nine cities—Alaminos, Batac, Candon, Laoag, San Carlos, San Fernando, Urdaneta, Vigan, and Dagupan.`,
            img: `region1.jpg`
        },
        {
            title: `Cagayan Valley (Region II)`,
            coordinates: [ 121.8107, 16.9754 ],
            description: `Is composed of five (5) provinces –Batanes, Cagayan, Isabela, Quirino, and Nueva Vizcaya; and four cities: Tuguegarao, Cauayan, Ilagan, and Santiago.`,
            img: `region2.jpg`
        },
        {
            title: `Central Luzon (Region III)`,
            coordinates: [ 120.7120, 15.4828 ],
            description: `Is composed of seven provinces—Aurora, Bataan, Bulacan, Nueva Ecija, Pampanga, Tarlac, and Zambales; and fourteen cities.`,
            img: `region3.jpg`
        },
        {
            title: `Calabarzon (Region IV-A)`,
            coordinates: [ 121.0794, 14.1008 ],
            description: `Is composed of the provinces of Cavite, Laguna, Batangas, Rizal, and Quezon.`,
            img: `region4A.jpg`
        },
        {
            title: `Southwestern Tagalog Region (Mimaropa) (Region IV-B)`,
            coordinates: [ 118.7365, 9.8432 ],
            description: `Is composed of the provinces of Mindoro (Occidental and Oriental), Marinduque, Romblon, and Palawan. There are two cities—Calapan and Puerto Princesa—and 71 municipalities in the entire region.`,
            img: `region4B.jpg`
        },
        {
            title: `Bicol Region (Region V)`,
            coordinates: [ 123.4137, 13.4210 ],
            description: `Is composed of four contiguous provinces: Albay, Camarines Sur, Camarines Norte, and Sorsogon; two island provinces of Catanduanes and Masbate; and seven cities namely, Legazpi, Naga, Iriga, Tabaco, Ligao, Sorsogon, and Masbate.`,
            img: `region5.jpg`
        },
        {
            title: `Western Visayas (Region VI)`,
            coordinates: [ 122.5373, 11.0050 ],
            description: `Is composed of six provinces: Aklan, Antique, Capiz, Guimaras, Iloilo, and Negros Occidental.`,
            img: `region6.png`
        },
        {
            title: `Central Visayas (Region VII)`,
            coordinates: [ 124.0641, 9.8169 ],
            description: `Is composed of four provinces: Cebu, Bohol, Negros Oriental, and Siquijor.`,
            img: `region7.jpg`
        },
        {
            title: `Eastern Visayas (Region VIII)`,
            coordinates: [ 125.0388, 12.2446 ],
            description: `Is composed of six provincial offices in Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar.`,
            img: `region8.webp`
        },
        {
            title: `Zamboanga Peninsula (Region IX)`,
            coordinates: [ 123.2588, 8.1541 ],
            description: `Is composed of five provincial offices: Zamboanga City, Zamboanga del Sur, Zamboanga del Norte, Zamboanga Sibugay, and Isabela City.`,
            img: `region9.jpg`
        },
        {
            title: `Northern Mindanao (Region X)`,
            coordinates: [ 124.6857, 8.0202 ],
            description: `Is composed of two cities—Cagayan de Oro City and Iligan City; and five provinces—Camiguin, Misamis Oriental, Lanao del Norte, Bukidnon and Misamis Occidental.`,
            img: `region10.jpg`
        },
        {
            title: `Davao Region (Region XI)`,
            coordinates: [ 126.0893, 7.3042 ],
            description: `It is composed of five provinces – Davao del Sur, Davao del Norte, Davao Oriental, Davao Occidental and Compostela Valley. It also boasts of six cities – Davao, Tagum, Island Garden City of Samal, Panabo, Mati and Digos.`,
            img: `region11.jpg`
        },
        {
            title: `Soccsksargen (Region XII)`,
            coordinates: [ 124.6857, 6.2707 ],
            description: `Is composed of four provinces—North Cotabato, South Cotabato, Sarangani Province, and Sultan Kudarat; and five cities—Koronadal, Tacurong, General Santos, Kidapawan, and Cotabato.`,
            img: `region12.jpg`
        },
        {
            title: `Caraga (Region XIII)`,
            coordinates: [ 125.7407, 8.8015 ],
            description: `Is composed of five provinces—Agusan del Norte, Agusan del Sur, Surigao del Norte, Surigao del Sur, and Dinagat Islands; and six cities—Butuan, Surigao, Bislig, Tandag, Cabadbaran, and Bayugan.`,
            img: `caraga.webp`
        },
        {
            title: `Bangsamoro (BARMM)`,
            coordinates: [ 124.24514, 7.19708 ],
            description: `Is an autonomous region located in the southern Philippines. It composed of five provinces: Basilan, Lanao del Sur, Maguindanao, Sulu, and Tawi‑Tawi.`,
            img: `barmm.jpg`
        }
    ];

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

$( async () => {

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
    $( window ).on( "scroll", () => {

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
                $( `#regionImg img` ).attr( `src`,  src );

            }

        }

    } );

} );
