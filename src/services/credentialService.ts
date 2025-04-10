import { Agent } from '@/types/agent.types';
import { ApiService } from './api';
import { CredentialFilterOptions } from '@/types/credential.types';

class CredentialService {
    // Optional: Add configuration fields here if needed
    private api: ApiService;

    constructor(agent: Agent) {
        this.api = new ApiService(agent.apiUrl, agent.apiKey);
    }

    async getRecords(options: CredentialFilterOptions): Promise<unknown> {
        const { data } = await this.api.get(`/records`, { params: options });
        return data;
    }

    async getRecordById(credExId: string): Promise<unknown> {
        const { data } = await this.api.get(`/issue-credential-2.0/records/${credExId}`);
        return data;
    }

    async deleteRecord(credExId: string): Promise<unknown> {
        const { data } = await this.api.delete(`/records/${credExId}`)
        return data;
    }

    /**
     * (Issuer) Send credential offer to holder
     */
    async sendOffer(offerDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/send-offer`, offerDocument);
        
        return data;
    }

    /**
     * (Holder) Send issuer a credential request
     */
    async sendRequest(requestDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/send-request`, requestDocument);
        return data;
    }

    /**
     * (Holder) Send issuer a credential proposal
     */
    async sendProposal(proposalDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/send-proposal`, proposalDocument);
        return data;
    }

    /**
     * (Issuer) Create a credential record without sending it
     */
    async createCredential(credentialDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/create`, credentialDocument);
        return data;
    }
}

export { CredentialService };