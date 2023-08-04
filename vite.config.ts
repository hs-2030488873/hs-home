import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
//! 开启gzip压缩，与服务端配合可以减少传输体积，由浏览器来解压文件
import viteCompression from 'vite-plugin-compression'
//! 依赖分析插件
import { visualizer } from 'rollup-plugin-visualizer'
//! cdn插件
import { Plugin } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        viteCompression({
            verbose: true, // 记录压缩文件及压缩率
            threshold: 10 * 1024, // 10k以上的文件需要gzip压缩
            disable: false, // 是否启用压缩
            algorithm: 'gzip', // 压缩算法gzip，还有一种压缩比更高的br浏览器支持性问题就不做配置了
            ext: '.gz', // 文件压缩后的格式
            deleteOriginFile: false // 是否删除原文件
        }),
        visualizer({
            open: true,
            filename: './public/visualizer.html'
        }),
        Plugin({
            modules: [
                {
                    name: 'vue',
                    var: 'Vue',
                    path: 'https://unpkg.com/vue@3.2.47'
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '/icon': './assets/images/icon'
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3456',
                changeOrigin: true,
                rewrite(path) {
                    return path.replace('/api', '')
                }
            }
        }
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                // ! 生产环境移除console和debugger
                // drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/chunk-[name]-[hash].js',
                entryFileNames: 'js/chunk-vendors-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    }
})
