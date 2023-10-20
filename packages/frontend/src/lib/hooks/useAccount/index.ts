
"use client";

// SWR
import useSWR from "swr";

// React + Next
import { useEffect, useState } from "react";

// Internal
import Requests from "@utils/requests";
import Account, { UseAccountReturnProps } from "./interfaces";
import { newServerRoute as serverRoute } from "@shared/utils/routes";
import { AccountReturnProps } from "@shared/interfaces";

/** A custom fetcher for the {@link useAccount} hook. */
const fetcher = async (url: string) => {
  const response = await Requests.noStore.get(url);
  const result: AccountReturnProps = await response.json();

  return JSON.parse(result.data);
};

/** A client-side hook to get data on the account. */
const useAccount = (): UseAccountReturnProps => {
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: ""
  });

  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.account.read.client();
  const { data, error, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      setAccount({ ...account, firstName: data.first_name, lastName: data.last_name });
    }
  }, [data])

  return {
    account,
    isError: error,
    isLoading
  }
}

export default useAccount;
