import CategoryPage from '@/Components/CategoryPage';
import { destinationsData, categoryConfig } from '@/data/categoryDestinations';
import LandscapeIcon from '@mui/icons-material/Landscape';

export default function Mountains() {
  return (
    <CategoryPage
      category="mountains"
      config={categoryConfig.mountains}
      destinations={destinationsData.mountains}
      icon={LandscapeIcon}
    />
  );
}
