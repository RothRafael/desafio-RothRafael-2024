class Animal {
    constructor(especie, tamanho, tipoRecinto = [], dieta) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.tipoRecinto = tipoRecinto;
        this.dieta = dieta;
    }
}

class Recinto {
    constructor(id, tamanho, tipo, especiesPresentes = []) {
        this.id = id;
        this.tamanho = tamanho;
        this.tipo = tipo;
        this.especiesPresentes = especiesPresentes;
        this.espacoLivre = tamanho;
        this.maisDeUmaEspecie = false;
    }
    
    // Método principal que adiciona o animal
    adicionaAnimal(animal, quantidade) {
        if (!this.temEspacoSuficiente(animal, quantidade)) {
            return false;
        }

        if (!this.tipoAdequado(animal)) {
            return false;
        }

        if (this.dietaCompatível(animal)) {
            return false;
        }

        if (!this.animaisCompativeis(animal, quantidade)) {
            return false;
        }


        this.atualizaEspeciesPresentes(animal);


        this.espacoLivre -= (animal.tamanho * quantidade);

        return true;
    }

    atualizaEspeciesPresentes(animal) {
        if (this.especiesPresentes.length === 0 || !this.especiesPresentes.includes(animal)) {
            this.especiesPresentes.push(animal);
        }

        if (this.especiesPresentes.length === 2 || !this.especiesPresentes.includes(animal)) {
            this.espacoLivre -= 1;
        }
    }
            
    animaisCompativeis(animal, quantidade) {
        if (!this.hipopotamoCompatível(animal)) {
            return false;
        }

        if (!this.macacoCompatível(animal, quantidade)) {
            return false;
        }
        
        return true;
    }
    // Verifica se há espaço suficiente para o animal
    temEspacoSuficiente(animal, quantidade) {
        return (this.espacoLivre >= (animal.tamanho * quantidade));
    }

    // Verifica se o tipo do recinto é adequado para o animal
    tipoAdequado(animal) {
        return animal.tipoRecinto.some(tipo => this.tipo.includes(tipo));
    }

    // Verifica se a dieta do animal é compatível com a dieta das espécies presentes
    dietaCompatível(animal) {
        return (this.especiesPresentes.some(especie => especie.dieta !== "CARNIVORO" && animal.dieta === "CARNIVORO"
             || especie.dieta === "CARNIVORO" && animal.dieta !== "CARNIVORO"))
    }

    // Verifica se um hipopótamo pode ser adicionado ao recinto
    hipopotamoCompatível(animal) {
        if (animal.especie === "HIPOPOTAMO") {
            return this.tipo.length === 2 || this.especiesPresentes.length === 0;
        }
        return true;
    }

    // Verifica se um macaco pode ser adicionado ao recinto
    macacoCompatível(animal, quantidade) {
        if (animal.especie === "MACACO") {
            return !(this.especiesPresentes.length === 0 && quantidade === 1);
        }
        return true;
    }

    toString() {
        return `Recinto ${this.id} (espaço livre: ${this.espacoLivre} total: ${this.tamanho})`;
    }
}

class RecintosZoo {
    constructor() {
        this.recintos = [];
        this.animalMap = {
            "LEAO": new Animal("LEAO", 3, ["savana"], "CARNIVORO"),
            "LEOPARDO": new Animal("LEOPARDO", 2, ["savana"], "CARNIVORO"),
            "CROCODILO": new Animal("CROCODILO", 3, ["rio"], "CARNIVORO"),
            "MACACO": new Animal("MACACO", 1, ["savana", "floresta"], "ONIVORO"),
            "GAZELA": new Animal("GAZELA", 2, ["savana"], "HERBIVORO"),
            "HIPOPOTAMO": new Animal("HIPOPOTAMO", 4, ["savana", "rio"], "HERBIVORO"),
        };
    }
    
    analisaRecintos(animal, quantidade) {
        if (!(animal in this.animalMap)) {
            return { erro: "Animal inválido" };
        } else if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        this.inicializarRecintosParaTestes();
    
        const recintosViaveis = [];
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

    inicializarRecintosParaTestes() {
        this.recintos[0] = new Recinto(1, 10, ["savana"]);
        this.recintos[0].adicionaAnimal(this.animalMap.MACACO, 3);

        this.recintos[1] = new Recinto(2, 5, ["floresta"]);

        this.recintos[2] = new Recinto(3, 7, ["savana" , "rio"]);
        this.recintos[2].adicionaAnimal(this.animalMap.GAZELA, 1);

        this.recintos[3] = new Recinto(4, 8, ["rio"]);

        this.recintos[4] = new Recinto(5, 9, ["savana"]);
        this.recintos[4].adicionaAnimal(this.animalMap.LEAO, 1);
    }
}

export { RecintosZoo as RecintosZoo };