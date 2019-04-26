import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { getRepository } from 'typeorm'


export function Create(propriety: string, validationOptions: ValidationOptions) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "Create",
            target!: object.constructor,
            propertyName!: propertyName,
            constraints!: [],
            options: validationOptions,
            validator: {
                async validate(value: [], args: ValidationArguments) {

                    let repository = getRepository(args.object.constructor.name)
                    let f = await repository.findOne((<any>args.object).id, { relations: [propriety] })
                    if (f) {
                        value.forEach(e => {
                            (<any>f).rel.push(e)
                        })
                        repository.save(f)
                        return true
                    } else {
                        return false
                    }
                }
            }
        })
    }
}
