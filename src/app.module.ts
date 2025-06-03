import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { BranchesModule } from './branches/branches.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [AuthModule, UsersModule, ShopsModule, BranchesModule, ProductsModule, OrdersModule, CustomersModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
