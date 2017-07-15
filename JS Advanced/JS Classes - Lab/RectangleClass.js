class Rectange {
    constructor(width, height, color) {
        this.width = width || 1;
        this.height = height || 1;
        this.color = color || 'white';
    }

    calcArea() {
        return this.width * this.height;
    }
}