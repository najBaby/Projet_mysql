import { ValidatorOptions, ValidationArguments, registerDecorator } from 'class-validator'
import { getRepository } from 'typeorm'

export function Read(validatorOptions?: ValidatorOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "Read",
      target: object.constructor,
      options: validatorOptions,
      propertyName: propertyName,
      constraints: [],
      validator: {
        async validate(value: Object, _args: ValidationArguments) {
          return getRepository(value.constructor.name).findOne(value).then((e) => {
            if (e) {
              Object.assign(_args.object, { find: e })
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
