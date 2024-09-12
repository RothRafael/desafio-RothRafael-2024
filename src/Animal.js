class Animal {
    constructor(especie, tamanho, tipoRecinto = [], dieta) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.tipoRecinto = tipoRecinto;
        this.dieta = dieta;
    }
}
export { Animal as Animal };