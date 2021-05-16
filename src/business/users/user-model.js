const userDao = require('./user-dao');
const { InvalidArgumentError } = require('../../infra/shared/errors');
const validations = require('../../infra/shared/common-validations');
const bcrypt = require('bcrypt');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.pwdHash = user.pwdHash;

    this.validate();
  }

  async addUser() {
    if (await User.findByEmail(this.email)) {
      throw new InvalidArgumentError('The user already exists!');
    }

    return userDao.adiciona(this);
  }

  async addPassword(pwd) {
    validations.stringFieldNotNull(pwd, 'password');
    validations.minimumSizeField(pwd, 'password', 8);
    validations.maximumSizeField(pwd, 'password', 64);

    this.senhaHash = await User.generatePwdHash(pwd);
  }

  validate() {
    validations.stringFieldNotNull(this.name, 'name');
    validations.stringFieldNotNull(this.email, 'email');
  }

  async deleteUser() {
    return userDao.deleta(this);
  }

  static async findById(id) {
    const user = await userDao.findById(id);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static async findByEmail(email) {
    const usuario = await userDao.findByEmail(email);
    if (!usuario) {
      return null;
    }

    return new User(usuario);
  }

  static listUser() {
    return userDao.listUser();
  }

  static generatePwdHash(pass) {
    const costSalt = 12;
    return bcrypt.hash(pass, costSalt);
  }
}

module.exports = User;
