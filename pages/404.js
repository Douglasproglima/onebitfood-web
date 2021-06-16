import { Row, Col, Card } from 'react-bootstrap'
import Image from 'next/image'

export default function Custom404 () {
  return (
    <Row className='mt-4 justify-content-md-center'>
      <Col md={{ span: 4 }}>
        <Card className='mt-4 px-4 py-4'>
          <h4 className='text-center fw-bold'>Página Não Encontrada</h4>

          <Row className='my-4 justify-content-md-center'>
            <Col md={{ span: 10 }}>
              <Image
                src='/status-ok.png'
                alt='Sucesso no pedido'
                width={100}
                height={100}
                layout='responsive'
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}