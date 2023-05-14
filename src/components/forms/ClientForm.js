import { Form, Input } from "antd";
import { extractValueFromStorage } from "../../utils/functions";

function ClientForm({ handleInputState }) {
    return (
        <Form
            name="client-details"
            wrapperCol={{ span: 24 }}
            style={{ width: 280 }}
            initialValues={{
                firstName: extractValueFromStorage("firstName"),
                lastName: extractValueFromStorage("lastName"),
                phone: extractValueFromStorage("phone"),
                email: extractValueFromStorage("email"),
            }}
            autoComplete="off"
        >
            <h3>Client details</h3>

            <div className="form-vert-group">
                <Form.Item name="firstName">
                    <Input placeholder="First name" onChange={handleInputState} />
                </Form.Item>

                <Form.Item name="lastName">
                    <Input placeholder="Last name" onChange={handleInputState} />
                </Form.Item>
            </div>

            <Form.Item name="phone">
                <Input placeholder="Phone" onChange={handleInputState} />
            </Form.Item>

            <Form.Item name="email">
                <Input placeholder="Email (optional)" onChange={handleInputState} />
            </Form.Item>
        </Form>
    );
}

export default ClientForm;
