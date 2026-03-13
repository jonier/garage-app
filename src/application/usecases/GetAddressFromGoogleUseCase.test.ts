test("should throw if no api key", async () => {
  const usecase = new (require("./GetAddressFromGoogleUseCase").GetAddressFromGoogleUseCase)();

  await expect(usecase.execute("Montreal")).rejects.toThrow();
});
