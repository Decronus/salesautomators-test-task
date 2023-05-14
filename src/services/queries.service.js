import axiosInstance from "../utils/axios";

class Queries {
    getDealFields() {
        return axiosInstance.get("dealFields");
    }

    setDealField(body) {
        return axiosInstance.post("dealFields", body);
    }

    addDeal(body) {
        return axiosInstance.post("deals", body);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
