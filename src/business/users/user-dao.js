const db = require('../../infra/db/sqlite/database');
const { InternalServerError } = require('../../infra/shared/errors');

module.exports = {
  adiciona: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          INSERT INTO users (
            name,
            email,
            pwdHash
          ) VALUES (?, ?, ?)
        `,
        [user.nome, user.email, user.senhaHash],
        error => {
          if (error) {
            reject(new InternalServerError('Error adding user!'));
          }

          return resolve();
        }
      );
    });
  },

  findById: id => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE id = ?
        `,
        [id],
        (error, user) => {
          if (error) {
            return reject('The user could not be found!');
          }

          return resolve(user);
        }
      );
    });
  },

  findByEmail: email => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE email = ?
        `,
        [email],
        (error, user) => {
          if (error) {
            return reject('The user could not be found!');
          }

          return resolve(user);
        }
      );
    });
  },

  listUsers: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
          SELECT * FROM users
        `,
        (error, users) => {
          if (error) {
            return reject('Error listing users');
          }
          return resolve(users);
        }
      );
    });
  },

  deleteUsers: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          DELETE FROM users
          WHERE id = ?
        `,
        [user.id],
        error => {
          if (error) {
            return reject('Error deleting the user');
          }
          return resolve();
        }
      );
    });
  }
};
