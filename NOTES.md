# 📝 NOTES.md — Atividade CRUD com NestJS

## 👥 Integrantes
- João Marcos Azevedo Cruz – UC23100741 
- João Pedro Tavares – UC23100608
- João Victor Martins - UC23111040

---

## 🎬 Introdução
Aplicação desenvolvida em **NestJS** para gerenciar um sistema de hortifruti, com 13 entidades principais: **Loja**, **Categoria**, **Produto**, **Estoque**, **Consumidor**, **Pedido**, **ItemPedido**, **Pagamento**, **Endereco**, **Avaliacao**, **Auth**, **Entregador** e **Usuario**.  
Utiliza **TypeORM** com banco de dados **SQLite**, seguindo boas práticas REST, implementando relacionamentos corretos, validações robustas, integração com Swagger para documentação, Uploads de imagens em **Produto** e **Loja** e autenticação com Cookies, tendo usuários como: (Consumidor, Entregador, Loja e ADMIN).


---

## ⚙️ Executando Projeto 

```bash
git clone https://github.com/JoaoM9081/HortFruri_API
cd codigo 
npm install
npm run start:dev
```
---

## 🌐 Endpoint da documentação
A documentação da API pode ser acessada em:
```bash
 http://localhost:3000/api
```

Endpoint para verificar imagens de uploads em:
```bash
 http://localhost:3000/uploads/url_imagem
```

---

## 🗃️ TypeORM e SQLite

Configuração no `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'banco.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
```

## 🧪 Boas práticas REST

- DTOs organizados e validados
- Controllers com separação de responsabilidades
- Retorno de erros amigáveis
- Autenticação
- Códigos HTTP adequados (ex: 409, 404)
- Integração com Swagger:

```ts
const config = new DocumentBuilder()
  .setTitle('API Hortifruti')
  .setDescription('Documentação da API Hortifruti')
  .setVersion('1.0')
  .build();
```