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
                makeSequentialRequests(req, arr, index + 1)
                    .then(resolve)
                    .catch(reject);
            })
            .catch(() => {
                reject(
                    new Error(
                        `Ошибка при выполнении запроса с элементом ${JSON.stringify(arr[index])} под индексом ${index}`
                    )
                );
            });
    })
        .then(() => {
            console.log("Поля сделки успешно инициализированы");
        })
        .catch((error) => {
            console.log(error.message);
            setTimeout(makeSequentialRequests(req, arr, index), 0);
        });
};

export const createBody = (dealFieldsKeys, formsState) => {
    const body = {
        title: formsState.title,
        [dealFieldsKeys[0]["First name"]]: formsState.firstName,
        [dealFieldsKeys[1]["Last name"]]: formsState.lastName,
        [dealFieldsKeys[2]["Phone"]]: formsState.phone,
        [dealFieldsKeys[3]["Email"]]: formsState.email,
        [dealFieldsKeys[4]["Address"]]: formsState.Address,
        [dealFieldsKeys[5]["City"]]: formsState.city,
        [dealFieldsKeys[6]["State"]]: formsState.state,
        [dealFieldsKeys[7]["Area"]]: formsState.area,
        [dealFieldsKeys[8]["Zip code"]]: formsState.zipCode,
        [dealFieldsKeys[9]["Job type"]]: formsState.jobType,
        [dealFieldsKeys[10]["Job source"]]: formsState.jobSource,
        [dealFieldsKeys[11]["Job description"]]: formsState.jobDescription,
        [dealFieldsKeys[12]["Job date"]]: formsState.jobDate,
        [dealFieldsKeys[13]["Job start time"]]: formsState.jobStart,
        [dealFieldsKeys[14]["Job end time"]]: formsState.jobEnd,
        [dealFieldsKeys[15]["Technician"]]: formsState.technician,
    };
    return body;
};
