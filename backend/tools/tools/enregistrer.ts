import { Create } from '../CRUD/Create'
import { validate } from 'class-validator'

export class Enregistrer {
  @Create()
  create: Object

  constructor(create: Object) {
    this.create = create
  }

  async enregistre() {
    let create = await validate(this)
    if (create.length > 0)
      return true
    else {
      return false
    }
  }
}
