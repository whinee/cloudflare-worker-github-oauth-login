export { };

type ept = any;

declare global {
    const CLIENT_ID: string;
    const CLIENT_SECRET: string;
    const kv: KVNamespace;
    var ep: any;
}