import { ValidationError } from '@nestjs/common'
import { ValidatorOptions } from 'class-validator'

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean
  disableErrorMessages?: boolean
  exceptionFactory?: (errors: ValidationError[]) => any
  errorHttpStatusCode: 422
}

export const validationOptions: ValidationPipeOptions = {
  transform: true,
  disableErrorMessages: false,
  exceptionFactory: (errors) => {
    return { message: 'Content can not process', errors }
  },
  errorHttpStatusCode: 422,
}
