import { SyntheticEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import FormContainer from '../components/FormContainer'

interface Props {
    history: RouteComponentProps['history']
}

const LoginScreen = ({ history }: Props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()

        const result = await fetch('http://localhost:3333/auth/local/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.text()).then((token) => {
            document.cookie = `jwt=${token}`;
        })

        history.push('/')
        window.location.reload();
        console.log('submited', result)
    }

    return (
        <FormContainer>
            <h1>Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="my-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="my-3">
                    Submit
                </Button>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen

