import React from 'react'

export const ShipMoneyResolve_City = (productArray, cityStatus, distance) => {
    var weight = 0;
    for (var i = 0; i < productArray.length; i++) {
        weight += productArray[i].weight;
    }
    
    let shipMoney = 0
    let weightCountMoney = 0;

    let currentWeightMoney = 0;

    const minShipMoney = 10000;
    const maxShipMoney = 20000;
    const minShipMoney_far = 30000;
    const maxShipMoney_far = 40000;

    const cityCondition = 1;
    const countrysideCondition = 2;

    if (weight >= 0.5 && cityStatus == cityCondition) {
        currentWeightMoney = minShipMoney;
    }

    else if (weight >= 1 && cityStatus == cityCondition) {
        currentWeightMoney = maxShipMoney;
    }

    else if (weight >= 0.5 && cityStatus == countrysideCondition) {
        currentWeightMoney = minShipMoney_far;
    }

    else if (weight >= 1 && cityStatus == countrysideCondition) {
        currentWeightMoney = maxShipMoney_far;
    }

    else {
        currentWeightMoney = 0;
    }

    weightCountMoney = currentWeightMoney;
    const totalShipMoney = weightCountMoney * distance;
    shipMoney = totalShipMoney;

    return shipMoney;
}

