import { Button } from "@/components/ui/button"
import {
  Tooltip as ToolTip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "@/context/theme-context"
import { ToolTipProps } from "@/types/props-types/notes-view"

export function Tooltip({ children, isVisible, text, direction, className }: ToolTipProps) {
  const {isDark} = useTheme()
  return (
    <div className={`flex flex-wrap gap-2 `}>
      <ToolTip>
        <TooltipTrigger asChild>
          <div>
            {children}
          </div>
        </TooltipTrigger>
        {isVisible &&
          (
            <TooltipContent side={direction} className={`${isDark ? 'dark' : ''}`}>
              <p>{text}</p>
            </TooltipContent>
          )
        }
      </ToolTip>
    </div>
  )
}
