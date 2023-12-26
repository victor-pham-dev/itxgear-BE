import { ApiProperty } from '@nestjs/swagger'
import { ProductStatus } from '@prisma/client'

export class CreateProductConfigDto {
  @ApiProperty()
  label: string

  @ApiProperty()
  value: string
}

export class UpdateProductConfigDto extends CreateProductConfigDto {
  @ApiProperty()
  id: number
}

export class ProductDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty()
  readonly categoryId: number

  @ApiProperty()
  readonly status: ProductStatus

  @ApiProperty()
  readonly images: string[]

  @ApiProperty()
  readonly overView: string[]

  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly code: string

  @ApiProperty()
  readonly seo: string

  @ApiProperty()
  readonly keywords: string

  @ApiProperty()
  readonly price: number

  @ApiProperty()
  readonly salePrice: number
}

export class CreateProductDto extends ProductDto {
  @ApiProperty()
  readonly configInfo: CreateProductConfigDto[]
}

export class UpdateProductDto extends ProductDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly configInfo: UpdateProductConfigDto[]

  @ApiProperty()
  readonly active: boolean
}
