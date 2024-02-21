import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../beranda.scss';
import React, { useState } from 'react';
const SearchingComponent = ({ onSearch, onKeywordChange, onCategoryChange, searchKeyword, selectedCategory }) => {
  return (
    <Container className='search-container'>
      <Row className="align-items-center search-row">
        {/* Bagian Kiri */}
        <Col xs={5}>
          <div className='search-item'>
            <p>Cari Event</p>
            <Form.Control
              type="text"
              placeholder="Cari Event kamu disini"
              value={searchKeyword}
              onChange={onKeywordChange}
            />
          </div>
        </Col>

        {/* Bagian Tengah */}
        <Col xs={5}>
          <div className='search-item'>
            <p>Jenis Event</p>
            <Form.Control as="select" value={selectedCategory} onChange={onCategoryChange}>
              <option value="selected">Pilih Jenis Event</option>
              <option value={1}>Festival</option>
              <option value={2}>Konser Musik</option>
              <option value={3}>Pameran</option>
              <option value={4}>Lomba dan Kompetisi</option>
              <option value={5}>Segera Hadir</option>
              <option value={6}>Rekomendasi</option>
            </Form.Control>
          </div>
        </Col>

        {/* Bagian Kanan */}
        <Col xs={1}>
          <div className="text-center search-item">
            <p>&nbsp;</p>
            <Button style={{ background: '#1250A2' }} className='search-button' onClick={onSearch}>
              Cari
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchingComponent;
