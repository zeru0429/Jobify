export interface AiApiRequestType {
  contents: ContentType[];
}

interface ContentType {
  parts: Part[];
}

interface Part {
  text: string;
}
