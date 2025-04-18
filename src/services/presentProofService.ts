//import { ProofRequestDocument } from "@/types/proof.types";
import { DEFAULT_SCHEMA_URI } from "@/types/schema.types";
import { v4 as uuidv4 } from "uuid";
import { ApiService } from "./api";
import { Agent } from "@/types/agent.types";
import { ProofRequestConfig } from "@/types/proof.types";

class PresentProofService {
  private api: ApiService;

  constructor(agent: Agent) {
      this.api = new ApiService(agent);
  }

  createProofRequestBody (
    connectionId: string,
    proofRequestConfig: ProofRequestConfig
  )  {
    return {
      connection_id: connectionId,
      presentation_request: {
        dif: {
          options: {
            challenge: uuidv4(),
            domain: "4jt78h47fh47",
          },
          presentation_definition: {
            id: uuidv4(),
            format: {
              ldp_vp: {
                proof_type: [...proofRequestConfig.proofType],
              },
            },
            input_descriptors: proofRequestConfig.attributes.map((attr) => ({
              id: `${attr.name}_id`,
              name: attr.name,
              purpose: attr.purpose,
              schema: [
                {
                  uri: DEFAULT_SCHEMA_URI,
                },
                {
                  uri: proofRequestConfig.schemaUri,
                },
              ],
              constraints: {
                fields: [
                  {
                    path: attr.path,
                    ...(attr.pattern && {
                      filter: {
                        type: "string",
                        pattern: attr.pattern,
                      },
                    }),
                    purpose: attr.purpose,
                  },
                ],
              },
            })),
          },
        },
      },
      trace: false,
    };
  }

  createProofProposalDocument(connectionId: string, proposal: unknown) {
    return {connectionId, proposal}; //FIX this
  }

  /**
   * (Verifier) Send proof request to holder
   */
  async sendProofRequest(connectionId: string, proofRequestConfig: ProofRequestConfig) {
    const requestBody = this.createProofRequestBody(connectionId, proofRequestConfig);
    const { data } = await this.api.post('/present-proof-2.0/send-reques', requestBody);
    return data;
  }

  /**
   * (Holders) Send proof to verifier
   */
  async sendProposal(connectionId: string, proofProposalDocument: unknown) {
    const requestBody = this.createProofProposalDocument(connectionId, proofProposalDocument);
    const { data } = await this.api.post('/present-proof-2.0/send-proposal', requestBody);
    return data;
  }


  async sendPresentation(presExId: string, presentationDocument: unknown) {
    const { data } = await this.api.post(`/present-proof-2.0/records/${presExId}/send-presentation`, {
      presentation: presentationDocument,
    });
    return data;
  }

  async verifyPresentation(presExId: string) {
    const { data } = await this.api.post(`/present-proof-2.0/records/${presExId}/verify-presentation`, {});
    return data;
  }


  async getRecords(options?: unknown) {
    const { data } = await this.api.get('/present-proof-2.0/records', {
      params: options,
    });
    return data;
  };
  
  async getRecordById(presExId: string) {
    const { data } = await this.api.get(`/present-proof-2.0/records/${presExId}`);
    return data;
  }

  async deleteRecord(presExId: string) {
    const { data } = await this.api.delete(`/present-proof-2.0/records/${presExId}`);
    return data;
  }

};

export { PresentProofService }
