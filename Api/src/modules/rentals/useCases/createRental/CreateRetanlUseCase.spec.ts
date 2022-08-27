import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dateAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      brand: "brand Test",
      daily_rate: 100,
      description: "car for test",
      fine_amount: 50,
      category_id: "123",
      license_plate: "AFS54421",
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dateAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if another open to the same user", async () => {

    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: dateAdd24Hours,
      user_id:  "12345"
    })

    await expect(createRentalUseCase.execute({
        user_id: "12345",
        car_id: "11111",
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able to create a new rental if another open to the same car", async () => {

    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: dateAdd24Hours,
      user_id:  "12345"
    })

    await expect(createRentalUseCase.execute({
        user_id: "1234502",
        car_id: "121212",
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));


  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
        user_id: "1234501",
        car_id: "12345",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
