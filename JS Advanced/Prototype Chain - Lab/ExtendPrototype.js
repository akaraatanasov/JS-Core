function extendPrototype(baseClass) {
    baseClass.prototype.species = 'Human';
    baseClass.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`;
    }
}