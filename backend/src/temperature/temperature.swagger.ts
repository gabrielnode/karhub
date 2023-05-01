// temperature.swagger.ts
import {
  applyDecorators,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

export const TemperatureSwagger = {
  apiTags: () => ApiTags('Temperature'),
  findBestBeerStyleAndPlaylist: () =>
    applyDecorators(
      Get(),
      ApiOperation({
        summary: 'Find the best beer style and playlist based on temperature',
      }),
      ApiQuery({
        name: 'temp',
        description: 'Temperature in Celsius',
        type: 'number',
      }),
      ApiResponse({
        status: 200,
        description: 'Beer style and playlist found',
      }),
      ApiResponse({
        status: 400,
        description: 'Temperature query parameter is required',
      }),
      ApiResponse({
        status: 404,
        description:
          'No beer style or playlist found for the given temperature',
      }),
    ),
};
