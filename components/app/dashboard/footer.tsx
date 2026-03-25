import { Separator } from '@/components/ui/separator'
import { Heart } from 'lucide-react'

const Footer = () => {
    return (
        <div className="border-t px-4 py-2 flex items-center justify-center md:justify-between text-xs text-muted-foreground">
            <div className=" hidden md:flex items-center gap-3">
                <a className="hover:text-foreground transition-colors">Privacy Policy</a>
            </div>

            <span className="flex items-center gap-1">
                Made with <Heart className="h-3 w-3 fill-red-500 stroke-red-500" /> by Manoj Naik
            </span>

            <div className=" hidden md:flex items-center gap-3">
                <a className="hover:text-foreground transition-colors">Terms & Conditions</a>
            </div>
        </div>
    )
}

export default Footer;