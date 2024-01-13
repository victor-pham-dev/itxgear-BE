import { HttpException, HttpStatus } from '@nestjs/common'

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only allow jpg|jpeg|png|gif',
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      false,
    )
  }
  callback(null, true)
}

export const editFileName = (file: any) => {
  const name = file.originalname.split('.')[0]
  // const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  return `${name}-${randomName}`
}
