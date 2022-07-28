import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
    ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
  
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);        //criando uma stream de leitura, passando o caminho do arquivo
      const categories: IImportCategory[] = [];
  
      const parseFile = csvParse();
  
      stream.pipe(parseFile);                               //criando uma stream de leitura, passando o caminho do arquivo
  
      parseFile.on("data", async (line) => {                //tipo do evento "data", para cada linha irá fazer algo
        const [name, description] = line;
  
        categories.push({
          name,
          description,
        })
      })
      .on("end", () => {
        fs.promises.unlink(file.path)                     // remove o arquivo lido
        resolve(categories)
      })
      .on("error", (err) =>{
        reject(err)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map( async category => {
      const { name, description } = category;

      const existsCategory = await  this.categoryRepository.findByName(name);

      if(!existsCategory){
        await this.categoryRepository.create({name, description})
      }
    })
  }
}

export { ImportCategoryUseCase };
