module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/built/js'    //__dirname能获取当前文件路径
    },
    // resolve: {
    //     extensions: ['.','.js','.jsx','.styl']
    // },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,      //正则匹配
                exclude: /node_modules/,   //除了node_modules包里的内容外都进行编译
                loader: "babel-loader",    //使用babel-loader进行转码，将es6转成es5
                options: {
                    "presets": [
                        ["es2015", { "modules": false }],
                        "react"
                    ]
                }
            },
            {    // 配置less
                test: /\.less$/, 
                use: [
                    "style-loader",  //style-loader、loader: "css-loader"、 "less-loader"顺序不能变
                    {
                        loader: "css-loader",
                        // options: {
                        //     modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        //     sourceMap: true
                        // }
                    },
                    "less-loader"
                ]
            }
        ]
    }
}
