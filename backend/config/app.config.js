const getEnv = (key, defaultValue = "") => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== "") {
      return defaultValue;
    }
    throw new Error(`Environment Variable Key = ${key} is not set`);
  }
  return value;
};

const config = Object.freeze({
  PORT: getEnv("PORT", "8000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", ""),
  DB_NAME: getEnv("DB_NAME", ""),
  JWT_SECRET: getEnv("JWT_SECRET"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
});

export default config;
