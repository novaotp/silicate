import { Card } from "./Card";
import { Memo } from "@models/memo";

interface MemoListProps {
    memos: Memo[];
    searchValue: string;
}

/**
 * Renders a list of memos.
 */
export const MemoList = ({
    memos,
    searchValue,
}: MemoListProps): JSX.Element => {
    return (
        <ul className='relative mt-5 flex max-h-[calc(100%-50px)] w-full flex-col overflow-y-scroll'>
            {memos.length === 0 && searchValue === "" && (
                <p>Tu n'as pas encore créé de mémos.</p>
            )}
            {memos.length === 0 && searchValue !== "" && (
                <p>Aucun résultat trouvé pour la recherche.</p>
            )}
            {memos.length > 0 &&
                memos.map((memo: Memo) => <Card key={memo.id} memo={memo} />)}
        </ul>
    );
};
