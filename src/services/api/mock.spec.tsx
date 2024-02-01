import mockLogin from "./mock";

describe("mockLogin", () => {
  it("should return a valid authentication object for correct credentials", () => {
    const result = mockLogin("pontua@pontua.com", "1");
    expect(result.isAuthenticated).toBe(true);
  });

  it("should throw an error for invalid credentials", () => {
    expect(() =>
      mockLogin("usuario@dominio.com", "senha_incorreta")
    ).toThrowError("Invalid credentials");
  });
});
