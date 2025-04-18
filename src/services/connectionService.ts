import { ConnectionFilterOptions } from "@/types/connection.types";
import { ApiService } from "./api";
import { Agent } from "@/types/agent.types";

class ConnectionService {
  private api: ApiService;
  private readonly invitationBody = {
    accept: ["didcomm/aip1", "didcomm/aip2;env=rfc19"],
    handshake_protocols: ["https://didcomm.org/didexchange/1.0"],
    metadata: {},
    protocol_version: "1.1",
    use_public_did: false,
  };

  constructor(agent: Agent) {
    this.api = new ApiService(agent);
  }

  async createInvitation(): Promise<unknown> {
    console.log("Creating invitation with body: ", this.invitationBody);

    const response = await this.api.post(`/out-of-band/create-invitation`, {
      ...this.invitationBody,
    });
    return response.data;
  }

  async acceptInvitation(invitation: string): Promise<unknown> {
    const response = await this.api.post(`/out-of-band/receive-invitation`, {
      invitation,
    });
    return response.data;
  }

  async deleteInvitation(inviMsgId: string): Promise<unknown> {
    const response = await this.api.delete(`/out-of-band/invitations/${inviMsgId}`);
    return response.data;
  }

  async getConnections(filterOptions?: ConnectionFilterOptions): Promise<unknown> {
    const response = await this.api.get(`/connections`, {
      params: {
        ...filterOptions,
      },
    });
    return response.data;
  }

  async getConnectionById(connectionId: string): Promise<unknown> {
    const response = await this.api.get(`/connections/${connectionId}`);
    return response.data;
  }

  async deleteConnection(connectionId: string): Promise<unknown> {
    const response = await this.api.delete(`/connections/${connectionId}`);
    return response.data;
  }
}

// Create a singleton instance
//const connectionService = new ConnectionService();

// Export both the singleton instance and the class
//export default connectionService;
export { ConnectionService };