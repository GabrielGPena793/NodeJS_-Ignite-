import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car",
      daily_rate: 100.0,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car])
  });

  it("Should be able to list all available cars by brand",  async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car",
      daily_rate: 100.0,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand_Test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand_Test",
    });

    expect(cars).toEqual([car])
  })

  it("Should be able to list all available cars by name",  async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car_new",
      description: "Description car",
      daily_rate: 100.0,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand_Test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car_new",
    });

    expect(cars).toEqual([car])
  })

  it("Should be able to list all available cars by category",  async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car_new",
      description: "Description car",
      daily_rate: 100.0,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand_Test",
      category_id: "1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1234",
    });
    
    expect(cars).toEqual([car])
  })
});
