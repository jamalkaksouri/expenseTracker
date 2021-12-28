import { useState, useEffect } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";

const ExpenseApp = () => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (formValues) => {
    setTransactions([...transactions, { ...formValues, id: Date.now() }]);
  };

  // در این قسمت چون ما تغییراتی در تراکنش‌ها داریم و هر دفعه تغییر می‌کنند پس استفاده از
  //useEffect
  // بهترین گزینه برای تغییرات است

  useEffect(() => {
    let exp = 0;
    let inc = 0;

    transactions.forEach((t) => {
      t.type === "expense"
        ? (exp = exp + parseFloat(t.amount))
        : (inc = inc + parseFloat(t.amount));
    });
    setExpense(exp);
    setIncome(inc);
  }, [transactions]);

  return (
    <section className="container">
      <OverviewComponent
        income={income}
        expense={expense}
        addTransaction={addTransaction}
      />
      <TransactionComponent transactions={transactions} />
    </section>
  );
};

export default ExpenseApp;
