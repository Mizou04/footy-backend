import "dotenv/config";
/**
 *
 * @param input.url is actually the pathname + params and not the whole url
 * @return
 */
export default function callApi(input: {
    url: string;
}): Promise<string>;
