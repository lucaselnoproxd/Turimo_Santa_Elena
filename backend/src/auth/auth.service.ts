import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import type { JwtUser } from './jwt-auth.guard';

export interface PublicUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResult {
  token: string;
  user: PublicUser;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private toPublic(user: User): PublicUser {
    return { id: user.id, email: user.email, name: user.name };
  }

  private sign(user: User): string {
    return this.jwt.sign(
      { userId: user.id, email: user.email },
      {
        secret: this.config.get('JWT_SECRET', 'dev-secret'),
        expiresIn: '30d',
      },
    );
  }

  async register(input: {
    name?: string;
    email: string;
    password: string;
  }): Promise<AuthResult> {
    const email = input.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Correo electrónico no válido');
    }
    if (input.password.length < 6) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 6 caracteres',
      );
    }

    const existing = await this.users.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Ya existe una cuenta con ese correo');
    }

    const user = await this.users.save(
      this.users.create({
        email,
        name: input.name?.trim() || email.split('@')[0],
        passwordHash: bcrypt.hashSync(input.password, 10),
      }),
    );

    return { token: this.sign(user), user: this.toPublic(user) };
  }

  async login(input: { email: string; password: string }): Promise<AuthResult> {
    const email = input.email.trim().toLowerCase();
    const user = await this.users.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(input.password, user.passwordHash)) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    return { token: this.sign(user), user: this.toPublic(user) };
  }

  async me(payload: JwtUser): Promise<PublicUser> {
    const user = await this.users.findOne({ where: { id: payload.userId } });
    if (!user) {
      throw new UnauthorizedException('Cuenta no encontrada');
    }
    return this.toPublic(user);
  }
}
