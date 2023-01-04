export interface FakeGotchi {
    type: string;
    id: number;
    identifier: number;
    artistName: string;
    name: string;
    description: string;
    thumbnailHash: string;
    editions: number;
    externalLink: string;
    createdAt: string;
    likeCount: number;
    flagCount: number;
    status: number;
    metadata: FakeGotchiMetadata;
}

interface FakeGotchiMetadata {
    editions: number;
    likeCount: number;
    createdAt: string;
    status: number;
}
