import { useEffect, useState } from "react";
import "./App.css";
import Queries from "./services/queries.service";
import { dealSchema } from "./schemas/deal.schema";
import { getDealFieldsKeys, getRequiredDealFields, makeSequentialRequests } from "./utils/functions";
import { Button, DatePicker, Form, Input, Select } from "antd";
import ButtonGroup from "antd/es/button/button-group";

function App() {
    const [initLoading, setInitLoading] = useState(false);
    const [formsState, setFormsState] = useState(
        { firstName: "" },
        { lastName: "" },
        { phone: "" },
        { email: "" },
        { address: "" },
        { city: "" },
        { state: "" },
        { area: "" },
        { zipCode: "" },
        { jobType: "" },
        { jobSource: "" },
        { jobDescription: "" },
        { jobDate: "" },
        { jobStart: "" },
        { jobEnd: "" },
        { technician: "" }
    );

    const handleFormsState = (event) => {
        const stateKey = event.target.id.split("_")[1];
        const newFormsState = { ...formsState };
        newFormsState[stateKey] = event.target.value;
        setFormsState(newFormsState);
    };

    console.log(formsState);

    const prepareDealFields = async () => {
        const getDealFieldsRes = await Queries.getDealFields();
        let currentDealFields = getDealFieldsRes.data.data;
        console.log(currentDealFields);

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
                        <Form.Item name="firstName">
                            <Input placeholder="First name" onChange={(event) => handleFormsState(event)} />
                        </Form.Item>

                        <Form.Item name="lastName">
                            <Input placeholder="Last name" onChange={(event) => handleFormsState(event)} />
                        </Form.Item>
                    </div>

                    <Form.Item name="phone">
                        <Input placeholder="Phone" onChange={(event) => handleFormsState(event)} />
                    </Form.Item>

                    <Form.Item name="email">
                        <Input placeholder="Email (optional)" onChange={(event) => handleFormsState(event)} />
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

                    <Form.Item name="jobType">
                        <Select
                            placeholder="Select job type"
                            options={[{ value: "Type 1", label: "Type 1" }]}
                            onChange={(value) => setFormsState({ ...formsState, jobType: value })}
                        />
                    </Form.Item>

                    <Form.Item name="jobSource">
                        <Select
                            placeholder="Select job source"
                            options={[{ value: "Source 1", label: "Source 1" }]}
                            onChange={(value) => setFormsState({ ...formsState, jobSource: value })}
                        />
                    </Form.Item>

                    <Form.Item name="jobDescription">
                        <Input.TextArea placeholder="Job description" onChange={(event) => handleFormsState(event)} />
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
                        <Input placeholder="Address" onChange={(event) => handleFormsState(event)} />
                    </Form.Item>

                    <Form.Item name="city">
                        <Input placeholder="City" onChange={(event) => handleFormsState(event)} />
                    </Form.Item>

                    <Form.Item name="state">
                        <Input placeholder="State" onChange={(event) => handleFormsState(event)} />
                    </Form.Item>

                    <div className="form-vert-group">
                        <Form.Item name="zipCode">
                            <Input placeholder="Zip code" onChange={(event) => handleFormsState(event)} />
                        </Form.Item>

                        <Form.Item name="area">
                            <Select
                                placeholder="Select area"
                                options={[
                                    { value: "Area 1", label: "Area 1" },
                                    { value: "Area 2", label: "Area 2" },
                                ]}
                                style={{ width: 140 }}
                                onChange={(value) => setFormsState({ ...formsState, area: value })}
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
                        <DatePicker
                            placeholder="Choose date"
                            style={{ width: "100%" }}
                            format="YYYY:MM:DD"
                            onChange={(event, date) =>
                                setFormsState({ ...formsState, jobDate: date.replace(/:/g, "-") })
                            }
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
                            />
                        </Form.Item>

                        <Form.Item name="jobEnd">
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
                            options={[
                                { value: "Technician 1", label: "Technician 1" },
                                { value: "Technician 2", label: "Technician 2" },
                            ]}
                            onChange={(value) => setFormsState({ ...formsState, technician: value })}
                        />
                    </Form.Item>
                </Form>
            </div>

            <ButtonGroup>
                <Button>Save draft</Button>
                <Button type="primary">Create a deal</Button>
            </ButtonGroup>
        </div>
    );
}

export default App;
