import nodemailer from 'nodemailer';

// import settings from '@gqlapp/config';

// export default nodemailer.createTransport(settings.mailer);

export default nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodejs.starter.kit@gmail.com',
    pass: 'oneforall'
  }
});