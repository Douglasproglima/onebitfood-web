import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import toCurrency from '../../../services/utils/toCurrency';
import truncateString from '../../../services/utils/truncateString';

const Restaurant = (props) => (
  <Col lg={6} sm={6} xs={12} className="mb-4">
    <Link href={`restaurants/${props.slug}`}>
      <Card body className='clickable_effect'>
        <Row>
          <Col md={5} xs={12}>
            <Image
              src={props.image_url}
              alt={truncateString(props.name, 10)}
              width={300}
              height={200}
              layout="responsive"
            />
          </Col>
          <Col md={5} xs={10}>
            <h5>{truncateString(props.name, 25)}</h5>
            <p className='mb-1'>
              <small> {truncateString(props.slug, 60)} </small>
            </p>
            <p className='mb-1'>
              <small> {truncateString(props.description, 60)} </small>
            </p>
            <p>
              <small className='fw-bold'>{props.category_title}</small>
            </p>
            <small className='border px-3 border-custom-gray fw-bold'>
              Entrega {toCurrency(props.delivery_tax)}
            </small>
          </Col>
          <Col md={2} xs={2} className="text-center">
            <span className='text-custom-orange'>
              <FaStar/> {props.review}
            </span>
          </Col>
        </Row>
      </Card>
    </Link>
  </Col>
)

export default Restaurant;
