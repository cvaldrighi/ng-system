import { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }: { children: ReactNode }) => {
    return (
        <Container className='py-3'>
            <Row className='justify-content-md-left'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
