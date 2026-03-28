# 🚀 Guia de Hospedagem - Anshin Massoterapia (Hostinger Business Plan)

Este documento detalha como configurar o projeto para rodar no subdomínio `anshin.bydomarketing.com.br` com a estrutura obrigatória da pasta `public_html`.

## 1. Estrutura Final no Servidor

Conforme requisitos do Plano Business da Hostinger, a estrutura de pastas deve ser:

```text
/public_html/
   /clientes/
      /anshin/
         /public      ← arquivos finais (Site publicado - Document Root)
         /repo        ← código fonte opcional (Git)
```

## 2. Configuração do Subdomínio

No painel da Hostinger:
1. Vá em **Domínios > Subdomínios**.
2. Crie o subdomínio `anshin.bydomarketing.com.br`.
3. **DIRETÓRIO PERSONALIZADO:** Altere o "Document Root" (Diretório base) para: `public_html/clientes/anshin/public`.
4. Certifique-se de ativar o **SSL** para este subdomínio.

## 3. Deploy Automatizado (Webhooks + GitHub Actions)

Para manter a separação total entre o código fonte (Dev) e o build final (Produção):

1.  O **GitHub Actions** ([deploy.yml](.github/workflows/deploy.yml)) monitora a branch `main`.
2.  A cada `git push` na `main`, o build é gerado e os arquivos da pasta `dist/` são enviados para uma branch isolada chamada **`production`**.
3.  O **Webhook da Hostinger** deve ser configurado para monitorar a branch **`production`**.

### Como configurar na Hostinger:
1. No painel da Hostinger, vá em **Site > Git**.
2. No campo **Branch**, coloque: `production`.
3. No campo **Diretório de Instalação**, coloque: `public_html/clientes/anshin/public`.
4. Use o **Git Webhook** do GitHub para automatizar a puxada de arquivos.

## 4. Segurança e Hardening

*   **Remoção de APIs:** Toda e qualquer chave sensível (ex: Gemini) foi removida do código para evitar exposição.
*   **Separação Dev/Build:** Somente os arquivos compilados (`index.html`, `js/`, `css/`, `assets/`) são publicados. O código fonte nunca chega à web.
*   **.htaccess Especializado:** Criado para garantir que rotas do React (SPA) funcionem sem erro 404, além de ativar compressão Gzip e cache.
*   **Caminhos Relativos:** O projeto está configurado com `base: './'` no Vite para funcionar corretamente dentro de subdiretórios ou subdomínios.

## 5. Manutenção

> [!TIP]
> **Build Limpo:** A configuração do Vite (`emptyOutDir: true`) garante que a pasta de build seja totalmente limpa antes de cada nova publicação, evitando que arquivos antigos acumulem no servidor.
