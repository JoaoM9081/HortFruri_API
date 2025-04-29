# 📝 NOTES.md — Atividade CRUD com NestJS

## 👥 Integrantes
- João Marcos Azevedo Cruz – UC23100741 
- João Pedro Tavares – UC23100608
- João Victor Martins - UC23111040

---

## 🎬 Introdução
Aplicação desenvolvida em **NestJS** para gerenciar um sistema de hortifruti, com 11 entidades principais: **Loja**, **Categoria**, **Produto**, **Estoque**, **Cliente**, **Pedido**, **ItemPedido**, **Pagamento**, **Endereço**, **Telefone** e **Carrinho**.  
Utiliza **TypeORM** com banco de dados **SQLite**, seguindo boas práticas REST, implementando relacionamentos corretos, validações robustas e integração com Swagger para documentação.


---

## ⚙️ Executando Projeto 

```bash
git clone https://github.com/JoaoM9081/HortFruri_API
cd codigo 
npm i -g @nestjs/cli
npm install
npm run start:dev
```
--

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
Relacionamentos principais:

- Loja → Produto (OneToMany)

- Categoria → Produto (OneToMany)

- Produto → Estoque (OneToOne)

- Cliente → Endereço (OneToMany)

- Cliente → Telefone (OneToMany)

- Cliente → Pedido (OneToMany)

- Pedido → ItemPedido (OneToMany)

- ItemPedido → Produto (ManyToOne)

- Pedido → Pagamento (OneToOne)

- Cliente → Carrinho (OneToOne)

- Carrinho → ItemPedido (OneToMany)

---

## 🧠 Lógica nas Services

- Produto: busca com loja, categoria e estoque.

- Pedido: calcula o total com base nos itens e preço unitário.

- Pagamento: validação do status para finalizar pedido.

- Estoque: decrementar apenas se houver saldo suficiente.

- Carrinho: gerencia os itens adicionados antes do pedido final.

- Cliente: gerencia múltiplos endereços e telefones.

- Erros tratados com:

- NotFoundException

- BadRequestException

- ConflictException

- Mensagens personalizadas para melhor compreensão.

---

## 🧪 Boas práticas REST

- DTOs organizados e validados
- Controllers com separação de responsabilidades
- Retorno de erros amigáveis
- Códigos HTTP adequados (ex: 409, 404)
- Integração com Swagger:

```ts
const config = new DocumentBuilder()
  .setTitle('API Hortifruti')
  .setDescription('Documentação da API Hortifruti')
  .setVersion('1.0')
  .build();
```

---

## 🌐 Endpoint da documentação
A documentação da API pode ser acessada em:
```bash
 http://localhost:3000/api
```
---

## 🎯 Desafio!

- Tratar erros de banco com mensagens personalizadas
- Aplicar validações nos dados de entradas
- Melhorar a documentação com o Swagger
