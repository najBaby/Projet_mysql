import { ValidatorOptions, ValidationArguments, registerDecorator } from 'class-validator'
import { getRepository } from 'typeorm'

export function ReadAll(validatorOptions?: ValidatorOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "ReadAll",
      target: object.constructor,
      options: validatorOptions,
      propertyName: propertyName,
      constraints: [],
      validator: {
        async validate(value: Object, _args: ValidationArguments) {
          return getRepository(value.constructor.name).find(value).then((e) => {
            if (e.length > 0) {
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
