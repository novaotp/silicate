
"use client";

interface ActionsProps {
  discard: () => void,
  disabled: boolean,
}

export const Actions = ({ discard, disabled }: ActionsProps): JSX.Element => {
  return (
    <div className="relative w-full h-[50px] flex justify-between">
      <button
        className="relative w-[calc(50%-10px)] text-white text-[14px] rounded-xl bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-slate-400"
        type="button"
        onClick={discard}
        disabled={disabled}
      >
        Annuler
      </button>
      <button
        className="relative w-[calc(50%-10px)] text-white text-[14px] rounded-xl bg-green-700 disabled:cursor-not-allowed disabled:bg-green-800 disabled:text-slate-400"
        type="submit"
        disabled={disabled}
      >
        Sauvegarder
      </button>
    </div>
  )
}
