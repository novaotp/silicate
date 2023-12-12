
interface EmptyViewProps {
  isSearchQueryEmpty: boolean;
}

export const EmptyView = ({ isSearchQueryEmpty }: EmptyViewProps): JSX.Element => {
  return (
    <div>
      <p>
        {
          isSearchQueryEmpty
            ? "On dirait que tu n'as pas encore ajouté de branches!"
            : "Aucun résultat trouvé pour votre recherche..."
        }
      </p>
    </div>
  );
}
