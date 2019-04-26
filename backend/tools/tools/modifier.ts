import { Update } from '../CRUD/Update'
import { validate } from 'class-validator'

export class Modifier {
  @Update()
  find: Object

  constructor(find: Object) {
    this.find = find
  }

  async modifie() {
    let find = await validate(this)
    if (find.length > 0)
      return true
    else
      return false
  }
}
