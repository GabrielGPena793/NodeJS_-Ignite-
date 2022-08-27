import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens"

interface IUsersTokensRepository {

  create({user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<UsersTokens>

}

export { IUsersTokensRepository }