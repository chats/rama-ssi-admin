import { HolderAgent, IssuerAgent, VerifierAgent } from "@/config/config";
import { ConnectionService } from "@/services/connectionService";
import { CredentialService } from "@/services/credentialService";
import { CredentialOfferProperties } from "@/types/credential.types";
import { ProofTypes } from "@/types/did.types";
import { useEffect } from "react"

const TestOfferPage: React.FC = () => {

    const issueConnectionId = "f2dd2687-1475-4a67-9d1a-1d96b3f2e1eb" // from IssuerAgent to HolderAgent

    const createOffer = () => {
        console.log(IssuerAgent)

        const props: CredentialOfferProperties = {
            comment: "Test Offer",
            contexts: ["https://www.w3.org/2018/credentials/examples/v1"],
            types: ["UniversityDegreeCredential"],
            connectionId: issueConnectionId,
            issuerDid: IssuerAgent.didKey,
            holderDid: HolderAgent.didKey,
            issuanceDate: new Date().toISOString(),
            proofType: ProofTypes.Ed25519Signature2020,
        };
        
        const data = {
          "degree": {
            "type": "BachelorDegree",
            "name": "Bachelor of Science and Arts"
          },
          "college": "Faber College"
        }

        const data2 = {
            name: "John Doe",
            age: 30,
            address: "123 Main St, Anytown, USA"
        }

        const credentialService = new CredentialService(IssuerAgent);
        const offerDocument = credentialService.createOfferDocument(props, data);
        console.log(JSON.stringify(offerDocument))
    }

    useEffect(() => {
        //createInvitation()
        createOffer()
    }, []);

    return <>
     
    </>
}

export default TestOfferPage