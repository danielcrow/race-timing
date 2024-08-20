import { Card, CardContent, CardHeader,CardFooter, CardTitle,CardDescription } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import { TableCell, TableRow } from '../ui/table';




export default function SplitResult(props: any){
    
    function formatDate(actualTime:number){
        const dteSplitTm = new Date(actualTime);
        return dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0') +  "." + dteSplitTm.getMilliseconds().toLocaleString().padStart(2, '0')

    }
    return ( 
            <TableRow key={props.time}>
            
                <TableCell>{props.split.name}</TableCell>
                <TableCell>{props.split.position}</TableCell>
                <TableCell> {props.split.time}</TableCell>
                <TableCell> {props.split.AverageTime}</TableCell>
                <TableCell>{formatDate(props.split.ActualCumulativeTime)}</TableCell>
                <TableCell>{props.split.CumumlativeSplitPosition}</TableCell>
            </TableRow>

   
)
}