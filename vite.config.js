import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    root: "src",
    server: {
        port: 3000, // Porta personalizada para o servidor de desenvolvimento
    },
    build: {
        outDir: '../dist', // Pasta onde o projeto final compilado será gerado
    },
    plugins: [
        tailwindcss()
    ]
});
