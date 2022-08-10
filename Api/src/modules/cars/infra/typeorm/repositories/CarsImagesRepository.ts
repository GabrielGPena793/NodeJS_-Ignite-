import { getRepository, Repository } from "typeorm";
import { ICarsImageRepository } from "../../../repositories/ICarImageRepository";
import { CarImage } from "../entities/CarImage";



class CarsImagesRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor(){
    this.repository = getRepository(CarImage)
  }


  async create(car_id: string, image_name: string): Promise<CarImage> {

    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    const imageCar = await this.repository.save(carImage);

    return imageCar;
  }

  findAllImagesByCarId(car_id: string): Promise<CarImage[]> {
    const allImages = this.repository.find({ car_id })

    return allImages;
  }
}

export { CarsImagesRepository }