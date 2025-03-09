# Meu Portfólio Pessoal

Este é o meu portfólio pessoal, onde apresento meus projetos, habilidades e experiências profissionais. O portfólio é composto por várias páginas, incluindo a página inicial, uma página de projetos, uma página sobre mim e uma página de contato.

## Estrutura do Projeto

O projeto é composto pelos seguintes arquivos e diretórios:

- `src/`: Diretório principal do código-fonte.
  - `app/`: Contém as páginas do Next.js.
    - `layout.tsx`: Layout principal da aplicação.
    - `page.tsx`: Página inicial.
    - `meuProjetos/page.tsx`: Página de projetos.
    - `sobre/page.tsx`: Página sobre mim.
    - `contato/page.tsx`: Página de contato.
  - `components/`: Componentes reutilizáveis.
    - `HomePage.tsx`: Componente da página inicial.
  - `style/`: Arquivos de estilo.
    - `style.scss`: Arquivo principal de estilos.
    - `base/`: Estilos base e reset.
    - `components/`: Estilos dos componentes.
    - `sections/`: Estilos das seções.
    - `utilities/`: Estilos utilitários.
- `public/`: Arquivos públicos, como imagens e fontes.
- `tsconfig.json`: Configurações do TypeScript.
- `package.json`: Dependências e scripts do projeto.
- `next.config.ts`: Configurações do Next.js.
- `.gitignore`: Arquivos e diretórios ignorados pelo Git.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Sass**: Pré-processador CSS para estilos mais dinâmicos e organizados.

## Como Executar o Projeto

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/meu-portifolio.git
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd meu-portifolio-next
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Execute o servidor de desenvolvimento:

   ```sh
   npm run dev
   ```

5. Abra o navegador e acesse `http://localhost:3000` para ver o portfólio em execução.

## Estrutura de Páginas

- **Home**: Página inicial com uma introdução e projetos em destaque.
- **Meus Projetos**: Página que lista todos os projetos com filtros por categoria.
- **Sobre Mim**: Página com informações sobre a experiência e habilidades.
- **Contato**: Página com um formulário para entrar em contato.

## Contribuição

Se você quiser contribuir para este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
