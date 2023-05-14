import { Form, Input } from "antd";

function TitleForm({ handleInputState }) {
    return (
        <>
            <Form
                name="title"
                wrapperCol={{ span: 24 }}
                style={{ width: 280 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <h3>
                    Job title <span style={{ opacity: "0.2", fontSize: "14px" }}>*required</span>
                </h3>

                <Form.Item name="title">
                    <Input placeholder="Job title" onChange={handleInputState} />
                </Form.Item>
            </Form>
            <div></div>
        </>
    );
}

export default TitleForm;
