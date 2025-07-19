// Teste simples para verificar se Jest está funcionando
describe("Jest Configuration", () => {
  it("should run basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle arrays", () => {
    const numbers = [1, 2, 3];
    expect(numbers).toHaveLength(3);
    expect(numbers).toContain(2);
  });

  it("should handle objects", () => {
    const project = {
      id: "1",
      name: "Test Project",
      status: "deployed",
    };

    expect(project).toHaveProperty("id", "1");
    expect(project).toHaveProperty("name", "Test Project");
    expect(project.status).toBe("deployed");
  });
});
