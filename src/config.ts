export const config = {
  testModeEnabled: process.env.NODE_ENV === 'test',
  forceEnableMikroORMRepositories: process.env.ENABLE_TEST_MIKRO_ORM_REPOSITORIES === 'true',
  database: {
    host: process.env.DATABASE_HOST || 'mongodb',
    port: parseInt(process.env.DATABASE_PORT || '27017'),
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_DATABASE || 'challenge',
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-2',
    s3: {
      bucket: process.env.AWS_S3_BUCKET || 'tf-rabbit-default-uploaded-files',
      apiVersion: process.env.AWS_S3_API_VERSION || '2006-03-01',
    },
  },
  port: parseInt(process.env.PORT || '4000'),
  proxyIp: process.env.PROXY_IP || '::1',
  notificationsService: {
    baseURL: process.env.NOTIFICATIONS_SERVICE_BASE_URL || 'http://localhost',
    port: parseInt(process.env.NOTIFICATIONS_SERVICE_PORT || '3001'),
    passwordResetLinkUrl:
      process.env.PASSWORD_RESET_LINK_URL || 'https://rabbitmx.com/accounts/password-reset/',
    emailValidationUrl:
      process.env.EMAIL_VALIDATION_URL || 'https://rabbitmx.com/accounts/email-validation/',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'RabbitSecret',
    privateKey:
      process.env.JWT_PRIVATE_KEY ||
      '-----BEGIN RSA PRIVATE KEY-----\nProc-Type: 4,ENCRYPTED\nDEK-Info: AES-256-CBC,866A195F8B3D8B84DBA792EF1771AA2A\n\n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\n-----END RSA PRIVATE KEY-----\n',
    publicKey:
      process.env.JWT_PUBLIC_KEY ||
      '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuAG0R/2822t+RVbdOEfr\nEC4jxVqeyGX+R2CEMk7fIsNRfswZ0GhKiNgaIwTx0+9JEzUS11id8m+32vcwDjx9\nFmRpwd69Ia+JQmYbl8O3x+i/SC3qTHF+vtZF4JH53lJLtTy415ViMUIcb8jlCyBa\npM1T0kbzHeiWiYu3yE2Cmx2goTBOyBHYs64f8noqQZZqiXr4CevvjL2NYQMiNA80\nRi1vhOmZ+bImHxURNLr39jCfVwSf4fC2FbGIUmcfzors7jqQzOr0DTVsDYky7VgZ\nrJ2rjME8mOEjNYqQ3EuSrw0ubyB8T2MsL5meD503vvVMjtaE3ovxRnlxeFmDulAm\nz4R/T+E9PDvtrWHTnxlOPvm9Zei9R8Dk9q8HRBpVGJtg5nKDbV2EkrrGYy6OfEdO\nnTB4PPNXf54pjWAkI6KfuKjqjz+Hc8LwTBMzFs//HsJoBbMDuvMQP2pNaDMewY6o\nr8j7NOvGkvMAy8FOEuPeJ0w7Jxmwi5FqThGa4ixxaAg0jFuByIZ9VIlXCJ0MSVWK\ndOK/fSAUtDXwhBKzFgb/UQk3YtjvcE3EUFGipTEe1RHfX/IbSZYuudQA9Ecp4xU4\nE+lnT6fmKZZlrk9bRqHPO0DwyRpBuXFexksJF8mLxT+iD2W1H5yfwRCFNYgi7buE\nwmdt16WsIiMFIJuEtppqsI0CAwEAAQ==\n-----END PUBLIC KEY-----\n',
  },
  logging: true,
};
