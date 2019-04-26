import { ValidatorOptions, ValidationArguments, registerDecorator } from 'class-validator'
import { getRepository } from 'typeorm'

export function Update(validatorOptions?: ValidatorOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "Update",
      target: object.constructor,
      options: validatorOptions,
      propertyName: propertyName,
      constraints: [],
      validator: {
        async validate(value: Object, _args: ValidationArguments) {
          return getRepository(value.constructor.name).update((<any>value).id, value).then((e) => {
            if (e) {
              return false
            }
            else
              return true
          }).catch(() => {
            return true
          })
        }
      }
    })
  }
}
