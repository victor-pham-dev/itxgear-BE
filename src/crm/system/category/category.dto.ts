import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CategoryProps {
  readonly id?: any

  @ApiProperty()
  readonly description?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly label: string

  @ApiProperty()
  readonly icon?: string

  @ApiProperty()
  readonly parentId?: number

  @ApiProperty()
  readonly active?: boolean
}

export class CreateCategoryDto extends CategoryProps {
  // children: CategoryProps[]
}

export class EditCategoryProps extends CategoryProps {
  @ApiProperty()
  readonly id: number
}

export class UpdateCategoryDto extends EditCategoryProps {
  children: EditCategoryProps[]
}

export class UpdateCategoryFilterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly categoryFilterId: number

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly applyForChildren?: boolean
}
