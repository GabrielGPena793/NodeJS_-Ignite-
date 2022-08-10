import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { ICarsImageRepository } from "../../repositories/ICarImageRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private repository: ICarsImageRepository,
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = await this.carRepository.findById(car_id);

    if (!car) {
      images_name.forEach(async (image) => {
        await deleteFile(`./tmp/cars/${image}`);
      });

      throw new AppError("Car not found", 404);
    }

    const allImages = images_name.map(async (image) => {
      return await this.repository.create(car_id, image);
    });

    allImages.forEach(async (image) => {
      await deleteFile(`./tmp/cars/${(await image).image_name}`);
    });
  }
}

export { UploadCarImagesUseCase };
