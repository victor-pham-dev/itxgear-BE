import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
  @ApiProperty()
  readonly userId: number

  @ApiProperty()
  readonly roleId: number
}

export class UpdateDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly userId: number

  @ApiProperty()
  readonly roleId: number
}
