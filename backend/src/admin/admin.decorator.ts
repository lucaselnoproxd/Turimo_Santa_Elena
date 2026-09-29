import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { currentAdmin, type AdminUser } from './admin-auth.guard';

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AdminUser => {
    return currentAdmin(context);
  },
);

export function adminName(admin: AdminUser): string {
  return admin.sub === 'admin' ? 'admin' : admin.sub;
}
