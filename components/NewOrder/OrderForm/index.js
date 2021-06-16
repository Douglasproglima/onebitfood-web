import { useState } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useRecoilState, useResetRecoilState } from 'recoil';
import addressState from '../../../store/atoms/addressAtom';
import cartState from '../../../store/atoms/cartAtom';
import createOrder from '../../../services/api/createOrder';

export default function OrderForm() {
  const [address] = useRecoilState(addressState);
  const [cart] = useRecoilState(cartState);

  //Retorna um estado do recoilState igual o default definido no cart(Limpa o carrinho)
  //Resumindo, reseta o estado de um Atom.
  const resetCart = useResetRecoilState(cartState);
  const [error, setError] = useState(null);

  const router = useRouter();

  //Modelo de dados enviado para API
  const [order, setOrder] = useState({
    name: "",
    phone_number: "",
    ...address,

    //Atributos aninhados conforme definido na API
    order_products_attributes: cart.products.map(p => (
      //Injeta o atributo virtual quantity
      { 'product_id': p.id, 'quantity': p.quantity /* ou Qtde */ }
    )),
    restaurant_id: cart.restaurant_id
  });

  const getAddress = () => {
    const street = address.street.length > 0 ? address.street+', ' : '';
    const number = address.number.length > 0 ? address.number+', ' : '';
    const neighborhood = address.neighborhood.length > 0 ? address.neighborhood+', ' : '';
    const city = address.city.length > 0 ? address.city : '';
    const addressTemp = street + number + neighborhood + city;

    return addressTemp;
  }

  //Atualiza o name os demais atributos que vem do sprade ...order continuam o mesmo
  const updateOrderState = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  }

  const sendOrder = async (e) => {
    e.preventDefault();

    try {
      await createOrder(order);
      router.push('/orders/success');
      resetCart();

    } catch (error) {
      setError(error);
    }
  }

  return (
    <Form onSubmit={e => sendOrder(e)}>
      <h4 className='fw-bold mb-5'>Detalhes Finais</h4>
      <Form.Group>
        <Form.Label>Nome Completo</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Seu nome..."
          onChange={updateOrderState}
          value={order.name}
          name="name"
        />
      </Form.Group>
      <Form.Group className='mt-3'>
        <Form.Label>Número de Telefone</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="(00) 00000-0000"
          onChange={updateOrderState}
          value={order.phone_number}
          name="phone_number"
        />
      </Form.Group>

      <div className="mt-5">
        <p className='fw-bolder'>Entregar Em:</p>
        <p><small>{getAddress()}</small></p>
      </div>
      {cart.products.length > 0 &&
        <div className="text-center">
          <Button variant="custom-red" type="submit" size="lg" className="mt-4 text-white">
            Finalizar Pedido
          </Button>
        </div>
      }

      {error && <Alert variant='custom-red' className="mt-4"> Erro no Pedido! </Alert> }
    </Form>
  );
}