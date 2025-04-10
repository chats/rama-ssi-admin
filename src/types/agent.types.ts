export enum AgentRoles {
    ISSUER = "issuer",
    HOLDER = "holder",
    VERIFIER = "verifier",
    MULTITENANT = "multitenant",
    ADMIN = "admin",
}
  
export interface Agent {
    name?: string;
    apiUrl: string;
    apiKey: string;
    wssUrl: string;
    role?: AgentRoles;
}