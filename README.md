🚀 SaaS Checkout – Autenticação, Assinaturas e Planos

Aplicação SaaS completa com autenticação de usuários, gerenciamento de planos e sistema de assinaturas, construída com Node.js + React, seguindo boas práticas de API, segurança e organização de código.

Projeto desenvolvido com foco em aprendizado prático de backend, frontend e arquitetura de sistemas SaaS.


🧠 Funcionalidades

  👤 Autenticação

  Cadastro de usuários

  Login com email e senha

  Hash de senha com bcrypt

  Autenticação via JWT

  Proteção de rotas autenticadas
  

📦 Planos

  Listagem de planos (FREE, PRO, PREMIUM)

  Preços dinâmicos vindos do backend

💳 Assinaturas

  Criar assinatura

  Cancelar assinatura

  Renovar / reativar assinatura

  Exibir plano atual do usuário

  Estados: active | inactive
  

🖥️ Frontend

  Interface moderna com Tailwind CSS

  Design escuro inspirado em plataformas SaaS modernas

  Layout responsivo

  Loading animado

  Feedback visual de ações

  Dashboard do usuário

  Checkout de planos
  

🛠️ Tecnologias Utilizadas
Backend

  Node.js

  Express

  MySQL (HeidiSQL / PlanetScale)

  JWT (jsonwebtoken)

  Bcrypt

  UUID

  CORS

  Arquitetura em camadas (routes, controllers, services)

  Frontend

  React

  React Router DOM

  Axios

  Tailwind CSS

  Vite


  ▶️ Como rodar o projeto localmente

  - Backend
  cd backend
  npm install
  npm run dev

  - Frontend
  cd frontend
  npm install
  npm run dev


🧪 Testes

Todas as rotas do backend foram testadas com Postman


🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de:

Consolidar conhecimentos em Node.js

Aprender autenticação JWT na prática

Entender fluxo real de um SaaS

Integrar backend + frontend

Criar um projeto sólido para portfólio / estágio
