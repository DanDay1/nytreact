module.exports = {

    // Entry point (or start) of react applicaton
    entry: "./app/app.jsx",

    // Output plain compiled Javascript 
    output: {
        filename: "public/bundle.js"
    },

    // This section desribes the transformations we will perform
    module: {
        loaders: [{
            // Only work with files that are in .js or .jsx extension
            test: /\.jsx?$/,
            // Webpack to only process files in app folder, avoids unnecessarily processing of
            // node modules and server files 
            include: /app/,
            loader: "babel",
            query: {
                // Use these specific transformations
                presets: ["react", "es2015"]
            }
        }]
    },
    // This permits debugging react code in chrome dev tools. Errors will have lines and file names.
    // Without this code, the console would say all errors are coming from bundle.js.
    devtool: "eval-source-map"
};