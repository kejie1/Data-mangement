import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server:{
    host:'0.0.0.0',//解决vite use--host to expose
    port:8080,//配置端口
    open:true,//配置默认打开浏览器
  },
})
