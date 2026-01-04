import CategoryPage from '@/Components/CategoryPage';
import { categoryConfig } from '../data/categoryDestinations';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';

export default function Cultural() {
  return (
    <CategoryPage
      category="cultural"
      config={categoryConfig.cultural}
      destinations={[]}
      icon={TempleHinduIcon}
    />
  );
}
