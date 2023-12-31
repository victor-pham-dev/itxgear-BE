import { ApiProperty } from '@nestjs/swagger'
import { ProductStatus } from '@prisma/client'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

export class CreateProductConfigDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string
}

export class UpdateProductConfigDto extends CreateProductConfigDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: number
}

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number

  @ApiProperty()
  @IsNotEmpty()
  readonly status: ProductStatus

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly images: string[]

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly overView: string[]

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  readonly code: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly seo: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly keywords: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number

  @ApiProperty()
  @IsNumber()
  readonly salePrice: number
}

export class CreateProductDto extends ProductDto {
  readonly id?: number

  @ApiProperty()
  @IsNotEmpty()
  readonly configInfo: CreateProductConfigDto[]
}

export class UpdateProductDto extends ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly configInfo: UpdateProductConfigDto[]

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean
}
