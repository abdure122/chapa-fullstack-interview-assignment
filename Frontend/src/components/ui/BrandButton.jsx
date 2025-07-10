import React from 'react'

export default function BrandButton({loading, label }) {
    return (
        <div>
            <button
                type="submit"
                className="w-full py-3  rounded-full bg-[#7dc400] hover:bg-[#6cbf00]/50 text-white font-bold text-lg shadow-lg hover:bg-brand-dark active:scale-95 transition-all duration-200 disabled:opacity-60"
                disabled={loading}
            >
                {label}
            </button>

        </div>
    )
}
