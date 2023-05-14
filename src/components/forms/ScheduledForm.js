import { DatePicker, Form, Select } from "antd";
import { extractValueFromStorage } from "../../utils/functions";

function ScheduledForm({ onChangeJobDate, onChangeJobStart, onChangeJobEnd, onChangeTechnician }) {
    return (
        <Form
            name="scheduled"
            wrapperCol={{ span: 24 }}
            style={{ width: 280 }}
            initialValues={{
                technician: extractValueFromStorage("technician"),
            }}
            autoComplete="off"
        >
            <h3>Scheduled</h3>

            <Form.Item name="date">
                <DatePicker
                    placeholder="Choose date"
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    onChange={onChangeJobDate}
                    value={extractValueFromStorage("date")}
                />
            </Form.Item>

            <div className="form-vert-group">
                <Form.Item name="jobStart">
                    <DatePicker
                        placeholder="Job start"
                        style={{ width: 137 }}
                        showTime
                        picker="time"
                        format="HH:mm"
                        onChange={onChangeJobStart}
                    />
                </Form.Item>

                <Form.Item name="jobEnd">
                    <DatePicker
                        placeholder="Job end"
                        style={{ width: 137 }}
                        showTime
                        picker="time"
                        format="HH:mm"
                        onChange={onChangeJobEnd}
                    />
                </Form.Item>
            </div>

            <Form.Item name="technician">
                <Select
                    options={[
                        { value: "", label: "Select technician", disabled: true },
                        { value: "Technician 1", label: "Technician 1" },
                        { value: "Technician 2", label: "Technician 2" },
                    ]}
                    onChange={onChangeTechnician}
                />
            </Form.Item>
        </Form>
    );
}

export default ScheduledForm;
