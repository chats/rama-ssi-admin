export enum ConnectionProtocol {
    ConnectionV1 = "connections/1.0",
    DIDExchangeV1 = "didexchange/1.0",
    DIDExchangeV1x1 = "didexchange/1.1",
}

export enum ConnectionState {
    Abandoned = "abandoned",
    Active = "active",
    Completed = "completed",
    Error = "error",
    Init = "init",
    Invitation = "invitation",
    Request = "request",
    Response = "response",
    Start = "start",
}

export interface ConnectionFilterOptions {
    alias?: string;
    connection_protocol?: ConnectionProtocol
    invitation_key?: string;
    invitation_message_id?: string;
    limit?: number;
    my_did?: string;
    offset?: number;
    state?: ConnectionState;
    their_did?: string;
    their_public_did?: string;
    their_role?: string;
}