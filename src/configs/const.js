const { DB_PORT, SECRET, ADMIN_ID } = process.env;

export const secret = SECRET;
export const adminID = ADMIN_ID;
export const dbURI = `mongodb://localhost:${DB_PORT}/exp_toolkit`;
