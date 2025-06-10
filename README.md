# 📝 README — Atividade CRUD Hortifruti

## 👥 Integrantes

* João Marcos Azevedo Cruz – UC23100741
* João Pedro Tavares – UC23100608
* João Victor Martins – UC23111040

---

## 🎬 Introdução

Aplicação full‑stack para gerenciar um sistema de hortifruti. O **backend**, desenvolvido em **NestJS**, expõe endpoints REST para as seguintes entidades: Loja, Categoria, Produto, Estoque, Consumidor, Pedido, ItemPedido, Pagamento, Endereço, Avaliação, Auth, Entregador e Usuário. A persistência é feita com **TypeORM** em **SQLite**, com validações via **class-validator**, autenticação baseada em **cookies** e documentação automática via **Swagger**. Também suportamos upload de imagens para Produtos e Lojas.

O **frontend**, criado em **React**, consome essa API, apenas a parte de Loja e Auth, exibindo telas de cadastro, login e home.

---

## 📂 Estrutura de Pastas

```
├─ codigo/        # Backend NestJS
├─ frontEnd/      # Frontend React
├─ README.md      # Este arquivo
└─ .gitignore
```

---

## ⚙️ Executando o Backend

1. Clone o repositório e navegue até a pasta do backend:

   ```bash
   git clone https://github.com/JoaoM9081/HortFruri_API.git
   cd codigo
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente copiando `.envExample` para `.env` e alterando os valores conforme necessário. Exemplo:

   ```env
   JWT_SECRET=password123
   JWT_EXPIRES_IN=20m
   ```
4. Inicie em modo de desenvolvimento:

   ```bash
   npm run start:dev
   ```

### 🌐 Documentação API

* **Swagger**: `http://localhost:3000/api`
* **Uploads**: `http://localhost:3000/uploads/<nome_do_arquivo>`

---

## ⚙️ Executando o Frontend

1. Em outra aba/terminal, navegue até a pasta do frontend:

   ```bash
   cd frontEnd
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Ajuste o `VITE_API_BASE_URL` no arquivo `.env` (ou `.env.local`) para apontar ao backend, por exemplo:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
4. Inicie a aplicação:

   ```bash
   npm run dev
   ```
5. Acesse no navegador: `http://localhost:5173`.

---

## 🗃️ Configuração TypeORM (Backend)

```ts
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'banco.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
```

---

## 🧪 Boas práticas adotadas

* **DTOs** organizados e validados com `class-validator`
* **Controllers** com responsabilidades bem definidas
* Tratamento de erros com respostas amigáveis
* Autenticação e autorização com **JWT** + **cookies**
* Uso de códigos HTTP corretos (`201`, `400`, `401`, `403`, `404`, `409`)
* Documentação automática via **Swagger**

---

## 🛠️ Tecnologias

* **Backend**: NestJS, TypeORM, SQLite, class-validator, Swagger, Multer
* **Frontend**: React, Vite, React Router, Axios
* **Outros**: Git, Node.js
