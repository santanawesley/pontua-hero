import { IMockLogin } from "../../types/interfaces";
import jwt from "jsonwebtoken";

const secretKey = process.env.REACT_APP_SECRET_KEY || "";

const users = [
  { id: 1, email: "pontua@pontua.com", password: "1" },
  { id: 2, email: "hero@hero.com", password: "2" },
];

const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "24h" });
};

const mockLogin = (email: string, password: string): IMockLogin => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);
  return { isAuthenticated: true, token };
};

export default mockLogin;
