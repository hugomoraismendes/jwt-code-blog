const postsDao = require('./posts-dao');
const validacoes = require('../../infra/shared/common-validations');

class Post {
  constructor(post) {
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.valida();
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.titulo, 'título');
    validacoes.campoTamanhoMinimo(this.titulo, 'título', 5);

    validacoes.campoStringNaoNulo(this.conteudo, 'conteúdo');
    validacoes.campoTamanhoMaximo(this.conteudo, 'conteúdo', 140);
  }

  static lista() {
    return postsDao.lista();
  }
}

module.exports = Post;
