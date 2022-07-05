// Override Typings
declare global {
  namespace NodeJS {
    interface Global {}
  }

  namespace Express {
    interface Request {}
  }
}
