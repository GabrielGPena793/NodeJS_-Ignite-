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
    id,
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
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available === true);

    if (brand || category_id || name) {
      cars = cars.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
      );
    }

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }
}

export { CarsRepositoryInMemory };
