import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import addressState from '../../store/atoms/addressAtom';

export default function getRestaurants() {
  const router = useRouter();
  const { category, q } = router.query; //Pega na URI
  const [address] = useRecoilState(addressState);

  let params = '';
  if (address.city != '') 
    params += `${params == '' ? '?' : '&'}city=${address.city}`
  
  if (q) 
    params += `${params == '' ? '?' : '&'}q=${q}`
  
  if (category) 
    params += `${params == '' ? '?' : '&'}category=${category}`

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/restaurants${params}`,
    fetcher,
    { revalidateOnFocus: false }
  )

  return { restaurants: data, isLoading: !error && !data, isError: error }
}
