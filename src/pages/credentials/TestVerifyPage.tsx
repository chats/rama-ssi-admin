import { VerifierAgent } from "@/config/config";
import { PresentProofService } from "@/services/presentProofService";
import { ProofRequestConfig } from "@/types/proof.types";
import { message } from "antd";
import { useState } from "react";


const proofRequestConfig: ProofRequestConfig = {
    connectionId: "",
    schemaUri: "https://ssi.cams.dev/schemas/v1/medical-certificate.jsonld",
    attributes: [
      {
        name: "patientGender",
        path: ["$.credentialSubject.patientGender"],
        purpose: "To verify patient name",
        filter: {
            const: "ชาย"
        }
      }
    ]
};

const connectionId = "a6945ad4-804b-4073-ad31-44c86af7d51b"; // Replace with actual connection ID


const TestVerifyPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const verifyCredential = async () => {
      setLoading(true);
      const presentProofService = new PresentProofService(VerifierAgent);
      const res = presentProofService.createProofRequestBody(connectionId, proofRequestConfig);
    }

    return <>
        {contextHolder}
    </>
}

export default TestVerifyPage