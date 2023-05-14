import { Form, Input, Select } from "antd";

function JobForm({ handleInputState, onChangeJobType, onChangeJobSource }) {
    return (
        <Form
            name="job"
            wrapperCol={{ span: 24 }}
            style={{ width: 280 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <h3>Job details</h3>

            <Form.Item name="jobType">
                <Select
                    placeholder="Select job type"
                    options={[{ value: "Type 1", label: "Type 1" }]}
                    onChange={onChangeJobType}
                />
            </Form.Item>

            <Form.Item name="jobSource">
                <Select
                    placeholder="Select job source"
                    options={[{ value: "Source 1", label: "Source 1" }]}
                    onChange={onChangeJobSource}
                />
            </Form.Item>

            <Form.Item name="jobDescription">
                <Input.TextArea placeholder="Job description" onChange={handleInputState} />
            </Form.Item>
        </Form>
    );
}

export default JobForm;
