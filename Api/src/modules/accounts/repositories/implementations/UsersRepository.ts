import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Users } from "../../entities/Users";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getRepository(Users);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({email})
    return user;
  }

  async findById(id: string): Promise<Users> {
    const user = await this.repository.findOne(id)
    return user;
  }
}

export { UsersRepository };
