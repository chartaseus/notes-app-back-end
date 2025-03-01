const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  // Parameter payload merupakan objek yang disimpan ke dalam salah satu artifacts JWT. Biasanya objek payload berisi properti yang mengindikasikan identitas pengguna, contohnya user id.
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch {
      throw new InvariantError('Refresh token tidak valid');
    }
  }
};

module.exports = TokenManager;