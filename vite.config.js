import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nutriterapia/', // ¡Este paso es crucial para que carguen los estilos!
})