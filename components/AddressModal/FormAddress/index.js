
import { useState } from 'react';
import { Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import cartState from '../../../store/atoms/cartAtom';
import addressState from '../../../store/atoms/addressAtom';
import getAvailableCities from '../../../services/api/getAvailableCities';

export default function FormAddress(props) {

  const { available_cities, isLoading, isError } = getAvailableCities();
  const [address, setAddress] = useRecoilState(addressState);
  const [cart, setCart] = useRecoilState(cartState);
  const [cityChanged, setCityChanged] = useState(false);
  const router = useRouter();

  if (isError)
    return <Col><Alert variant='custom-red'>Erro ao carregar</Alert></Col>
  else if (isLoading)
    return <Col><Spinner animation='border' /></Col>

  const updateAddress = e => {
    if (e.target.name == 'city')
      setCityChanged(true);

    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  }

  const confirmAddress = e => {
    e.preventDefault();
    props.onHide();

    if (cityChanged) {
      setCart({ restaurant: {}, products: [] })
      router.push('/restaurants');
    }
  }

  return (
    <Row>
      <Col md={12}>
        <Form onSubmit={e => confirmAddress(e)}>
          <Form.Group>
            <Form.Label>Sua Cidade</Form.Label>
            <Form.Control
              required={false}
              as="select"
              onChange={updateAddress}
              value={address.city}
              name="city"
            >
              {address.city == '' && <option key={0}>Escolher Cidade</option>}
              {available_cities.map((city, i) => (<option key={i} value={city}>{city}</option>))}
            </Form.Control>
          </Form.Group>

          {address.city != '' &&
            <div>
              <Form.Group className='mt-3'>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  required={false}
                  type="text"
                  placeholder="Bairro"
                  onChange={updateAddress}
                  value={address.neighborhood}
                  name="neighborhood"
                />
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Logradouro</Form.Label>
                <Form.Control
                  required={false}
                  type="text"
                  placeholder="Rua/Avenida/Alameda"
                  onChange={updateAddress}
                  value={address.street}
                  name="street"
                />
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Número</Form.Label>
                <Form.Control
                  required={false}
                  type="text"
                  placeholder="Número"
                  onChange={updateAddress}
                  value={address.number}
                  name="number"
                />
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Complemento"
                  onChange={updateAddress}
                  value={address.complement}
                  name="complement"
                />
              </Form.Group>

              <div className="text-center pt-4">
                <Button variant="custom-red" className='text-white' type="submit" size="md">
                  Confirmar Endereço
                </Button>
              </div>
            </div>
          }
        </Form>
      </Col>
    </Row>
  )
}