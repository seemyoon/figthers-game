import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;

        const res = await callApi(`details/fighter/${id}.json`);
        return res;
    }
}

const fighterService = new FighterService();

export default fighterService;
