import { Construction } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const NotImplemented = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Construction />
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>comming soon</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default NotImplemented