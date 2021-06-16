import { useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import cartState from '../../store/atoms/cartAtom';
import toCurrency from '../../services/utils/toCurrency';
import truncateString from '../../services/utils/truncateString';

export default function AddProductModal(props) {
  const [cart, setCart] = useRecoilState(cartState);
  const [qtde, setQtde] = useState(1);

  //Garante que somente irá exibir o modal caso o produto seja informado
  if(!props.product)
    return null;

  //Altera o carrinho e garante que tenha somente produtos do mesmo restaurante
  const addProduct = (e) => {
    e.preventDefault();

    //Objeto produto selecionado e injeta uma nova propriedade quantity com o valor escolhido pelo user
    const product = { ...props.product, ...{ 'quantity': qtde } }

    if (cart.restaurant.id != props.restaurant.id) {
      const product = { ...props.product, ...{ 'quantity': qtde } }
      setCart({ restaurant: props.restaurant, products: [product] })
    } else {
      if (cart.products.find(item => item.id == props.product.id) != undefined) {
        let dish = cart.products.find(item => item.id == props.product.id)
        let i = cart.products.indexOf(dish)
        let quantityBefore = cart.products[i].quantity
        let finalQuantity = Number(quantityBefore) + Number(qtde)
        const product = { ...props.product, ...{ 'quantity': finalQuantity } }
        let array = [...cart.products]
        array.splice(i, 1)
        setCart({ restaurant: props.restaurant, products: [...array, product] })
      } else {
        const product = { ...props.product, ...{ 'quantity': qtde } }
        setCart({ restaurant: props.restaurant, products: [...cart.products, product] })
      }
    }

    setQtde(1);
    props.onHide();
  }

  return (
    <Modal
      show={props.show}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      keybord={false}
      onHide={() => props.onHide()}
    >
      <Modal.Header>
        <h5 className='fw-bold mt-2'>Adicionar Produto</h5>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            <Image
              src={props.product.image_url}
              alt={props.product.name}
              width={300}
              height={200}
            />
          </Col>
        </Row>

        <Row className="pb-0">
          <Col md={8}>
            <p className='fw-bold mb-0'>{props.product.name}</p>
          </Col>
          <Col>
            <small className='border px-1 border-custom-gray fw-bold'>
              {toCurrency(props.product.price)}
            </small>
          </Col>
        </Row>

        <Row>
          <Col>
            <p><small>{truncateString(props.product.description, 60)}</small></p>
          </Col>
        </Row>

        <Form onSubmit={addProduct} className='d-flex'>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Quantidade"
              min="1" step="1"
              name="quantidade"
              value={qtde}
              onChange={(e) => setQtde(e.target.value)}
            />
          </Form.Group>

          <Button variant="custom-red" type="submit" className="text-white ms-6">
            Adicionar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}