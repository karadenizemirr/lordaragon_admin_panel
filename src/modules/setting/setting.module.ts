import { Module } from "@nestjs/common";
import { SettingController } from "./setting.controller";

@Module({
    controllers: [SettingController],
    providers: [],
    exports: [],
})

export class SettingModule {}