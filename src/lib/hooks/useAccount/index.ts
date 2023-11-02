
"use client";

// SWR
import useSWR from "swr";

// React + Next
import { useEffect, useState } from "react";

// Internal
import Requests from "@utils/requests";
import Account, { UseAccountReturnProps } from "./interfaces";
import { newServerRoute as serverRoute } from "@shared/utils/routes";
import { ReadAccountResponseProps } from "@shared/interfaces";

/** A custom fetcher for the {@link useAccount} hook. */
const fetcher = async (url: string) => {
  const response = await Requests.noStore.get(url);
  const result: ReadAccountResponseProps = await response.json();

  return result.account;
};

/** A client-side hook to get data on the account. */
const useAccount = (): UseAccountReturnProps => {
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.account.read.client();
  const { data, error, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      setAccount({
        ...account,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    }
  }, [data]);

  /**
   * Update the value of a field in the account.
   * @param field The field to update.
   * @param value The new value
   */
  const updateAccountField = (field: keyof Account, value: string) => {
    setAccount({
    ...account,
      [field]: value,
    });
  }

  return {
    account,
    updateAccountField,
    isError: error,
    isLoading
  }
}

export default useAccount;
