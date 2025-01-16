import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'

import * as enums from '../../utils/enums/tarefa'
import { alterarFiltro } from '../../store/reducers/filtro'
import { RootReducer } from '../../store'

export type Props = {
  legenda: string
  criterio: 'prioridade' | 'status' | 'todas'
  valor?: enums.Prioridade | enums.Status
}

const FiltroCard = ({ legenda, criterio, valor }: Props) => {
  const dispatch = useDispatch()
  const { filtro, tarefas } = useSelector((state: RootReducer) => state)

  const verificaIsActive = () => {
    const sameCriterio = filtro.criterio === criterio
    const sameValor = filtro.valor === valor
    return sameCriterio && sameValor
  }

  const countTarefas = () => {
    if (criterio === 'todas') return tarefas.itens.length
    if (criterio === 'prioridade') {
      return tarefas.itens.filter((item) => item.prioridade === valor).length
    }
    if (criterio === 'status') {
      return tarefas.itens.filter((item) => item.status === valor).length
    }
  }

  const filtrar = () => {
    dispatch(
      alterarFiltro({
        criterio,
        valor
      })
    )
  }

  const counter = countTarefas()
  const ativo = verificaIsActive()

  return (
    <S.Card ativo={ativo} onClick={filtrar}>
      <S.Counter>{counter}</S.Counter>
      <S.Label>{legenda}</S.Label>
    </S.Card>
  )
}

export default FiltroCard
