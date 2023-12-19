import { ApiProperty } from '@nestjs/swagger'

export class CategoryProps {
  @ApiProperty()
  readonly alias: string
  @ApiProperty()
  readonly description: string
  @ApiProperty()
  readonly label: string
  @ApiProperty()
  readonly icon: string
  @ApiProperty()
  readonly parentId?: number
}

export class CreateDto extends CategoryProps {
  children: CategoryProps[]
}

export class EditCategoryProps extends CategoryProps {
  @ApiProperty()
  readonly id: number
}

export class UpdateDto extends EditCategoryProps {
  children: EditCategoryProps[]
}
