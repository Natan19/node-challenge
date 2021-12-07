import { autoInjectable, singleton } from 'tsyringe'
import { Controller } from '../../../shared/utils/decorators/controller.decorator'
import { Route } from '../../../shared/utils/decorators/route.decorator'
import { Request, Response } from 'express'

@Controller
export class AuthController {
  @Route('Get', '/')
  async getUsers(req: Request, res: Response) {
    res.send('brabo')
  }

  @Route('Post', '/teste')
  async receivePost(req: Request, res: Response) {
    console.log(req.body)
    res.send('received')
  }
}
