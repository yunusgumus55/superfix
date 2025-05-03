import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PriceData {
  model: string
  fiyat: string
  sure: string
}

interface ServicePriceTableProps {
  data: PriceData[]
}

export default function ServicePriceTable({ data }: ServicePriceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Model</TableHead>
            <TableHead className="font-bold">Fiyat</TableHead>
            <TableHead className="font-bold">Tahmini Süre</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.model}</TableCell>
              <TableCell>{item.fiyat}</TableCell>
              <TableCell>{item.sure}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
