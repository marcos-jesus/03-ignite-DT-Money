import { SummaryContainer, SumaryCard } from './styles'
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar} from 'phosphor-react'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { priceFormatter } from '../../utils/formatter'

export function Summary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'income') {
      acc.income += transaction.price
      acc.total += transaction.price
    } else {
      acc.outcome += transaction.price
      acc.total -= transaction.price
    }
    
    return acc

  }, { income: 0, outcome: 0, total: 0})
  
  return (
    <SummaryContainer>
      <SumaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong> {priceFormatter.format(summary.income)} </strong>
      </SumaryCard>

      <SumaryCard variant='red'>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#fff" />
        </header>

        <strong> {priceFormatter.format(summary.outcome)} </strong>
      </SumaryCard>

      <SumaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong> {priceFormatter.format(summary.total)} </strong>
      </SumaryCard>

    </SummaryContainer>
  )
}