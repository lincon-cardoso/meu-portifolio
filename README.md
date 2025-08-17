# 🌟 Meu Portfólio Automatizado

Bem-vindo ao **Meu Portfólio Automatizado**! Este projeto é uma solução completa para gerenciamento de portfólios, com funcionalidades modernas e integração de deploy automático utilizando **Railway** e **Cloudflare**.

---

## 🚀 **Destaques do Projeto**

### 🔥 Funcionalidades Principais

- **Dashboard Completo**: Gerencie seus projetos de forma intuitiva.
- **APIs Integradas**: CRUD de projetos conectado ao banco de dados PostgreSQL.
- **Deploy Automático**: Integração com Railway e Cloudflare para deploy contínuo.
- **Subdomínios Dinâmicos**: Configuração automática de DNS.
- **Monitoramento em Tempo Real**: Logs e status de deploy diretamente no dashboard.

### 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **React**: Biblioteca para construção de interfaces dinâmicas.
- **TypeScript**: Tipagem estática para maior segurança no código.
- **Sass**: Estilização avançada e modular.
- **PostgreSQL**: Banco de dados relacional robusto.
- **Prisma**: ORM para manipulação de dados.
- **NextAuth**: Autenticação segura e escalável.

---

## 🎨 **Interface do Usuário**

### Página Inicial

- Apresentação pessoal com destaque para habilidades e tecnologias.
- Botões de ação para contato e visualização de projetos.

### Dashboard

- Gerenciamento completo de projetos.
- Filtros dinâmicos para categorias.
- Modais para criação, edição e visualização de projetos.

### Outras Páginas

- **Sobre Mim**: Informações detalhadas sobre minha trajetória.
- **Contato**: Formulário funcional para envio de mensagens.
- **Login**: Página de autenticação com validação de campos.

---

## 📂 **Estrutura do Projeto**

```plaintext
src/
├── app/
│   ├── meuprojetos/       # Página de projetos
│   ├── sobre/             # Página sobre mim
│   ├── contato/           # Página de contato
│   ├── login/             # Página de login
│   └── dashboard/         # Dashboard de gerenciamento
├── components/            # Componentes reutilizáveis
├── hooks/                 # Hooks personalizados
├── lib/                   # Configurações e integrações
├── style/                 # Estilos organizados por seções
├── utils/                 # Funções utilitárias
└── types/                 # Tipos TypeScript
```

---

## 🛠️ **Como Executar o Projeto**

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/lincon-cardoso/meu-portifolio.git
   cd meu-portifolio
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:

   ```
   http://localhost:3000
   ```

---

## 📦 **Scripts Disponíveis**

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter para verificar problemas no código.
- `npm run db:migrate`: Executa as migrações do banco de dados.
- `npm run db:seed`: Popula o banco de dados com dados iniciais.

---

## 🌐 **Deploy**

O projeto está configurado para deploy automático utilizando **Railway** e **Cloudflare**. Basta configurar as variáveis de ambiente e o deploy será realizado automaticamente.

---

## 📄 **Licença**

Este projeto é de uso pessoal e não possui uma licença específica. Entre em contato para mais informações.

---

Desenvolvido com 💻 por **Lincon Cardoso**. Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/lincon-cardoso/) ou envie um e-mail para **lincon.cardoso@example.com**.
