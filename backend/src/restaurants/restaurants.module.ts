import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantsService } from './restaurants.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RestaurantResolver, RestaurantsService],
})
export class RestaurantsModule {}
