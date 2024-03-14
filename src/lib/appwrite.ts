import { Client, Account, Databases, Storage } from 'appwrite';
import { environment } from 'src/environments/environment';

export const client = new Client();

// prettier-ignore
client
    .setEndpoint(environment.endpoint)
    .setProject(environment.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID } from 'appwrite';
