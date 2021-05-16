const User = require('./user-model');
const { InvalidArgumentError, InternalServerError } = require('../../infra/shared/errors');

const jwt = require('jsonwebtoken');
const blacklist = require('../../infra/db/redis/manipula-blacklist');

function criaTokenJWT(user) {
  const payload = {
    id: user.id
  };

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
  return token;
}

module.exports = {
  addUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = new User({
        name,
        email
      });

      await user.addPassword(password);

      await user.addUser();

      res.status(201).json();
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(422).json({ err: err.message });
      } else if (err instanceof InternalServerError) {
        res.status(500).json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  },

  login: (req, res) => {
    const token = criaTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  },

  logout: async (req, res) => {
    try {
      const token = req.token;
      await blacklist.adiciona(token);
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  listUser: async (req, res) => {
    const users = await User.lista();
    res.json(users);
  },

  deleteUser: async (req, res) => {
    const user = await User.buscaPorId(req.params.id);
    try {
      await user.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
