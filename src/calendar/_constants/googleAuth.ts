import { GoogleAuthOptions } from 'google-auth-library';
import path from 'path';

export const GOOGLE_AUTH_OPTIONS: GoogleAuthOptions = {
  keyFile: path.join('./src/calendar/_constants', './keyfile.json'),
  scopes: ['https://www.googleapis.com/auth/calendar'],
};
