import { useState } from "react";
import { postAuthFormData } from "../services/auth-endpoints";
import { useAuth } from "../context/auth-context";

const useAuthAction = () => {
  const { syncUser } = useAuth();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const post = async (apiRoute, formData) => {
    setLoading(true);
    try {
      const response = await postAuthFormData(apiRoute, formData);
      setData(response.data);
      syncUser(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error.response.data.errors);
    }
  };

  console.log("=======", data, errors);
  return { data, loading, errors, post };
};

export default useAuthAction;
