'use strict';

const files = process.env.NODE_ENV === 'dev' ? require('./local/karma.files') : [
  "./app/*.spec.js",
  "./app/**/*.spec.js"
];;

// Karma configuration
// Generated on Tue Aug 08 2017 19:51:05 GMT+0800 (CST)
module.exports = config => {
  let KarmaConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'https://unpkg.com/element-ui@1.4.2/lib/theme-default/index.css',
      'https://unpkg.com/vue@2.4.2/dist/vue.min.js',
      'https://unpkg.com/axios@0.16.2/dist/axios.min.js',
      'https://unpkg.com/vuex@2.3.1/dist/vuex.min.js',
      'https://unpkg.com/vue-class-component@5.0.2/dist/vue-class-component.min.js',
      'https://unpkg.com/element-ui@1.4.2/lib/index.js',
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      './mock/index.js'
    ],

    mime: {
      'text/x-scss': ['scss']
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './mock/index.js': ['webpack']
    },

    webpack: {
      output: {
          path: __dirname,
          filename: '[name].js',
      },
      module : {
          rules: [
              {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
              },
              {
                test: /\.js$/,
                use: [
                  {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'stage-3'],
                        plugins: ['transform-class-properties', 'transform-decorators-legacy']
                    }
                  }
                ]
              },
              {
                  test: /\.scss$/,
                  use: [
                    { loader: 'style-loader', options: { insertInto: 'body' } },
                    { loader: 'css-loader?sourceMap' },
                    { loader: 'sass-loader?sourceMap' }
                  ],
              },
              {
                  test: /\.eot|\.svg|\.ttf|\.woff|\.woff2$/,
                  use: 'url-loader?limit=10240&name=font/[name].[ext]'
              }
          ]
      },
      externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'axios': 'axios',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'vue-class-component': 'VueClassComponent'
      },
      devtool: "source-map"
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  }
  files.forEach(file => {
    KarmaConfig.files.push(file);
    KarmaConfig.preprocessors[file] = ['webpack'];
    KarmaConfig.preprocessors['./app/**/*.scss'] = ['webpack'];
  })
  config.set(KarmaConfig)
}