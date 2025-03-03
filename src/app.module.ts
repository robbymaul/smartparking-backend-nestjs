import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CommonModule, MiddlewareModule, InfrastructureModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
