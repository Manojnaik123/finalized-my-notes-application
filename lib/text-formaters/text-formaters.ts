export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export const stripHtml = (html?: string | null) => {
    return (html ?? '')
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim() || ''
}

export const getReadingTime = (text: string): string => {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / wordsPerMinute)

  if (minutes < 1) return "Less than a min read"
  if (minutes === 1) return "1 min read"
  return `${minutes} min read`
}

export const getRelativeTime = (timestamp: string): string => {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60)                        return "Edited just now"
  if (seconds < 3600)                      return `Edited ${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400)                     return `Edited ${Math.floor(seconds / 3600)} hr ago`
  if (seconds < 86400 * 2)                 return "Edited yesterday"
  if (seconds < 86400 * 7)                 return `Edited ${Math.floor(seconds / 86400)} days ago`
  if (seconds < 86400 * 30)               return `Edited ${Math.floor(seconds / 86400 / 7)} weeks ago`
  if (seconds < 86400 * 365)              return `Edited ${Math.floor(seconds / 86400 / 30)} months ago`
  return `Edited ${Math.floor(seconds / 86400 / 365)} years ago`
}

export function formatCreatedDate(dateString: string | null | undefined): string {
    if (!dateString) return "Created on —"
    const date = new Date(dateString)
    return `Created on ${date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })}`
}