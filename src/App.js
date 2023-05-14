import { useEffect, useState } from "react";
import "./App.css";
import Queries from "./services/queries.service";
import { dealSchema } from "./schemas/deal.schema";
import { getDealFieldsKeys, getRequiredDealFields, makeSequentialRequests } from "./utils/functions";
import { Button, DatePicker, Form, Input, Select } from "antd";

function App() {
    const [initLoading, setInitLoading] = useState(false);

    const prepareDealFields = async () => {
        const getDealFieldsRes = await Queries.getDealFields();
        let currentDealFields = getDealFieldsRes.data.data;

        const requiredDealFields = getRequiredDealFields(currentDealFields, dealSchema);
        if (requiredDealFields.length) {
            await makeSequentialRequests(Queries.setDealField, requiredDealFields);
        }

        const getDealFieldsSecondRes = await Queries.getDealFields();
        currentDealFields = getDealFieldsSecondRes.data.data;

        const dealFieldsKeys = getDealFieldsKeys(currentDealFields, dealSchema);
        console.log("dealFieldsKeys", dealFieldsKeys);
    };

    useEffect(() => {
        prepareDealFields();
        // const body = {
        //     name: "Example",
        //     field_type: "varchar",
        // };
        // Queries.setDealField(body).then((res) => console.log(res.data));
    }, []);

    return (
        <div className="App">
            <div className="forms-wrap">
                <Form
                    name="client-details"
                    wrapperCol={{ span: 24 }}
                    style={{ width: 280 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <h3>Client details</h3>

                    <div className="form-vert-group">
                        <Form.Item name="first-name">
                            <Input placeholder="First name" />
                        </Form.Item>

                        <Form.Item name="last-name">
                            <Input placeholder="Last name" />
                        </Form.Item>
                    </div>

                    <Form.Item name="phone">
                        <Input placeholder="Phone" />
                    </Form.Item>

                    <Form.Item name="email">
                        <Input placeholder="Email (optional)" />
                    </Form.Item>
                </Form>

                <Form
                    name="job"
                    wrapperCol={{ span: 24 }}
                    style={{ width: 280 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <h3>Job details</h3>

                    <Form.Item name="job-type">
                        <Select placeholder="Select job type" options={[{ value: "Type 1", label: "Type 1" }]} />
                    </Form.Item>

                    <Form.Item name="job-source">
                        <Select placeholder="Select job source" options={[{ value: "Source 1", label: "Source 1" }]} />
                    </Form.Item>

                    <Form.Item name="job-description">
                        <Input.TextArea placeholder="Job description" />
                    </Form.Item>
                </Form>

                <Form
                    name="service"
                    wrapperCol={{ span: 24 }}
                    style={{ width: 280 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <h3>Service location</h3>

                    <Form.Item name="address">
                        <Input placeholder="Address" />
                    </Form.Item>

                    <Form.Item name="city">
                        <Input placeholder="City" />
                    </Form.Item>

                    <Form.Item name="state">
                        <Input placeholder="State" />
                    </Form.Item>

                    <div className="form-vert-group">
                        <Form.Item name="zip-code">
                            <Input placeholder="Zip code" />
                        </Form.Item>

                        <Form.Item name="area">
                            <Select
                                placeholder="Select area"
                                options={[{ value: "Area 1", label: "Area 1" }]}
                                style={{ width: 140 }}
                            />
                        </Form.Item>
                    </div>
                </Form>

                <Form
                    name="scheduled"
                    wrapperCol={{ span: 24 }}
                    style={{ width: 280 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <h3>Scheduled</h3>

                    <Form.Item name="date">
                        <DatePicker placeholder="Choose date" style={{ width: "100%" }} />
                    </Form.Item>

                    <div className="form-vert-group">
                        <Form.Item name="job-start">
                            <DatePicker
                                placeholder="Job start"
                                style={{ width: 137 }}
                                showTime
                                picker="time"
                                format="HH:mm"
                            />
                        </Form.Item>

                        <Form.Item name="job-end">
                            <DatePicker
                                placeholder="Job end"
                                style={{ width: 137 }}
                                showTime
                                picker="time"
                                format="HH:mm"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item name="technician">
                        <Select
                            placeholder="Select technician"
                            options={[{ value: "Technician 1", label: "Technician 1" }]}
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default App;
