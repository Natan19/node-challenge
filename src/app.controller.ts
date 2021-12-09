import { Request, Response } from 'express'
import { Controller } from './shared/utils/decorators/controller.decorator'
import { Route } from './shared/utils/decorators/route.decorator'

@Controller
export class AppController {
  @Route('Get', '/')
  async getTest(_req: Request, res: Response) {
    res.send('API is running, have fun!')
  }
}
