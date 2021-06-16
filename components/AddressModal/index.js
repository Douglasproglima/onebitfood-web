import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import FormAddress from './FormAddress';
import addressState from '../../store/atoms/addressAtom';

export default function AddressModal(props) {
  const [address] = useRecoilState(addressState);
  const router = useRouter();

  //Se for na home não mostra o modal obrigatoriamente nas demais pages mostra o modal em primeiro plano
  useEffect(() => {
    if (router.asPath != '/' && address.city == '') {
      props.onShow();
    }
  }, [router]);

  return (
    <Modal
      show={props.show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}>
        <Modal.Header>
          <h5 className="fw-bold mt-2">Endereço de Entrega</h5>
        </Modal.Header>

        <Modal.Body>
          <FormAddress
            onHide={() => props.onHide()}
            onShow={() => props.onShow()}
          />
        </Modal.Body>
    </Modal>
  )
}