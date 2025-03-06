# BibliaFlow

> 📖 Uma jornada diária pela Bíblia: Leia a Bíblia completa em 365 dias com um sistema inteligente de acompanhamento e progresso.
> Site: https://gabrielcorrea.tech/projetos/bibliaflow/

![GitHub](https://img.shields.io/github/license/gabrielcorreabsb/bibliaflow)
![GitHub last commit](https://img.shields.io/github/last-commit/gabrielcorreabsb/bibliaflow)
![GitHub issues](https://img.shields.io/github/issues/gabrielcorreabsb/bibliaflow)

## 📋 Descrição

BibliaFlow é uma aplicação web moderna que oferece um plano estruturado de leitura bíblica anual. Com uma interface intuitiva e sistema de progresso sincronizado, o aplicativo torna a leitura diária da Bíblia uma experiência fluida e organizada.

### ✨ Características Principais

- 📅 Plano de leitura personalizado baseado no dia do ano
- 📊 Sistema de progresso visual
- 💾 Cache local para economia de dados
- 🔄 Sincronização automática com a data atual
- 📱 Design responsivo para todos os dispositivos
- 🌐 Integração com a API Bíblia Digital

## 🚀 Começando

### Pré-requisitos

# Clone o repositório
git clone https://github.com/seu-usuario/bibliaflow.git

# Entre no diretório
cd bibliaflow

### ⚙️ Configuração

1. Crie uma conta em [www.abibliadigital.com.br](https://www.abibliadigital.com.br)
2. Obtenha seu token de API
3. Configure o token no arquivo \`biblia.js\`:

const API_KEY = 'seu-token-aqui';

ou

1. Acesse o index.hml
2. Abra o console do navegador apertando F12
3. Digite: createUser("Maria Santos", "maria.santos@email.com", "minhasenha123") - Use como exemplo mas mantenha a formatação
4. Obtenha seu token de API
5. Configure o token no arquivo \`biblia.js\`:

const API_KEY = 'seu-token-aqui';


## 💻 Uso

// Criar novo usuário
createUser("Nome", "email@exemplo.com", "senha123");

// Iniciar leitura
initializeReading();


## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- [API Bíblia Digital](https://www.abibliadigital.com.br/api)


## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a Branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📌 Versões

Usamos [SemVer](http://semver.org/) para controle de versão. Para as versões disponíveis, veja as [tags neste repositório](https://github.com/gabrielcorreabsb/bibliaflow/tags).

## 🎯 Status do Projeto

- [x] Estrutura básica
- [x] Integração com API
- [x] Sistema de progresso
- [ ] Interface de usuário aprimorada
- [ ] Sistema de favoritos
- [ ] Modo noturno

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 🎉 Agradecimentos

- [API Bíblia Digital](https://www.abibliadigital.com.br)
- [Contribuidores](https://github.com/gabrielcorreabsb/bibliaflow/contributors)

Link do Projeto: [https://github.com/gabrielcorreabsb/bibliaflow](https://github.com/gabrielcorreabsb/bibliaflow)

