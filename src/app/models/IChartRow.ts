export interface IChartRow {
    date:             string;
    open:             number;
    high:             number;
    low:              number;
    close:            number;
    volume:           number;
    unadjustedVolume: number;
    change:           number;
    changePercent:    number;
    vwap:             number;
    label:            string;
    changeOverTime:   number;
}
