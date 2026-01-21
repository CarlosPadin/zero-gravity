"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  LoadingSkeleton,
  TablePagination,
} from "../table-complements";
import { getMarketExchanges } from "@/lib/api/get-market-stats";
import { IMarketExchanges } from "@/interfaces";

export function MarketTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useQuery<IMarketExchanges[]>({
    queryKey: ["marketExchanges"],
    queryFn: getMarketExchanges,
    refetchInterval: 1 * 60 * 1000, // 1 mins
  });

  const totalPages = data
    ? Math.ceil(data.length / pageSize)
    : 1;

  const paginatedData = data?.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  console.log('data: ', data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Markets Data by Exchange</CardTitle>
        <CardDescription>
          Price, volume and change in different platforms
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exchange</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead className="text-right">
                  Price (USD)
                </TableHead>
                <TableHead className="text-right">
                  Volume 24h
                </TableHead>
                <TableHead className="text-right">
                  Volume %
                </TableHead>
                <TableHead className="text-right">
                  Change 24h
                </TableHead>
              </TableRow>
            </TableHeader>

            {isLoading ? (
              <LoadingSkeleton />
            ) : !paginatedData ? (
              <TableBody className="font-medium">
                <TableRow>
                  <TableCell className="font-medium">
                    No data
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {paginatedData &&
                  paginatedData.map((m) => (
                    <TableRow
                      key={
                        m.exchange_id +
                        m.base_id +
                        m.quote_id
                      }
                    >
                      <TableCell className="font-medium">
                        {m.exchange_id.toUpperCase()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {m.quote_symbol}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ${m.price_usd.toFixed(4)}
                      </TableCell>
                      <TableCell className="text-right">
                        $
                        {(
                          m.volume_usd_24h / 1_000_000
                        ).toFixed(2)}
                        M
                      </TableCell>
                      <TableCell className="text-right">
                        {m.volume_percent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`flex items-center justify-end gap-1 ${
                            m.price_change > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {m.price_change > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {m.price_change > 0 && "+"}
                          {(m.price_change * 100).toFixed(3)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </div>

        <TablePagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </CardContent>
    </Card>
  );
}
