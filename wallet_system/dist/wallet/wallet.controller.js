"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const wallet_service_1 = require("./wallet.service");
const decorator_1 = require("../auth/decorator");
const dto_1 = require("./dto");
const class_validator_1 = require("class-validator");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async getBalance(user) {
        if (!user) {
            throw new common_1.NotFoundException('User not found ,try to login again or try after some time');
        }
        return this.walletService.getBalance(user.id);
    }
    async addAmount(user, dto) {
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('Validation failed: ' + JSON.stringify(errors));
        }
        return this.walletService.addAmount(dto, user.id);
    }
    async withdrawAmount(user, dto) {
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('Validation failed: ' + JSON.stringify(errors));
        }
        return this.walletService.withdrawAmount(dto, user.id);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Get)('get-balance'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('add-amount'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.WalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "addAmount", null);
__decorate([
    (0, common_1.Post)('withdraw-amount'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.WalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "withdrawAmount", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map