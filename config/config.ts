type ConfigVariablesType = {
  port: number | string;
  database: {
    url: string;
    username: string;
    password: string;
  };
  redis?: {
    url: string;
  };
  jwtSecret: string;
};

const config: ConfigVariablesType = {
  port: process.env.PORT || 3000,
  database: {
    url:
      process.env.DATABASE_URL ||
      "mysql://johndoe:randompassword@localhost:5432/mydb?schema=public",
    username: "johndoe",
    password: "randompassword123",
  },
  jwtSecret: process.env.JWT_SECRET || "jkl!±@£!@ghj1wef237",
};

export default config;
