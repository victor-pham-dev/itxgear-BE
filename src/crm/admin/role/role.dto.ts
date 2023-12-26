import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly alias: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly alias: string;

  @ApiProperty()
  readonly isActive: boolean;
}
