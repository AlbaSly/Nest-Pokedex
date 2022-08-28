export interface HttpAdapter {
    get<T>(url: string, config: object): Promise<T>;
}