type SaveStatus = "saved" | "saving" | "unsaved" | "error"

export function SaveIndicator({ status }: { status: SaveStatus }) {
  const config = {
    saved:   { text: "Saved",   className: "text-green-500", icon: "✓" },
    saving:  { text: "Saving…", className: "text-gray-400",  icon: "↻" },
    unsaved: { text: "Unsaved", className: "text-yellow-500",icon: "●" },
    error:   { text: "Failed",  className: "text-red-500",   icon: "✕" },
  }

  const { text, className, icon } = config[status]

  return (
    <span className={`text-sm flex items-center gap-1 ${className}`}>
      {icon} {text}
    </span>
  )
}