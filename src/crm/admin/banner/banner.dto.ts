import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly img: string

  @ApiProperty()
  readonly link: string
}

export class UpdateDto extends CreateDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly active: boolean
}
