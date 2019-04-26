import { Delete } from '../CRUD/Delete'
import { validate } from 'class-validator'

export class Supprimer {
  @Delete()
  find: Object

  constructor(find: Object) {
    this.find = find
  }

  async supprime() {
    let find = await validate(this)
    if (find.length > 0)
      return true
    else
      return false
  }
}
