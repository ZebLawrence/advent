
class Otcopus {
    constructor(startEnergy, coordinates) {
        this.adjacentListeners = [];
        this.energy = startEnergy;
        this.flash = this.flash.bind(this);
        this.checkFlash = this.checkFlash.bind(this);
        this.addFlashListeners = this.addFlashListeners.bind(this);
        this.endStep = this.endStep.bind(this);
        this.getEnergy = this.getEnergy.bind(this);
        this.hasFlashed = false;
        this.coordinates = coordinates;
    }

    flash() {
        this.energy += 1;
        this.checkFlash();
    }

    addFlashListeners(flashListeners) {
        this.adjacentListeners = flashListeners;
    }

    startStep() {
        this.energy += 1;
    }
    
    checkFlash() {
        if (this.energy > 9 && !this.hasFlashed) {
            this.hasFlashed = true;
            this.adjacentListeners.forEach(listener => {
                listener.flash();
            });
        }
    }

    endStep() {
        if (this.energy > 9) {
            this.energy = 0;
        }
        this.hasFlashed = false;
    }

    getEnergy() {
        return this.energy;
    }
}

export default Otcopus;
