import { useState } from "react"

interface ToggleInputProps {
    checked?: boolean
    onChange?: (value: boolean) => void
}

export function CustomToggle({ checked = false, onChange }: ToggleInputProps) {
    const [isOn, setIsOn] = useState(checked)

    function handleToggle() {
        const next = !isOn
        setIsOn(next)
        onChange?.(next)
    }

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none
                ${isOn ? "bg-emerald-500" : "bg-neutral-700"}
            `}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
                    ${isOn ? "translate-x-[18px]" : "translate-x-[2px]"}
                `}
            />
        </button>
    )
}