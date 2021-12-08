import { autoInjectable, singleton } from 'tsyringe'
import { Controller } from '../../../shared/utils/decorators/controller.decorator'
import { Route } from '../../../shared/utils/decorators/route.decorator'
import { Request, Response } from 'express'
import { ValidateBody } from '../../../shared/utils/decorators/validate-body.decorator'
import { UserDto } from '../../users/dtos/user.dto'

@Controller
export class AuthController {
  @Route('Get', '/')
  async getTeste(_req: Request, res: Response) {
    res.send('API is running, have fun!')
  }

  @Route('Post', '/sign-up')
  async userSignUp(@ValidateBody(UserDto) req: Request, res: Response) {
    res.send('received')
  }
}
