import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

function createBuildSettings( options ) {

    return {
        entryPoints: [ "src/main.ts" ],
        outfile: "assets/js/bundle.js",
        bundle: true,
        plugins: [
            esbuildPluginTsc( {
                force: true
            } )
        ],
        ...options
    };

}

const settings = createBuildSettings( { minify: true } );
await esbuild.build( settings );
