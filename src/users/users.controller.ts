
import { UseGuards, Request, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PurchasePackageDto } from './dto/purchase-package.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // GET /users
  // API lấy thông tin user hiện tại (profile) dựa vào accessToken
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.usersService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    return this.usersService.update(id, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('purchase-package')
  purchasePackage(
    @Request() req,
    @Body() purchasePackageDto: PurchasePackageDto,
  ) {
    const userId = req.user._id;
    return this.usersService.purchasePackage(userId, purchasePackageDto);
  }
}