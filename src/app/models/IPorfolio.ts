export interface IPorfolio {
    value: IPorfolioRow[];
}

export interface IPorfolioRow {
    RowKey:           string;
    Symbol:           string;
    IsActive:         boolean;
    BoughtFor:        number;
    BoughtOn:         string;
    CurrentPercent:   number;
    LastPrice:        number;
    Threshold:        number;
    ThresholdCrossed: boolean;
    UnitsBought:      number;
}

