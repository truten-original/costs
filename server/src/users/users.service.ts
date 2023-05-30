import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User, UsersDocument } from 'src/schemas/users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UsersModel: Model<UsersDocument>,
  ) {}
  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.UsersModel.collection.findOne({
      username: createUserDto.username,
    });
    if (existingUser) {
      return null;
    }
    const createdUser = new this.UsersModel(createUserDto);
    return createdUser.save();
  }
  async findOne(username: string): Promise<User> {
    return this.UsersModel.findOne({ username });
  }
  async login(loginUser: LoginUserDto): Promise<User | null> {
    const user = await this.UsersModel.collection.findOne({
      username: loginUser.username,
    });
    if (!user) {
      return null;
    }
    return user as User;
  }
}
