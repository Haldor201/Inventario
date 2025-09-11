import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userContext } from '../context/UserContext';
import { useContext } from 'react';

export default function FormLogin() {
    const { user } = useContext(userContext);
    console.log(user)
    return (
        <div className='container mt-5'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
