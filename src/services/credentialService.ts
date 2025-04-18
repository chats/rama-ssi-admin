import { Agent } from '@/types/agent.types';
import { ApiService } from './api';
import { CredentialFilterOptions, CredentialOfferConfig } from '@/types/credential.types';

class CredentialService {
    // Optional: Add configuration fields here if needed
    private api: ApiService;

    constructor(agent: Agent) {
        this.api = new ApiService(agent);
    }

    /** Get issued credential records from issuer agent */
    async getIssuedRecords(options?: CredentialFilterOptions): Promise<unknown> {
        const { data } = await this.api.get(`/issue-credential-2.0/records`, { params: options });
        return data
    }

    /** Get issued credential record from issuer agent */
    async getIssuedRecordById(credExId: string): Promise<unknown> {
        const response = await this.api.get(`/issue-credential-2.0/records/${credExId}`);
        return response.data;
    }

    /** Delete issued credential record from issuer agent */
    async deleteIssuedRecord(credExId: string): Promise<unknown> {
        const response = await this.api.delete(`/issue-credential-2.0/records/${credExId}`)
        return response.data;
    }

    /** Issuer send credential offer to holder */
    async sendOffer(offerDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/issue-credential-2.0/send-offer`, offerDocument);
        
        return data;
    }

    /** Holder send issuer a credential request */
    async sendRequest(requestDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/issue-credential-2.0/send-request`, requestDocument);
        return data;
    }

    /** Holder send issuer a credential proposal */
    async sendProposal(proposalDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/issue-credential-2.0/send-proposal`, proposalDocument);
        return data;
    }

    /** Issuer create a credential record without sending it */
    async createCredential(credentialDocument: unknown): Promise<unknown> {
        const { data } = await this.api.post(`/issue-credential-2.0/create`, credentialDocument);
        return data;
    }

    /** Create a credential offer document, to use with sendOffer() */
    createOfferDocument(cfg: CredentialOfferConfig, data: Record<string, unknown>) {
        const attributes = data;
        const document = {
            comment: cfg.comment,
            connection_id: cfg.connectionId,
            filter: {
                ld_proof: {
                  credential: {
                    "@context": [
                      "https://www.w3.org/2018/credentials/v1",
                      ...cfg.contexts
                    ],
                    type: [
                      "VerifiableCredential",
                      ...cfg.types
                    ],
                    issuer: cfg.issuerDid,
                    issuanceDate: cfg.issuanceDate,
                    credentialSubject: {
                        type: [...cfg.types],
                        id: cfg.holderDid,
                        ...attributes
                    }
                  },
                  options: {
                    proofType: cfg.proofType || "Ed25519Signature2020"
                  }
                }
            },
            auto_remove: false,
            trace: false
        }; 
        // Add optional expirationDate
        if (cfg.expirationDate) {
            document.filter.ld_proof.credential.expirationDate = cfg.expirationDate;
        }
        return document;
    }

    /** Create all credentials from holder's storage */
    async getCredentials(): Promise<unknown> {
        const { data } = await this.api.post(`/credentials/w3c`, {});
        return data;
    }

    /** Get credential by id from holder's storage */
    async getCredentialById(credentialId: string): Promise<unknown> {
        const { data } = await this.api.get(`/credentials/w3c/${credentialId}`);
        return data;
    }

    /** Delete credential by id from holder's storage */
    async deleteCredentialById(credentialId: string): Promise<unknown> {
        const { data } = await this.api.delete(`/credentials/w3c/${credentialId}`);
        return data;
    }

}

export { CredentialService };