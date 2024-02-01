const validate = {
  validateEmail(input: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  },
};

export default validate;
