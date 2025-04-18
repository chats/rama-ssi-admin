import { HolderAgent, IssuerAgent } from "@/config/config";
import { CredentialService } from "@/services/credentialService";
import { CredentialOfferConfig } from "@/types/credential.types";
import { ProofTypes } from "@/types/did.types";
import { useState } from "react";
import { Card, Form, Input, Button, Typography, Steps, message, Alert, Divider, Select } from "antd";
import LoadingScreen from "@/components/common/LoadingScreen";
import ShowJsonData from "@/components/dialogs/ShowJsonData";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

// Connection ID from IssuerAgent to HolderAgent
const issueConnectionId = "f2dd2687-1475-4a67-9d1a-1d96b3f2e1eb";

// Offer configuration template
const offerConfig: CredentialOfferConfig = {
    comment: "Medical Certificate",
    contexts: ["https://ssi.cams.dev/schemas/v1/medical-certificate.jsonld"],
    types: ["MedicalCertificate"],
    connectionId: issueConnectionId,
    issuerDid: IssuerAgent.didKey,
    holderDid: HolderAgent.didKey,
    issuanceDate: new Date().toISOString(),
    proofType: ProofTypes.Ed25519Signature2020,
};

interface MedicalCertData {
    patientID: string;
    patientName: string;
    patientAddress: string;
    patientBirthDate: string;
    patientGender: string;
    practitionerName: string;
    organizationName: string;
    organizationAddress: string;
    conditionCode: string;
    conditionNote: string;
    periodStart: Date;
    periodEnd: Date;
    provenanceSignatureTime: Date;
    provenanceAuthor: string;
}

const OfferMedicalCertPage: React.FC = () => {
    const [form] = Form.useForm<MedicalCertData>();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [offerResult, setOfferResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [showJsonData, setShowJsonData] = useState(false);
    const [offerDocument, setOfferDocument] = useState<any>(null);

    // Function to create and send credential offer
    const createAndSendOffer = async (values: MedicalCertData) => {
        setLoading(true);
        setError(null);
        
        try {
            // Format data for credential
            const data = {
//                medicalCertificate: {
                    patientID: values.patientID,
                    patientName: values.patientName,
                    patientAddress: values.patientAddress,
                    patientBirthDate: values.patientBirthDate,
                    patientGender: values.patientGender,
                    practitionerName: values.practitionerName,
                    organizationName: values.organizationName,
                    organizationAddress: values.organizationAddress,
                    conditionCode: values.conditionCode,
                    conditionNote: values.conditionNote,
                    periodStart: values.periodStart,
                    periodEnd: values.periodEnd,
                    provenanceSignatureTime: values.provenanceSignatureTime,
                    provenanceAuthor: values.provenanceAuthor
//                }
            };
            
            // Create credential service
            const credentialService = new CredentialService(IssuerAgent);
            
            // Create offer document
            const document = credentialService.createOfferDocument(offerConfig, data);
            setOfferDocument(document);
            //console.log(JSON.stringify(document));
            
            // Send offer
            const result = await credentialService.sendOffer(document);
            setOfferResult(result);
            
            // Move to results step
            setCurrentStep(2);
            message.success("Medical certificate credential offer sent successfully!");
        } catch (err: any) {
            setError(err.message || "Failed to send credential offer");
            message.error("Failed to send credential offer");
        } finally {
            setLoading(false);
        }
    };

    const onFinish = (values: MedicalCertData) => {
        setCurrentStep(1);
        createAndSendOffer(values);
    };
    
    const steps = [
        {
            title: 'Medical Certificate Form',
            content: (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        patientID: "P123456",
                        patientName: "John Doe",
                        patientAddress: "123 Main St, City, Country",
                        patientBirthDate: "1990-01-01",
                        patientGender: "male",
                        practitionerName: "Dr. Smith",
                        organizationName: "General Hospital",
                        organizationAddress: "456 Hospital Ave, Medical District, Country",
                        conditionCode: "J00",
                        conditionNote: "Common Cold",
                        periodStart: new Date().toISOString().split('T')[0],
                        periodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        provenanceSignatureTime: new Date().toISOString(),
                        provenanceAuthor: "Dr. Smith, General Hospital"
                    }}
                >
                    <Title level={5}>Patient Information</Title>
                    <Form.Item
                        name="patientID"
                        label="Patient ID"
                        rules={[{ required: true, message: 'Please enter patient ID' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="patientName"
                        label="Patient Name"
                        rules={[{ required: true, message: 'Please enter patient name' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="patientAddress"
                        label="Patient Address"
                        rules={[{ required: true, message: 'Please enter patient address' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="patientBirthDate"
                        label="Patient Birth Date"
                        style={{ maxWidth: '250px' }}
                        rules={[{ required: true, message: 'Please enter patient birth date' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    
                    <Form.Item
                        name="patientGender"
                        label="Patient Gender"
                        style={{ maxWidth: '250px' }}
                        rules={[{ required: true, message: 'Please select patient gender' }]}
                    >
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
  
                    <Divider />
                    <Title level={5}>Healthcare Provider Information</Title>
                    
                    <Form.Item
                        name="practitionerName"
                        label="Practitioner Name"
                        rules={[{ required: true, message: 'Please enter practitioner name' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="organizationName"
                        label="Organization Name"
                        rules={[{ required: true, message: 'Please enter organization name' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="organizationAddress"
                        label="Organization Address"
                        rules={[{ required: true, message: 'Please enter organization address' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Divider />
                    <Title level={5}>Medical Condition</Title>
                    
                    <Form.Item
                        name="conditionCode"
                        label="Condition Code"
                        rules={[{ required: true, message: 'Please enter condition code' }]}
                    >
                        <Input placeholder="e.g. J00, R50, etc." />
                    </Form.Item>
                    
                    <Form.Item
                        name="conditionNote"
                        label="Condition Note"
                        rules={[{ required: true, message: 'Please enter condition note' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    
                    <Form.Item
                        name="periodStart"
                        label="Period Start"
                        style={{ maxWidth: '250px' }}
                        rules={[{ required: true, message: 'Please enter period start date' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    
                    <Form.Item
                        name="periodEnd"
                        label="Period End"
                        style={{ maxWidth: '250px' }}
                        rules={[{ required: true, message: 'Please enter period end date' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    
                    <Divider />
                    <Title level={5}>Provenance</Title>
                    
                    <Form.Item
                        name="provenanceSignatureTime"
                        label="Provenance Signature Time"
                        style={{ maxWidth: '250px' }}
                        rules={[{ required: true, message: 'Please enter provenance signature time' }]}
                    >
                        <Input type="datetime-local" />
                    </Form.Item>
                    
                    <Form.Item
                        name="provenanceAuthor"
                        label="Provenance Author"
                        rules={[{ required: true, message: 'Please enter provenance author' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create and Send Offer
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Processing',
            content: (
                <LoadingScreen
                    spinning={loading}
                    fullScreen={false}
                    tip="Processing credential offer..."
                >
                    <Alert
                        message="Creating and sending credential offer"
                        description="Please wait while we process your request. This may take a few moments."
                        type="info"
                    />
                </LoadingScreen>
            ),
        },
        {
            title: 'Result',
            content: (
                <div>
                    {error ? (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                        />
                    ) : (
                        <Alert
                            message="Success"
                            description="Medical certificate credential offer has been sent successfully."
                            type="success"
                            showIcon
                        />
                    )}
                    
                    <Divider />
                    
                    <div style={{ marginTop: 16, display: 'flex', gap: '8px' }}>
                        <Button type="primary" onClick={() => setShowJsonData(true)}>
                            View Offer Details
                        </Button>
                        <Button onClick={() => {
                            form.resetFields();
                            setCurrentStep(0);
                            setOfferResult(null);
                            setError(null);
                        }}>
                            Create New Offer
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <Card title="Issue Medical Certificate Credential" 
            style={{ width: '100%' }}>
            {/* Step 1: Information about component workflow */}
            <div className="workflow-info" style={{ marginBottom: 24 }}>
                {/*
                <Title level={4}>Issuing Medical Certificate Credential</Title>
                 */}
                {/*
                <Paragraph>
                    This page demonstrates the workflow for issuing a verifiable medical certificate credential.
                </Paragraph>
                 */}
                <Text strong>Process:</Text>
                <ol>
                    <li>Fill out the medical certificate form with patient and treatment details</li>
                    <li>Submit the form to create and send a credential offer to the holder</li>
                    <li>View the result of the credential offer operation</li>
                </ol>
            </div>
            
            <Divider />
            
            {/* Step indicator */}
            <Steps current={currentStep} style={{ marginBottom: 24 }}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            
            {/* Step content */}
            <div className="steps-content">
                {steps[currentStep].content}
            </div>
            
            {/* JSON Data Modal */}
            <ShowJsonData
                open={showJsonData}
                title="Credential Offer Details"
                data={{ offerDocument, offerResult }}
                onClose={() => setShowJsonData(false)}
            />
        </Card>
    );
};

export default OfferMedicalCertPage;