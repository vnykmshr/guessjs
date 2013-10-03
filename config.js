/**
 * Config
 */

module.exports = {
  host: '0.0.0.0',
  port: 4355,
  session: {
    secret: 'z1b2c3d4e5',
    key: 'guess.sid'
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
  }
};
