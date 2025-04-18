import { Agent } from "@/types/agent.types";
import { ApiService } from "./api";
import { DIDMethods, KeyTypes } from "@/types/did.types";

class DIDService {
    private api: ApiService;
    
    constructor(agent: Agent) {
        this.api = new ApiService(agent.apiUrl, agent.apiKey);
    }
    
    async getPublicDID() {
        const { data } = await this.api.get('/wallet/did/public');
        return data;
    }

    /**
     * methods: sov, key, web
     * keyTypes: ed25519, bls12381g2, p256
     */
    async getDID({method, keyType }: { method: DIDMethods, keyType: KeyTypes }) {
        const response =  await this.api.get(`/wallet/did?method=${method}&key_type=${keyType}`);
        return response.results[0].did
    }
}
export { DIDService };