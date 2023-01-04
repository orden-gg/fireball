export interface GalleryFakeGotchi {
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
    metadata: GalleryFakeGotchiMetadata;
}

interface GalleryFakeGotchiMetadata {
    editions: number;
    likeCount: number;
    createdAt: string;
    status: number;
}
