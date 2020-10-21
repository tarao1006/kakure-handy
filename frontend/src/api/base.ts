export const BACKEND_URL = process.env.BACKEND_URL;

export const ToJson = async (res: Response) => {
  const js = await res.json();

  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
}
