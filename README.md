# *Teste Desenvolvimento Pontua Web*
> Esse é o teste para desenvolvedores na Pontua Web.<br>
> Sinta-se livre para editar a partir do título "Documentação da Aplicação".<br>
> Essa aplicação deve ser criada com base e utilização na api fornecida pela Marvel 
[https://developer.marvel.com/](https://developer.marvel.com/)<br>
---

> Qualquer dúvida poderá ser enviada por e-mail em tecnologia@pontua.com.br;<br>
> O prazo para finalização do teste deverá ser fornecido pelo RH;<br>
>***Não deixe de entregar sua aplicação*** mesmo que não esteja pronta ou perfeita;<br>
> A entrega do código deverá ser feita no GitHub e após o término, notificar o time atráves do e-mail tecnologia@pontua.com.br e gente@pontua.com.br.

---

>Link para layout no Figma: [layout]('https://www.figma.com/file/QFEzv3O4PWCzmvicy7e7sm/Teste-de-Desenvolvimento?node-id=0-1&t=D2fOR8TxhmRi52td-0')

---

## Página de Login

***Eu como usuário:***<br>
> Irei inserir o meu e-mail e senha de acesso para navegar para a tela de Agentes.

***Quando eu:***<br>
> Clicar no botão entrar, se sucesso deverá navegar para a próxima tela, caso ocorra erro, ver uma notificação;<br> 
> informando que o email ou senha está inválido.

### *Opcional*
> Quando eu clicar deverá redirecionar para a tela de esqueci minha senha.

### *Critérios de aceite*
>- Validação de e-mail e senha;
>- Navegar para próxima página;
>- Exibir mensagem de erro;
>- Ser o mais fiel possível ao layout do Figma.

---

## Página de seleção de Agente

***Eu como usuário:***<br>
> Irei selecionar o agente de minha escolha para acessar a página de perfil do agente.

***Quando eu:***<br>
> Clicar no campo de escolha deverá ser exibido uma lista com os nomes e foto do perfil de cada agente,
e ao clicar no botão entrar ser redirecionado para a tela de perfil do agente;

### *Critérios de aceite*
>- Se não houver agente selecionado mostrar o placeholder "Selecione um agente" conforme Figma;
>- Se já exitir um agente selecionado e eu clicar no campo de escolha, exibir a lista de agentes com uma flag no agente; 
>- já selecionado;
>- Ao clicar no botão entrar deverá navegar para a página de perfil do agente selecionado;
>- Ser o mais fiel possível ao layout do Figma.

---

## Página de Perfil de Agente

***Eu como usuário:***<br>
> Ao acessar a tela preciso ver a aba de visão geral com o descritivo sobre o agente, 
bem como seu nome e imagem;<br>
> Quero poder navegar nas abas de características, conforme layout do Figma;<br>
> Preciso visualizar o menu com as opções de acessar a Home, Perfil e sair do sistema.

***Quando eu:***<br>
> Clicar em uma das abas disponíveis daquele agente, preciso ver uma lista com as informações daquela aba.

### *Critérios de aceite*
>- Exibir as informações dos agentes;
>- As abas do perfil devem ser dinâmicas de acordo com cada agente;
>- Ao clicar nas abas mostrar as listagens com as informações relativas;
>- Exibir o menu lateral com link para Home, Perfil e Logout;
>- Ser o mais fiel possível ao layout do Figma;

---

## Página Home

***Eu como usuário:***<br>
> Desejo visualizar uma lista de cards com fotos de perfil e um resumo de personagens;<br>
> Quero poder navegar na lista pela paginação no final da página;<br>
> Quando eu clicar no campo de pesquisa e digitar o nome do agente, me mostre somente os personagens que contém aquele termo buscado.

***Quando eu:***<br>
> Clicar no card do personagem, deverei ser redirecionado para a página de perfil do personagem escolhido;<br>
> Fizer uma busca, o sistema deverá exibir na lista somente os personagens que contém aquele nome.<br>
> Clicar no botão "Próxima" deverá exibir os próximos cards da lista (próxima página);<br>
> Clicar no botão "Anterior" deverá exibir os cards anteriores da lista (página anterior);<br>
> Quando eu clicar no botão com número de páginação, exibir os cards relativos aquela página selecionada.<br>

### *Critérios de aceite*
>- Exibir resumo e foto de perfil;
>- Listagem mínima de 11 personagens
>- Exibição de no mínimo na primeira página
>- Exibição de no máximo 10 personagens por página;
>- Ao clicar em um card ser redirecionado à página de perfil do mesmo;
>- Ser o mais fiel possível ao layout do Figma;

---

># *Opcional* *
## Página Recuperação de Senha 

***Eu como usuário:***<br>
> Irei inserir o email que realizei o cadastro na plataforma no campo disponivel e, clicarei no botão enviar link.

***Quando eu:***<br>
> Clicar no botão de enviar link, deverá aparecer a mensagem de envio com sucesso.

### *Critérios de aceite*
>- Ser o mais fiel possível ao layout do Figma;

---

# Documentação da Aplicação


>Você pode escrever a documentação da sua aplicação a partir daqui...
> 


---
---

## Agradecimento

> Agradeço à equipe da Pontua pela oportunidade de participar deste teste. Estou ansioso para compartilhar mais detalhes sobre minha abordagem e aprender com o feedback da equipe.

---

## Projeto em Produção
> * [pontua-hero.vercel.app](https://pontua-hero.vercel.app/)

---

## Tecnologias Utilizadas
> * JavaScript
> * React
> * Hooks
> * Typescript
> * HTML5
> * Sass
> * Jest
> * React Testing Library
> * Axios
> * JWT
---

## Funcionalidades
### Página de Login:
> ***Todas as 4 telas utilizam o mesmo componente de interação com o usuário.***

> 1. Tela de Boa Vinda (E-mail e senha):
> * Validações nos campos de email e senha (formato de e-mail, e ao menos um caracter na senha)
> * Condicional de desativação no Botão de Login - Caso os inputs não estejam devidamente preenchidos, ele desabilita.
> * Opção de visualização/ocultação da senha digitada.
> * Mensagem de erro para caso de não validação de email/senha (toast)

> 2. Tela de Recuperação de Senha:
> * Mesma campo de input de email, com a validação do campo.
> * Mesmo button com condicional de ativação/desativação.

> 3. Tela de Confirmação de envio de instruções.
> * Como não temos nada a implementação desse serviço, mensagem meramente ilustrativa.

> 4. Tela de Seleção de agente.
> * Caso autenticação seja ok, passa-se a essa tela, que contem:
> * Loading enquanto acessa à api da Marvel e traz as informações.
> * Ícone e frase default para sessão ainda não selecionada
> * Dropdown de imagens/nome de opções de agentes para seleção
> * Caso na sessão anterior algum agente já tiver sido selecionado, ele aparece com um icone e fundo de destaque
> * Mesmo button com condicional de ativação/desativação

### Página de Perfil:
> * Acesso apenas autenticado, caso contrário o usuário será redirecionado para a tela de Login.
> * Loading, caso já tenha logado antes e entrada direto na página, sem os dados dos agentes estarem no estado da aplicação.
> * Detalha sobre o Agente selecionado. Seja alguma opção da Home, ou então o default que é o selecionado durante o login.
> * Menu de abas dinâmicas conforme os dados recebidas via Api e, com excessão da Visão Geral (que já tem no minimo o nome), só são apresentadas se tiverem conteúdos (lista de informações).
> * No caso da versão mobile aparece um header com a logo e um icone para abrir/fechar o menu lateral.

### Página Home:
> * Acesso apenas autenticado, caso contrário o usuário será redirecionado para a tela de Login.
> * Loading, caso já tenha logado antes e entrada direto na página, sem os dados dos agentes estarem no estado da aplicação.
> * Apresentação dos cards de agentes disponíveis para informações.
> * Possui um componente de busca por nome que informa ao usuário caso o nome digitado não seja encontrado.
> * Cada card tem o link para direcionamento da página de perfil sobre esse agente.
> * O conteúdo descritivo tem tamanho limitado no card.
> * Possui páginação com quantidade de buttons limitado a 7, sendo a central a página corrente, caso seja mais que 7, os números das páginas alteram nos buttons.
> * A quantidade padrão de cards para desktop são 10 e para mobile são 5, essa quantidade pode ser facilmente alterada no código.
> * Tamanhos fixos, sendo os cards última linha redimensionados para ocuparem a linha inteira.
> * No caso da versão mobile também aparece o header para o toogle do menu lateral.

### Menu Lateral:
> * Menu lateral com Header e 3 links, sendo para Páginas Home e Perfil e o último para logout.
> * Caso o usuário saia sem realizar o logout, na próxima sessão ele continua ativo, não sendo necessário realizar novo login (LocalStorage).
---

## Observações
> * Como não foram solicitados testes, realizei alguns básicos a fim de demonstração, mas não dei prosseguimento na cobertura por não ser prioritário nesse projeto.
---

## Instalação e Uso
> * Clone o Repositório: https://github.com/santanawesley/pontua-hero.git
> * Acesse o diretório: cd pontua-hero
> * Crie o arquivo .env na raiz do projeto e adicione as três variaveis de ambiente, sendo as duas primeiras chaves cadastradas na Api da Marvel e última uma chave q você pode escolher como desejar:<br>
> REACT_APP_PUBLIC_KEY=""<br>
> REACT_APP_PRIVATE_KEY=""<br>
> REACT_APP_SECRET_KEY=a_senha_que_voce_desejar
> * Instale as Dependências npm install (ou yarn install)
> * Inicie o Servidor de Desenvolvimento npm run start

> **Esse projeto rodará em http://localhost:3000**
> * As duas opções de usuários para login são: <br>
> email: pontua@pontua.com, senha: 1 <br>
> email: hero@hero.com, senha: 2
---

## Desenvolvedor:
> Wesley R. de Santana - wesley0807@gmail.com
