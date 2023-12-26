import { ApiProperty } from '@nestjs/swagger'

export class CreateUserRoleDto {
  @ApiProperty()
  readonly userId: number

  @ApiProperty()
  readonly roleId: number
}

export class UpdateUserRoleDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly userId: number

  @ApiProperty()
  readonly roleId: number
}
