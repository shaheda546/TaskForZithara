import React, { Fragment, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const GetData = () => {
    // get data(records) from the DB(postgres)
    const [customers, setCustomers] = useState([]);

    // for Searching
    const [search, setSearch] = useState('');

    // for Sorting
    const [order, setOrder] = useState("ASC");
    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...customers].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setCustomers(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...customers].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setCustomers(sorted);
            setOrder("ASC");
        }
    }

    // pagination Started
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 20;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = customers.slice(firstIndex, lastIndex);
    const npage = Math.ceil(customers.length / recordsPerPage)
    const numbers = [...Array (npage + 1).keys()].slice(1)

    function prePage() {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    
    function changeCPage(id) {
        setCurrentPage(id)
    }
    
    function nextPage() {
        if(currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    // pagination ended



    const getCusData = async () => {
        try {
          const response = await fetch("http://localhost:5000/salesdb");
          const jsonData = await response.json();
    
          setCustomers(jsonData)
        } catch (err) {
          console.error(err.message);
        }
      };
    
      useEffect(() => {
        getCusData();
      }, []);
    
      
    return(
        <Fragment>
            <h1 className="text-center mt-3">Customer Data..!</h1>
            <Form>
                <InputGroup className="my-3">
                    <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Customer Name or Location, like Bob or New York......' />
                </InputGroup>
            </Form>

            <table class="table table-bordered table-striped mt-3">
                <thead>
                <tr className="bg-primary">
                    <th>sno</th>
                    <th>customer_name</th>
                    <th>age</th>
                    <th>phone</th>
                    <th>location</th>
                    <th onClick={() => sorting("created_at")}>created_at(Date)</th>
                    <th onClick={() => sorting("created_at")}>created_at(Time)</th>
                </tr>
                </thead>
                <tbody>
                {records.filter((customer) =>{
                    return (search.toLowerCase() === '' ? customer : customer.customer_name.toLowerCase().includes(search)) ||
                    (search.toLowerCase() === '' ? customer : customer.location.toLowerCase().includes(search))
                }).map(customer => (
                    <tr key={customer.sno}>
                    <td>{customer.sno}</td>
                    <td>{customer.customer_name}</td>
                    <td>{customer.age}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.location}</td>
                    <td>{customer.created_at.substring(0, 10)}</td>
                    <td>{customer.created_at.substring(11,23)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <nav>
            <ul className='pagination'>
                <li className='page-item'> 
                    <a href='/#' className='page-link' onClick={prePage}>Prev
                    </a>
                </li>
                {
                    numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active': ''}`} key={i}>
                            <a href="/#" className='page-link' onClick={() => changeCPage(n)} > { n } </a>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <a href='/#' className='page-link' onClick={nextPage}>Next</a>
                </li>
                </ul>
            </nav>

        </Fragment>
    )
};

export default GetData;