console.log(process.env.NODE_ENV);

module.exports = {
    pages: {
        index: {
            entry: 'src/examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // configureWebpack: config => {
    //     config.entry.app = 'src/examples/main.js';
    // }
    // 扩展 webpack 配置，使 packages 加入编译
    // chainWebpack: config => {
    //     config.module
    //         .rule('js')
    //         .include
    //         .add('/packages')
    //         .end()
    //         .use('babel')
    //         .loader('babel-loader');
    //     config.module
    //         .rule("js")
    //         .use("vue-loader") // 解决ivew组件 忽略前缀i的问题
    //         .loader("vue-loader")
    //         .end();
    // }
};