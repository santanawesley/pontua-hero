import { IMockLogin } from "../../types/interfaces";

const users = [
  { email: "pontua@pontua.com", password: "1" },
  { email: "hero@hero.com", password: "2" },
];

const mockLogin = (email: string, password: string): IMockLogin => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return { isAuthenticated: true };
};

export default mockLogin;
