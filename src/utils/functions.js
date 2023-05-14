export const getRequiredDealFields = (currentDealFields, dealSchema) => {
    return dealSchema.filter((el) => {
        const field = currentDealFields.find((f) => f.name === el.name && f.field_type === el.field_type);
        return !field;
    });
};

export const getDealFieldsKeys = (currentDealFields, dealSchema) => {
    return dealSchema.map((el) => {
        const field = currentDealFields.find((f) => f.name === el.name);
        return { [field.name]: field.key };
    });
};

export const makeSequentialRequests = (req, arr, index = 0) => {
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
                        `Ошибка при выполнении запроса с элементом ${JSON.stringify(arr[index])} под индексом ${index}`
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
