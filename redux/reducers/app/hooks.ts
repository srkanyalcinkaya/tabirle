import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux'

// Kullanıcı bilgilerini almak için hook
export const useAccount = () => useSelector((state: RootState) => state.app);
