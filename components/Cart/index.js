import { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import cartState from '../../store/atoms/cartAtom';
import toCurrency from '../../services/utils/toCurrency';
import truncateString from '../../services/utils/truncateString';

export default function Cart(props) {
  const VALUE_INITIAL = 0;

  const [cart, setCart] = useRecoilState(cartState);

  //SubTotal da compra (SubTotal: Preço de todos os produtos somados sem a taxa de entrega)
  const subTotal = () => {
    return cart.products.reduce((totalPrice, priceAndQtde) => {
      const price = parseFloat(priceAndQtde['price']);
      const qtde = parseFloat(priceAndQtde['quantity']);
      const priceToQtde = (price * qtde || 0);
      const subTotalTemp = totalPrice + priceToQtde

      return subTotalTemp;
    }, VALUE_INITIAL);
  }

  //Total da compra: SubTotal + Taxa de Entrega
  const total = () => subTotal() + cart.restaurant.delivery_tax;

  //Remove os produtos do carrinho
  const removeProduct = (product) => {
    //Excluir da lista o produto a ser removido e retorna os demais
    const newProducts = cart.products.filter((prod) => prod.id != product.id);

    //Inseri a lista dos produtos exceto o produto removido
    setCart({
      restaurant: { ...cart.restaurant },
      products: newProducts
    });
  }

  if (cart.products.length <= 0)
    return <p>Carrinho vázio</p>

  return (
    <>
      <h5 className='fw-bolder'>{cart.restaurant.name}</h5>
      <hr />
      {cart.products.map((product, i) =>
        <div key={product.id} className="mb-4" key={i}>
          <Row>
            <Col md={8} xs={8}>
              <small className='fw-bolder'>{product.quantity}x {product.name}</small>
            </Col>
            <Col md={4} xs={4} className="text-right">
              <small >
                {toCurrency(product.price)}
              </small>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={8} xs={8}>
              <p><small>{truncateString(product.description, 40)}</small></p>
            </Col>
            <Col md={4} xs={4} className="text-right">
              <Button
                size="sm"
                variant="outline-dark"
                className='border px-1 border-custom-gray'
                onClick={() => removeProduct(product)}>
                Remover
              </Button>
            </Col>
          </Row>
        </div>
      )}

      <hr />

      <Row className="mt-4">
        <Col md={7} xs={7}>
          <p>Subototal</p>
        </Col>

        <Col md={5} xs={5} className="text-right">
          <p>{toCurrency(subTotal())}</p>
        </Col>
      </Row>

      <Row className="mt-n2">
        <Col md={7} xs={7}>
          <p>Taxa de entrega</p>
        </Col>

        <Col md={5} xs={5} className="text-right">
          <p>{toCurrency(cart.restaurant.delivery_tax)}</p>
        </Col>
        <hr />
      </Row>

      <Row className="mb-4">
        <Col md={7} xs={7}>
          <p className='fw-bolder'>Total</p>
        </Col>

        <Col md={5} xs={5} className="text-right">
          <p className='fw-bolder'>{toCurrency(total())}</p>
        </Col>
      </Row>
    </>
  )
}