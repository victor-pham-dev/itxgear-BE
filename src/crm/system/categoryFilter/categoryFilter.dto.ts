import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ProductProptertyFilterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly label: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly valueType: 'STRING' | 'NUMBER' | 'DATETIME' | 'SELECT'

  @ApiProperty()
  @IsArray()
  @IsOptional()
  readonly options: string[]
}

export class CreateCategoryFilterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty()
  readonly description?: string

  @ApiProperty({ type: [ProductProptertyFilterDto] })
  readonly filters: ProductProptertyFilterDto[]
}

export class UpdateCategoryFilterDto extends CreateCategoryFilterDto {
  @ApiProperty()
  readonly id: number
}
