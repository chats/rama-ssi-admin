export enum DIDMethods {
    sov = "sov",
    key = "key",
    web = "web",
}

export enum KeyTypes {
    ed25519 = "ed25519",
    bls12381g2 = "bls12381g2",
    p256 = "p256",
}

export enum ProofTypes {
    Ed25519Signature2018 = "Ed25519Signature2018", 
    Ed25519Signature2020 = "Ed25519Signature2020", 
    BbsBlsSignature2020 = "BbsBlsSignature2020",
}


export interface DefultDIDConfig {
    keyType: KeyTypes.ed25519;
    proofType: ProofTypes.Ed25519Signature2020;
}