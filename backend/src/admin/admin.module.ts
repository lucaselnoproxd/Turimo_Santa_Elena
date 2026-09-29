import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminGuard } from './admin-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminAuthService, AdminGuard],
  exports: [AdminGuard, JwtModule],
})
export class AdminModule {}
