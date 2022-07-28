import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../entities/Users";


interface IUsersRepository {

  findByEmail(email: string): Promise<Users>;

  create(data: ICreateUserDTO): Promise<void>;

}

export { IUsersRepository };