export const validateLibraryNameClient = (name: string): string | null => {
  const trimmed = name.trim()

  if (!trimmed)
    return "Please enter a name for your library"

  if (trimmed.length < 2)
    return "Library name must be at least 2 characters"

  if (trimmed.length > 50)
    return "Library name can't be longer than 50 characters"

  if (/[<>{}[\]]/.test(trimmed))
    return "Library name can't contain special characters"

  return null
}

export const validateLibraryNameServer = (name: string): string | null => {
  const trimmed = name.trim()

  if (!trimmed)
    return "Unable to save library to the database: library name is required."

  if (trimmed.length < 2)
    return "Unable to save library to the database: library name must be at least 2 characters."

  if (trimmed.length > 50)
    return "Unable to save library to the database: library name exceeds the maximum length (50 characters)."

  if (/[<>{}[\]]/.test(trimmed))
    return "Unable to save library to the database: library name contains invalid characters."

  return null
}