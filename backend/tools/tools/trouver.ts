import { ReadAll } from '../CRUD/ReadAll'
import { validate } from 'class-validator'

export class Trouver {
  @ReadAll()
  find: Object

  constructor(find: Object) {
    this.find = find
  }

  async trouve() {
    let find = await validate(this)
    if (find.length > 0)
      return (<any>find[0].target).find
    else
      return false
  }
}
