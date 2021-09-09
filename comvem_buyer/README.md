# Guia de como adicionar suas telas ao projeto#

Qualquer dúvida, me procure.

-Ian Baldo

### O que você deve alterar: ###

* templates
* menu.html
* route.js
* index.html (caso haja controller)

### Templates ###

Na pasta "templates" você vai adicionar o arquivo HTML que você usou para "desenhar" a página. Basta adicionar na pasta.

### menu.html ###

Nesse arquivo você deve criar um novo item na lista de opções do menu lateral. Tem 2 exemplos já feitos que você pode copiar a estrutura e algumas informações extras em comentários caso queira mais detalhes.

### route.js ###

Aqui você vai criar o state para a sua tela. Basta copiar um dos exemplos prontos e alterar os campos como o nome ("app.XXX"), url, templateUrl e controller.

IMPORTANTE: **NÃO** copie o primeiro state (que tem a instância "abstract").

### index.html ###

Caso você tenha adicionado o seu controller, lembre-se de incluir o arquivo em index.html como os exemplos.

**Atenção:** seu controller deve estar no module "myControllers". Veja o exemplo em "HomeCtrl.js"