const webpack = require('webpack');

module.exports = {
    plugins: [
        // fix for lib-cov in fluent-ffmpeg
        new webpack.DefinePlugin({
            'process.env.FLUENTFFMPEG_COV': false
        })
    ],
    resolve: {
        fallback: {
            "fs": false,
            "child_process": false
        },
    }
};