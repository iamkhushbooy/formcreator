import transporter from "@/emailconfig";
import { submitType } from "../form/[id]/page";

const sendmail = async (email: string, id: string) => {
    const link = `${process.env.LINK}/${id}`;
    await transporter.sendMail({
        from: process.env.EMAIL, // Sender email address (user email)
        to: email, // Recipient's email
        subject: 'Your Link is generated', // Email subject
        text: `Your form link is here...`,
        html: `<a href="${link}">Your Link</a>` // Body content
    });
};

export const sendResponse = async (fieldsave: submitType[], id: string, email: string) => {
    try {
        const fieldsContent = fieldsave.map(field => `
            <p><strong>${field.key}</strong>: ${field.value}</p>
        `).join('');

       
        const emailContent = `
            <h2>Form Submission Results</h2>
            ${fieldsContent}
        `;

        // Send email with the formatted form data
        await transporter.sendMail({
            from: process.env.EMAIL, 
            to: email, 
            subject: `Response for Form ID: ${id}`, 
            html: emailContent, 
        });

        console.log("Email sent successfully");
        return { success: true, message: "Response sent successfully" };
    } catch (error) {
        console.error("Error sending response:", error);
        return { success: false, message: "Failed to send response" };
    }
};

export default sendmail;
