import { useEffect } from "react";
import "./App.css";
import Queries from "./services/queries.service";
import { dealSchema } from "./schemas/deal.schema";

function App() {
    const getRequiredDealFields = (currentDealFields) => {
        return dealSchema.map((el) => {
            const field = currentDealFields.find((f) => f.name === el.name && f.field_type === el.field_type);
            if (!field) {
                return el;
            }
        });
    };

    useEffect(() => {
        Queries.getDealFields().then((res) => {
            console.log(res.data.data);
            const currentDealFields = res.data.data;

            const requiredDealFields = getRequiredDealFields(currentDealFields);
        });

        // const setDealFieldsReq = dealSchema.map((el) => Queries.setDealField(el));
        // Promise.all(setDealFieldsReq).then(() => console.log("Все промисы исполнены"));

        // const body = {
        //     name: "Example",
        //     field_type: "varchar",
        // };
        // Queries.setDealField(body).then((res) => console.log(res.data));
    }, []);

    return (
        <div className="App">
            <h1>Заголовок</h1>
        </div>
    );
}

export default App;
