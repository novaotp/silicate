
interface EmptyViewProps {
  isSearchQueryEmpty: boolean;
  emptyViewText: string;
}

export const EmptyView = ({ isSearchQueryEmpty, emptyViewText }: EmptyViewProps): JSX.Element => {
  return (
    <div>
      <p>
        {
          isSearchQueryEmpty
            ? emptyViewText
            : "Aucun résultat trouvé pour votre recherche..."
        }
      </p>
    </div>
  );
}
