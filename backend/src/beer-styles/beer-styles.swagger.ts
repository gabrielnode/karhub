// beer-styles.swagger.ts
import {
  applyDecorators,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const BeerStylesSwagger = {
  apiTags: () => ApiTags('Beer Styles'),
  findAll: () =>
    applyDecorators(
      Get(),
      ApiOperation({
        summary: 'Find all beer styles',
      }),
      ApiResponse({
        status: 200,
        description: 'Beer styles found',
      }),
    ),
  findOne: () =>
    applyDecorators(
      Get(':id'),
      ApiOperation({
        summary: 'Find one beer style by ID',
      }),
      ApiResponse({
        status: 200,
        description: 'Beer style found',
      }),
      ApiResponse({
        status: 404,
        description: 'Beer style not found',
      }),
    ),
  create: () =>
    applyDecorators(
      Post(),
      ApiOperation({
        summary: 'Create a new beer style',
      }),
      ApiResponse({
        status: 201,
        description: 'Beer style created',
      }),
    ),
  update: () =>
    applyDecorators(
      Put(':id'),
      ApiOperation({
        summary: 'Update a beer style by ID',
      }),
      ApiResponse({
        status: 200,
        description: 'Beer style updated',
      }),
      ApiResponse({
        status: 404,
        description: 'Beer style not found',
      }),
    ),
  delete: () =>
    applyDecorators(
      Delete(':id'),
      ApiOperation({
        summary: 'Delete a beer style by ID',
      }),
      ApiResponse({
        status: 200,
        description: 'Beer style deleted',
      }),
      ApiResponse({
        status: 404,
        description: 'Beer style not found',
      }),
    ),
};
