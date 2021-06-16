import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function SearchBox() {
  const router = useRouter();
  const [q, setQuery] = useState('');

  const Search = (e) => {
    e.preventDefault();
    router.push(`/restaurants?q=${q}`)
  }

  /*d-flex -> Coloca o botão e o input na mesma linha*/
  return (
    <Form className='d-flex mx-5 my-2' onSubmit={e => Search(e)}>
      <Form.Control
          type='text'
          placeholder='Buscar Restaurantes'
          className='me-2'
          value={q}
          onChange={e => setQuery(e.target.value)}
      />
      <Button variant='outline-custom-red' type='submit'>
        <FaSearch />
      </Button>   
    </Form>
  )
}
