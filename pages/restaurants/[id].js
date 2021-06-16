/* Para o nextJs quando cria-se um arquivo [id].js o mesmo será chamado quando na URL
for passado /id: exemplo www.meusite.com/restaurant/id
*/
import DetailsRestaurant from '../../components/DetailsRestaurant';

//SSG -> Static Server Generate
// Gera a página do lado do servidor e entrega ela pronta, mesmo processo feito antigamente
// Para definir uma page como SSG basta usar os métodos getStaticPaths() e getStaticProps(params)
/*
export default function Restaurant({ restaurant }) {
  return <DetailsRestaurant restaurant={restaurant} />
}


//Retorna todos os Id's dos restaurantes
export async function getStaticPaths({ params }) {
  const data = await fetch(`${process.env.apiUrl}/restaurants`);
  const restaurant = await data.json();
  
  const paths = restaurant.map((restaurant) => ({
    params: {id: restaurant.id.toString()}
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const data = await fetch(`${process.env.apiUrl}/restaurants/${params.id}`);
  const restaurant = await data.json();

  return {
    props: { restaurant },
    revalidate: 120 //Quantidade de tempo que será realizado a chamada da page no server
  }
}
*/

/* Chamada Normal
export default function Restaurant() {
  return <DetailsRestaurant />
}
*/

//SSR -> Reinderiza a page do lado do servidor
// No nextJs basta add o método getServerSideProps() na page ao qual deseja usar o SSR e retornar as props
export default function Restaurant({ restaurant, isError = false }) {
  return <DetailsRestaurant restaurant={restaurant} isError={isError} />
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const data = await fetch(`${process.env.apiUrl}/restaurants/${id}`);
    const restaurant = await data.json();
    const isError = data.ok ? false : true;

    return { props: { restaurant, isError: isError}}
  } catch (error) {

    return { props: { isError: isError}}
  }
}