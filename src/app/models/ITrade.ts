export interface ITrade {
    value: ITradeRow[];
}

export interface ITradeRow {
    BoughtFor:         number;
    BoughtOn:          string;
    ProfitPerDay:      number;
    ResultAmountGross: number;
    ResultAmountNett:  number;
    ResultPercent:     number;
    SoldFor:           number;
    SoldOn:            string;
    Symbol:            string;
    UnitsBought:       number;
}