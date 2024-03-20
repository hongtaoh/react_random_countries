import { Button, Container, Form, Row, Col, Select } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

import Country from './Country';

const World = () => {
  const [countries, setCountries] = useState([]);
  const [matchingCountries, setMatchingCountries] = useState([]);

  const [searchName, setSearchName] = useState('');
  const [searchContinent, setSearchContinent] = useState('');
  const [searchIndependent, setSearchIndependent] = useState('');
  const [searchCarside, setSearchCarside] = useState('');

  // const continentOptions = [
  //   { value: 'Africa', label: 'Africa' },
  //   { value: 'Asia', label: 'Asia' },
  //   { value: 'Europe', label: 'Europe' },
  //   { value: 'North America', label: 'North America' },
  //   { value: 'Oceania', label: 'Oceania' },
  //   { value: 'South America', label: 'South America' },
  // ];

  // const independentOptions = [
  //   { value: 'Yes', label: 'true' },
  //   { value: 'No', label: 'false' },
  // ];

  // const carsideOptions = [
  //   { value: 'Right', label: 'right' },
  //   { value: 'Left', label: 'left' },
  // ];

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCountries(data);
        setMatchingCountries(data);
      });
  }, []);

  function solveIndependent(cntry, searchIndependent) {
    // some country's independent is undefined. Need this block to pass this error
    let independentString = cntry.independent ?? ' ';
    console.log(independentString);
    return independentString.toString().includes(searchIndependent);
  }

  useEffect(() => {
    let filteredCountries = countries
      .filter((cntry) =>
        cntry.name.official
          .toLowerCase()
          .includes(searchName.toLocaleLowerCase().trim())
      )
      .filter((cntry) => cntry.region.includes(searchContinent))
      .filter((cntry) => solveIndependent(cntry, searchIndependent))
      .filter((cntry) => cntry.car.side.includes(searchCarside));

    setMatchingCountries(filteredCountries);
  }, [searchName, searchContinent, searchIndependent, searchCarside]);

  const resetSearch = () => {
    setSearchName('');
    setSearchContinent('');
    setSearchIndependent('');
    setSearchCarside('');
  };

  return (
    <div>
      <Form>
        <Form.Label htmlFor="searchName">Country/Region</Form.Label>
        <Form.Control
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          id="searchName"
        />
      </Form>

      {/* <Select
        defaultValue=""
        placeholder="Continent"
        value={searchContinent}
        label="search-continent"
        onChange={(e) => setSearchName(e.target.value)}
      >
        <Option value="Africa">Africa</Option>
        <Option value="Asia">Asia</Option>
        <Option value="Europe">Europe</Option>
        <Option value="North America">North America</Option>
        <Option value="South America">South America</Option>
        <Option value="Oceania">Oceania</Option>
      </Select> */}

      <label for="search-continent">
        Continent:
        <select
          value={searchContinent}
          onChange={(e) => setSearchContinent(e.target.value)}
          id="search-continent"
        >
          <option value="" selected="selected">
            Choose...
          </option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
        </select>
      </label>
      <label for="search-independent">
        Independent:
        <select
          value={searchIndependent}
          onChange={(e) => setSearchIndependent(e.target.value)}
          id="search-independent"
        >
          <option value="" selected="selected">
            Choose...
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>
      <label for="search-carside">
        Car side:
        <select
          value={searchCarside}
          onChange={(e) => setSearchCarside(e.target.value)}
          id="search-carside"
        >
          <option value="" selected="selected">
            Choose...
          </option>
          <option value="right">Right</option>
          <option value="left">Left</option>
        </select>
      </label>
      <Button variant="primary" onClick={resetSearch}>
        Reset
      </Button>
      <Container fluid>
        <Row>
          {matchingCountries.map((cntry) => (
            <Col
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              key={cntry.cca3}
            >
              <Country {...cntry} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default World;
