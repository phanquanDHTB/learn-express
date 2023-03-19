import stream from "stream";
import * as dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

const setFilePublic = async (fileId) => {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });
    } catch (error) {
        console.error("error pub");
    }
};

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const {
        data: { id, name },
    } = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            mimeType: fileObject.mimeType,
        },
    });
    await setFilePublic(id);
    return {
        linkImage: `https://drive.google.com/thumbnail?id=${id}`,
        id,
    };
};

const deleteFile = async (fileId) => {
    try {
        console.log("Delete File:::", fileId);
        const deleteFile = await drive.files.delete({
            fileId: fileId,
        });
        console.log(deleteFile.data, deleteFile.status);
    } catch (error) {
        console.error(error);
    }
};

export { uploadFile, deleteFile };
