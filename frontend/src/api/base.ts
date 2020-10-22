export const BACKEND_URL = 'http://192.168.100.55:8000' || process.env.BACKEND_URL;

export const ToJson = async (res: Response) => {
  const js = await res.json();

  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
}
