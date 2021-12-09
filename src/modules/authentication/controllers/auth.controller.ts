import { Controller } from '../../../shared/utils/decorators/controller.decorator'
import { Route } from '../../../shared/utils/decorators/route.decorator'
import { Request, Response } from 'express'
import { ValidateBody } from '../../../shared/utils/decorators/validate-body.decorator'
import { CreateUserDto } from '../../users/dtos/create-user.dto'
import { container, injectable } from 'tsyringe'
import UserModel, { UserRoles } from '../../users/models/user.model'
import { UserLoginDto } from '../dtos/user-login.dto'

@Controller
@injectable()
export class AuthController {
  @Route('Post', '/sign-up')
  async userSignUp(@ValidateBody(CreateUserDto) req: Request, res: Response) {
    req.body.roles = UserRoles.User
    const createReturn = await UserModel.query().insert(req.body)
    res.send(createReturn)
  }

  @Route('Post', '/login')
  async userLogin(@ValidateBody(UserLoginDto) req: Request, res: Response) {
    const queriedUser = await UserModel.query().first().where({ email: req.body.email })
    const validPassword = await queriedUser.verifyPassword(req.body.password)
    res.send(validPassword ? 'correct password' : 'wrong password')
  }
}

container.register(AuthController, AuthController)
