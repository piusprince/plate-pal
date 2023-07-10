import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.getAll();
  }

  @Mutation((returns) => Restaurant)
  createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  @Mutation((returns) => Restaurant)
  updateResturant(
    @Args('id') id: number,
    @Args('input') updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  }

  @Mutation((returns) => Restaurant)
  deleteRestaurant(@Args('id') id: number): Promise<Restaurant> {
    return this.restaurantsService.deleteRestaurant(id);
  }
}
