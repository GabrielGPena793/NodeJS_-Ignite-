import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

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

      const existsCategory = this.categoryRepository.findByName(name);

      if(!existsCategory){
        this.categoryRepository.create({name, description})
      }
    })
  }
}

export { ImportCategoryUseCase };