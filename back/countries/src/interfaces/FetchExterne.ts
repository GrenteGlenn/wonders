export type CustomSearchResponse = {
  kind?: 'customsearch#search';
  url?: {
    type: string;
    template: string;
  };
  queries?: {
    request: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
    nextPage?: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
  };
  context?: {
    title: string;
  };
  searchInformation?: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items: Array<{
    kind: 'customsearch#result';
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    mime?: string;
    fileFormat?: string;
    image?: {
      contextLink: string;
      height: number;
      width: number;
      byteSize: number;
      thumbnailLink: string;
      thumbnailHeight: number;
      thumbnailWidth: number;
    };
  }>;
};

export interface CustomSearchResponseItems {
  kind: 'customsearch#result';
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime?: string;
  fileFormat?: string;
  image?: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}
