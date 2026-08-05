"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeachesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const beaches_controller_1 = require("./beaches.controller");
const beaches_service_1 = require("./beaches.service");
const beach_entity_1 = require("./beach.entity");
let BeachesModule = class BeachesModule {
};
exports.BeachesModule = BeachesModule;
exports.BeachesModule = BeachesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([beach_entity_1.Beach])],
        controllers: [beaches_controller_1.BeachesController],
        providers: [beaches_service_1.BeachesService],
        exports: [beaches_service_1.BeachesService],
    })
], BeachesModule);
//# sourceMappingURL=beaches.module.js.map