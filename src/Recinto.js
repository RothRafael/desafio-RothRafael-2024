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

    // Verifica se o recinto já possui esta espécie
    atualizaEspeciesPresentes(animal) {
        if (this.especiesPresentes.length === 0 || !this.especiesPresentes.includes(animal)) {
            this.especiesPresentes.push(animal);
        }

        if (this.especiesPresentes.length === 2 || !this.especiesPresentes.includes(animal)) {
            this.espacoLivre -= 1;
        }
    }
    
    // Verifica se macaco ou hipopotamo são compativeis com o recinto
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
export { Recinto as Recinto };