import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config/config";

const authService = () => {
  const encryptPassword = (password: string) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      throw new Error(`Error encrypting password`);
    }
  };

  const compare = (password: string, hashedPassword: string) => {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      throw new Error(`Error comparing passwords`);
    }
  };

  const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error(`Error verifying token`);
    }
  };

  const generateToken = (payload: JwtPayload) => {
    try {
      const data = {
        time: Date(),
        payload,
      };
      const token = jwt.sign(data, config.jwtSecret, {
        expiresIn: 56000,
      });

      return token;
    } catch (error) {
      throw new Error(`Error generating token`);
    }
  };

  return { encryptPassword, compare, verifyToken, generateToken };
};

export default authService;
