import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create({
    name,
    brand,
    daily_rate,
    description,
    fine_amount,
    category_id,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      category_id,
      license_plate,
    })

    this.cars.push(car)

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

}

export { CarsRepositoryInMemory };
