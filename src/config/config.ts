import { Agent, AgentRoles } from '@/types/agent.types';

const issuerUrl = import.meta.env.VITE_ISSUER_API_URL;
const holderUrl = import.meta.env.VITE_HOLDER_API_URL;
const verifierUrl = import.meta.env.VITE_VERIFIER_API_URL;

export const IssuerAgent: Agent = {
    name: 'Issuer Agent',
    apiUrl: issuerUrl,
    wssUrl: issuerUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_ISSUER_API_KEY,
    role: AgentRoles.ISSUER,
    didSov: import.meta.env.VITE_ISSUER_DID_SOV,
    didKey: import.meta.env.VITE_ISSUER_DID_KEY,
}

export const HolderAgent: Agent = {
    name: 'Holder Agent',
    apiUrl: holderUrl,
    wssUrl: holderUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_HOLDER_API_KEY,
    role: AgentRoles.HOLDER,
    didSov: import.meta.env.VITE_HOLDER_DID_SOV,
    didKey: import.meta.env.VITE_HOLDER_DID_KEY,
}

export const VerifierAgent: Agent = {
    name: 'Verifier Agent',
    apiUrl: verifierUrl,
    wssUrl: verifierUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_VERIFIER_API_KEY,
    role: AgentRoles.VERIFIER,
    didSov: import.meta.env.VITE_VERIFIER_DID_SOV,
    didKey: import.meta.env.VITE_VERIFIER_DID_KEY,
}
