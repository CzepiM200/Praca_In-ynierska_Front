export const routeType = (id) => {
    switch (id) {
        case 1:
            return `Chodzenie`;
        case 2:
            return `Wspinaczka`;
        default:
            return `Zły typ drogi!`;
    }
}

export const scaleType = (id) => {
    switch (id) {
        case 1:
            return `Skala Polska`;
        case 2:
            return `Skala Francuska`;
        case 3:
            return `GOT`;
        default:
            return `Zły typ skali`;
    }
}

export const rappelStanceType = (id) => {
    switch (id) {
        case 1:
            return `Brak`;
        case 2:
            return `Jedno koluch`;
        case 3:
            return `Dwa kolucha`;
        default:
            return `Inny typ stanowiska...`;
    }
}

export const realizationType = (id) => {
    switch (id) {
        case 1:
            return `Zrealizowany`;
        case 2:
            return `W trakcie realizacji`;
        case 3:
            return `Nie zrealizowany`;
        case 4:
            return `Porażka`;
        default:
            return `Zły typ realizacji...`;
    }
}

export const placeType = (id) => {
    switch (id) {
        case 1:
            return `Góra`;
        case 2:
            return `Skała`;
        case 3:
            return `Sztuczna skała`;
        default:
            return `Zły typ miejsca...`;
    }
}

export const trainingType = (id) => {
    switch (id) {
        case 1:
            return `Chodzenie po górach`;
        case 2:
            return `Wspinaczka górska`;
        case 3:
            return `Wspinaczka skałkowa`;
        case 4:
            return `Wspinaczka po sztucznej ścianie`;
        default:
            return `Zły typ treningu...`;
    }
}