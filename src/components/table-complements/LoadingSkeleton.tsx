import { Skeleton } from "../ui/skeleton";
import { TableBody, TableRow, TableCell } from "../ui/table";

const LoadingSkeleton = () => {
  return (
    <TableBody>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 6 }).map((_, j) => (
            <TableCell key={j} className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default LoadingSkeleton;
