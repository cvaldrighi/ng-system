import { useState, SyntheticEvent } from 'react';
import { Form, Button } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom';
import FormContainer from '../components/FormContainer'

interface Props {
    history: RouteComponentProps['history']
}

const SignupScreen = ({ history }: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()

        const result = await fetch('http://localhost:3333/auth/local/signup', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })

        if (result.ok) {
            history.push('/login')
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    <Form.Text className="text-muted">
                        Must have at least 3 char
                    </Form.Text>
                </Form.Group>

                <Form.Group className="my-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                        Must have at least 8 char, 1 uppercase and 1 number
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="my-3">
                    Submit
                </Button>
            </Form>
        </FormContainer>
    )
}

export default SignupScreen
