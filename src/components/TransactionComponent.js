import { useEffect, useState } from "react";

const TransactionComponent = ({ transactions }) => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredTnx, setFilteredTnx] = useState(transactions);

  const changeHandler = (e) => {
    setSearchItem(e.target.value);
    filterTransactions(e.target.value);
  };

  const filterTransactions = (search) => {
    if (!search || search === "") {
      setFilteredTnx(transactions);
      return;
    }
    const filtered = transactions.filter((t) =>
      t.desc.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTnx(filtered);
  };

  useEffect(() => {
    filterTransactions(searchItem);
  }, [transactions]);

  if (!transactions.length) return <h3>add some transaction</h3>;

  return (
    <section>
      <input
        type="text"
        value={searchItem}
        onChange={changeHandler}
        placeholder="search..."
        className="search"
      />
      {filteredTnx.length
        ? filteredTnx.map((t) => (
            <div
              className="transaction"
              key={t.id}
              style={{ borderRight: t.type === "expense" && "4px solid red" }}
            >
              <span>{t.desc}</span>
              <span>$ {t.amount}</span>
            </div>
          ))
        : "no item matchs!"}
    </section>
  );
};

export default TransactionComponent;
