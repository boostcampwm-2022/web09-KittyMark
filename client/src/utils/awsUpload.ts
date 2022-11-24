import S3 from 'react-aws-s3-typescript';

const config = {
  bucketName: process.env.REACT_APP_NCP_BUCKET_NAME as string,
  region: process.env.REACT_APP_NCP_REGION as string,
  accessKeyId: process.env.REACT_APP_NCP_ACCESS as string,
  secretAccessKey: process.env.REACT_APP_NCP_SECRET as string,
  s3Url: 'https://kitty-mark.kr.object.ncloudstorage.com',
};

const uploadFile = async (file: File): Promise<string> => {
  const ReactS3Client = new S3(config);
  let locationUrl = '';
  try {
    const response = await ReactS3Client.uploadFile(file, file.name);
    locationUrl = response.location;
  } catch (exception) {
    /* eslint-disable-next-line no-console */
    console.log(exception);
  }
  return locationUrl;
};

export default uploadFile;
