import React, { SyntheticEvent, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import * as helpers from '../helpers/helpers';
import Icon from '../assets/icon.png';

interface Props {
    username: string
    balance: number
}

const HomeScreen = ({ username, balance }: Props) => {

    const [creditedUser, setCreditedUser] = useState('')
    const [transferValue, setTransferValue] = useState('')
    const [transactionsArr, setTransactionsArr] = useState<any[]>([])
    const [filterValue, setFilterValue] = useState('');
    const ref = useRef<HTMLTableElement>(null);

    const transferHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        let value = parseInt(transferValue);
        const jwt = helpers.getJwtFromCookie()

        if (creditedUser == username) {
            alert("You can't transfer to yourself");
        }

        if (balance >= value) {
            await fetch('http://localhost:3333/transaction/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwt}` },
                credentials: 'include',
                body: JSON.stringify({
                    username: creditedUser,
                    value
                })
            })

            window.location.reload();
            setCreditedUser('');
            setTransferValue('');
        } else {
            alert("Balance is not enough")
        }
    }

    const getAllUsers = async () => {
        const jwt = helpers.getJwtFromCookie();

        const userResponse = await fetch('http://localhost:3333/user/all', {
            headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwt}` },
            credentials: 'include',
        })

        const data = await userResponse.json()
        return data;
    }

    const filterHandler = async (e: SyntheticEvent) => {
        setTransactionsArr([]);
        e.preventDefault();

        if (ref.current) {
            const div = ref.current;
            div.style.display = 'table';
        }

        const jwt = helpers.getJwtFromCookie();
        const res = await fetch(`http://localhost:3333/transaction/${filterValue}`, {
            headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwt}` },
            credentials: 'include',
        })
        const data = await res.json();

        //to display username instead accountId at table
        const users = await getAllUsers();
        function findUserByAccount(id: number) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                if (parseInt(user.accountId) === id) {
                    console.log(user.username);
                    return user.username;
                }
            }
        }

        for (let i = 0; i < data.length; i++) {
            let debited: number = data[i].debitedAccountId;
            let credited: number = data[i].creditedAccountId;

            let c = findUserByAccount(credited);
            let d = findUserByAccount(debited);

            data[i].creditedAccountId = c;
            data[i].debitedAccountId = d;
        }

        setTransactionsArr(data);
    }

    return username ? (
        <>
            <Container>
                <Row>
                    <Col sm={9}>
                        <h1 className='my-5'>Hello, {username}</h1>
                    </Col>
                    <Col sm={3} className='balance'>
                        <h5 className='my-5'>Balance: R${balance}</h5>
                    </Col>
                </Row>

                <FormContainer>
                    <Form onSubmit={transferHandler}>
                        <h4 className='my-3'>Transfer</h4>
                        <Form.Group className="my-1" controlId="creditedUser">
                            <Form.Label>Transfer to:</Form.Label>
                            <Form.Control type="text" placeholder="username" value={creditedUser} onChange={e => setCreditedUser(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="my-3" controlId="transferValue">
                            <Form.Label>Value:</Form.Label>
                            <Form.Control type="text" placeholder="value" value={transferValue} onChange={e => setTransferValue(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="my-3">
                            Ok
                        </Button>
                    </Form>
                </FormContainer>

                <FormContainer>
                    <Form onSubmit={filterHandler}>
                        <h4 className='my-4'>Transactions</h4>
                        <Form.Group className="my-1" controlId="creditedUser">
                            <Row>
                                <Col>
                                    <Form.Select aria-label="Default select example" value={filterValue} onChange={e => setFilterValue(e.target.value)} >
                                        <option>Choose option</option>
                                        <option value="user">All</option>
                                        <option value="user/cash-in">Cash In</option>
                                        <option value="user/cash-out">Cash Out</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        Ok
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </FormContainer>

                <Table striped bordered hover ref={ref}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Debited</th>
                            <th>Credited</th>
                            <th>Valuelor</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsArr.map((el: any) =>
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>
                                    {el.debitedAccountId}
                                </td>
                                <td>
                                    {el.creditedAccountId}
                                </td>
                                <td>R${el.value}</td>
                                <td>{
                                    (el.createdAt).split('T', 1)
                                }</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </Container>
        </>
    ) : (
        <>
            <Row >
                <Col sm={6}>
                    <h1>Welcome,</h1>
                    <h4>Sign Up or Login to start transfering :)</h4>
                </Col>
                <Col sm={6} className="img">
                    <img src={Icon} width="500rem" />
                </Col>
            </Row>
        </>
    )
}

export default HomeScreen
