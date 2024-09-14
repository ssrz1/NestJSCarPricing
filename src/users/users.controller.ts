import { Body, Controller, Post , Get, Patch,DefaultValuePipe, Param, Query, Delete, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

// @Controller('users')
//this controller decorator will use as a prefix for all the routes
// loaclhost:3000/users/anuthingElse
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post('/signup')
        createUser(@Body() body: CreateUserDto){
            //since it is signup it will have some parameter email password
            //we want to receive and validate incoming request
            //so to validate remember we need to create DTO using class validatr package
            this.userService.create(body.email, body.password)
    }

    //Follow lecture 58 of stphen grinder course
        @UseInterceptors(ClassSerializerInterceptor)
        @Get('/:id')
            findUser(@Param('id') id: string){
                return this.userService.findOne(parseInt(id))
            }
    
        @Get()
        findAllUsers(@Query('email') email:string){
            return this.userService.find(email);
        }
        @Delete('/:id')
        removeUser(@Query('id') id: string){
            return this.userService.remove(parseInt(id));

        }

        @Patch('/:id')
        updateUser(@Param('id') id:string, @Body()body:UpdateUserDto){
                return this.userService.update(parseInt(id), body);
        }
}
