import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ArrowCircleDown, ArrowCircleUp} from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import * as z from 'zod'
import { api } from '../../lib/axios'

import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

  const { register, handleSubmit, control, reset, formState: { isSubmitting} } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type  } = data;

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    console.log(response.data)

    reset()
  }
  
  return (
    <Dialog.Portal>
      <Overlay />

        <Content>
          <Dialog.Title> Nova Transação</Dialog.Title>

          <CloseButton>
            <X size={24}/>
          </CloseButton>

          <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder='Descrição'
              required
              {...register('description')}
            />

            <input
              type="number"
              placeholder='Preço'
              required
              {...register('price', { valueAsNumber: true })}
            />

            <input 
              type="text"
              placeholder='Categoria'
              required
              {...register('category')}
            />
            
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant='income' value='income'>
                      <ArrowCircleUp size={24}/>  
                      Entrada
                    </TransactionTypeButton>

                    <TransactionTypeButton variant='outcome' value='outcome'>
                      <ArrowCircleDown size={24} /> 
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />
            <button type='submit' disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>

          
        </Content>
    </Dialog.Portal>
  )
}