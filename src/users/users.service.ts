import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username } = createUserDto;

    if (this.findByUsername(username)) {
      throw new HttpException('User already exists', 409);
    }

    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.findByUsername(username);

    if (!user) throw new HttpException('User not found', 404);

    if (user.password !== password) {
      throw new HttpException('Invalid credentials', 401);
    }

    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne(username);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) return new NotFoundException("User doesn't exist!");

    return await this.usersRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete({ id });
  }
}
