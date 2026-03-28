# 🚀 Guia de Hospedagem - Anshin Massoterapia (Hostinger)

Este documento detalha como configurar o projeto para rodar no subdomínio `anshin.bydomarketing.com.br` seguindo a estrutura de pastas solicitada.

## 1. Estrutura de Pastas na Hostinger

Certifique-se de que a estrutura no seu Gerenciador de Arquivos (ou via SSH) seja a seguinte:

```text
/ (raiz da conta)
├── public_html/             # Domínio principal (bydomarketing.com.br)
└── clientes/
    └── anshin/
        ├── public/          # Document Root do subdomínio (onde o site vive)
        └── repo/            # Onde o código-fonte (este repositório) será clonado
```

## 2. Configuração do Subdomínio

No painel da Hostinger:
1. Vá em **Domínios > Subdomínios**.
2. Crie o subdomínio `anshin.bydomarketing.com.br`.
3. **IMPORTANTE:** Altere o "Document Root" (Diretório base) para: `/clientes/anshin/public`
4. Certifique-se de ativar o **SSL** para este subdomínio.

## 3. Deploy Automatizado (Webhooks + GitHub Actions)

Para separar o código de desenvolvimento do site final (Build) e garantir que a Hostinger puxe apenas o que é necessário para a pasta pública, configuramos o seguinte fluxo:

1.  O **GitHub Actions** ([deploy.yml](.github/workflows/deploy.yml)) monitora a branch `main`.
2.  Sempre que você der um `git push` para a `main`, ele gera o build e envia os arquivos prontos para uma branch isolada chamada **`production`**.
3.  O **Webhook da Hostinger** deve ser configurado para monitorar a branch **`production`**.

### Como configurar na Hostinger:
1. No painel da Hostinger, vá em **Site > Git**.
2. No campo **Branch**, coloque: `production`.
3. No campo **Diretório de Instalação**, coloque: `/clientes/anshin/public`.
4. Ative o **Webhook** fornecido na URL do repositório no GitHub para que o deploy seja automático.

## 4. Segurança Aplicada (Hardening)

Como especialista, apliquei as seguintes camadas de segurança:

1.  **Remoção da API Gemini:** Conforme solicitado, removi todas as referências e dependências da API do Gemini para eliminar riscos de exposição de chaves.
2.  **Separação Dev/Build:** Ao usar a branch `production`, seu código-fonte (`src/`, `package.json`, etc.) nunca chega à pasta pública do servidor. Apenas o site compilado (`dist/`) é enviado via webhook.
3.  **.htaccess Blindado:**
    - **SPA Routing:** Resolve o erro 404 do React quando o usuário atualiza a página.
    - **Aumento de Performance:** Gzip e Cache ativos para carregamento ultra-rápido.
    - **Prevenção de Malware:** Bloqueio de execução de scripts estranhos na pasta de assets.

> [!TIP]
> **Modo de Manutenção:** Se precisar desativar o site temporariamente, você pode renomear o arquivo `index.html` na pasta `public` ou adicionar uma regra de `RewriteRule` no `.htaccess`.
