function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

describe("rgbToHexColor(red, green, blue)", function () {
    describe("Nominal cases(valid input)", function () {
        it("should return #FF9EAA for (255, 158, 170)", function () {
            expect(rgbToHexColor(255, 158, 170)).to.be.equal("#FF9EAA");
        });
        it("should return #0C0D0E for (12, 13, 14)", function () {
            expect(rgbToHexColor(12, 13, 14)).to.be.equal("#0C0D0E");
        });
        it("should return #000000 for (0, 0, 0)", function () {
            expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000");
        });
        it("should return #FFFFFF for (255, 255, 255)", function () {
            expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF");
        });
    });

    describe("Special cases(invalid input", () => {
        it("should return undefined for (-1,0,0)", () => {
            expect(rgbToHexColor(-1, 0, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,-1,0)", () => {
            expect(rgbToHexColor(0, -1, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,0,-1)", () => {
            expect(rgbToHexColor(0, 0, -1)).to.be.equal(undefined);
        });
        it("should return undefined for (256,0,0)", () => {
            expect(rgbToHexColor(256, 0, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,256,0)", () => {
            expect(rgbToHexColor(0, 256, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,0,256)", () => {
            expect(rgbToHexColor(0, 0, 256)).to.be.equal(undefined);
        });
        it("should return undefined for (3.14,0,0)", () => {
            expect(rgbToHexColor(3.14, 0, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,3.14,0)", () => {
            expect(rgbToHexColor(0, 3.14, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,0,3.14)", () => {
            expect(rgbToHexColor(0, 0, 3.14)).to.be.equal(undefined);
        });
        it('should return undefined for ("5", [3], {8:9})', () => {
            expect(rgbToHexColor("5", [3], {8:9})).to.be.equal(undefined);
        });
        it("should return undefined for empty input", () => {
            expect(rgbToHexColor()).to.be.equal(undefined);
        });
    });
});