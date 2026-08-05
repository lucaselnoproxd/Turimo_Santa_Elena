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
exports.BeachesSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const beach_entity_1 = require("./beach.entity");
let BeachesSeed = class BeachesSeed {
    beachesRepository;
    constructor(beachesRepository) {
        this.beachesRepository = beachesRepository;
    }
    async onModuleInit() {
        const count = await this.beachesRepository.count();
        if (count > 0)
            return;
        const beaches = [
            {
                name: 'Montañita',
                shortDescription: 'El paraíso del surf en Ecuador',
                longDescription: 'Montañita es uno de los destinos playeros más famosos de Ecuador, conocido internacionalmente por sus olas perfectas para el surf. Este pequeño pueblo pesquero se ha convertido en un punto de encuentro para viajeros de todo el mundo, ofreciendo una vibrante vida nocturna, una deliciosa gastronomía costera y un ambiente bohemio único. Sus extensas playas de arena dorada y su clima cálido durante todo el año la convierten en el destino ideal tanto para surfistas experimentados como para principiantes que quieren aprender.',
                location: 'Santa Elena, Ecuador',
                latitude: -1.8295,
                longitude: -80.7518,
                imageUrl: '/images/montanita.jpg',
                activities: ['Surf', 'Fiestas', 'Gastronomía', 'Avistamiento de aves'],
                rating: 5,
                bestSeason: 'Diciembre - Mayo',
            },
            {
                name: 'Salinas',
                shortDescription: 'Elegancia y mar en la península',
                longDescription: 'Salinas es la capital turística de la provincia de Santa Elena, famosa por sus lujosos balnearios, su malecón moderno y sus playas de aguas tranquilas. Es el destino preferido por familias y jóvenes que buscan disfrutar del sol, el mar y una amplia variedad de deportes acuáticos. Su famoso "Malecón de Salinas" ofrece una vista espectacular del océano, con restaurantes, bares y tiendas que lo convierten en el lugar perfecto para pasear tanto de día como de noche.',
                location: 'Santa Elena, Ecuador',
                latitude: -2.2142,
                longitude: -80.9676,
                imageUrl: '/images/salinas.jpg',
                activities: ['Jet Ski', 'Pesca deportiva', 'Gastronomía', 'Ciclismo'],
                rating: 4,
                bestSeason: 'Todo el año',
            },
            {
                name: 'Ayangue',
                shortDescription: 'La piscina del Pacífico',
                longDescription: 'Conocida cariñosamente como "La Piscina del Pacífico", Ayangue es una tranquila caleta de pescadores que enamora a sus visitantes con sus aguas cristalinas y su ambiente sereno. Sus playas están protegidas por formaciones rocosas naturales que crean una bahía de aguas calmadas, perfecta para nadar, hacer snorkel y buceo. Es el lugar ideal para quienes buscan escapar del ruido y conectarse con la naturaleza en un entorno paradisíaco.',
                location: 'Santa Elena, Ecuador',
                latitude: -1.8792,
                longitude: -80.7405,
                imageUrl: '/images/ayangue.jpg',
                activities: ['Snorkel', 'Buceo', 'Kayak', 'Avistamiento de ballenas'],
                rating: 5,
                bestSeason: 'Junio - Noviembre',
            },
        ];
        await this.beachesRepository.save(beaches);
    }
};
exports.BeachesSeed = BeachesSeed;
exports.BeachesSeed = BeachesSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(beach_entity_1.Beach)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BeachesSeed);
//# sourceMappingURL=beaches.seed.js.map