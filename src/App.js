import { useEffect, useState } from "react";
import "./App.css";
import Queries from "./services/queries.service";
import { dealSchema } from "./schemas/deal.schema";
import { createBody, getDealFieldsKeys, getRequiredDealFields, makeSequentialRequests } from "./utils/functions";
import { Button } from "antd";
import ClientForm from "./components/forms/ClientForm";
import JobForm from "./components/forms/JobForm";
import ServiceForm from "./components/forms/ServiceForm";
import ScheduledForm from "./components/forms/ScheduledForm";
import { ReloadOutlined } from "@ant-design/icons";
import TitleForm from "./components/forms/TitleForm";
import MainButton from "./components/MainButton";
import MainButtonWithTooltip from "./components/MainButtonWithTooltip";

function App() {
    const [dealAdded, setDealAdded] = useState(false);
    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dealFieldsKeys, setDealFieldsKeys] = useState([]);
    const [formsState, setFormsState] = useState(
        { title: "" },
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

    const handleInputState = (event) => {
        const stateKey = event.target.id.split("_")[1];
        const newFormsState = { ...formsState };
        newFormsState[stateKey] = event.target.value;
        setFormsState(newFormsState);
    };

    const prepareDealFields = async () => {
        const getDealFieldsRes = await Queries.getDealFields();
        let currentDealFields = getDealFieldsRes.data.data;

        const requiredDealFields = getRequiredDealFields(currentDealFields, dealSchema);

        if (requiredDealFields.length) {
            setInitLoading(true);
            await makeSequentialRequests(Queries.setDealField, requiredDealFields);
        }

        setInitLoading(false);
        const getDealFieldsSecondRes = await Queries.getDealFields();
        currentDealFields = getDealFieldsSecondRes.data.data;
        setDealFieldsKeys(getDealFieldsKeys(currentDealFields, dealSchema));
    };

    const handleAddDeal = (body) => {
        setLoading(true);
        Queries.addDeal(body).then((res) => {
            setLoading(false);
            setDealAdded(true);
        });
    };

    const saveDraft = () => {
        localStorage.setItem("formsState", JSON.stringify(formsState));
    };

    useEffect(() => {
        if (localStorage.getItem("formsState")) {
            setFormsState(JSON.parse(localStorage.getItem("formsState")));
        }
        prepareDealFields();
    }, []);

    return (
        <div className="App">
            <div className="forms-wrap">
                <TitleForm handleInputState={(event) => handleInputState(event)} titleValue={formsState.title} />
                <ClientForm handleInputState={(event) => handleInputState(event)} />
                <JobForm
                    handleInputState={(event) => handleInputState(event)}
                    onChangeJobType={(value) => setFormsState({ ...formsState, jobType: value })}
                    onChangeJobSource={(value) => setFormsState({ ...formsState, jobSource: value })}
                />
                <ServiceForm
                    handleInputState={(event) => handleInputState(event)}
                    onChangeArea={(value) => setFormsState({ ...formsState, area: value })}
                />
                <ScheduledForm
                    onChangeJobDate={(event, date) => setFormsState({ ...formsState, jobDate: date })}
                    onChangeJobStart={(event, time) => setFormsState({ ...formsState, jobStart: time })}
                    onChangeJobEnd={(event, time) => setFormsState({ ...formsState, jobEnd: time })}
                    onChangeTechnician={(value) => setFormsState({ ...formsState, technician: value })}
                />
            </div>

            <div className="button-group">
                <Button onClick={saveDraft}>Save draft</Button>
                {!formsState.title ? (
                    <MainButtonWithTooltip
                        onClick={() => handleAddDeal(createBody(dealFieldsKeys, formsState))}
                        disabled={initLoading || !formsState.title || dealAdded}
                        loading={loading || initLoading}
                        dealAdded={dealAdded}
                    />
                ) : (
                    <MainButton
                        onClick={() => handleAddDeal(createBody(dealFieldsKeys, formsState))}
                        disabled={initLoading || !formsState.title || dealAdded}
                        loading={loading || initLoading}
                        dealAdded={dealAdded}
                    />
                )}
                {dealAdded && <Button type="primary" icon={<ReloadOutlined />} onClick={() => setDealAdded(false)} />}
            </div>
        </div>
    );
}

export default App;
