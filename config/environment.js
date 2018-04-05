const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/shwap-${env}`;
const secret = process.env.SECRET || '43te9f)Ii3tr@£';

module.exports = { env, port, dbURI, secret };
