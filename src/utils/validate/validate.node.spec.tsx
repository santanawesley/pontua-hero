import validate from ".";

describe("validate Functions", () => {
  describe("validateEmail", () => {
    it("should return true for a valid email", () => {
      expect(validate.validateEmail("test@example.com")).toBe(true);
    });

    it("should return false for an invalid email", () => {
      expect(validate.validateEmail("testexample.com")).toBe(false);
    });
  });
});
