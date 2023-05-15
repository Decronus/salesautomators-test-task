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

export const makeSequentialRequests = async (req, arr) => {
    for (let el of arr) {
        await req(el);
    }
};

export const createBody = (dealFieldsKeys, formsState) => {
    const body = {
        title: formsState.title,
        [dealFieldsKeys[0]["First name"]]: formsState.firstName,
        [dealFieldsKeys[1]["Last name"]]: formsState.lastName,
        [dealFieldsKeys[2]["Phone"]]: formsState.phone,
        [dealFieldsKeys[3]["Email"]]: formsState.email,
        [dealFieldsKeys[4]["Address"]]: formsState.address,
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

export const extractValueFromStorage = (key) => {
    return localStorage.getItem("formsState") ? JSON.parse(localStorage.getItem("formsState"))[key] : "";
};
