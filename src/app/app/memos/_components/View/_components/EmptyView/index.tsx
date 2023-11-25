
import { poppins } from '@/assets/fonts';
import styles from './index.module.scss';

interface EmptyViewProps {
  isSearchQueryEmpty: boolean;
}

export const EmptyView = ({ isSearchQueryEmpty }: EmptyViewProps): JSX.Element => {
  const handleAddMemo = () => {
    const element = document.getElementById('add-memo');

    if (element) {
      element.click();
    }
  }

  return (
    <div className={styles.empty}>
      <span className={styles.text}>
        {
          isSearchQueryEmpty
            ? <>
                On dirait que tu n'as pas encore ajouté de mémos !
                Commence par en ajouter un&nbsp;
                <button
                  className={`${styles.addMemo} ${poppins.className}`}
                  onClick={handleAddMemo}
                >
                  ici
                </button>
                .
              </>
            : <>Aucun résultat trouvé pour votre recherche... Essayer avec un autre terme.</>
        }
      </span>
    </div>
  );
}
