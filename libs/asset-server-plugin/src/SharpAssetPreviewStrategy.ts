
import sharp from 'sharp';
import path from 'path';
import {AssetsPreviewStrategy, AssetType, getAssetType} from '@gridiron/core';

export class SharpAssetPreviewStrategy implements AssetsPreviewStrategy {

    constructor(
        private config: {
            maxHeight: number,
            maxWidth: number
        }
    ) {}

    async generatePreviewImage(mimeType: string, data: Buffer): Promise<Buffer> {
        const assetType = getAssetType(mimeType)
        const {maxHeight, maxWidth} = this.config
        if (assetType === AssetType.IMAGE) {
            const image = sharp(data)
            const metadata = await image.metadata()
            const width = metadata.width || 0
            const height = metadata.height || 0
            if (maxWidth < width || maxHeight < height) {
                return image.resize(maxWidth, maxHeight, {fit: 'inside'}).toBuffer()
            } else {
                return  data
            }
        } else {
            return sharp(path.join(__dirname, 'file-icon.png'))
                .resize(800, 800, {fit: 'outside'})
                .composite([
                    {
                        input: this.generateMimeTypeOverlay(mimeType),
                        gravity: sharp.gravity.center,
                    },
                ])
                .toBuffer()
        }
    }

    private generateMimeTypeOverlay(mimeType: string): Buffer {
        return Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" height="150" width="800">
            <style>
                text {
                   font-size: 64px;
                   font-family: Arial, sans-serif;
                   fill: #666;
                }
              </style>

              <text x="400" y="110"  text-anchor="middle" width="800">${mimeType}</text>
            </svg>`);
    }
}
