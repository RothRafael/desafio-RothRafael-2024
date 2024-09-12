import { Animal } from './Animal.js';
import { Recinto } from './Recinto.js';

class RecintosZoo {
    constructor() {
        this.recintos = [];
        this.animalMap;
        this.inicializarAnimalMap();
        this.inicializarRecintos();
    }
    
    analisaRecintos(animal, quantidade) {
        
        // Verifica se o animal ou quantidade é válido
        if (!(animal in this.animalMap)) {
            return { erro: "Animal inválido" };
        } else if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        const recintosViaveis = [];

        // Verifica se o recinto é viável com 'adicionaAnimal'
        for (let i = 0; i < this.recintos.length; i++) {
            if (this.recintos[i].adicionaAnimal(this.animalMap[animal], quantidade)) {
                recintosViaveis.push(this.recintos[i].toString());
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        } else {
            return { recintosViaveis };
        }
    }

    // Inicializa recintos para testes
    inicializarRecintos() {
        this.recintos[0] = new Recinto(1, 10, ["savana"]);
        this.recintos[0].adicionaAnimal(this.animalMap.MACACO, 3);

        this.recintos[1] = new Recinto(2, 5, ["floresta"]);

        this.recintos[2] = new Recinto(3, 7, ["savana" , "rio"]);
        this.recintos[2].adicionaAnimal(this.animalMap.GAZELA, 1);

        this.recintos[3] = new Recinto(4, 8, ["rio"]);

        this.recintos[4] = new Recinto(5, 9, ["savana"]);
        this.recintos[4].adicionaAnimal(this.animalMap.LEAO, 1);
    }

    // Inicializa animalMap
    inicializarAnimalMap() {
        this.animalMap = {
            "LEAO": new Animal("LEAO", 3, ["savana"], "CARNIVORO"),
            "LEOPARDO": new Animal("LEOPARDO", 2, ["savana"], "CARNIVORO"),
            "CROCODILO": new Animal("CROCODILO", 3, ["rio"], "CARNIVORO"),
            "MACACO": new Animal("MACACO", 1, ["savana", "floresta"], "ONIVORO"),
            "GAZELA": new Animal("GAZELA", 2, ["savana"], "HERBIVORO"),
            "HIPOPOTAMO": new Animal("HIPOPOTAMO", 4, ["savana", "rio"], "HERBIVORO"),
        }
    }
}
export { RecintosZoo as RecintosZoo };