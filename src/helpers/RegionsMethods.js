export const findPlacesByRegionId = (list, id) => {
    const places = [];
    if(list.length > 0)
        list.forEach((item) => {
            if(item.belongRegionId === id)
                places.push(item)
        });
    return places;
}

export const findRoutesByPlaceId = (list, id) => {
    const places = [];
    if(list.length > 0)
        list.forEach((item) => {
            if(item.belongPlaceId === id)
                places.push(item)
        });
    return places;
}