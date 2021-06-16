import {Alert, Spinner} from 'react-bootstrap';
import Details from './Details';
import CategoryProducts from './CategoryProducts';

export default function DetailsRestaurant(props) {
  if(props.isError)
      return <Alert variant='custom-red'>Erro ao Carregar</Alert>

  return (
    <>
      <Details { ...props.restaurant } />
      {
        props.restaurant.product_categories.map((product_category, i) => 
          <CategoryProducts restaurant={props.restaurant} {...product_category} key={i}/>
        )
      }
    </>
  )
}