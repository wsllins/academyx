import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // Porta personalizada para o servidor de desenvolvimento
    open: true, // Abre o navegador automaticamente ao rodar npm run dev
  },
  build: {
    outDir: 'dist', // Pasta onde o projeto final compilado será gerado
  }
});
