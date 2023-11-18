import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}

export class LoginUserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
