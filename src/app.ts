import api from "@/api";
import { useAuthToken } from "@/utils/hooks";

export async function getInitialState() {
  const { getToken } = useAuthToken();
  const token = getToken();

  try {
    const { requestError, response } = await api.auth.getSessionInfo({
      token: token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
