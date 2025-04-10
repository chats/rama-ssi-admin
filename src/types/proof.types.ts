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
