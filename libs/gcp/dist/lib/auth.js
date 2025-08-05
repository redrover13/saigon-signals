/**
 * @file GCP Authentication utilities
 * @author Dulce de Saigon Team
 * @copyright 2025 Dulce de Saigon
 * @license MIT
 */ import { GoogleAuth } from "google-auth-library";
/**
 * Creates an authenticated client for Google Cloud services
 * @param scopes - The scopes required for the client
 * @returns An authenticated Google Auth client
 */ export async function createAuthClient(scopes = []) {
    const auth = new GoogleAuth({
        scopes: Array.isArray(scopes) ? scopes : [
            scopes
        ]
    });
    return auth.getClient();
}
/**
 * Gets the project ID from the environment or credentials
 * @returns The Google Cloud project ID
 */ export async function getProjectId() {
    const auth = new GoogleAuth();
    return auth.getProjectId();
}
/**
 * Gets Application Default Credentials token
 * @param scopes - The scopes required for the token
 * @returns The access token
 */ export async function getAccessToken(scopes = []) {
    const auth = new GoogleAuth({
        scopes: Array.isArray(scopes) ? scopes : [
            scopes
        ]
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    if (!token.token) {
        throw new Error("Failed to retrieve access token");
    }
    return token.token;
}

//# sourceMappingURL=auth.js.map