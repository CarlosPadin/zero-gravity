export interface IStatsOverview {
    asset_id:         string;
    timestamp:        Date;
    avg_price_usd:    number;
    total_volume_24h: number;
    price_change:     number;
}

export interface IMarketExchanges {
    exchange_id:    string;
    base_id:        string;
    base_symbol:    string;
    quote_id:       string;
    quote_symbol:   string;
    price_usd:      number;
    volume_usd_24h: number;
    volume_percent: number;
}

export interface IMarketVolumes {
    timestamp: Date;
    volume_usd_24h: number;
}

export interface IMarketVolumesFormatted {
    day: string;
    volume_usd_24h: number;
}