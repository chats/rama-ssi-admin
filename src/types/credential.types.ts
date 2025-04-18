export interface CredentialOfferOptions {
    comment: string;
    connectionId: string;
    
}

export interface CredentialFilterOptions {
    owner: string;
}

export interface CredentialOfferConfig {
    comment: string;
    contexts: string[];
    types: string[];
    connectionId: string;
    issuerDid: string;
    holderDid: string;
    issuanceDate: string;
    expirationDate?: string;
    proofType: string; // "Ed25519Signature2020" or "BbsBlsSignature2020"
}


