export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      resolve(event.target?.result as string);
    };

    fileReader.onerror = (event: ProgressEvent<FileReader>) => {
      reject(event.target?.error);
    };

    fileReader.readAsDataURL(file);
  });
