import { defineConfig, UserConfig, loadEnv } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  const envs = path.join(process.cwd(), 'envs')
  const envConfig = loadEnv(mode!, envs)
  return defineConfig({
    base: envConfig.VITE_APP_BASE_URL,
    envDir: envs,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      AutoImport({
        // include: [
        //   /\.[tj]sx?$/,
        //   /\.vue$/,
        //   /\.vue\?vue/,
        // ],
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dirs: ['api', 'composables', 'plugins', 'utils'].map(item => path.join(process.cwd(), '/src', item)),
        dts: path.join(process.cwd(), '/types/auto-imports.d.ts')
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        deep: true,
        dirs: path.join(process.cwd(), '/src/components'),
        dts: path.join(process.cwd(), '/types/components.d.ts')
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/theme.scss";@import "@/assets/styles/common.scss";`
        }
      },
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            unitToConvert: 'px',
            viewportWidth: 1920,
            unitPrecision: 2, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'rem', // 希望使用的视口单位
            fontViewportUnit: 'rem', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            // exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'rem', // 横屏时使用的单位
            landscapeWidth: 1024, // 横屏时使用的视口宽度
          }),
        ]
      }
    },
    esbuild: {
      drop: mode === 'development' ? [] : ['console', 'debugger']
    },
    build: {
      minify: false,
      emptyOutDir: true,
      outDir: envConfig.VITE_APP_PACKAGE_NAME,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.indexOf('node_modules') !== -1) {
              const names = ['element-plus', 'echarts']
              const name = names.filter(ele => id.indexOf(ele) !== -1)
              if (name && name.length) {
                return name[0]
              }
              return 'vendors'
            }
          },
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        }
      }
    }
  })
}