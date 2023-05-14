import { Form, Input, Select } from "antd";

function ServiceForm({ handleInputState, onChangeArea }) {
    return (
        <Form
            name="service"
            wrapperCol={{ span: 24 }}
            style={{ width: 280 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <h3>Service location</h3>

            <Form.Item name="address">
                <Input placeholder="Address" onChange={handleInputState} />
            </Form.Item>

            <Form.Item name="city">
                <Input placeholder="City" onChange={handleInputState} />
            </Form.Item>

            <Form.Item name="state">
                <Input placeholder="State" onChange={handleInputState} />
            </Form.Item>

            <div className="form-vert-group">
                <Form.Item name="zipCode">
                    <Input placeholder="Zip code" onChange={handleInputState} />
                </Form.Item>

                <Form.Item name="area">
                    <Select
                        placeholder="Select area"
                        options={[
                            { value: "Area 1", label: "Area 1" },
                            { value: "Area 2", label: "Area 2" },
                        ]}
                        style={{ width: 140 }}
                        onChange={onChangeArea}
                    />
                </Form.Item>
            </div>
        </Form>
    );
}

export default ServiceForm;
