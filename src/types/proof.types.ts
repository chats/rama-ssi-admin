export interface ProofRequestConfig {
    connectionId: string;
    attributes: Array<{
        name: string;
        path: string[];
        pattern?: string;
        purpose?: string;
        filter?: unknown;
    }>;
    proofType: string[];
    schemaUri: string;
}
/*
export interface ProofRequestAttribute {
    name: string;
    path: string[];
    purpose: string;
    filter?: unknown;
    pattern?: string;
}

export interface ProofRequestConfig {
  schemaUri: string;
  proofType: string[];
  attributes: ProofRequestAttribute[];
}
*/