import { ApiProperty } from '@nestjs/swagger'

export class CreateBannerDto {
  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly img: string

  @ApiProperty()
  readonly link: string
}

export class UpdateBannerDto extends CreateBannerDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly active: boolean
}
