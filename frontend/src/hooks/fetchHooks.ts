import { getCart } from "@/utils/fetchData";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useGetCart = async () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => getCart({ auth: `Bearer ${await getToken()}` }),
    enabled: !!(await getToken()),
  });
};
