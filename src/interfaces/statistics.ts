export interface IStatsOverview {
    asset_id:         string;
    timestamp:        Date;
    avg_price_usd:    number;
    total_volume_24h: number;
    price_change:     number;
}