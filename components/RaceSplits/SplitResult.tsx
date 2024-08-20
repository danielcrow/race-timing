import { Card, CardContent, CardHeader,CardFooter, CardTitle,CardDescription } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'




export default function SplitResult(props: {time:string, name:string, position:number, avgTime:string,splitName:string, cumTime:number, cumPos:number} ){
    function formatDate(actualTime:number){
        const dteSplitTm = new Date(actualTime);
        return dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0') +  "." + dteSplitTm.getMilliseconds().toLocaleString().padStart(2, '0')

    }

    return (<div>
            <ol>
                <li>Split Position {props.position}</li>
                <li>Your Split Time : {props.time}</li>
                <li>Average Split Time : {props.avgTime}</li>
                <li>Cumulative Split Time : {formatDate(props.cumTime)}</li>
                <li>Cumulative Position : {props.cumPos}</li>
            </ol>

    </div>
)
}