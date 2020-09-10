const { DB_PORT } = process.env;

export const dbURI = `mongodb://localhost:${DB_PORT}/exp_toolkit`;
