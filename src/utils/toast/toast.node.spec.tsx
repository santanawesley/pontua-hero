import showToast from "./index";
import { toast } from "react-toastify";

// Simulando a biblioteca react-toastify
jest.mock("react-toastify", () => {
  return {
    toast: {
      info: jest.fn(),
      error: jest.fn(),
      success: jest.fn(),
    },
  };
});

describe("showToast Function", () => {
  it("should call toast.info for info type", () => {
    showToast("info", "Test Message");
    expect(toast.info).toHaveBeenCalledWith("Test Message", expect.anything());
  });

  it("should call toast.error for error type", () => {
    showToast("error", "Error Message");
    expect(toast.error).toHaveBeenCalledWith(
      "Error Message",
      expect.anything()
    );
  });

  it("should call toast.success for success type", () => {
    showToast("success", "Success Message");
    expect(toast.success).toHaveBeenCalledWith(
      "Success Message",
      expect.anything()
    );
  });
});
