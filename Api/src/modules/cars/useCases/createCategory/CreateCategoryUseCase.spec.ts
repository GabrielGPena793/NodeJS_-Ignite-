import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const { name, description } = {
      name: "Category Test",
      description: "Category description",
    };

    await createCategoryUseCase.execute({
      name,
      description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {

    expect( async() => {
      const { name, description } = {
        name: "Category Test",
        description: "Category description",
      };
  
      await createCategoryUseCase.execute({
        name,
        description,
      });
  
      await createCategoryUseCase.execute({
        name,
        description,
      });
    }).rejects.toBeInstanceOf(AppError)

  });
});
