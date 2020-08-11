const xoauth2 = require('xoauth2');

let xoauth2gen = xoauth2.createXOAuth2Generator({
  user: process.env.EMAIL_USER,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET_KEY,
  refreshToken: process.env.REFRESH_TOKENS
});

export default {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_KEY,
    refreshToken: process.env.REFRESH_TOKENS,
    accessToken: xoauth2gen.getToken(function(err) {
      if (err) {
        return console.log('Error fetching access token.', err);
      }
    })
  }
};
