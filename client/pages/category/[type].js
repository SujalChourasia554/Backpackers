import { useRouter } from 'next/router';
import CategoryPage from '@/Components/CategoryPage';
import { categoryConfig } from '../../data/categoryDestinations';
import WavesIcon from '@mui/icons-material/Waves';
import LandscapeIcon from '@mui/icons-material/Landscape';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';

const icons = {
  beaches: WavesIcon,
  mountains: LandscapeIcon,
  cultural: TempleHinduIcon
};

export default function Category() {
  const router = useRouter();
  const { type } = router.query;
  
  if (!type || !categoryConfig[type]) {
    return null;
  }
  
  return (
    <CategoryPage
      category={type}
      config={categoryConfig[type]}
      destinations={[]}
      icon={icons[type]}
    />
  );
}
