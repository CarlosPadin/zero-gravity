import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Market = {
  price: number;
  volume: number;
  depth: number;
};

interface StatsOverviewProps {
  markets: Market[];
}

export function StatsOverview({
  markets,
}: StatsOverviewProps) {
  const avgPrice = (
    markets.reduce((s, m) => s + m.price, 0) /
    markets.length
  ).toFixed(4);
  const totalVolume = markets.reduce(
    (s, m) => s + m.volume,
    0
  );
  const totalDepth = markets.reduce(
    (s, m) => s + m.depth,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Precio Promedio</CardDescription>
          <CardTitle className="text-3xl">
            ${avgPrice}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Across {markets.length} exchanges
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            Volumen Total 24h
          </CardDescription>
          <CardTitle className="text-3xl">
            {(totalVolume / 1_000_000).toFixed(2)}M
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            USD volume traded
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            Cambio de Precio ultimas 24h
          </CardDescription>
          <CardTitle className="text-3xl">
            ${(totalDepth / 1_000_000).toFixed(1)}M
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Cambio de precio en el mercado
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
