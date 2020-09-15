const { DB_PORT, SECRET } = process.env;

export const secret = SECRET;
export const dbURI = `mongodb://localhost:${DB_PORT}/exp_toolkit`;
