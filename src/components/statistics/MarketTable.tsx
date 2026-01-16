import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Market = {
  exchange: string;
  price: number;
  volume: number;
  depth: number;
  change: number;
};

interface MarketTableProps {
  markets: Market[];
}

export function MarketTable({ markets }: MarketTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos de Mercado por Exchange</CardTitle>
        <CardDescription>
          Precio, volumen y profundidad en diferentes
          plataformas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exchange</TableHead>
                <TableHead className="text-right">
                  Precio (USD)
                </TableHead>
                <TableHead className="text-right">
                  Volumen 24h
                </TableHead>
                <TableHead className="text-right">
                  Profundidad
                </TableHead>
                <TableHead className="text-right">
                  Cambio 24h
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {markets.map((m) => (
                <TableRow key={m.exchange}>
                  <TableCell className="font-medium">
                    {m.exchange}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${m.price.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${(m.volume / 1_000_000).toFixed(2)}M
                  </TableCell>
                  <TableCell className="text-right">
                    ${(m.depth / 1_000_000).toFixed(2)}M
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`flex items-center justify-end gap-1 ${
                        m.change > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {m.change > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {m.change > 0 && "+"}
                      {m.change}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
