
"use client";

// SWR
import useSWR from "swr";

// React + Next
import { useEffect, useState } from "react";

// Internal
import Requests from "@utils/requests";
import Account, { UseAccountReturnProps, CustomFetcherProps } from "./interfaces";
import { newServerRoute as serverRoute } from "@shared/classes/routes";
import { AccountReturnProps } from "@shared/interfaces";

/** A custom fetcher for the {@link useAccount} hook. */
const customFetcher = async (props: CustomFetcherProps) => {
  let url = props[0];
  const userId = props[1];

  const response = await Requests.noStore.get(url);
  const result: AccountReturnProps = await response.json();

  return JSON.parse(result.data);
};

/** A client-side hook to get data on the account. */
const useAccount = (userId: number): UseAccountReturnProps => {
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: ""
  });

  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.account.read.client(userId.toString());
  const { data, error, isLoading } = useSWR([url, userId], customFetcher);

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
