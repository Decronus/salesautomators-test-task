import { Form, Input } from "antd";
import { extractValueFromStorage } from "../../utils/functions";

function TitleForm({ handleInputState, titleValue }) {
    return (
        <>
            <Form
                name="title"
                wrapperCol={{ span: 24 }}
                style={{ width: 280 }}
                initialValues={{ title: extractValueFromStorage("title") }}
                autoComplete="off"
            >
                <h3>
                    Job title <span style={{ opacity: "0.2", fontSize: "14px" }}>*required</span>
                </h3>

                <Form.Item name="title">
                    <Input placeholder="Job title" onChange={handleInputState} value={titleValue} />
                </Form.Item>
            </Form>
            <div></div>
        </>
    );
}

export default TitleForm;
