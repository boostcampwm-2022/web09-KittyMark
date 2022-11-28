import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly config = {
    endpoint: 'https://kr.object.ncloudstorage.com',
    region: 'kr-standard',
    credentials: {
      accessKeyId: process.env.NCP_ACCESS_KEY,
      secretAccessKey: process.env.NCP_SECRET_KEY,
    },
  };

  private readonly s3 = new S3(this.config);

  async uploadFiles(images: Express.Multer.File[]): Promise<string[]> {
    const urls: string[] = [];

    await Promise.all(
      images.map(async (image) => {
        const url = await this.uploadFile(image);
        urls.push(url);
      }),
    ); //순서가 중요할 거 같아서 map...

    return urls;
  }

  async uploadFile(image: Express.Multer.File): Promise<string> {
    try {
      const object_key = uuidv4();
      const response = await this.s3
        .upload({
          Bucket: process.env.NCP_BUCKET_NAME,
          ACL: 'public-read',
          Key: object_key + '.jpg',
          Body: image.buffer,
          ContentType: 'image/jpg',
        })
        .promise();
      return response.Location;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('사진 업로드에 실패하였습니다.');
    }
  }
}
