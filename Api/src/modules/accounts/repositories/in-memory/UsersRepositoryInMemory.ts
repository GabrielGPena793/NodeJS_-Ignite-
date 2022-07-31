import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Users } from "../../infra/typeorm/entities/Users";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory  implements IUsersRepository {

  users: Users[] = [];


  async findByEmail(email: string): Promise<Users> {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, password, driver_license  }: ICreateUserDTO): Promise<void> {
    const user = new Users()

    Object.assign(user, {
      name,
      email,
      password,
      driver_license
    })


    this.users.push(user);
  }

  async findById(id: string): Promise<Users> {
    return this.users.find(user =>  user.id === id);
  }

}

export  { UsersRepositoryInMemory };