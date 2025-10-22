import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepositry: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string): Promise<User> {
    const existingUser = await this.usersRepositry.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepositry.create({
      email,
      password: hashedPassword,
      name,
    });

    return this.usersRepositry.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepositry.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepositry.findOne({ where: { id } });
  }
}
