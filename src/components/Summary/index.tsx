import { SummaryContainer, SumaryCard } from './styles'
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SumaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong> {priceFormatter.format(summary.income)} </strong>
      </SumaryCard>

      <SumaryCard variant="red">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#fff" />
        </header>

        <strong> {priceFormatter.format(summary.outcome)} </strong>
      </SumaryCard>

      <SumaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong> {priceFormatter.format(summary.total)} </strong>
      </SumaryCard>
    </SummaryContainer>
  )
}
