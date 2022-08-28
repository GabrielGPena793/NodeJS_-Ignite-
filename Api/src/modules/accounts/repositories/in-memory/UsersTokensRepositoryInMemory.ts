import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../../infra/typeorm/entities/UsersTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UsersTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    );
 
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const usersTokens = this.usersTokens.filter((token) => token.id !== id);

    this.usersTokens = usersTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (token) => token.refresh_token === refresh_token
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
