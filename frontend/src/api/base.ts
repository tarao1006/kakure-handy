export const BACKEND_API_BASE = process.env.BACKEND_API_BASE;

export const ToJson = async (res: Response) => {
  const js = await res.json();

  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
}
