import { Agent, AgentRoles } from '@/types/agent.types';

const baseApiUrl = import.meta.env.VITE_BASE_API_URL || 'http://localhost:9000';
const issuerUrl = baseApiUrl+'/issuer-api';
const holderUrl = baseApiUrl+'/holder-api';
const verifierUrl = baseApiUrl+'/verifier-api';
const multitenantUrl = baseApiUrl+'/multitenant-api';
const adminUrl = baseApiUrl+'/admin-api';

export const IssuerAgent: Agent = {
    name: 'Issuer Agent',
    apiUrl: issuerUrl,
    wssUrl: issuerUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_ISSUER_API_KEY,
    role: AgentRoles.ISSUER,
}

export const HolderAgent: Agent = {
    name: 'Holder Agent',
    apiUrl: holderUrl,
    wssUrl: holderUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_HOLDER_API_KEY,
    role: AgentRoles.HOLDER,
}

export const VerifierAgent: Agent = {
    name: 'Verifier Agent',
    apiUrl: verifierUrl,
    wssUrl: verifierUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_VERIFIER_API_KEY || 'verifier_api_key',
    role: AgentRoles.VERIFIER,
}

export const MultitenantAgent = {
    name: 'Multitenant Agent',
    apiUrl: multitenantUrl,
    wssUrl: multitenantUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_MULTITENANT_API_KEY || 'multi_api_key',
    role: AgentRoles.MULTITENANT,
}

export const AdminAgent = {
    name: 'Admin Agent',
    apiUrl: adminUrl,
    wssUrl: adminUrl.replace('http', 'ws').replace('https', 'wss')+'/ws',
    apiKey: import.meta.env.VITE_ADMIN_API_KEY || 'admin_api_key',
    role: AgentRoles.ADMIN,
}