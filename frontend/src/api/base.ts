export const BACKEND_URL = process.env.BACKEND_URL;

export const ToJson = async <T>(res: Response): Promise<T> => {

  if (res.ok) {
    return res.json() as Promise<T>;
  } else {
    throw new Error("error");
  }
}
