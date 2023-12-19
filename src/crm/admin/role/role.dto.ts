import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly alias: string;
}

export class UpdateDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly alias: string;

  @ApiProperty()
  readonly isActive: boolean;
}
