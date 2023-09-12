const baseUrl = "http://3.67.227.198:5002";

interface ServerResultModel<T> {
  data: T;
  message: string | null;
  status: "success" | "failed";
}

export type SupportedLang = Record<string, string>;
export type UploadResult = {
  answer: {
    answer_language: string;
    file_name: string;
    text: string;
    voice_path: string;
  };
  prompt: string;
  prompt_language: string;
};

interface WebService {
  getSupportedLangs(): Promise<ServerResultModel<SupportedLang>>;
  upload(
    lang: string,
    payload: {
      file_name: string;
      file_content: string;
    }
  ): Promise<ServerResultModel<UploadResult>>;
  download(): void;
}

const webService: WebService = {
  getSupportedLangs() {
    const url = baseUrl + "/supported_language";
    return new Promise((resolve) =>
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => resolve(json))
    );
  },
  async upload(lang, payload) {
    const url = baseUrl + `/ask/web/${lang}`;
    return new Promise((resolve) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((json) => resolve(json))
    );
  },
  download() {},
};

export default webService;
