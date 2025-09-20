declare module "mammoth" {
	export function extractRawText(input: { path?: string; buffer?: Buffer }): Promise<{ value: string }>;
	const _default: any;
	export default _default;
}

declare module "pdf-parse" {
	type PdfData = { text: string };
	function pdfParse(dataBuffer: Buffer | Uint8Array | ArrayBuffer): Promise<PdfData>;
	export default pdfParse;
} 