declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: number;
      DB_DATABASE: string;
      DB_USER: string;
      DB_PASSWORD: string;
      NODE_ENV: 'development' | 'test' | 'production';
      PORT: number;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };

