import CategoryPage from '@/Components/CategoryPage';
import { destinationsData, categoryConfig } from '@/data/categoryDestinations';
import WavesIcon from '@mui/icons-material/Waves';

export default function Beaches() {
  return (
    <CategoryPage
      category="beaches"
      config={categoryConfig.beaches}
      destinations={destinationsData.beaches}
      icon={WavesIcon}
    />
  );
}
