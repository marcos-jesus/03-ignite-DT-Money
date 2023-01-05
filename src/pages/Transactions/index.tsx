import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionContainer, TransactionsTable } from "./styles";

export function Transactions() {
  return(
    <div>
      <Header/>
      <Summary />

      <TransactionContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de Site</td>
              <td>
                <PriceHighlight variant="income">
                  R$ 12.000,00
                </PriceHighlight></td>
              <td>Venda</td>
              <td>05/01/2023</td>
            </tr>

            <tr>
              <td width="50%">Desenvolvimento de Site</td>
              <td>
                <PriceHighlight variant="outcome">
                  R$ -5.000,00
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>05/01/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  )
}