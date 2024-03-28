import Components from 'unplugin-vue-components/webpack'
import NutUIResolver from '@nutui/auto-import-resolver'
import { defineConfig } from '@tarojs/cli'
import path from 'path'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'

const config = defineConfig({
    projectName: 'brp_weapp',
    date: '2024-3-26',
    designWidth(input) {
        if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
            return 375
        }
        return 750
    },
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1
    },
    alias: {
        '@': path.resolve(__dirname, '..', 'src')
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html', 'taro-plugin-pinia'],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {}
    },
    framework: 'vue3',
    compiler: {
        type: 'webpack5',
        prebundle: { enable: false }
    },
    cache: {
        enable: false
    },
    sass: {
        data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
    },
    mini: {
        webpackChain(chain) {
            chain.plugin('unplugin-vue-components').use(
                Components({
                    resolvers: [
                        NutUIResolver({
                            taro: true
                        })
                    ]
                })
            )
            chain.merge({
                plugin: {
                    install: {
                        plugin: UnifiedWebpackPluginV5,
                        args: [
                            {
                                appType: 'taro'
                            }
                        ]
                    }
                }
            })
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {
                    // selectorBlackList: ['nut-']
                }
            },
            htmltransform: {
                enable: true,
                config: {
                    removeCursorStyle: false
                }
            },
            url: {
                enable: true,
                config: {
                    limit: 1024 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    },
    h5: {
        webpackChain(chain) {
            chain.plugin('unplugin-vue-components').use(
                Components({
                    resolvers: [
                        NutUIResolver({
                            importStyle: 'sass',
                            taro: true
                        })
                    ]
                })
            )
        },
        publicPath: '/',
        staticDirectory: 'static',
        esnextModules: ['nutui-taro', 'icons-vue-taro'],
        postcss: {
            autoprefixer: {
                enable: true,
                config: {}
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    }
})

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}
