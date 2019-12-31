import axios from 'axios';

const nimKey = "nim";
const nimUrl = process.env.nimJsonUrl || "";

let nimMap: { [nim: string]: string } = {};

interface NimStorage {
    expiry: number;
    nimMap: { [nim: string]: string };
}

export async function resolveNim(nim: string): Promise<string|undefined> {
    if (Object.keys(nimMap).length === 0) {
        nimMap = await loadNimMap();
    }

    return nimMap[nim];
}

async function loadNimMap(): Promise<{ [nim: string]: string}> {
    const stored = window.localStorage.getItem(nimKey);

    if (!stored) {
        return await retrieveNewData();
    }

    const nimStorage: NimStorage = JSON.parse(stored);

    if (nimStorage.expiry <= Date.now()) {
        return await retrieveNewData();
    }

    return nimStorage.nimMap;
}

async function retrieveNewData(): Promise<{ [nim: string]: string}> {
    const response = await axios.get(nimUrl);
    const nimStorage: NimStorage = {
        expiry: Date.now() + (60 * 24 * 3600 * 1000),  // expires in 60 days
        nimMap: response.data
    };

    const string = JSON.stringify(nimStorage);
    window.localStorage.setItem(nimKey, string);
    return response.data;
}
