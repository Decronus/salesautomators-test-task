import { useEffect, useState } from "react";
import "./App.css";
import Queries from "./services/queries.service";
import { dealSchema } from "./schemas/deal.schema";

function App() {
    const [initLoading, setInitLoading] = useState(false);

    const getRequiredDealFields = (currentDealFields, dealSchema) => {
        return dealSchema.filter((el) => {
            const field = currentDealFields.find((f) => f.name === el.name && f.field_type === el.field_type);
            return !field;
        });
    };

    const getDealFieldsKeys = (currentDealFields, dealSchema) => {
        return dealSchema.map((el) => {
            const field = currentDealFields.find((f) => f.name === el.name);
            return { [field.name]: field.key };
        });
    };

    const makeSequentialRequests = (req, arr, index = 0) => {
        return new Promise((resolve, reject) => {
            if (index >= arr.length) {
                resolve();
                return;
            }
            const currentElement = arr[index];
            req(currentElement)
                .then(() => {
                    makeSequentialRequests(req, arr, index + 1);
                })
                .catch(() => {
                    reject(
                        new Error(
                            `Ошибка при выполнении запроса с элементом ${JSON.stringify(
                                arr[index]
                            )} под индексом ${index}`
                        )
                    );
                });
        })
            .then(() => console.log("Поля сделки успешно инициализированы"))
            .catch((error) => {
                console.log(error.message);
                setTimeout(makeSequentialRequests(req, arr, index), 0);
            });
    };

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
            <h1>Заголовок</h1>
        </div>
    );
}

export default App;
