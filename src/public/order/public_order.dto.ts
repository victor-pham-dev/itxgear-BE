import { ApiProperty } from '@nestjs/swagger'
import { OrderPaymentMethod } from '@prisma/client'
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class Item {
  @ApiProperty()
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsNumber()
  quantity: number
}

export class OrderReceiverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string
}

export class OrderPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly method: OrderPaymentMethod

  @ApiProperty()
  readonly voucher: string
}

export class CreateOrderDto {
  @ApiProperty()
  receiver: OrderReceiverDto
  @ApiProperty()
  payment: OrderPaymentDto
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  items: Item[]
  @ApiProperty()
  note: string
}
