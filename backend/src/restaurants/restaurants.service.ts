import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaPromise } from '@prisma/client';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        owner: true,
        category: true,
      },
    });

    return restaurants;
  }

  async createRestaurant(data: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = await this.prisma.restaurant.create({
      data: {
        name: data.name,
        address: data.address,
        owner: data.owner,
        category: data.category,
      },
    });

    return newRestaurant;
  }

  async updateRestaurant(
    id: number,
    data: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const updatedRestaurant = await this.prisma.restaurant.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        owner: data.owner,
        category: data.category,
      },
    });

    return updatedRestaurant;
  }

  async deleteRestaurant(id: number): Promise<Restaurant> {
    const deletedRestaurant = await this.prisma.restaurant.delete({
      where: { id },
    });

    return deletedRestaurant;
  }
}
