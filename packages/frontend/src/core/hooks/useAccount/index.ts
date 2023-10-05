
"use client";

// SWR
import useSWR from "swr";

// React + Next
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

// Internal
import Cookies from "@classes/cookies";
import Requests from "@classes/requests";
import Account, { UseAccountReturnProps, CustomFetcherProps } from "./interfaces";
import { serverRoute } from "@shared/classes/route";
import { AccountReturnProps } from "@shared/interfaces";

/** A custom fetcher for the {@link useAccount} hook. */
const customFetcher = async (props: CustomFetcherProps) => {
  const url = props[0];
  const jwt = props[1];

  const response = await Requests.noStorePost(url, { jwt });
  const result: AccountReturnProps = await response.json();

  return JSON.parse(result.data);
};

/** A client-side hook to get data on the account. */
const useAccount = (): UseAccountReturnProps => {
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: ""
  });
  const jwt = Cookies.get('id');

  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.account.use();
  const { data, error, isLoading } = useSWR([url, jwt], customFetcher);

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
