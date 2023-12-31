<!DOCTYPE html>
<html lang="pt-br">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Projeto Ant Exploration Algorithm</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              margin: 20px;
          }
          h1 {
              color: #2ecc71;
          }
          h2 {
              color: #3498db;
          }
          p {
              margin-bottom: 20px;
          }
          code {
              background-color: #ecf0f1;
              padding: 2px 6px;
              border-radius: 4px;
          }
          pre {
              background-color: #ecf0f1;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
          }
          ul {
              list-style-type: none;
              padding: 0;
          }
          li {
              margin-bottom: 10px;
          }
          a {
              color: #3498db;
              text-decoration: none;
          }
          a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <h1>Projeto Ant Exploration Algorithm</h1>
      <h2>Descrição</h2>
      <p>
          Este projeto implementa um algoritmo de exploração inspirado no comportamento das formigas.
          Utiliza Rust com o framework Yew para criar uma aplicação frontend interativa que simula o movimento
          e comportamento de formigas em um ambiente virtual.
      </p>
      <h2>Funcionalidades</h2>
      <ul>
          <li><strong>Formigas Dinâmicas:</strong> Cada formiga é uma entidade dinâmica que se move, muda de direção e interage com o ambiente virtual.</li>
          <li><strong>Exploração e Coleta:</strong> As formigas exploram o ambiente em busca de comida, coletando-a quando a encontram. Elas podem ser observadas enquanto percorrem trilhas e reagem a obstáculos.</li>
          <li><strong>Comportamento Realista:</strong> As formigas seguem um modelo simplificado de comportamento, incluindo mudanças de direção, detecção de obstáculos e interação com o formigueiro.</li>
          <li><strong>Visualização Interativa:</strong> O ambiente e o movimento das formigas são visualizados interativamente no navegador, proporcionando uma experiência envolvente.</li>
      </ul>
      <h2>Tecnologias Utilizadas</h2>
      <ul>
          <li><strong>Rust:</strong> A linguagem de programação principal para a lógica do algoritmo e manipulação de dados.</li>
          <li><strong>Yew Framework:</strong> Um framework Rust para construção de aplicações frontend usando WebAssembly, fornecendo uma integração eficiente entre Rust e JavaScript.</li>
          <li><strong>JavaScript:</strong> Algumas interações específicas com o DOM são implementadas em JavaScript para complementar o comportamento das formigas.</li>
      </ul>
      <h2>Como Executar</h2>
      <ol>
          <li>Certifique-se de ter o ambiente Rust configurado. Para mais informações, consulte <a href="https://www.rust-lang.org/learn/get-started" target="_blank">Rust Install</a>.</li>
          <li>Clone este repositório:
              <pre><code>git clone https://github.com/seu-usuario/nome-do-repositorio.git</code></pre>
          </li>
          <li>Navegue até o diretório do projeto:
              <pre><code>cd nome-do-repositorio</code></pre>
          </li>
          <li>Compile e execute o projeto:
              <pre><code>cargo run --release</code></pre>
          </li>
          <li>Abra o navegador e acesse <code>http://localhost:8080</code> para visualizar a simulação.</li>
      </ol>
      <h2>Contribuições</h2>
      <p>Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, propor melhorias ou enviar pull requests.</p>
      <h2>Autor</h2>
      <p>Aldenor Neto</p>
      <h2>Licença</h2>
      <p>Este projeto é licenciado sob a licença <a href="LICENSE" target="_blank">MIT</a>. Veja o arquivo LICENSE para obter mais detalhes.</p>
  </body>
</html>
