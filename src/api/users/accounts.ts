import {
  Accounts,
  AccountTypes,
  Transactions,
} from "src/api/users/users.model";
import { MasterAccounts } from "src/api/users/users.response";
import { fakeAccounts } from "src/mocks/fakeAccounts";

export const fetchAccounts = async (): Promise<MasterAccounts[]> =>
  Promise.resolve(fakeAccounts);

export const manipulateTransactions = (
  accounts: MasterAccounts[],
  rawData: MasterAccounts[]
) =>
  accounts.map((acc: MasterAccounts) => {
    const transactions: Transactions[] = [];

    rawData.forEach((acc: MasterAccounts) => {
      acc.account_type === AccountTypes.TRANSACTION &&
        transactions.push({
          value: acc.current,
          date: acc.update_timestamp,
        });
    });

    return {
      account_type: acc.account_type,
      account_id: acc.account_id,
      currency: acc.currency,
      balance: acc.available,
      transactions: transactions,
    };
  });
export interface GetAccounts {
  savings: () => Promise<Accounts[]>;
  transactions: () => Promise<Accounts[]>;

}

export const getAccounts = ( ): GetAccounts =>{
  const savings = ():Promise<Accounts[]> =>
    fetchAccounts().then((rawData: MasterAccounts[]) =>{
      const onlyAccount: MasterAccounts[] = rawData.filter((acc:MasterAccounts) => acc.account_type !== AccountTypes.TRANSACTION);

      return manipulateTransactions(onlyAccount, rawData);
    });


    const transactions = ():Promise<Accounts[]> =>
    fetchAccounts().then((rawData: MasterAccounts[]) =>{
      const onlyAccount: MasterAccounts[] = rawData.filter((acc:MasterAccounts) => acc.account_type === AccountTypes.TRANSACTION);

      return manipulateTransactions(onlyAccount, rawData);
    });
  return {savings, transactions};
};
