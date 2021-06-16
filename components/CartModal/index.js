import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import cartState from '../../store/atoms/cartAtom';
import Cart from '../Cart';

export default function CartModal(props) {
  const [cart] = useRecoilState(cartState);
  
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
        <h5 className='fw-bold mt-2'>Carrinho</h5>
      </Modal.Header>

      <Modal.Body>
        <Cart show={ props.show } />
        {//Se houver produto aparece o botão Finalizar Pedido
          cart.products.length > 0 &&
          <div className='text-center pt-2'>
            <Link href='/orders/new'>
              <Button variant='custom-red' className='text-white' onClick={() => props.onHide()}>
                Finalizar Pedido
              </Button>
            </Link>
          </div>
        }
      </Modal.Body>
    </Modal>
  );
}