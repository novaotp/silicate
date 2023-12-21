"use client";

interface ActionsProps {
    discard: () => void;
    disabled: boolean;
}

export const Actions = ({ discard, disabled }: ActionsProps): JSX.Element => {
    return (
        <div className='relative flex h-[50px] w-full justify-between'>
            <button
                className='relative w-[calc(50%-10px)] rounded-xl bg-gray-600 text-[14px] text-white disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-slate-400'
                type='button'
                onClick={discard}
                disabled={disabled}
            >
                Annuler
            </button>
            <button
                className='relative w-[calc(50%-10px)] rounded-xl bg-green-700 text-[14px] text-white disabled:cursor-not-allowed disabled:bg-green-800 disabled:text-slate-400'
                type='submit'
                disabled={disabled}
            >
                Sauvegarder
            </button>
        </div>
    );
};
