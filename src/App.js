import { useEffect } from "react";
import "./App.css";
import Queries from "./services/queries.service";
import { dealSchema } from "./schemas/deal.schema";

function App() {
    const getRequiredDealFields = (currentDealFields, dealSchema) => {
        return dealSchema.filter((el) => {
            const field = currentDealFields.find((f) => f.name === el.name && f.field_type === el.field_type);
            return !field;
        });
    };

    const getDealFieldsKeys = (currentDealFields, requiredDealFields) => {
        return requiredDealFields.map((el) => {
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
            .then(() => console.log("Все запросы выполнены"))
            .catch((error) => {
                console.log("error", error.message);
                setTimeout(makeSequentialRequests(req, arr, index), 0);
            });
    };

    const prepareDealFields = async () => {
        const getDealFieldsRes = await Queries.getDealFields();

        const currentDealFields = getDealFieldsRes.data.data;
        console.log(currentDealFields);

        const requiredDealFields = getRequiredDealFields(currentDealFields, dealSchema);
        console.log("required", requiredDealFields);

        await makeSequentialRequests(Queries.setDealField, requiredDealFields);

        // const setDealFieldsRes = await requiredDealFields.map((el) => {
        //     return Queries.setDealField(el);
        // });

        // console.log("setDealFieldsRes", setDealFieldsRes);

        // Promise.all(setDealFieldsReq).then(() => console.log("Все промисы исполнены"));

        // const dealFieldsKeys = getDealFieldsKeys(currentDealFields, requiredDealFields);
        // console.log("keys", dealFieldsKeys);
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
