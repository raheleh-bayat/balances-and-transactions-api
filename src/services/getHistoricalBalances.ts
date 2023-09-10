import moment from "moment";
import axios from 'axios';

export function getHistoricalBalance(from: string, to: string, sort: string): Promise<any> {
  async function axiosApiCall() {
    try {
      const response = await axios.get(
        'https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions',
        {
          headers: {
            "x-api-key": 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18'
          }
        },
      );

      // sort transactions by date
      let transactions = response.data.transactions;
      transactions.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });


      interface Balance {
        date: string;
        amount: number;
        currency: string
      }

      const historicalBalances: { [key: string]: Balance } = {}
      let totalBalance: number = 0;

      for (let i = 0; i < transactions.length; i++) {
        // only calculate non-cancelled transactions
        if (transactions[i].status != "CANCELLED") {
          totalBalance += transactions[i].amount;
        }

        const date = moment(transactions[i].date).format('YYYY-MM-DD');
        if (historicalBalances[date] == undefined) {
          const balance: Balance = {
            date: date,
            amount: totalBalance,
            currency: transactions[i].currency
          };
          historicalBalances[date] = balance;
        }
        else {
          historicalBalances[date].amount = totalBalance
        }
      }

      let result: any = [];
      Object.entries(historicalBalances).forEach(([balanceDate, balance], index) => {
        if (moment(balanceDate).isBetween(moment(from), moment(to), undefined, '[]')) {
          result.push(balance);
        }
      });


      // sort final result
      result.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sort == "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return axiosApiCall()
}
