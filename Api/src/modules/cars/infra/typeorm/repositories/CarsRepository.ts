import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    name,
    license_plate,
    fine_amount,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      name,
      license_plate,
      fine_amount,
      specifications,
      id,
    })

    return await this.repository.save(car);

  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = this.repository
    .createQueryBuilder("c")
    .where("available = :available", { available: true })

    if(brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }

    if(name) {
      carsQuery.andWhere("name = :name", { name })
    }
    
    if(category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
    .createQueryBuilder()
    .update()
    .set({available})
    .where("id = :id")
    .setParameters({ id })
    .execute()
  }

}

export { CarsRepository };
